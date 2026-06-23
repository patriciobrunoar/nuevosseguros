// Nuevos Seguros - Landing "Análisis de Datos"
// Lógica de selección de perfil + envío de formulario a Webhook (Make/Zapier)

document.addEventListener("DOMContentLoaded", () => {
  const stepSelect = document.getElementById("step-select");
  const panelA = document.getElementById("panel-a");
  const panelB = document.getElementById("panel-b");

  const btnOpcionA = document.getElementById("btn-opcion-a");
  const btnOpcionB = document.getElementById("btn-opcion-b");
  const backA = document.getElementById("back-a");
  const backB = document.getElementById("back-b");

  function showPanel(panel) {
    stepSelect.classList.add("hidden");
    panelA.classList.add("hidden");
    panelB.classList.add("hidden");
    panel.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showSelector() {
    panelA.classList.add("hidden");
    panelB.classList.add("hidden");
    stepSelect.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  btnOpcionA.addEventListener("click", () => showPanel(panelA));
  btnOpcionB.addEventListener("click", () => showPanel(panelB));
  backA.addEventListener("click", showSelector);
  backB.addEventListener("click", showSelector);

  // Formulario de contacto (Opción B)
  const form = document.getElementById("form-contacto");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("form-error");
  const btnSubmit = document.getElementById("btn-submit");

  // TODO: Pegar acá la URL del Webhook de Make/Zapier
  const WEBHOOK_URL = "https://hook.us1.make.com/REEMPLAZAR_CON_TU_WEBHOOK";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMessage.classList.add("hidden");

    const datos = {
      nombre: document.getElementById("nombre").value.trim(),
      apellido: document.getElementById("apellido").value.trim(),
      email: document.getElementById("email").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      tipoSeguro: document.getElementById("tipo-seguro").value,
      comentarios: document.getElementById("comentarios").value.trim(),
      origen: "Landing Análisis de Datos - Consumidor Final",
      fecha: new Date().toISOString(),
    };

    btnSubmit.disabled = true;
    btnSubmit.textContent = "Enviando...";

    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });

      form.classList.add("hidden");
      successMessage.classList.remove("hidden");
    } catch (error) {
      errorMessage.classList.remove("hidden");
      btnSubmit.disabled = false;
      btnSubmit.textContent = "Enviar consulta";
    }
  });
});
