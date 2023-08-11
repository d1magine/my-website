let errorDiv;

// Показать окно "Погода"
export default function showWeatherWindow() {
  const window = document.getElementById("weather-window");
  window.style.display = "flex";

  window.querySelector(".weather-info").style.display = "none";
  window.querySelector(".error-msg").style.display = "none";
  window.querySelector(".loader").style.display = "block";

  fetchCurrentWeather()
    .then((weatherInfo) => {
      // Картинка погоды
      window.querySelector(".weather-info > img").src = weatherInfo.icon;

      // Температура
      window.querySelector("h3").textContent = weatherInfo.temp;

      // Город
      window.querySelector("h4").textContent = weatherInfo.city;

      // Ветер
      window.querySelector(".wind").textContent = `${weatherInfo.wind}км/ч`;

      // Влажность
      window.querySelector(".humidity").textContent = `${weatherInfo.humid}%`;

      // Облачность
      window.querySelector(".cloud").textContent = `${weatherInfo.cloud}%`;

      window.querySelector(".weather-info").style.display = "flex";
    })
    // Скрыть индикатор загрузки
    .finally(() => (window.querySelector(".loader").style.display = "none"));
}

const baseUrl = "http://api.weatherapi.com/v1/current.json";
const apiKey = "d5e78a59dcb349acb4f165301233103";

// Получить данные о текущей погоды
async function fetchCurrentWeather() {
  try {
    const coords = await getCurrentPosition();
    const response = await fetch(
      `${baseUrl}?key=${apiKey}&q=${coords.lat},${coords.long}`
    );

    if (!response.ok) {
      throw new Error("Не удалось получить данные с сервера!");
    }

    const data = await response.json();

    return {
      icon: data.current.condition.icon,
      temp: data.current.temp_c,
      city: data.location.name,
      wind: data.current.wind_kph,
      humid: data.current.humidity,
      cloud: data.current.cloud,
    };
  } catch (error) {
    const errorDiv = document.querySelector(".error-msg");
    errorDiv.querySelector("p").textContent = `Ошибка: ${error.message}`;
    errorDiv.style.display = "block";
  }
}

// Получить широту и долготу местоположения
function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          long: position.coords.longitude,
        });
      },
      () => {
        reject(
          new Error("Геолокация не поддерживается браузером или не разрешена!")
        );
      },
      {
        timeout: 5000,
      }
    );
  });
}
