let offset = [0, 0];
let isDragging = false;
let window;

export function startDrag(e) {
  window = e.target.closest(".interaction-window");

  if (window.classList.contains("fullscreen")) {
    return;
  }

  placeWindowOnTop(window);

  isDragging = true;
  offset[0] =
    e.type === "touchstart"
      ? e.changedTouches[0].clientX - window.offsetLeft
      : e.clientX - window.offsetLeft;
  offset[1] =
    e.type === "touchstart"
      ? e.changedTouches[0].clientY - window.offsetTop
      : e.clientY - window.offsetTop;
}

export function endDrag() {
  isDragging = false;
}

export function drag(e) {
  if (isDragging) {
    window.style.left =
      e.type === "touchmove"
        ? `${e.changedTouches[0].clientX - offset[0]}px`
        : `${e.clientX - offset[0]}px`;
    window.style.top =
      e.type === "touchmove"
        ? `${e.changedTouches[0].clientY - offset[1]}px`
        : `${e.clientY - offset[1]}px`;
  }
}

// Сделать окно поверх всего
export function placeWindowOnTop(window) {
  document.querySelectorAll(".interaction-window").forEach((w) => {
    w.classList.remove("screen-top");
  });

  window.classList.add("screen-top");
}
