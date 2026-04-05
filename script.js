document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");
  const togglePassword = document.getElementById("togglePassword");
  const successMsg = document.getElementById("successMessage");

  // 1. Alternar visibilidade da senha
  togglePassword.addEventListener("click", () => {
    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);
    togglePassword.classList.toggle("fa-eye-slash");
  });

  // 2. Máscara Simples de Telefone (Formato Brasil)
  phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    e.target.value = value;
  });

  // 3. Validação em Tempo Real
  const validateField = (input) => {
    const group = input.parentElement.classList.contains("password-wrapper")
      ? input.parentElement.parentElement
      : input.parentElement;

    if (
      !input.checkValidity() ||
      (input.id === "password" && input.value.length < 8)
    ) {
      group.classList.add("invalid");
    } else {
      group.classList.remove("invalid");
    }
  };

  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("blur", () => validateField(input));
    input.addEventListener("input", () => {
      if (input.parentElement.classList.contains("invalid"))
        validateField(input);
    });
  });

  // 4. Simulação de Envio
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Validação final antes de "enviar"
    let isFormValid = true;
    form.querySelectorAll("input").forEach((input) => {
      validateField(input);
      if (input.parentElement.classList.contains("invalid"))
        isFormValid = false;
    });

    if (isFormValid) {
      const formData = new FormData(form);
      console.log(
        "Enviando dados para o servidor...",
        Object.fromEntries(formData),
      );

      // Simular loading e sucesso
      const btn = document.getElementById("submitBtn");
      btn.innerText = "Enviando...";
      btn.disabled = true;

      setTimeout(() => {
        form.reset();
        btn.style.display = "none";
        successMsg.classList.remove("hidden");
        console.log("Sucesso: Formulário enviado!");
      }, 1500);
    }
  });
});
