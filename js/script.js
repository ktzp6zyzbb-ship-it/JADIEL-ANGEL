// Jadiel's number — the booking form opens a pre-written text to it.
const PHONE = "+15713159154";

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

// Booking form -> text message
const form = document.getElementById("book-form");
const msg = document.getElementById("form-msg");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(form);
  const text =
    `Hey Jadiel! I'd like to book a cut.\n` +
    `Name: ${d.get("name")}\n` +
    `Service: ${d.get("service")}\n` +
    `Where: ${d.get("where")}\n` +
    `When: ${d.get("when")}`;

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
