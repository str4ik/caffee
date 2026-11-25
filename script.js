/* =========================================================
   Наше кафе — небольшие скрипты
   Ничего лишнего: меню, вкладки, появление блоков.
   ========================================================= */

(function () {
  "use strict";

  /* ---------- 1. Мобильное меню ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");

  if (burger && nav) {
    burger.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      burger.classList.toggle("is-open", isOpen);
      burger.setAttribute("aria-expanded", String(isOpen));
    });

    // Закрываем меню после клика по ссылке
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        burger.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 2. Шапка при прокрутке ---------- */
  var header = document.getElementById("header");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 3. Вкладки меню ---------- */
  var tabs = document.querySelectorAll(".tab");
  var cats = document.querySelectorAll(".menu-cat");

  tabs.forEach(function (tab) {
    tab.addEventListener("click", function () {
      var target = tab.dataset.cat;

      tabs.forEach(function (t) {
        var active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
      });

      cats.forEach(function (cat) {
        cat.classList.toggle("is-active", cat.dataset.cat === target);
      });
    });
  });

  /* ---------- 4. Плавное появление блоков ---------- */
  var revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    // Старые браузеры: просто показываем всё
    revealItems.forEach(function (item) {
      item.classList.add("is-in");
    });
  }

  /* ---------- 5. Год в подвале ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
})();
