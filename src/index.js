function displayWeather(response) {
  let temperatureElement = document.querySelector("#current-temperature-value");
  let temperature = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#current-temperature-icon");
  let humidityElement = document.querySelector("#humidity");
  let speedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#current-date");
  let date = new Date(response.data.time * 1000);

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = response.data.condition.description;
  iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" />`;
  humidityElement.innerHTML = response.data.temperature.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed * 10) / 10;
  timeElement.innerHTML = formatedate;
}

function searchCity(city) {
  let apiKey = "1t58d76239ab654fd09eabc4co0daf97";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

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

  return `${day} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

searchCity("Palma");
