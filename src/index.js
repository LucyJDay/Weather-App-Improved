function updateWeather(response) {
  let currentTempElement = document.querySelector("#current-temp");
  let currentTemp = response.data.temperature.current;
  let cityElement = document.querySelector("#city-name");
  let weatherType = document.querySelector("#current-weather-type");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let dateElement = document.querySelector("#current-day");
  let date = new Date(response.data.time * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" />`;

  cityElement.innerHTML = response.data.city;
  currentTempElement.innerHTML = Math.round(currentTemp);
  weatherType.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%,`;
  windSpeedElement.innerHTML = `Wind: ${response.data.wind.speed} km/hr`;
  dateElement.innerHTML = `${formatDate(date)},`;

  getForcast(response.data.city);
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

function getForcast(city) {
  apiKey = "a47eoa5f93f1482be2363ad1451fc0at";
  apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiURL).then(displayForecast);
  console.log(apiURL);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  console.log(response.data);

  let forecastHTML = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="weather-forecast-day"> 
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <img src="${day.condition.icon_url}" class="weather-forecast-icon">
      <div class ="weather-forecast-temperatures">
        <div class="weather-forecast-temperature">
          <strong>${Math.round(day.temperature.maximum)}°C</strong>
        </div>
        <div class="weather-forecast-temperature">${Math.round(
          day.temperature.minimum
        )}°C
        </div>
        </div>
    </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#city-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Barcelona");
displayForecast();
