// Menu mobile
const toggle = document.getElementById("navToggle");
const links = document.getElementById("navLinks");

if (toggle && links) {
  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  links.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

// Form -> WhatsApp
document.getElementById("sendWhatsApp")?.addEventListener("click", () => {
  const nome = document.querySelector('input[name="nome"]')?.value?.trim() || "";
  const whatsapp = document.querySelector('input[name="whatsapp"]')?.value?.trim() || "";
  const negocio = document.querySelector('input[name="negocio"]')?.value?.trim() || "";
  const msg = document.querySelector('textarea[name="mensagem"]')?.value?.trim() || "";

  const texto =
    `Oi! Quero um site na L.E.F web design.%0A` +
    `Nome: ${nome}%0A` +
    `WhatsApp: ${whatsapp}%0A` +
    `Negócio: ${negocio}%0A` +
    `Mensagem: ${msg}`;

  const numero = "5541998022655";
  const url = `https://wa.me/${numero}?text=${texto}`;
  window.open(url, "_blank");
});

// Carousel autoplay + drag (sem botões)
(function(){
  const carousel = document.getElementById("planCarousel");
  if(!carousel) return;

  const track = carousel.querySelector(".carousel__track");
  const dots = Array.from(carousel.querySelectorAll(".dot"));
  const cards = Array.from(carousel.querySelectorAll(".carousel__card"));

  let index = 0;
  let timer = null;
  let userInteracting = false;

  function setActiveDot(i){
    dots.forEach((d, di) => d.classList.toggle("active", di === i));
  }

  function scrollToIndex(i){
    const card = cards[i];
    if(!card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveDot(i);
  }

  function next(){
    index = (index + 1) % cards.length;
    scrollToIndex(index);
  }

  function start(){
    stop();
    timer = setInterval(() => {
      if(!userInteracting) next();
    }, 5000);
  }

  function stop(){
    if(timer) clearInterval(timer);
    timer = null;
  }

  // Atualiza dot pelo scroll (após parar)
  let scrollTimeout = null;
  track.addEventListener("scroll", () => {
    userInteracting = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const pos = track.scrollLeft + 5;
      let nearest = 0;
      let best = Infinity;
      cards.forEach((c, i) => {
        const d = Math.abs(c.offsetLeft - pos);
        if(d < best){ best = d; nearest = i; }
      });
      index = nearest;
      setActiveDot(index);
      userInteracting = false;
    }, 150);
  }, { passive: true });

  // Arrastar com mouse/toque (pointer events)
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  track.addEventListener("pointerdown", (e) => {
    isDown = true;
    userInteracting = true;
    track.setPointerCapture(e.pointerId);
    startX = e.clientX;
    scrollLeft = track.scrollLeft;
    stop();
  });

  track.addEventListener("pointermove", (e) => {
    if(!isDown) return;
    const walk = (startX - e.clientX);
    track.scrollLeft = scrollLeft + walk;
  });

  function endDrag(){
    if(!isDown) return;
    isDown = false;
    userInteracting = false;
    start();
  }

  track.addEventListener("pointerup", endDrag);
  track.addEventListener("pointercancel", endDrag);
  track.addEventListener("pointerleave", endDrag);

  // Início
  setActiveDot(0);
  start();
})();
