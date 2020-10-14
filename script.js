$(document).ready(function () {

    var cities = ["Atlanta"];

    fiveDayCont.style.display = "none";

    currentWeather.style.display = "none"

    function renderButtons () {

        for (var i = 0; i < cities.length; i++){
            var button = $("<button>");
            button.text(cities[i]);
            button.addClass("searchBtn")
            $("#buttonArea").prepend(button);
        }

    }

  $("#button-addon2").on("click", function (event) {

    var APIKey = "100ea10c1f1db96d42a65493df31b77f";

    var city = $("#searchField").val();

    currentWeather.style.display = "block"

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
    //   console.log(queryURL);
    //   console.log(response);

      $(".city").html("<h3>" + response.name + response.weather[0].description);
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temp: " + response.main.temp);
      $(".uvIndex").text("UV Index: " + response.main.temp);
    });

    fiveDayCont.style.display = "block";

    var fiveDayQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city +
    "&appid=" +
    APIKey +
    "&units=imperial";

    $.ajax({
        url: fiveDayQueryURL,
        method: "GET",
      }).then(function (response) {
        console.log(queryURL);
        console.log(response);
  
        $(".zeroDate").html(response.list[0].dt_txt);
        $(".zeroIcon").text("icon: " + response.list[0].weather[0].icon);
        $(".zeroTemp").text("Temp: " + response.list[0].main.temp);
        $(".zeroHumidity").text("Humidity: " + response.list[0].main.humidity);

        $(".oneDate").html(response.list[7].dt_txt);
        $(".oneIcon").text("icon: " + response.list[7].weather[0].icon);
        $(".oneTemp").text("Temp: " + response.list[7].main.temp);
        $(".oneHumidity").text("Humidity: " + response.list[7].main.humidity);

        $(".twoDate").html(response.list[15].dt_txt);
        $(".twoIcon").text("icon: " + response.list[15].weather[0].icon);
        $(".twoTemp").text("Temp: " + response.list[15].main.temp);
        $(".twoHumidity").text("Humidity: " + response.list[15].main.humidity);

        $(".threeDate").html(response.list[23].dt_txt);
        $(".threeIcon").text("icon: " + response.list[23].weather[0].icon);
        $(".threeTemp").text("Temp: " + response.list[23].main.temp);
        $(".threeHumidity").text("Humidity: " + response.list[23].main.humidity);

        $(".fourDate").html(response.list[39].dt_txt);
        $(".fourIcon").text("icon: " + response.list[39].weather[0].icon);
        $(".fourTemp").text("Temp: " + response.list[39].main.temp);
        $(".fourHumidity").text("Humidity: " + response.list[39].main.humidity);
        
      });

    renderButtons();
  });
  // This is our API key. Add your own API key between the ""
});