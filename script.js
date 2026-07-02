// 헤더 상태와 모바일 메뉴를 제어합니다.
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".site-nav a");

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

navToggle.addEventListener("click", () => {
  const isOpen = document.body.classList.toggle("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// 섹션이 화면에 들어올 때 부드럽게 나타납니다.
const revealItems = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16,
    rootMargin: "0px 0px -8% 0px",
  }
);

revealItems.forEach((item) => revealObserver.observe(item));

// 정적 시안용 폼 안내입니다. 실제 발송은 추후 서버 또는 폼 서비스와 연결합니다.
const contactForm = document.querySelector(".contact-form");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const phoneInput = contactForm.querySelector('input[name="phone"]');

  if (!phoneInput.value.trim()) {
    phoneInput.focus();
    alert("연락처를 입력해 주세요.");
    return;
  }

  alert("상담 신청 내용이 준비되었습니다. 실제 발송 기능은 추후 연결할 수 있습니다.");
});
