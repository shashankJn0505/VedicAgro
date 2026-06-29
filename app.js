document.addEventListener("DOMContentLoaded", () => {
  // --- PRELOADER DESTRUCTION ---
  const preloader = document.getElementById("preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      gsap.to(preloader, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
        onComplete: () => preloader.remove()
      });
    });
    // Fallback security check
    setTimeout(() => { if(preloader) preloader.remove(); }, 2500);
  }

  // --- PREMIUM CUSTOM DESKTOP CURSOR ENGINE ---
  if (window.innerWidth > 1024) {
    const dot = document.createElement("div");
    const ball = document.createElement("div");
    dot.className = "custom-cursor-dot";
    ball.className = "custom-cursor-ball";
    document.body.appendChild(dot);
    document.body.appendChild(ball);

    document.addEventListener("mousemove", (e) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05 });
      gsap.to(ball, { x: e.clientX, y: e.clientY, duration: 0.15 });
    });

    document.querySelectorAll("a, button, input, select, textarea, .zoom-target").forEach(elem => {
      elem.addEventListener("mouseenter", () => {
        dot.style.transform = "translate(-50%, -50%) scale(2)";
        ball.style.width = "55px";
        ball.style.height = "55px";
        ball.style.borderColor = "var(--color-accent)";
      });
      elem.addEventListener("mouseleave", () => {
        dot.style.transform = "translate(-50%, -50%) scale(1)";
        ball.style.width = "36px";
        ball.style.height = "36px";
        ball.style.borderColor = "var(--color-primary)";
      });
    });
  }

  // --- MOBILE NAVIGATION CONTROLLER ---
  const menuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if(menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
      mobileMenu.classList.toggle("flex");
    });
  }

  // --- GLOBAL ACCORDION FUNCTIONAL LOGIC ---
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const activeHeader = document.querySelector(".accordion-header.active");
      if (activeHeader && activeHeader !== header) {
        activeHeader.classList.remove("active");
        activeHeader.nextElementSibling.style.maxHeight = null;
        activeHeader.querySelector(".icon-chevron").style.transform = "rotate(0deg)";
      }
      header.classList.toggle("active");
      const body = header.nextElementSibling;
      const chevron = header.querySelector(".icon-chevron");
      if (header.classList.contains("active")) {
        body.style.maxHeight = body.scrollHeight + "px";
        if(chevron) chevron.style.transform = "rotate(180deg)";
      } else {
        body.style.maxHeight = null;
        if(chevron) chevron.style.transform = "rotate(0deg)";
      }
    });
  });

  // --- COUNTER ENGINE VIA GSAP DRIVEN TIMELINES ---
  const counters = document.querySelectorAll(".stat-counter");
  if (counters.length > 0 && typeof gsap !== "undefined") {
    counters.forEach(counter => {
      const targetValue = parseInt(counter.getAttribute("data-target"), 10);
      gsap.fromTo(counter, { textContent: 0 }, {
        textContent: targetValue,
        duration: 2.5,
        ease: "power2.out",
        snap: { textContent: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      });
    });
  }

  // --- REALTIME PRODUCT CATALOGUE SEARCH & INLINE FILTER PARSER ---
  const searchInput = document.getElementById("product-search");
  const categoryFilters = document.querySelectorAll(".cat-filter");
  const productCards = document.querySelectorAll(".product-card");

  function processProductFilters() {
    const searchText = searchInput ? searchInput.value.toLowerCase() : "";
    const activeCategoryElement = document.querySelector(".cat-filter.active-filter");
    const targetCategory = activeCategoryElement ? activeCategoryElement.getAttribute("data-category") : "all";

    productCards.forEach(card => {
      const title = card.getAttribute("data-title").toLowerCase();
      const cat = card.getAttribute("data-category");
      const matchesSearch = title.includes(searchText);
      const matchesCategory = (targetCategory === "all" || cat === targetCategory);

      if(matchesSearch && matchesCategory) {
        card.style.display = "block";
        gsap.fromTo(card, {opacity: 0, scale: 0.95}, {opacity: 1, scale: 1, duration: 0.4});
      } else {
        card.style.display = "none";
      }
    });
  }

  if (searchInput) searchInput.addEventListener("input", processProductFilters);
  categoryFilters.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryFilters.forEach(b => b.classList.remove("active-filter", "bg-emerald-800", "text-white"));
      btn.classList.add("active-filter", "bg-emerald-800", "text-white");
      processProductFilters();
    });
  });

  // --- IMAGE ZOOM GALLERY CONTROLLER ---
  const mainProductImg = document.getElementById("main-product-image");
  const thumbnails = document.querySelectorAll(".thumb-img");
  thumbnails.forEach(thumb => {
    thumb.addEventListener("click", () => {
      if(mainProductImg) {
        mainProductImg.src = thumb.src;
        gsap.fromTo(mainProductImg, {opacity: 0.4}, {opacity: 1, duration: 0.5});
      }
    });
  });

  // --- PRODUCT MODAL MODULAR QUICKVIEW SYSTEM ---
  const quickViewModal = document.getElementById("quickview-modal");
  const modalClose = document.getElementById("close-modal");
  if(quickViewModal && modalClose) {
    document.querySelectorAll(".btn-quickview").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const pCard = btn.closest(".product-card");
        document.getElementById("modal-title").innerText = pCard.getAttribute("data-title");
        document.getElementById("modal-img").src = pCard.querySelector("img").src;
        quickViewModal.classList.remove("hidden");
        quickViewModal.classList.add("flex");
      });
    });
    modalClose.addEventListener("click", () => {
      quickViewModal.classList.add("hidden");
    });
  }

  // --- GSAP TEXT ENTERPRISE STAGE ENHANCEMENTS ---
  if(typeof gsap !== "undefined") {
    gsap.from(".hero-reveal", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power4.out"
    });
  }

  // --- INITIALIZE SWIPER INSTANCES ---
  if (typeof Swiper !== "undefined") {
    new Swiper(".testimonialSwiper", {
      slidesPerView: 1,
      spaceBetween: 30,
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
      },
      autoplay: { delay: 5000 }
    });
  }

  // --- INITIALIZE AOS GRAPHICS ---
  if (typeof AOS !== "undefined") {
    AOS.init({ duration: 1000, once: true, offset: 120 });
  }
});