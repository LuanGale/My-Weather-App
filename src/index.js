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
  iconElement.innerHTML = `<img src ="${response.data.condition.icon_url}" alt="${response.data.condition.icon}" />`;
  humidityElement.innerHTML = response.data.temperature.humidity;
  speedElement.innerHTML = Math.round(response.data.wind.speed * 10) / 10;
  timeElement.innerHTML = formatDate(date);

  getForecastData(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

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

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSearchSubmit);

function formatDays(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDay()];
}

function getForecastData(city) {
  let apiKey = "1t58d76239ab654fd09eabc4co0daf97";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
    <div class="weather-forecast-day">
        <div class="weather-forecast-date"><strong>${formatDays(
          day.time
        )}</strong></div>
        <div>
        <img src ="${day.condition.icon_url}" alt="${
          day.condition.icon
        }" class="weather-forecast-icon" />
        </div>
        <div class="weather-forecast-temperatures">
            <span class="max-temperature"> 
            <strong>
            ${Math.round(day.temperature.maximum)}º
            </strong>
            </span>
            <span class="min-temperature">
            ${Math.round(day.temperature.minimum)}º
            </span>
        </div>
    </div>
  `;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Palma");
