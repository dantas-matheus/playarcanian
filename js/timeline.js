// Fade-in suave ao rolar
const faders = document.querySelectorAll(".timeline-event, footer");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("fade-in");
  });
}, { threshold: 0.2 });
faders.forEach(el => observer.observe(el));

// Tema claro/escuro
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('change', () => {
  document.body.classList.toggle('light-theme', toggle.checked);
});
