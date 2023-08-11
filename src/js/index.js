import { startDrag, drag, endDrag, placeWindowOnTop } from "./window.js";
import showProjectsWindow from "./projects.js";
import showAboutMeWindow from "./about_me.js";
import showWeatherWindow from "./weather.js";
import { showEmailWindow, handleSubmit } from "./email.js";
import displayTimeAndDate from "./clocks.js";

import "../scss/main.scss";

const desktop = document.querySelector("#desktop");

// Событие нажатия на иконку
desktop
  .querySelector(".container")
  .querySelectorAll(":scope > .icon")
  .forEach((icon) => {
    icon.addEventListener("click", (e) => {
      // Анимация иконок
      const img = icon.querySelector("img");
      img.classList.remove("bounce-animation");
      setTimeout(() => {
        img.classList.add("bounce-animation");
      }, 0);

      const clickedIcon = e.currentTarget;

      if (clickedIcon.classList.contains("opened")) {
        return;
      }

      clickedIcon.classList.add("opened");

      switch (clickedIcon.id) {
        case "about-me-icon":
          showAboutMeWindow();
          break;

        case "weather-icon":
          showWeatherWindow();
          break;

        case "email-icon":
          showEmailWindow();
          break;

        case "projects-icon":
          showProjectsWindow();
          break;

        default:
          break;
      }
    });
  });

// Закрыть окно
document.querySelectorAll(".close-action").forEach((action) => {
  action.addEventListener("click", (e) => {
    const window = e.target.closest(".interaction-window");
    window.style.display = "none";
    let desktopIconId = window.id.replace("window", "icon");
    document.querySelector(`#${desktopIconId}`).classList.remove("opened");
  });
});

// Развернуть окно
document.querySelectorAll(".expand-action").forEach((action) => {
  action.addEventListener("click", (e) => {
    const window = e.target.closest(".interaction-window");
    placeWindowOnTop(window);
    window.classList.toggle("fullscreen");
  });
});

// Таскать окно (для мыши)
document
  .querySelectorAll(".window-head")
  .forEach((head) => head.addEventListener("mousedown", startDrag));
document.addEventListener("mouseup", endDrag);
document.addEventListener("mousemove", drag);
// (сенсорные устр-ва)
document
  .querySelectorAll(".window-head")
  .forEach((head) => head.addEventListener("touchstart", startDrag));
document.addEventListener("touchend", endDrag);
document.addEventListener("touchmove", drag);

// Часы и дата
displayTimeAndDate();
setInterval(displayTimeAndDate, 1000);

// Выпадающее меню
const logo = document.getElementById("logo");
const dropdown = document.getElementById("dropdown");

logo.addEventListener("click", (e) => {
  e.stopPropagation();
  dropdown.classList.toggle("show");
});

document.documentElement.addEventListener("click", () => {
  if (dropdown.classList.contains("show")) {
    dropdown.classList.toggle("show");
  }
});

// Отправка формы
document.querySelector("form").addEventListener("submit", handleSubmit);

document.querySelector(".popup a").addEventListener("click", () => {
  document.querySelector(".overlay").style.display = "none";
  document.querySelector(".popup").style.display = "none";
});
