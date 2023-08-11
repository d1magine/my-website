const clocksDiv = document.getElementById("clocks");
const dateDiv = document.getElementById("date");
const days = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export default function displayTimeAndDate() {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  clocksDiv.textContent = `${hours}:${minutes}`;
  dateDiv.textContent = `${days[date.getDay()]} ${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
}
