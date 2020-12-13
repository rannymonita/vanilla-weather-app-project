// Date & Time Display
let currentTime = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currentTime.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentTime.getMonth()];
let date = currentTime.getDate();
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0${hour}`;
} else {
  hour = hour + "";
}
let minute = currentTime.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
} else {
  minute = minute + ``;
}
let newTime = `${hour}:${minute}`;

let h4 = document.querySelector("#current-date");
h4.innerHTML = `${day}, ${month} ${date}, ${newTime}`;

function formatHours(timestamp) {
  let forecastDate = new Date(timestamp);
  let hours = forecastDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = forecastDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}

//API

function displayTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector(`#current-temp`);
  let cityElement = document.querySelector(`#city`);
  let descriptionElement = document.querySelector(`#weather-description`);
  let currentRealFeelElement = document.querySelector("#real-feel-temp");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let mainIconElement = document.querySelector("#main-icon");

  celsiusTemp = response.data.main.temp;
  celsiusTempFeelsLike = response.data.main.feels_like;

  temperatureElement.innerHTML = Math.round(celsiusTemp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  currentRealFeelElement.innerHTML = Math.round(celsiusTempFeelsLike);
  humidityElement.innerHTML = response.data.main.humidity;
  windSpeedElement.innerHTML = Math.round(response.data.wind.speed);
  mainIconElement.setAttribute(
    "src",
    `icon/${response.data.weather[0].icon}.svg`
  );
  mainIconElement.setAttribute("alt", `${descriptionElement}`);

  function displayUV(response) {
    let UvElement = document.querySelector(`#uv-index`);
    UvElement.innerHTML = Math.round(response.data.value);
  }
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKey = "823e2e84bc5835e87564bbced4b8cd86";
  let apiUrlUvIndex = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrlUvIndex).then(displayUV);
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast-hourly");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];

    forecastElement.innerHTML += `
  <span class="daily-forecast">
    <ul class="list-group">
        <li class="list-group-item hour">${formatHours(forecast.dt * 1000)}</li>
        <li class="list-group-item icon">
          <img src="icon/${forecast.weather[0].icon}.svg" />
        </li>
        <li class="list-group-item max-temp" id="forecast-max-temp">${Math.round(
          forecast.main.temp_max
        )}&deg;</li>
        <li class="list-group-item min-temp" id="forecast-min-temp">${Math.round(
          forecast.main.temp_min
        )}&deg;</li>
    </ul>
  </span>
  `;
  }
}

function search(city) {
  let apiKey = "823e2e84bc5835e87564bbced4b8cd86";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#user-city-input");
  let h1 = document.querySelector("h1");

  if (cityInputElement.value) {
    h1.innerHTML = `${cityInputElement.value}`.toLocaleUpperCase();
  } else {
    alert(`Please type a city`);
  }

  let city = cityInputElement.value;

  search(city);
}

function updateTempToFahrenheit(event) {
  event.preventDefault();
  let fahrenheitTemperature = Math.round((celsiusTemp * 9) / 5 + 32);
  let fahrenheitRealFeel = Math.round((celsiusTempFeelsLike * 9) / 5 + 32);
  document.querySelector(`#current-temp`).innerHTML = fahrenheitTemperature;
  document.querySelector("#real-feel-temp").innerHTML = fahrenheitRealFeel;
  fahrenheitLink.innerHTML = `<strong>F°</strong>`;
  celsiusLink.innerHTML = `C°`;
  document.querySelector(`#forecast-max-temp`).innerHTML = Math.round(
    (forecast.main.temp_max * 9) / 5 + 32
  );
  document.querySelector(`#forecast-min-temp`).innerHTML = Math.round(
    (forecast.main.temp_min * 9) / 5 + 32
  );
}

function updateTempToCelsius(event) {
  event.preventDefault();
  let celsiusTemperature = Math.round(celsiusTemp);
  let celsiusRealFeel = Math.round(celsiusTempFeelsLike);
  document.querySelector(`#current-temp`).innerHTML = celsiusTemperature;
  document.querySelector("#real-feel-temp").innerHTML = celsiusRealFeel;
  fahrenheitLink.innerHTML = `F°`;
  celsiusLink.innerHTML = `<strong>C°</strong>`;
}

// global variable

let celsiusTemp = null;
let celsiusTempFeelsLike = null;

// Search engine

let form = document.querySelector("#city-name");
form.addEventListener("submit", handleSubmit);

// Unit conversion

let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");

fahrenheitLink.addEventListener("click", updateTempToFahrenheit);
celsiusLink.addEventListener("click", updateTempToCelsius);

search("Lisbon");
