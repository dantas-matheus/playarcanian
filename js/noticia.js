// Fade-in ao rolar
const faders = document.querySelectorAll(".news-content, footer");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("fade-in");
  });
}, { threshold: 0.2 });

faders.forEach(el => observer.observe(el));
