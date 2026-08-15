document.addEventListener("DOMContentLoaded", () => {
  const stepConsumidor = document.getElementById("step-consumidor");
  const panelConsumidor = document.getElementById("panel-consumidor");
  const backConsumidor = document.getElementById("back-consumidor");

  function showPanel() {
    stepConsumidor.classList.add("hidden");
    panelConsumidor.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showSelector() {
    panelConsumidor.classList.add("hidden");
    stepConsumidor.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll(".icon-card[data-tipo]").forEach((card) => {
    card.addEventListener("click", () => {
      document.getElementById("tipo-seguro").value = card.dataset.tipo;
      showPanel();
    });
  });

  backConsumidor.addEventListener("click", showSelector);

  // Formulario de contacto
  const form = document.getElementById("form-contacto");
  const successMessage = document.getElementById("success-message");
  const errorMessage = document.getElementById("form-error");
  const btnSubmit = document.getElementById("btn-submit");

  const WEBHOOK_URL = "https://hook.eu2.make.com/otuh1ufqhlhll5yo5bzbw343gt4r2wgn";
  const MENSAJE_ERROR_ENVIO = "Ocurrió un error al enviar tu consulta. Por favor, intentá nuevamente.";

  const camposRequeridos = [
    { id: "nombre", label: "Nombre" },
    { id: "apellido", label: "Apellido" },
    { id: "email", label: "Email" },
    { id: "telefono", label: "Teléfono / WhatsApp" },
    { id: "tipo-seguro", label: "Tipo de seguro" },
  ];

  function validarFormulario() {
    for (const campo of camposRequeridos) {
      const elemento = document.getElementById(campo.id);
      if (!elemento.value.trim()) {
        elemento.focus();
        return `Por favor, completá el campo "${campo.label}".`;
      }
    }
    const emailField = document.getElementById("email");
    if (!emailField.checkValidity()) {
      emailField.focus();
      return "Por favor, ingresá un email válido.";
    }
    return null;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorMessage.classList.add("hidden");

    const mensajeValidacion = validarFormulario();
    if (mensajeValidacion) {
      errorMessage.textContent = mensajeValidacion;
      errorMessage.classList.remove("hidden");
      return;
    }

    const datos = {
      nombre: document.getElementById("nombre").value.trim(),
      apellido: document.getElementById("apellido").value.trim(),
      email: document.getElementById("email").value.trim(),
      telefono: document.getElementById("telefono").value.trim(),
      tipoSeguro: document.getElementById("tipo-seguro").value,
      comentarios: document.getElementById("comentarios").value.trim(),
      origen: "Landing Principal - Consumidor Final",
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
      errorMessage.textContent = MENSAJE_ERROR_ENVIO;
      errorMessage.classList.remove("hidden");
      btnSubmit.disabled = false;
      btnSubmit.textContent = "Enviar consulta";
    }
  });
});
