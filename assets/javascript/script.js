var weatherAPIkey = "599aa725fe51b1470ed131616e7d07c9";
var searchButton = document.querySelector(".btn");
var cityInput = document.getElementById("city");
var cityHistory = [];
var historyEl = document.querySelector(".search-history");

if (localStorage.getItem("history")) {
  cityHistory = JSON.parse(localStorage.getItem("history"));
}

function loadButtons() {
  historyEl.innerHTML = "";
  for (i = 0; i < cityHistory.length; i++) {
    var newBtn = document.createElement("button");
    newBtn.textContent = cityHistory[i];
    historyEl.appendChild(newBtn);
  }
}

loadButtons();

function getCoordinates(city) {
  // If there is no input entered, don't return/run anything.
  if (!city || city === "") return;

  //
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
      getWeather(data.coord.lat, data.coord.lon);
      getForecast(data.coord.lat, data.coord.lon);
    });
}
// Display search history from local storage
function addToLocal(newCity) {
  cityHistory.push(newCity);

  localStorage.setItem("history", JSON.stringify(cityHistory));
  loadButtons();
}

/* historyEl = [""];
var uniqueNames = [];
$.each(names, historyEl(i, el));
if ($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);

.then((response) => {
  return response.json();
})
.then((data) => {
  var filtered = data.list.filter((index) =>
    index.dt_txt.includes("12:00:00")
  );
  displayForecast(filtered);
}); */

function getWeather(lat, lon) {
  var queryURL2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherAPIkey}`;

  fetch(queryURL2)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
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
      var filtered = data.list.filter((index) =>
        index.dt_txt.includes("12:00:00")
      );
      displayForecast(filtered);
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
  document.getElementById(
    "wind-speed"
  ).textContent = `Wind Speed: ${data.wind.speed} MPH`;
}

function displayForecast(data) {
  //make forecast cards (below is incorrect initial attempt)
  // document.getElementById(
  //   "forecast-heading"
  // ).textContent = `${data.city.name} 5-Day Forecast`;
  // document.getElementById(
  //   "future-temp"
  // ).textcontent = `Temp: ${data.forecast.list.main.temp}℉`;
  var forecastContainer = document.getElementById("forecast-cards");
  forecastContainer.innerHTML = "";

  //These were the things I needed to add in the cards, but this was incorrect initial attempt; use as reminder/list for the for loop.
  // <div class="forecast-cards">
  //   <img id="future-icon" />
  //   <p id="future-conditions"></p>
  //   <p id="future-temp"></p>
  //   <p id="future-wind-spd"></p>
  //   <p id="future-humidity"></p>
  // </div>;

  // For loop for displaying the future weather conditions.
  // NEED TO ADD: date for clarity; weather icon;
  for (i = 0; i < data.length; i++) {
    console.log(data[i]);
    var card = document.createElement("div");
    card.setAttribute("class", "forecast-cards");

    //create the variables for each piece of information necessary for the weather forecast, which will then be called in the cards.

    var newP = document.createElement("p");
    newP.textContent = "Temp: " + data[i].main.temp + "℉";
    var newH = document.createElement("p");
    newH.textContent = "Hum: " + data[i].main.humidity + "%";
    var newW = document.createElement("p");
    newW.textContent = "Wind: " + data[i].wind.speed + "MPH";
    var newC = document.createElement("p");
    newC.textContent = "" + data[i].weather[0].main;
    var timestamp = document.createElement("p");
    var date = new Date(data[i].dt * 1000);
    date = date.toString();
    timestamp.textContent = date.substr(0, 10);
    console.log(date);

    //Call the function--appending the child tells it to display it in the card.

    card.appendChild(timestamp);
    //card.appendChild(icon);
    card.appendChild(newC);
    card.appendChild(newP);
    card.appendChild(newH);
    card.appendChild(newW);

    forecastContainer.appendChild(card);
  }
}

//this function searches for the city of the button that is clicked in the search history.
function historySearch(event) {
  console.log(event);
  if (event.target.matches("button")) {
    getCoordinates(event.target.textContent);
  }
}

//this function
function presentSearch(e) {
  e.preventDefault();
  var city = cityInput.value;
  addToLocal(city);
  getCoordinates(city);
}

//event listeners trigger functions to perform when users click the buttons.
searchButton.addEventListener("click", presentSearch);
historyEl.addEventListener("click", historySearch);
