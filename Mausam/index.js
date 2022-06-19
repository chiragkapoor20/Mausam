// http://api.openweathermap.org/data/2.5/weather?q={place}&units=metric&appid=c17f25de0d9075b3f366f7d82886c341 //API

function fetch() {
  var place = $("#place").val();

  var content = $("#temp-box");

  function dispBox(data) {
    var temp = data.main.temp;

    content.html(`
        <div class='bg-img'></div>
        <div class='wrapper'>
            <div class="container" id='place-box'>
                <h1 class="display-5 mb-5">
                   ${data.name}
                </h1>
            </div>
            <div class="container text-center" id="temp-main">
                <h1 class="display-1 m-0">
                    ${data.main.temp}°C
                </h1>
                <img id="main-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" class="img-fluid" alt="Icon">
                <p class="h3">${data.weather[0].main}</p>
            </div>

            <div class="container" id="temp-details">
                <p class="h5">Feels like : ${data.main.feels_like}°C</p>
                <p class="h5">Minimum Temperature : ${data.main.temp_min}°C</p>
                <p class="h5">Maximum Temperature : ${data.main.temp_max}°C</p>
                <p class="h5">Humidity : ${data.main.humidity}%</p>
                <p class="h5">Wind Speed : ${data.wind.speed}KM/h</p>
            </div>
        </div>
        `);

    var climate = data.weather[0].main;

    $(".bg-img").css("background-image", "url(background/" + climate + ".png)");

    $(document).ready(function () {
      $(".bg-img").css("transform", "scale(1.1)");
      $(".bg-img").css("filter", "brightness(0.6)");
    });

    function dispFood(data1) {

      $("#food-head").html("");
      $("#food-items").html("");

      if (climate == "Rain") {
        $("#food-head").html(
          "Its raining outside!!🌩🌩. Check out these amazing food items if you are hungry"
        );
        for (var i = 0; i < data1.rain.length; i++) {
          $("#food-items").append(`
            <div class="card" style="width: 18rem;">
                <img src="${data1.rain[i].icon}"
                  class="card-img-top" alt="${data1.rain[i].title}">
                <div class="card-body">
                  <h5 class="card-title">${data1.rain[i].title}</h5>
                  <p class="card-text">${data1.rain[i].desc}</p>
                  <a href="${data1.rain[i].recipe}" target="_blank" class="btn btn-primary">Recipe</a>
                </div>
            </div>
          `);
        }
      } else if (temp > 25) {
        $("#food-head").html(
          "We know it must be hot outside and you may also be feeling annoyed. But here is a list of food items which will give you joy"
        );
        for (i = 0; i < data1.summer.length; i++) {
          $("#food-items").append(`
            <div class="card" style="width: 18rem;">
                <img src="${data1.summer[i].icon}"
                  class="card-img-top" alt="${data1.summer[i].title}">
                <div class="card-body">
                  <h5 class="card-title">${data1.summer[i].title}</h5>
                  <p class="card-text">${data1.summer[i].desc}</p>
                  <a href="${data1.summer[i].recipe}" target="_blank" class="btn btn-primary">Recipe</a>
                </div>
            </div>
          `);
        }
      } else if (temp < 25) {
        $("#food-head").html(
          "Take a blanket! Its cold outside. Here, you can make any of these tasty things to keep yourself warm"
        );
        for (i = 0; i < data1.winter.length; i++) {
          $("#food-items").append(`
            <div class="card" style="width: 18rem;">
                <img src="${data1.winter[i].icon}"
                  class="card-img-top" alt="${data1.winter[i].title}">
                <div class="card-body">
                  <h5 class="card-title">${data1.winter[i].title}</h5>
                  <p class="card-text">${data1.winter[i].desc}</p>
                  <a href="${data1.winter[i].recipe}" target="_blank" class="btn btn-primary">Recipe</a>
                </div>
            </div>
          `);
        }
      }
    }

    function errorFunc1(data1) {
      alert("Please use a local server to see all the features!");
    }

    $.ajax({
      url: "foodItems.json",
      method: "get",
      success: dispFood,
      error: errorFunc1,
    });
  }

  function errorFunc(data) {
    alert("Please enter a valid city name!");
  }

  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?",
    method: "get",
    success: dispBox,
    error: errorFunc,
    data: {
      q: place,
      units: "metric",
      appid: "c17f25de0d9075b3f366f7d82886c341",
    },
  });
}
