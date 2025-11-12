document.addEventListener("DOMContentLoaded", () => {
  setupDownloadButton();
  renderWelcome();
});


const STORAGE_KEY = "visitorName";

function getGreetingByHour(date) {
  const hour = date.getHours();
  if (hour > 5 && hour < 12) return "Buenos días";
  if (hour >= 12 && hour < 19) return "Buenas tardes";
  return "Buenas noches";
}

function formatName(name) {
  if (!name) return "";
  return name.trim().replace(/\s+/g, " ");
}

function setVisitorName(name) {
  if (!name) return;
  localStorage.setItem(STORAGE_KEY, name);
}

function getVisitorName() {
  return localStorage.getItem(STORAGE_KEY) || "";
}

function renderWelcome() {
  const container = document.getElementById("welcome");
  if (!container) return;

  const name = formatName(getVisitorName());
  const greeting = getGreetingByHour(new Date());

  container.innerHTML = "";

  const text = document.createElement("p");
  text.className = "h4"; 
  text.textContent = name
    ? `${greeting}, ${name}!`
    : `${greeting}. Bienvenido a mi página.`;
  container.appendChild(text);

  const actions = document.createElement("div");
  actions.className = "mt-3";

  if (!name) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Escribe tu nombre";
    input.className = "form-control d-inline-block w-auto me-2";
    actions.appendChild(input);

    const btn = document.createElement("button");
    btn.textContent = "Guardar nombre";
    btn.className = "btn btn-custom";
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
    const btnReset = document.createElement("button");
    btnReset.textContent = "Cambiar nombre";
    btnReset.className = "btn btn-secondary";
    btnReset.addEventListener("click", () => {
      localStorage.removeItem(STORAGE_KEY);
      renderWelcome();
    });
    actions.appendChild(btnReset);
  }

  container.appendChild(actions);
}

function setupDownloadButton() {
  const btn = document.getElementById("botonDescarga");
  if (!btn) return;

  btn.addEventListener("click", function () {
    const pdfPath = "js/Lebenslauf_DanielEspinoza_DE_SoftwareEngineer_DataScience.pdf";
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = "Daniel_Espinoza_CV.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}