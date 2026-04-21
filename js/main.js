(function () {
  "use strict";

  var menuToggle = document.querySelector("[data-menu-toggle]");
  var navMobile = document.querySelector("[data-nav-mobile]");
  var yearEl = document.querySelector("[data-year]");

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (menuToggle && navMobile) {
    menuToggle.addEventListener("click", function () {
      var open = navMobile.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMobile.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll("[data-faq]").forEach(function (root) {
    var btn = root.querySelector("button");
    var panel = root.querySelector(".faq-panel");
    if (!btn || !panel) return;

    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      panel.classList.toggle("is-open", !expanded);
    });
  });

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var animated = document.querySelectorAll("[data-animate]");
    if (animated.length && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("is-visible");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      animated.forEach(function (el) {
        io.observe(el);
      });
    } else {
      animated.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }
  } else {
    document.querySelectorAll("[data-animate]").forEach(function (el) {
      el.classList.add("is-visible");
    });
  }
})();
