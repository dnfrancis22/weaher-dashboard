$(document).ready(function () {

    var cities = ["Atlanta"];

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
      console.log(queryURL);
      console.log(response);

      $(".city").html("<h3>" + response.name);
      $(".wind").text("Wind Speed: " + response.wind.speed);
      $(".humidity").text("Humidity: " + response.main.humidity);
      $(".temp").text("Temp: " + response.main.temp);
      $(".uvIndex").text("UV Index: " + response.main.temp);
    });

    renderButtons();
  });
  // This is our API key. Add your own API key between the ""
});
