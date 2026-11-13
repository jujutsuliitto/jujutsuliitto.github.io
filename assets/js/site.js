// Mobile menu, random header image and a small gallery lightbox.
(function () {
  // Mobile menu toggle
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("mainnav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open);
    });
  }

  // Random header image (like the old WordPress theme)
  var header = document.querySelector("#custom-header img");
  if (header && !header.hasAttribute("data-fixed")) {
    try {
      var list = JSON.parse(header.getAttribute("data-random"));
      if (list.length) header.src = list[Math.floor(Math.random() * list.length)];
    } catch (e) {}
  }

  // Lightbox for gallery pages
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  if (!items.length) return;

  var box = document.createElement("div");
  box.className = "lightbox";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML =
    '<img alt="">' +
    '<button class="lb-prev" aria-label="Edellinen">&#8249;</button>' +
    '<button class="lb-next" aria-label="Seuraava">&#8250;</button>' +
    '<button class="lb-close" aria-label="Sulje">&times;</button>' +
    '<div class="lb-count"></div>';
  document.body.appendChild(box);

  var img = box.querySelector("img");
  var count = box.querySelector(".lb-count");
  var index = 0, lastFocus = null, touchX = null;

  function show(i) {
    index = (i + items.length) % items.length;
    img.src = items[index].href;
    img.alt = items[index].querySelector("img").alt;
    count.textContent = (index + 1) + " / " + items.length;
  }
  function open(i) {
    lastFocus = document.activeElement;
    show(i);
    box.hidden = false;
    document.body.style.overflow = "hidden";
    box.querySelector(".lb-close").focus();
  }
  function close() {
    box.hidden = true;
    img.src = "";
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }

  items.forEach(function (a, i) {
    a.addEventListener("click", function (e) { e.preventDefault(); open(i); });
  });
  box.querySelector(".lb-prev").addEventListener("click", function () { show(index - 1); });
  box.querySelector(".lb-next").addEventListener("click", function () { show(index + 1); });
  box.querySelector(".lb-close").addEventListener("click", close);
  box.addEventListener("click", function (e) { if (e.target === box) close(); });
  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(index - 1);
    else if (e.key === "ArrowRight") show(index + 1);
  });
  box.addEventListener("touchstart", function (e) { touchX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (touchX === null) return;
    var dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
    touchX = null;
  });
})();
