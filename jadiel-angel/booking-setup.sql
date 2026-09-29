-- Jadiel Angel automatic booking setup.
-- Paste this whole file into Supabase -> SQL Editor -> New query, then Run.
-- Safe to run again.

create table if not exists public.bookings (
  id bigint generated always as identity primary key,
  slot_date date not null,
  slot_hour smallint not null check (slot_hour between 0 and 23),
  name text not null check (char_length(name) between 1 and 80),
  phone text not null check (char_length(phone) between 7 and 30),
  service text not null check (char_length(service) <= 80),
  location text not null check (char_length(location) <= 200),
  cancel_token uuid not null default gen_random_uuid() unique,
  created_at timestamptz not null default now(),
  -- One booking per time slot: this is what blocks double booking.
  unique (slot_date, slot_hour)
);

-- Visitors never touch the table directly; they only use the functions below.
alter table public.bookings enable row level security;
revoke all on public.bookings from anon, authenticated;

-- Taken times (date and hour only, no names or phone numbers).
create or replace function public.get_taken_slots(p_from date)
returns table (slot_date date, slot_hour smallint)
language sql stable security definer set search_path = public
as $$
  select b.slot_date, b.slot_hour from public.bookings b
  where b.slot_date >= p_from
  order by 1, 2;
$$;

-- Book a slot. Returns the cancel code. A taken slot fails with a
-- unique-violation error, which the website shows as "someone just booked it".
create or replace function public.book_slot(
  p_date date, p_hour int, p_name text, p_phone text, p_service text, p_location text
) returns uuid
language plpgsql security definer set search_path = public
as $$
declare
  local_now timestamp := now() at time zone 'America/New_York';
  digits text := regexp_replace(coalesce(p_phone, ''), '\D', '', 'g');
  token uuid;
begin
  if p_date < local_now::date or p_date > local_now::date + 60
     or p_hour < 0 or p_hour > 23
     or (p_date = local_now::date and p_hour <= extract(hour from local_now)) then
    raise exception 'That time is no longer available';
  end if;

  if (select count(*) from public.bookings
      where regexp_replace(phone, '\D', '', 'g') = digits
        and slot_date >= local_now::date) >= 2 then
    raise exception 'Too many upcoming bookings for this phone number';
  end if;

  insert into public.bookings (slot_date, slot_hour, name, phone, service, location)
  values (p_date, p_hour, trim(p_name), trim(p_phone), p_service, p_location)
  returning cancel_token into token;
  return token;
end;
$$;

-- Cancel with the code from the cancel link. Frees the slot right away.
create or replace function public.cancel_booking(p_token uuid)
returns json
language sql security definer set search_path = public
as $$
  with gone as (
    delete from public.bookings where cancel_token = p_token
    returning slot_date, slot_hour
  )
  select row_to_json(gone) from gone;
$$;

revoke all on function public.get_taken_slots(date) from public;
revoke all on function public.book_slot(date, int, text, text, text, text) from public;
revoke all on function public.cancel_booking(uuid) from public;
grant execute on function public.get_taken_slots(date) to anon, authenticated;
grant execute on function public.book_slot(date, int, text, text, text, text) to anon, authenticated;
grant execute on function public.cancel_booking(uuid) to anon, authenticated;
