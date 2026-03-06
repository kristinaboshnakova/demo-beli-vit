/* =========================
   NAV (mobile toggle)
   ========================= */
   const btn = document.querySelector(".nav__toggle");
   const links = document.querySelector(".nav__links");
   
   function setButtonState(isOpen) {
     if (!btn || !links) return;
     btn.classList.toggle("is-open", isOpen);
     links.classList.toggle("is-open", isOpen);
     btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
     btn.setAttribute("aria-label", isOpen ? "Затвори меню" : "Отвори меню");
   }
   
   btn?.addEventListener("click", () => {
     const isOpen = !links.classList.contains("is-open");
     setButtonState(isOpen);
   });
   
   links?.addEventListener("click", (e) => {
     if (e.target.closest("a")) setButtonState(false);
   });
   
   document.addEventListener("keydown", (e) => {
     if (e.key === "Escape") setButtonState(false);
   });
   
   /* =========================
      DATE RANGE VALIDATION
      ========================= */
   const from = document.getElementById("dateFrom");
   const to = document.getElementById("dateTo");
   
   function syncDates() {
     if (!from || !to) return;
     if (from.value) to.min = from.value;
     if (from.value && to.value && to.value < from.value) to.value = from.value;
   }
   
   from?.addEventListener("change", syncDates);
   to?.addEventListener("change", syncDates);
   syncDates();
   
   /* ================================
      COPY ADDRESS + NEARBY + CONTACT COPY
      ================================ */
   (() => {
     // ---- COPY ADDRESS (ЛОКАЦИЯ секция) ----
     const copyBtn = document.getElementById("vvCopyAddress");
     const addressText =
       "Къщи за гости: Бели Вит • Гергана • Брязово, с. Рибарица, общ. Тетевен, България";
   
     copyBtn?.addEventListener("click", async () => {
       try {
         await navigator.clipboard.writeText(addressText);
         const old = copyBtn.textContent;
         copyBtn.textContent = "Копирано ✅";
         setTimeout(() => (copyBtn.textContent = old), 1200);
       } catch {
         const ta = document.createElement("textarea");
         ta.value = addressText;
         document.body.appendChild(ta);
         ta.select();
         document.execCommand("copy");
         ta.remove();
         const old = copyBtn.textContent;
         copyBtn.textContent = "Копирано ✅";
         setTimeout(() => (copyBtn.textContent = old), 1200);
       }
     });
   
     // ---- NEARBY (Рибарица/Тетевен) ----
     const places = [
       // ===== ЗАБЕЛЕЖИТЕЛНОСТИ / ПРИРОДА =====
       {
         type: "nature",
         tag: "Екопътека",
         name: "Екопътека „Черният рът“ (старт: Рибарица)",
         km: null,
         desc: "Маршрут ~4–5 часа, с вишки, беседки и места за отдих.",
         img: "img/bryazovo/razhodki.jpg",
       },
       {
         type: "nature",
         tag: "Водопад",
         name: "Водопад „Скока“ (Тетевен)",
         km: null,
         desc: "По екопътека „Под пръските на водопада“ – мостчета, панорами и финал при водопада.",
         img: "img/bryazovo/razhodki.jpg",
       },
       {
         type: "sights",
         tag: "История",
         name: "Местност „Костина“ – лобното място на Георги Бенковски",
         km: null,
         desc: "Паметно място край Рибарица, подходящо за спокойна разходка и снимки.",
         img: "img/bryazovo/razhodki.jpg",
       },
       {
         type: "sights",
         tag: "Манастир",
         name: "Гложенски манастир „Св. Георги Победоносец“",
         km: null,
         desc: "Емблематично място с много красиви гледки – супер за еднодневна разходка.",
         img: "img/bryazovo/razhodki.jpg",
       },
       {
         type: "sights",
         tag: "Още идеи",
         name: "Около Тетевен: „Съева дупка“, Тетевенски манастир и др.",
         km: null,
         desc: "Класики за региона – лесно се комбинират с престой в Рибарица.",
         img: "img/bryazovo/razhodki.jpg",
       },
   
       // ===== РЕСТОРАНТИ / ХРАНА =====
       {
         type: "food",
         tag: "Храна",
         name: "Механи и ресторанти в центъра на Рибарица",
         km: null,
         desc: "Традиционна кухня, скара и домашни специалитети – попитай ни и ще препоръчаме според вкуса ти.",
         img: "img/belivit/beli-vit-vunshno-bbq.webp",
       },
       {
         type: "food",
         tag: "Скара",
         name: "Скара/грил места по главната улица",
         km: null,
         desc: "Бърз вариант за хапване – кюфтета/кебапчета, салати, супи (идеално след разходка).",
         img: "img/belivit/beli-vit-vunshno-bbq.webp",
       },
       {
         type: "food",
         tag: "Кафе",
         name: "Кафе + десерти (Тетевен)",
         km: null,
         desc: "Сладки изкушения и кафе – приятно за следобедна пауза, ако сте на разходка към Тетевен.",
         img: "img/gergana/gergana-zakuska-s-gledka.webp",
       },
   
       // ===== МАГАЗИНИ =====
       {
         type: "shops",
         tag: "Магазин",
         name: "Хранителни магазини в Рибарица (основни покупки)",
         km: null,
         desc: "Вода, закуски, месо за BBQ, въглища/подпалки – всичко за уикенд в Балкана.",
         img: "img/belivit/beli-vit-kuhnq.webp",
       },
       {
         type: "shops",
         tag: "Аптека",
         name: "Аптека/дрогерия (Тетевен)",
         km: null,
         desc: "Удобно при непредвидени ситуации – лекарства, козметика и базови неща.",
         img: "img/bryazovo/brqzovo-wc.webp",
       },
       {
         type: "shops",
         tag: "Пазар",
         name: "Малки местни сергии/пазар (сезонно)",
         km: null,
         desc: "Сезонни плодове/зеленчуци и местни продукти – ако улучите ден, струва си.",
         img: "img/belivit/beli-vit-delikates.webp",
       },
     ];
   
     const grid = document.getElementById("vvNearGrid");
     const filterBtns = [...document.querySelectorAll("[data-near]")];
     if (!grid) return;
   
     function card(p) {
       const el = document.createElement("article");
       el.className = "villa-place";
       el.dataset.type = p.type;
   
       const kmText = typeof p.km === "number" ? `${p.km.toFixed(1)} km` : "";
   
       el.innerHTML = `
         <div class="villa-place__media">
           <img src="${p.img}" alt="${p.name}" loading="lazy">
           <span class="villa-place__tag">${p.tag}</span>
         </div>
         <div class="villa-place__body">
           <h4 class="villa-place__name">${p.name}</h4>
           <p class="villa-place__desc">${p.desc}</p>
           <div class="villa-place__meta ${kmText ? "" : "is-hidden"}">
             <span>Разстояние</span>
             <span class="villa-place__km">${kmText}</span>
           </div>
         </div>
       `;
       return el;
     }
   
     const nodes = places.map(card);
     nodes.forEach((n) => grid.appendChild(n));
   
     function setFilter(key) {
       filterBtns.forEach((b) => {
         const on = (b.dataset.near || "all") === key;
         b.classList.toggle("is-active", on);
         b.setAttribute("aria-selected", String(on));
       });
   
       nodes.forEach((n) => {
         const t = n.dataset.type;
         const hide = key !== "all" && t !== key;
         n.classList.toggle("is-hidden", hide);
       });
     }
   
     filterBtns.forEach((b) =>
       b.addEventListener("click", () => setFilter(b.dataset.near || "all"))
     );
     setFilter("all");
   })();
   
   (() => {
     // ---- COPY ADDRESS (Контакти секция) ----
     const btn = document.getElementById("vvCopyContactAddr");
     if (!btn) return;
   
     const address =
       "Къщи за гости: Бели Вит • Гергана • Брязово, с. Рибарица, общ. Тетевен, България";
   
     btn.addEventListener("click", async () => {
       const old = btn.textContent;
       try {
         await navigator.clipboard.writeText(address);
         btn.textContent = "Копирано ✅";
       } catch {
         const ta = document.createElement("textarea");
         ta.value = address;
         document.body.appendChild(ta);
         ta.select();
         document.execCommand("copy");
         ta.remove();
         btn.textContent = "Копирано ✅";
       }
       setTimeout(() => (btn.textContent = old), 1200);
     });
   })();
   
   /* =========================
      BOOKING FORM (ЕДИНСТВЕН listener) ✅
      Fix: махнати са дублиращите submit-и
      ========================= */
   (() => {
     const form = document.getElementById("bookingForm2");
     const success = document.getElementById("bookingSuccess2");
     const captcha = document.getElementById("captcha2");
     const villaSelect = document.getElementById("villaSelect");
   
     // ако на някоя страница липсва формата/елементи — просто не пипаме
     if (!form || !success || !captcha || !villaSelect) return;
   
     form.addEventListener("submit", (e) => {
       e.preventDefault();
   
       if (!villaSelect.value) {
         alert("Моля, избери вила за запитването.");
         villaSelect.focus();
         return;
       }
   
       if (captcha.value.trim() !== "3") {
         alert("Грешен отговор. Опитай пак.");
         captcha.focus();
         return;
       }
   
       success.classList.add("is-show");
       form.reset();
     });
   })();
   
   /* =========================
      FOOTER YEAR
      ========================= */
   (() => {
     const yearEl = document.getElementById("year");
     if (yearEl) yearEl.textContent = new Date().getFullYear();
   })();
   
   /* ===================================
      AUTO GLOBAL SITE ANIMATION
      =================================== */
   document.addEventListener("DOMContentLoaded", () => {
     const elements = document.querySelectorAll(
       "section h2, section h3, section p, section .btn, section .stay-card, section .spa-card, section .exp-card, section .villa-contact__card, section .villa-gal__card"
     );
   
     const directions = ["left", "right", "up", "rotate"];
   
     elements.forEach((el, index) => {
       el.classList.add("villa-animate");
       const dir = directions[index % directions.length];
       el.setAttribute("data-dir", dir);
     });
   
     const observer = new IntersectionObserver(
       (entries) => {
         entries.forEach((entry) => {
           if (entry.isIntersecting) entry.target.classList.add("is-visible");
         });
       },
       { threshold: 0.15 }
     );
   
     document
       .querySelectorAll(".villa-animate")
       .forEach((el) => observer.observe(el));
   });
   
   /* ==============================
      EXP / AMENITIES — JS (BRYAZOVO)
      ============================== */
   (() => {
     const root = document.getElementById("amenities");
     if (!root) return;
   
     const cards = Array.from(root.querySelectorAll(".exp-card[data-exp-card]"));
     const tabs = Array.from(root.querySelectorAll(".exp-tab[data-exp-tab]"));
     const panels = Array.from(root.querySelectorAll(".exp-panel[data-exp-panel]"));
   
     if (!cards.length || !tabs.length || !panels.length) return;
   
     function setActive(key, shouldScroll = false) {
       cards.forEach((c) =>
         c.classList.toggle("is-active", c.dataset.expCard === key)
       );
   
       tabs.forEach((t) => {
         const on = t.dataset.expTab === key;
         t.classList.toggle("is-active", on);
         t.setAttribute("aria-selected", on ? "true" : "false");
       });
   
       panels.forEach((p) =>
         p.classList.toggle("is-active", p.dataset.expPanel === key)
       );
   
       if (shouldScroll) {
         const panel = panels.find((p) => p.dataset.expPanel === key);
         panel?.scrollIntoView({ behavior: "smooth", block: "start" });
       }
     }
   
     tabs.forEach((t) => t.addEventListener("click", () => setActive(t.dataset.expTab, false)));
   
     cards.forEach((c) => {
       c.addEventListener("click", (e) => {
         const key = c.dataset.expCard;
         setActive(key, true);
         e.preventDefault();
   
         const href = c.getAttribute("href");
         if (href && href.startsWith("#")) history.replaceState(null, "", href);
       });
     });
   
     const hash = window.location.hash || "";
     const hashMap = {
       "#amen-bbq": "bbq",
       "#amen-pool": "pool",
       "#amen-spa": "spa",
       "#amen-mehana": "mehana",
       "#amen-kids": "kids",
     };
   
     if (hashMap[hash]) setActive(hashMap[hash], true);
   })();
   
   /* =========================
      BRYAZOVO GALLERY LIGHTBOX — FIXED
      ========================= */
   (() => {
     const grid = document.getElementById("bryGalleryGrid");
     const modal = document.getElementById("bryLightbox");
     const imgEl = document.getElementById("bryLightboxImg");
     const capEl = document.getElementById("bryLightboxCap");
   
     if (!grid || !modal || !imgEl || !capEl) return;
   
     const items = Array.from(grid.querySelectorAll(".bry-gallery__item"));
     const btnNext = modal.querySelector("[data-next]");
     const btnPrev = modal.querySelector("[data-prev]");
     const closeBtns = Array.from(modal.querySelectorAll("[data-close]"));
   
     let index = 0;
   
     function openAt(i) {
       index = (i + items.length) % items.length;
       const btn = items[index];
       const img = btn.querySelector("img");
       const full = btn.getAttribute("data-full") || img?.src || "";
   
       imgEl.src = full;
       imgEl.alt = img?.alt || "Снимка";
       capEl.textContent = img?.alt || "";
   
       modal.classList.add("is-open");
       modal.setAttribute("aria-hidden", "false");
       document.body.style.overflow = "hidden";
     }
   
     function close() {
       modal.classList.remove("is-open");
       modal.setAttribute("aria-hidden", "true");
       document.body.style.overflow = "";
       imgEl.src = "";
     }
   
     function next() {
       openAt(index + 1);
     }
     function prev() {
       openAt(index - 1);
     }
   
     items.forEach((btn, i) => btn.addEventListener("click", () => openAt(i)));
   
     closeBtns.forEach((b) =>
       b.addEventListener("click", (e) => {
         e.stopPropagation();
         close();
       })
     );
   
     btnNext?.addEventListener("click", (e) => {
       e.stopPropagation();
       next();
     });
     btnPrev?.addEventListener("click", (e) => {
       e.stopPropagation();
       prev();
     });
   
     modal.addEventListener("click", (e) => {
       if (!modal.classList.contains("is-open")) return;
       const clickedInsideFigure = e.target.closest(".bry-lightbox__figure");
       const clickedNav = e.target.closest("[data-next], [data-prev]");
       if (!clickedInsideFigure && !clickedNav) close();
     });
   
     document.addEventListener("keydown", (e) => {
       if (!modal.classList.contains("is-open")) return;
       if (e.key === "Escape") close();
       if (e.key === "ArrowRight") next();
       if (e.key === "ArrowLeft") prev();
     });
   })();
   
   /* =========================
      BACK TO TOP — show when hero is NOT visible
      (работи и при scroll container)
      ========================= */
   document.addEventListener("DOMContentLoaded", () => {
     const btnTop = document.getElementById("toTopBtn");
     const sentinel =
       document.getElementById("topSentinel") || document.getElementById("nachalo");
     if (!btnTop || !sentinel) return;
   
     const page = document.querySelector("main.page") || document.querySelector(".page");
     const isContainerScroll =
       page && ["auto", "scroll"].includes(getComputedStyle(page).overflowY);
   
     const observer = new IntersectionObserver(
       ([entry]) => {
         btnTop.classList.toggle("is-show", !entry.isIntersecting);
       },
       {
         root: isContainerScroll ? page : null,
         threshold: 0.01,
       }
     );
   
     observer.observe(sentinel);
   
     btnTop.addEventListener("click", () => {
       document
         .getElementById("nachalo")
         ?.scrollIntoView({ behavior: "smooth", block: "start" });
     });
   });