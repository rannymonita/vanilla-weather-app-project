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
