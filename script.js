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
      // $(".city").html("<h3>" + response.name + "<img src=" + iconURL + ">" );
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temp: " + response.main.temp);

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

      var weatherIcon = response.weather[0].icon;
      var iconURL = "https://openweathermap.org/img/wn/" + weatherIcon + ".png";

      $.ajax({
        url: iconURL,
        method: "GET",
      }).then(function (response) {});

      $(".city").html("<h3>" + response.name + "<img src=" + iconURL + ">");
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
      
      // var fWeatherIcon = response.list[0].weather[0].icon;
      // var fIconURL =
      //   "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png";

      // $.ajax({
      //   url: fIconURL,
      //   method: "GET",
      // }).then(function (response) {
      //   console.log(response);
      // });

      $(".zeroDate").html(response.list[0].dt_txt);
      $(".zeroIcon").html("<img src=" +"https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png"+ ">");
      $(".zeroTemp").text("Temp: " + response.list[0].main.temp);
      $(".zeroHumidity").text("Humidity: " + response.list[0].main.humidity);

      $(".oneDate").html(response.list[7].dt_txt);
      $(".oneIcon").html("<img src=" +"https://openweathermap.org/img/wn/" + response.list[7].weather[0].icon + ".png"+ ">");
      $(".oneTemp").text("Temp: " + response.list[7].main.temp);
      $(".oneHumidity").text("Humidity: " + response.list[7].main.humidity);

      $(".twoDate").html(response.list[15].dt_txt);
      $(".twoIcon").html("<img src=" +"https://openweathermap.org/img/wn/" + response.list[15].weather[0].icon + ".png"+ ">");
      $(".twoTemp").text("Temp: " + response.list[15].main.temp);
      $(".twoHumidity").text("Humidity: " + response.list[15].main.humidity);

      $(".threeDate").html(response.list[23].dt_txt);
      $(".threeIcon").html("<img src=" +"https://openweathermap.org/img/wn/" + response.list[23].weather[0].icon + ".png"+ ">");
      $(".threeTemp").text("Temp: " + response.list[23].main.temp);
      $(".threeHumidity").text("Humidity: " + response.list[23].main.humidity);

      $(".fourDate").html(response.list[39].dt_txt);
      $(".fourIcon").html("<img src=" +"https://openweathermap.org/img/wn/" + response.list[39].weather[0].icon + ".png"+ ">");
      $(".fourTemp").text("Temp: " + response.list[39].main.temp);
      $(".fourHumidity").text("Humidity: " + response.list[39].main.humidity);
    });
  }

  renderButtons();
  oneDay("Atlanta");
  fiveDay("atlanta");
});
