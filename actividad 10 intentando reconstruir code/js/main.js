

document.addEventListener("DOMContentLoaded", () => {
  initCarousel({ selector: "#carousel", interval: 4000 });
  setupDownloadButton();
  renderWelcome();
});

function initCarousel(options) {
  const selector =
    options && options.selector ? options.selector : "#carousel";
  const interval = options && options.interval ? options.interval : 4000;

  const root = document.querySelector(selector);
  if (!root) return;

  const track = root.querySelector(".carousel-track");
  const slides = Array.from(root.querySelectorAll(".carousel-slide"));
  const btnPrev = root.querySelector(".carousel-btn.prev");
  const btnNext = root.querySelector(".carousel-btn.next");
  const indicatorsContainer = root.querySelector(".carousel-indicators");

  if (!track || slides.length === 0) return;

  let active = 0;
  let timer = null;

  function goTo(index) {
    active = (index + slides.length) % slides.length;
    const offset = active * root.clientWidth;
    track.style.transform = `translateX(-${offset}px)`;
    updateIndicators();
  }

  function next() {
    goTo(active + 1);
  }

  function prev() {
    goTo(active - 1);
  }

  function createIndicators() {
    if (!indicatorsContainer) return;
    indicatorsContainer.innerHTML = "";
    slides.forEach((_, i) => {
      const b = document.createElement("button");
      b.setAttribute("role", "tab");
      b.addEventListener("click", () => {
        goTo(i);
        resetTimer();
      });
      indicatorsContainer.appendChild(b);
    });
  }

  function updateIndicators() {
    if (!indicatorsContainer) return;
    const buttons = Array.from(indicatorsContainer.children);
    buttons.forEach((b, i) => {
      b.setAttribute("aria-selected", i === active ? "true" : "false");
    });
  }

  function startTimer() {
    if (interval > 0 && !timer) {
      timer = setInterval(next, interval);
    }
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }

  function resetTimer() {
    stopTimer();
    startTimer();
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", () => {
      prev();
      resetTimer();
    });
  }
  if (btnNext) {
    btnNext.addEventListener("click", () => {
      next();
      resetTimer();
    });
  }

  root.addEventListener("mouseenter", stopTimer);
  root.addEventListener("mouseleave", startTimer);
  root.addEventListener("focusin", stopTimer);
  root.addEventListener("focusout", startTimer);
  window.addEventListener("resize", () => goTo(active));

  createIndicators();
  goTo(active);
  startTimer();
}


const STORAGE_KEY = "visitorName";

function getGreetingByHour(date) {
  const hour = date.getHours();
  if (hour > 5 && hour < 12) return "Buenos días";
  if (hour >= 12 && hour < 19) return "Buenas tardes";
  return "Buenas noches";
}
// para aceptar nombres con espacios extras
function formatName(name) {
  if (!name) return "";
  return name.trim().replace(/\s+/g, " ");
}

// para tener persistencia del nombre
function setVisitorName(name) {
  if (!name) return;
  localStorage.setItem(STORAGE_KEY, name);
}

function getVisitorName() {
  return localStorage.getItem(STORAGE_KEY) || "";
}

// esta función renderiza el mensaje de bienvenida
function renderWelcome() {
  const container = document.getElementById("welcome");
  if (!container) return;

  const name = formatName(getVisitorName());
  const greeting = getGreetingByHour(new Date());

  // Limpia el contenedor antes de renderizar
  container.innerHTML = "";

  // Crea el texto de bienvenida
  const text = document.createElement("div");
  text.className = "welcome-text";
  text.textContent = name
    ? `${greeting}, ${name}!`
    : `${greeting}. Bienvenido a mi página.`;
  container.appendChild(text);

  // Crea el contenedor de acciones
  const actions = document.createElement("div");
  actions.className = "welcome-actions";

  if (!name) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Escribe tu nombre";
    input.id = "visitorNameInput";
    input.setAttribute("aria-label", "Nombre del visitante");
    actions.appendChild(input);

    const btn = document.createElement("button");
    btn.textContent = "Guardar nombre";
    btn.addEventListener("click", () => {
      const v = formatName(input.value);
      if (!v) {
        alert("Introduce un nombre válido.");
        return;
      }
      setVisitorName(v);
      renderWelcome(); 
    });
    actions.appendChild(btn);
  } else {
    // si ya hay nombre, muestra el botón para cambiarlo
    const btnReset = document.createElement("button");
    btnReset.textContent = "Cambiar nombre";
    btnReset.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      renderWelcome(); 
    });
    actions.appendChild(btnReset);
  }

  container.appendChild(actions);
}

// configuración del botón de descarga
function setupDownloadButton() {
  const btn = document.getElementById("botonDescarga");
  if (!btn) return;

  btn.addEventListener("click", function () {
    const pdfPath =
      "js/Lebenslauf_DanielEspinoza_DE_SoftwareEngineer_DataScience.pdf";
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "Daniel_Espinoza_CV.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}