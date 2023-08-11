// Показать окно "Почта"
export function showEmailWindow() {
  const window = document.getElementById("email-window");
  window.style.display = "flex";
}

export function handleSubmit(e) {
  e.preventDefault();

  const button = document.getElementById("submit");
  button.disabled = true;

  const contactForm = e.target;
  const formData = new FormData(contactForm);

  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      document.querySelector(".overlay").style.display = "block";
      document.querySelector(".popup").style.display = "flex";
    })
    .catch((error) => alert(error));
}
