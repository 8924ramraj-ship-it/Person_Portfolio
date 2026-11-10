// Contact form preview: validates fields but does not transmit or store data.
document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#contactForm");
  if (!form) return;

  const status = document.querySelector("#formStatus");
  const requiredFields = [
    form.querySelector('[name="name"]'),
    form.querySelector('[name="email"]'),
    form.querySelector('[name="message"]')
  ];

  requiredFields.forEach((field) => {
    field.addEventListener("input", () => field.classList.remove("field-error"));
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let valid = true;

    requiredFields.forEach((field) => {
      const value = field.value.trim();
      const emailInvalid = field.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      const fieldInvalid = !value || emailInvalid;
      field.classList.toggle("field-error", fieldInvalid);
      if (fieldInvalid) valid = false;
    });

    if (!valid) {
      status.textContent = "Please complete the required fields with a valid email address.";
      return;
    }

    status.textContent = "The form preview is working. Connect an email service or backend to receive messages.";
  });
});
