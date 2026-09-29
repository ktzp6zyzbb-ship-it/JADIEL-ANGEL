// Jadiel's number — the booking form opens a pre-written text to it.
const PHONE = "+15713159154";

// Booking hours. Slots start every hour from OPEN_HOUR up to (not including)
// CLOSE_HOUR, 24-hour clock. DAYS_OFF uses 0 = Sunday ... 6 = Saturday.
const OPEN_HOUR = 10;
const CLOSE_HOUR = 20;
const DAYS_OFF = [];
const BOOK_AHEAD_DAYS = 45;

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

function dayOpen(d) {
  return d >= today && d <= lastDay && !DAYS_OFF.includes(d.getDay()) && openHours(d).length > 0;
}

function openHours(d) {
  const hours = [];
  const now = new Date();
  for (let h = OPEN_HOUR; h < CLOSE_HOUR; h++) {
    if (sameDay(d, now) && h <= now.getHours()) continue;
    hours.push(h);
  }
  return hours;
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
  openHours(pickedDate).forEach((h) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "slot";
    b.textContent = fmtTime(h);
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

// Booking form -> text message
const form = document.getElementById("book-form");
const msg = document.getElementById("form-msg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!pickedDate || pickedTime === null) {
    pickedEl.textContent = pickedDate ? "Pick a time slot to continue." : "Pick a day and a time slot to continue.";
    pickedEl.classList.add("error");
    pickedEl.scrollIntoView({ behavior: "smooth", block: "center" });
    return;
  }
  const d = new FormData(form);
  const text =
    `Hey Jadiel! I'd like to book a cut.\n` +
    `Name: ${d.get("name")}\n` +
    `Service: ${d.get("service")}\n` +
    `Where: ${d.get("where")}\n` +
    `When: ${fmtDate(pickedDate)} at ${fmtTime(pickedTime)}`;

  const smsHref = `sms:${PHONE}?&body=${encodeURIComponent(text)}`;
  // Phones open the Messages app right away; on a computer, show the text to copy.
  if (window.matchMedia("(pointer: coarse)").matches) window.location.href = smsHref;

  msg.innerHTML = "";
  const intro = document.createElement("span");
  intro.textContent = "Send this text to (571) 315-9154:";
  const pre = document.createElement("pre");
  pre.textContent = text;
  const open = document.createElement("a");
  open.className = "btn btn-primary";
  open.href = smsHref;
  open.textContent = "Open in Messages";
  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "btn btn-ghost";
  copy.textContent = "Copy message";
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
      copy.textContent = "Copied!";
    } catch {
      copy.textContent = "Select & copy the text above";
    }
  });
  const actions = document.createElement("div");
  actions.className = "msg-actions";
  actions.append(open, copy);
  msg.append(intro, pre, actions);
});

document.getElementById("year").textContent = new Date().getFullYear();
