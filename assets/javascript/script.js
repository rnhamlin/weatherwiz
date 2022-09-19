var weatherAPIkey = "599aa725fe51b1470ed131616e7d07c9";
var searchButton = document.querySelector(".btn");
var cityInput = document.getElementById("city");

function getCoordinates(e) {
  e.preventDefault();
  var city = cityInput.value;

  if (!city || city === "") return;

  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    weatherAPIkey;
  fetch(queryURL)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(`coordinates: `, data);
      getWeather(data.coord.lat, data.coord.lon);
      getForecast(data.coord.lat, data.coord.lon);
    });
}

function getWeather(lat, lon) {
  var queryURL2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIkey}`;

  fetch(queryURL2)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("weather data, ", data);
      displayCurrentWeather(data);
    });
}

function getForecast(lat, lon) {
  var queryURL2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIkey}`;

  fetch(queryURL2)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("forecast data, ", data);
      displayForecast(data);
    });
}
//

function displayCurrentWeather(data) {
  document.getElementById(
    "temp"
  ).textContent = `Temperature: ${data.main.temp}℉`;
  document.getElementById(
    "humidity"
  ).textContent = `Humidity: ${data.main.humidity}%`;
  document.getElementById("conditions").textContent = data.weather[0].main;
  document.getElementById(
    "icon"
  ).src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  document.getElementById("city-name").textContent = `${data.name} Today`;
  document.getElementById("wind-speed").textContent = `${data.wind.speed} MPH`;
}

function displayForecast(data) {
  //make forecast cards
  document.getElementById("");
}
searchButton.addEventListener("click", getCoordinates);
