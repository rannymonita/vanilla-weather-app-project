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

//API

function displayTemperature(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector(`#current-temp`);
  let cityElement = document.querySelector(`#city`);
  let descriptionElement = document.querySelector(`#weather-description`);
  let currentRealFeelElement = document.querySelector("#real-feel-temp");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  currentRealFeelElement.innerHTML = Math.round(response.data.main.feels_like);
  humidityElement.innerHTML = `${response.data.main.humidity}`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} `;

  function displayUV(response) {
    console.log(response.data);

    let UvElement = document.querySelector(`#uv-index`);
    UvElement.innerHTML = Math.round(response.data.value);
  }
  let lat = response.data.coord.lat;
  let lon = response.data.coord.lon;
  let apiKey = "823e2e84bc5835e87564bbced4b8cd86";
  let apiUrlUvIndex = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${apiKey}`;
  axios.get(apiUrlUvIndex).then(displayUV);
}

let apiKey = "823e2e84bc5835e87564bbced4b8cd86";
let unit = "metric";
let city = "Lisbon";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(displayTemperature);
