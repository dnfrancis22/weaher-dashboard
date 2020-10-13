$(document).ready(function () {
  // This is our API key. Add your own API key between the ""
  var APIKey = "100ea10c1f1db96d42a65493df31b77f";

  // Here we are building the URL we need to query the database
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=Bujumbura,Burundi&appid=" +
    APIKey + "&units=imperial";

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
});
