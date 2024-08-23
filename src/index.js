function updateWeather(response) {
  let currentTempElement = document.querySelector("#current-temp");
  let currentTemp = response.data.temperature.current;
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;
  currentTempElement.innerHTML = Math.round(currentTemp);
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

searchCity("Barcelona");
