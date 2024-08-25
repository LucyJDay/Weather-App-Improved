function updateWeather(response) {
  let currentTempElement = document.querySelector("#current-temp");
  let currentTemp = response.data.temperature.current;
  let cityElement = document.querySelector("#city-name");
  let weatherType = document.querySelector("#current-weather-type");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#current-day");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  currentTempElement.innerHTML = Math.round(currentTemp);
  weatherType.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `Wind: ${response.data.wind.speed} km/hr`;
  dateElement.innerHTML = formatDate(date);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
    if (hours < 10) {
      hours = `0${hours}`;
    }
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "a47eoa5f93f1482be2363ad1451fc0at";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-form-input");

  searchCity(searchInput.value);
}
let searchFormElement = document.querySelector("#city-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity(Barcelona);
