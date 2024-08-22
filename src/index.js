function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-form-input");
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = searchInput.value;
}
let searchFormElement = document.querySelector("#city-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
