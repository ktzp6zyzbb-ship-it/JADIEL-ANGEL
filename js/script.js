// Jadiel's number — the booking form opens a pre-written text to it.
const PHONE = "+15713159154";

// Booking hours. Slots start every hour from OPEN_HOUR up to (not including)
// CLOSE_HOUR, 24-hour clock. DAYS_OFF uses 0 = Sunday ... 6 = Saturday.
const OPEN_HOUR = 10;
const CLOSE_HOUR = 20;
const DAYS_OFF = [];
const BOOK_AHEAD_DAYS = 45;

// Automatic booking (Supabase). Paste the Project URL and the publishable
// (or anon public) key from Supabase -> Project Settings -> API. Both are
// meant to be public. While blank, the site uses booked.txt + text requests.
const BOOKING_DB = {
  url: "",
  key: "",
};
const dbOn = Boolean(BOOKING_DB.url && BOOKING_DB.key);

async function rpc(fn, args = {}) {
  const headers = { apikey: BOOKING_DB.key, "Content-Type": "application/json" };
  // Legacy anon keys are JWTs and also go in the Authorization header.
  if (BOOKING_DB.key.startsWith("eyJ")) headers.Authorization = `Bearer ${BOOKING_DB.key}`;
  const res = await fetch(`${BOOKING_DB.url}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers,
    body: JSON.stringify(args),
    cache: "no-store",
  });
  const body = await res.json().catch(() => null);
  if (!res.ok) {
    const err = new Error((body && body.message) || `Request failed (${res.status})`);
    err.status = res.status;
    err.code = body && body.code;
    throw err;
  }
  return body;
}

// Mobile nav
const toggle = document.getElementById("nav-toggle");
const nav = document.getElementById("site-nav");
toggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Calendar + time slots
const calGrid = document.getElementById("cal-grid");
const calMonth = document.getElementById("cal-month");
const calPrev = document.getElementById("cal-prev");
const calNext = document.getElementById("cal-next");
const slotsEl = document.getElementById("slots");
const slotsTitle = document.getElementById("slots-title");
const pickedEl = document.getElementById("picker-picked");

const today = new Date();
today.setHours(0, 0, 0, 0);
const lastDay = new Date(today);
lastDay.setDate(lastDay.getDate() + BOOK_AHEAD_DAYS);

let viewMonth = new Date(today.getFullYear(), today.getMonth(), 1);
let pickedDate = null;
let pickedTime = null;

const sameDay = (a, b) => a && b && a.toDateString() === b.toDateString();
const fmtTime = (h) => `${h % 12 || 12}:00 ${h < 12 ? "AM" : "PM"}`;
const fmtDate = (d) => d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
const isoDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Taken slots, keyed "YYYY-MM-DD|hour". With the database on, they come from
// bookings; otherwise Jadiel lists them in booked.txt ("2026-10-03 2:00 PM").
const taken = new Set();
const slotKey = (d, h) => `${isoDate(d)}|${h}`;
const isTaken = (d, h) => taken.has(slotKey(d, h));

function parseBooked(line) {
  const t = line.split("#")[0].trim();
  if (!t) return null;
  let y, mo, day;
  let m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})\s+(.+)$/);
  if (m) [, y, mo, day] = m;
  else if ((m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})\s+(.+)$/))) {
    [, mo, day, y] = m;
    if (y.length === 2) y = `20${y}`;
  } else return null;
  const tm = m[4].match(/^(\d{1,2})(?::00)?\s*([ap])\.?\s*m?\.?$/i);
  if (!tm) return null;
  let h = Number(tm[1]) % 12;
  if (tm[2].toLowerCase() === "p") h += 12;
  return `${y}-${String(mo).padStart(2, "0")}-${String(day).padStart(2, "0")}|${h}`;
}

async function fetchTakenKeys() {
  if (dbOn) {
    const rows = await rpc("get_taken_slots", { p_from: isoDate(today) });
    return rows.map((r) => `${r.slot_date}|${r.slot_hour}`);
  }
  const res = await fetch("booked.txt", { cache: "no-store" });
  if (!res.ok) throw new Error(res.status);
  return (await res.text()).split(/\r?\n/).map(parseBooked).filter(Boolean);
}

async function loadTaken() {
  try {
    const keys = await fetchTakenKeys();
    taken.clear();
    keys.forEach((k) => taken.add(k));
    if (pickedDate && pickedTime !== null && isTaken(pickedDate, pickedTime)) pickedTime = null;
    renderCalendar();
    renderSlots();
  } catch (err) {
    console.warn("Could not load booked times", err);
  }
}

function dayHours(d) {
  const hours = [];
  const now = new Date();
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    if (sameDay(d, now) && h <= now.getHours()) continue;
    hours.push(h);
  }
  return hours;
}

function dayOpen(d) {
  return d >= today && d <= lastDay && !DAYS_OFF.includes(d.getDay()) &&
    dayHours(d).some((h) => !isTaken(d, h));
}

function renderCalendar() {
  calMonth.value = `${viewMonth.getFullYear()}-${viewMonth.getMonth()}`;
  calPrev.disabled = viewMonth <= new Date(today.getFullYear(), today.getMonth(), 1);
  calNext.disabled = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1) > lastDay;

  calGrid.innerHTML = "";
  const startPad = viewMonth.getDay();
  for (let i = 0; i < startPad; i++) calGrid.append(document.createElement("span"));
  const daysInMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 0).getDate();
  for (let n = 1; n <= daysInMonth; n++) {
    const d = new Date(viewMonth.getFullYear(), viewMonth.getMonth(), n);
    const b = document.createElement("button");
    b.type = "button";
    b.className = "cal-day";
    b.textContent = n;
    b.setAttribute("aria-label", fmtDate(d));
    if (sameDay(d, today)) b.classList.add("today");
    if (!dayOpen(d)) b.disabled = true;
    if (sameDay(d, pickedDate)) { b.classList.add("selected"); b.setAttribute("aria-pressed", "true"); }
    b.addEventListener("click", () => {
      pickedDate = d;
      pickedTime = null;
      renderCalendar();
      renderSlots();
      loadTaken();
    });
    calGrid.append(b);
  }
}

function renderSlots() {
  slotsEl.innerHTML = "";
  if (!pickedDate) {
    slotsTitle.textContent = "Tap a date to see open times";
    updatePicked();
    return;
  }
  slotsTitle.textContent = fmtDate(pickedDate);
  dayHours(pickedDate).forEach((h) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "slot";
    if (isTaken(pickedDate, h)) {
      b.disabled = true;
      b.classList.add("taken");
      b.innerHTML = `${fmtTime(h)}<small>Booked</small>`;
    } else {
      b.textContent = fmtTime(h);
    }
    if (h === pickedTime) { b.classList.add("selected"); b.setAttribute("aria-pressed", "true"); }
    b.addEventListener("click", () => {
      pickedTime = h;
      renderSlots();
    });
    slotsEl.append(b);
  });
  updatePicked();
}

function updatePicked() {
  pickedEl.classList.remove("error");
  pickedEl.textContent = pickedDate && pickedTime !== null
    ? `Selected: ${fmtDate(pickedDate)} at ${fmtTime(pickedTime)}`
    : "";
}

function pickerError(text) {
  pickedEl.textContent = text;
  pickedEl.classList.add("error");
  pickedEl.scrollIntoView({ behavior: "smooth", block: "center" });
}

// Month dropdown: every month from this one through the last bookable day
for (let m = new Date(today.getFullYear(), today.getMonth(), 1); m <= lastDay; m = new Date(m.getFullYear(), m.getMonth() + 1, 1)) {
  const o = document.createElement("option");
  o.value = `${m.getFullYear()}-${m.getMonth()}`;
  o.textContent = m.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  calMonth.append(o);
}
calMonth.addEventListener("change", () => {
  const [y, mo] = calMonth.value.split("-").map(Number);
  viewMonth = new Date(y, mo, 1);
  renderCalendar();
});

calPrev.addEventListener("click", () => {
  viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() - 1, 1);
  renderCalendar();
});
calNext.addEventListener("click", () => {
  viewMonth = new Date(viewMonth.getFullYear(), viewMonth.getMonth() + 1, 1);
  renderCalendar();
});
renderCalendar();
renderSlots();
loadTaken();
// Keep taken times fresh while the page is open.
setInterval(() => { if (document.visibilityState === "visible") loadTaken(); }, 60000);

// Booking
const form = document.getElementById("book-form");
const msg = document.getElementById("form-msg");
const submitBtn = form.querySelector('button[type="submit"]');
const pageUrl = `${location.origin}${location.pathname}`;

function copyButton(label, value) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = "btn btn-ghost";
  b.textContent = label;
  b.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(value);
      b.textContent = "Copied!";
    } catch {
      b.textContent = "Select & copy the text above";
    }
  });
  return b;
}

function showMessage(introText, text, { autoOpen = true, extra = null } = {}) {
  const smsHref = `sms:${PHONE}?&body=${encodeURIComponent(text)}`;
  // Phones open the Messages app right away; on a computer, show the text to copy.
  if (autoOpen && window.matchMedia("(pointer: coarse)").matches) window.location.href = smsHref;

  msg.innerHTML = "";
  const intro = document.createElement("span");
  intro.className = "msg-intro";
  intro.textContent = introText;
  msg.append(intro);
  if (extra) msg.append(extra);
  const pre = document.createElement("pre");
  pre.textContent = text;
  const open = document.createElement("a");
  open.className = "btn btn-primary";
  open.href = smsHref;
  open.textContent = autoOpen ? "Open in Messages" : "Text Jadiel your details";
  const actions = document.createElement("div");
  actions.className = "msg-actions";
  actions.append(open, copyButton("Copy message", text));
  msg.append(pre, actions);
  msg.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function cancelLinkBox(link) {
  const box = document.createElement("div");
  box.className = "cancel-link";
  const p = document.createElement("p");
  p.textContent = "Need to cancel? Use this link any time and your slot opens back up. Save it:";
  const a = document.createElement("a");
  a.href = link;
  a.textContent = link;
  box.append(p, a, copyButton("Copy cancel link", link));
  return box;
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (!pickedDate || pickedTime === null) {
    pickerError(pickedDate ? "Pick a time slot to continue." : "Pick a day and a time slot to continue.");
    return;
  }
  const d = new FormData(form);
  const when = `${fmtDate(pickedDate)} at ${fmtTime(pickedTime)}`;
  const details =
    `Name: ${d.get("name")}\n` +
    `Phone: ${d.get("phone")}\n` +
    `Service: ${d.get("service")}\n` +
    `Where: ${d.get("where")}\n` +
    `When: ${when}`;

  if (!dbOn) {
    showMessage("Send this text to (571) 315-9154. Jadiel will confirm your time:",
      `Hey Jadiel! I'd like to book a cut.\n${details}`);
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Booking…";
  try {
    const token = await rpc("book_slot", {
      p_date: isoDate(pickedDate),
      p_hour: pickedTime,
      p_name: String(d.get("name")).trim(),
      p_phone: String(d.get("phone")).trim(),
      p_service: d.get("service"),
      p_location: d.get("where"),
    });
    const cancelLink = `${pageUrl}?cancel=${token}#book`;
    taken.add(slotKey(pickedDate, pickedTime));
    pickedDate = null;
    pickedTime = null;
    form.reset();
    renderCalendar();
    renderSlots();
    showMessage(`You're booked for ${when}! That time is now locked for you.`,
      `Hey Jadiel! I just booked a cut.\n${details}\nCancel link: ${cancelLink}`,
      { autoOpen: false, extra: cancelLinkBox(cancelLink) });
  } catch (err) {
    if (err.status === 409) {
      taken.add(slotKey(pickedDate, pickedTime));
      pickedTime = null;
      await loadTaken();
      renderCalendar();
      renderSlots();
      pickerError("Sorry, someone just booked that time. Please pick another.");
    } else if (/too many/i.test(err.message)) {
      pickerError("You already have 2 upcoming bookings. Text (571) 315-9154 if you need more.");
    } else if (/no longer available/i.test(err.message)) {
      await loadTaken();
      pickerError("That time isn't available anymore. Please pick another.");
    } else {
      console.warn(err);
      showMessage("We couldn't save your booking online. Text this to (571) 315-9154 to book instead:",
        `Hey Jadiel! I'd like to book a cut.\n${details}`);
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Book This Time";
  }
});

// Cancel links: ?cancel=<token>
const cancelBox = document.getElementById("cancel-box");
const cancelToken = new URLSearchParams(location.search).get("cancel");
if (dbOn) submitBtn.textContent = "Book This Time";
if (cancelToken && cancelBox) {
  const cancelText = document.getElementById("cancel-text");
  const cancelBtn = document.getElementById("cancel-btn");
  const keepBtn = document.getElementById("cancel-keep");
  cancelBox.hidden = false;
  document.getElementById("book").scrollIntoView();
  const done = (text) => {
    cancelText.textContent = text;
    cancelBtn.hidden = true;
    keepBtn.textContent = "Book a new time";
    history.replaceState(null, "", `${location.pathname}#book`);
  };
  if (!dbOn) {
    done("Online cancel isn't set up yet. Text (571) 315-9154 to cancel.");
  }
  cancelBtn.addEventListener("click", async () => {
    cancelBtn.disabled = true;
    cancelBtn.textContent = "Canceling…";
    try {
      const row = await rpc("cancel_booking", { p_token: cancelToken });
      if (row && row.slot_date) {
        const [y, mo, day] = row.slot_date.split("-").map(Number);
        const when = `${fmtDate(new Date(y, mo - 1, day))} at ${fmtTime(row.slot_hour)}`;
        done(`Your appointment on ${when} is canceled. That time is open again.`);
        loadTaken();
        const text = `Hey Jadiel, I canceled my appointment on ${when}.`;
        const a = document.createElement("a");
        a.className = "btn btn-ghost";
        a.href = `sms:${PHONE}?&body=${encodeURIComponent(text)}`;
        a.textContent = "Let Jadiel know";
        cancelBox.querySelector(".cancel-actions").prepend(a);
      } else {
        done("This appointment was already canceled or has passed.");
      }
    } catch (err) {
      console.warn(err);
      cancelBtn.disabled = false;
      cancelBtn.textContent = "Cancel my appointment";
      cancelText.textContent = "Something went wrong. Try again, or text (571) 315-9154 to cancel.";
    }
  });
  keepBtn.addEventListener("click", () => {
    cancelBox.hidden = true;
    history.replaceState(null, "", `${location.pathname}#book`);
  });
}

document.getElementById("year").textContent = new Date().getFullYear();
