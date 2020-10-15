$(document).ready(function () {
  var APIKey = "100ea10c1f1db96d42a65493df31b77f";

  var cities = ["Atlanta"];

  fiveDayCont.style.display = "none";

  currentWeather.style.display = "none";

  function renderButtons() {
    $("#buttonArea").empty();

    for (var i = 0; i < cities.length; i++) {
      var button = $("<button>");
      button.text(cities[i]);
      button.addClass("searchBtn");
      $("#buttonArea").prepend(button);
    }

    $(".searchBtn").on("click", function (event) {
      oneDay($(this).text());

      fiveDay($(this).text());
    });
  }

  $("#button-addon2").on("click", function (event) {
    var city = $("#searchField").val();
    cities.push(city);

    renderButtons();

    oneDay(city);

    fiveDay(city);
  });

  function oneDay(city) {
    currentWeather.style.display = "block";

    // Here we are building the URL we need to query the database
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=" +
      APIKey +
      "&units=imperial";

    // We then created an AJAX call
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {

      $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
      $(".humidity").text("Humidity: " + response.main.humidity + "%");
      $(".temp").text("Temp: " + response.main.temp + " ºF");

      var lat = response.coord.lat;

      var lon = response.coord.lon;

      var uvUrl =
        "http://api.openweathermap.org/data/2.5/uvi?lat=" +
        lat +
        "&lon=" +
        lon +
        "&appid=" +
        APIKey;

      $.ajax({
        url: uvUrl,
        method: "GET",
      }).then(function (response) {
        $(".uvIndex").text("UV Index: " + response.value);
      });
      var date = new Date(response.dt * 1000).toLocaleDateString();
      var weatherIcon = response.weather[0].icon;
      var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";

      $.ajax({
        url: iconURL,
        method: "GET",
      }).then(function (response) {});

      $(".city").html("<h3>" + response.name + " (" + date + ")" + "<img src=" + iconURL + ">");
    });
  }

  function fiveDay(city) {
    fiveDayCont.style.display = "block";

    var fiveDayQueryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "&appid=" +
      APIKey +
      "&units=imperial";

    $.ajax({
      url: fiveDayQueryURL,
      method: "GET",
    }).then(function (response) {

  console.log(response);      

      $(".zeroDate").html(new Date(response.list[3].dt * 1000).toLocaleDateString());
      $(".zeroIcon").html("<img src=" +"https://openweathermap.org/img/wn/" + response.list[3].weather[0].icon + ".png"+ ">");
      $(".zeroTemp").text("Temp: " + response.list[3].main.temp + " ºF");
      $(".zeroHumidity").text("Humidity: " + response.list[3].main.humidity + "%");

      $(".oneDate").html(new Date(response.list[11].dt * 1000).toLocaleDateString());
      $(".oneIcon").html("<img src=" +"https://openweathermap.org/img/wn/" + response.list[11].weather[0].icon + ".png"+ ">");
      $(".oneTemp").text("Temp: " + response.list[11].main.temp + " ºF");
      $(".oneHumidity").text("Humidity: " + response.list[11].main.humidity + "%");

      $(".twoDate").html(new Date(response.list[19].dt * 1000).toLocaleDateString());
      $(".twoIcon").html("<img src=" +"https://openweathermap.org/img/wn/" + response.list[19].weather[0].icon + ".png"+ ">");
      $(".twoTemp").text("Temp: " + response.list[19].main.temp + " ºF");
      $(".twoHumidity").text("Humidity: " + response.list[19].main.humidity + "%");

      $(".threeDate").html(new Date(response.list[27].dt * 1000).toLocaleDateString());
      $(".threeIcon").html("<img src=" +"https://openweathermap.org/img/wn/" + response.list[27].weather[0].icon + ".png"+ ">");
      $(".threeTemp").text("Temp: " + response.list[27].main.temp + " ºF");
      $(".threeHumidity").text("Humidity: " + response.list[27].main.humidity + "%");

      $(".fourDate").html(new Date(response.list[35].dt * 1000).toLocaleDateString());
      $(".fourIcon").html("<img src=" +"https://openweathermap.org/img/wn/" + response.list[35].weather[0].icon + ".png"+ ">");
      $(".fourTemp").text("Temp: " + response.list[35].main.temp + " ºF");
      $(".fourHumidity").text("Humidity: " + response.list[35].main.humidity + "%");
    });
  }

  renderButtons();
  oneDay("Atlanta");
  fiveDay("atlanta");
});
