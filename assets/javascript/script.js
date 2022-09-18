var weatherAPIkey = "599aa725fe51b1470ed131616e7d07c9";
var searchButton = document.querySelector(".btn");
var cityInput = document.getElementById("city");

function getCoordinates(e) {
  e.preventDefault();
  var city = cityInput.value;
  console.log(city);

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
    });
}

function getWeather(lat, lon) {
  console.log("get weather function");
  var queryURL2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIkey}`;

  fetch(queryURL2)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("weather data, ", data);
      displayWeather(data);
    });
}
function displayWeather(data) {
  document.getElementById("temp").textContent = data.main.temp;
}
searchButton.addEventListener("click", getCoordinates);
