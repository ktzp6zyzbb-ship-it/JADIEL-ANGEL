-- Jadiel Angel booking database setup.
-- Paste this whole file into Supabase -> SQL Editor -> New query, then Run.

create table if not exists public.bookings (
  id bigint generated always as identity primary key,
  slot_date date not null,
  slot_hour smallint not null check (slot_hour between 0 and 23),
  name text not null check (char_length(name) between 1 and 80),
  phone text not null check (char_length(phone) between 7 and 30),
  service text not null check (char_length(service) <= 80),
  location text not null check (char_length(location) <= 200),
  created_at timestamptz not null default now(),
  -- One booking per time slot: this is what blocks double booking.
  unique (slot_date, slot_hour)
);

alter table public.bookings enable row level security;

-- Website visitors can add a booking for today through the next 60 days.
-- They cannot read, change or delete anyone's booking.
drop policy if exists "Visitors can book open slots" on public.bookings;
create policy "Visitors can book open slots" on public.bookings
  for insert to anon
  with check (
    slot_date >= (now() at time zone 'America/New_York')::date
    and slot_date <= (now() at time zone 'America/New_York')::date + 60
  );

revoke all on public.bookings from anon;
grant insert on public.bookings to anon;

-- Public list of taken times only (no names or phone numbers).
create or replace view public.taken_slots as
  select slot_date, slot_hour from public.bookings;

revoke all on public.taken_slots from anon;
grant select on public.taken_slots to anon;
