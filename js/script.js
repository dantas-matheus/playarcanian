const targetDate = new Date("2026-07-17T19:00:00").getTime();
const numbers = document.querySelectorAll(".number");

function updateCountdown() {
  const now = new Date().getTime();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.querySelector(".container").innerHTML =
      "<div class='number red'>O ARQUIVO FOI EXPOSTO.</div>";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById("days").textContent = String(d).padStart(2, "0");
  document.getElementById("hours").textContent = String(h).padStart(2, "0");
  document.getElementById("minutes").textContent = String(m).padStart(2, "0");
  document.getElementById("seconds").textContent = String(s).padStart(2, "0");

  const isHourEven = h % 2 === 0;

  numbers.forEach(n => {
    n.classList.remove("red", "green");
    n.classList.add(isHourEven ? "green" : "red");
    n.style.opacity = 0.8 + Math.random() * 0.2;
  });
}

setInterval(updateCountdown, 1000);
updateCountdown();
