// Put Jadiel's phone number here (digits only, e.g. "5715551234") so the
// booking form opens a pre-written text message. Leave blank to show the
// message on the page for the customer to copy instead.
const PHONE = "";

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

  if (PHONE) {
    window.location.href = `sms:${PHONE}?&body=${encodeURIComponent(text)}`;
    msg.textContent = "Opening your messages app…";
    return;
  }

  msg.innerHTML = "";
  const intro = document.createElement("span");
  intro.textContent = "Copy this and send it to Jadiel:";
  const pre = document.createElement("pre");
  pre.textContent = text;
  const copy = document.createElement("button");
  copy.type = "button";
  copy.className = "btn btn-primary";
  copy.textContent = "Copy message";
  copy.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(text);
      copy.textContent = "Copied!";
    } catch {
      copy.textContent = "Select & copy the text above";
    }
  });
  msg.append(intro, pre, copy);
});

document.getElementById("year").textContent = new Date().getFullYear();
