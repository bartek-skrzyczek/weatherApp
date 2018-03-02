$(document).ready(function(){
  $.getJSON('https://freegeoip.net/json/').done(function(location){

    //var country = $('#country').html(location.country_name);
    var defaultCity = location.city;
    var city = defaultCity;

    $.ajax({
       url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&appid=9dba112118cf4676909c78c0a170e22e",
        type: "GET",
        dataType: "jsonp",
        success: function(data){
        var widget = showResults(data)
        $("#showWeather").html(widget);
      }
    });
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=metric" + "&appid=9dba112118cf4676909c78c0a170e22e",
        type: "GET",
        dataType: "jsonp",
        success: function(data){

            var div = '';
            for(var i = 0; i < 8; i++){
              console.log(data.list.length);
              var averageTemp ="";

                div += "<div>";

                div += "<td><img src='https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'></td>";
                div += "<td>" + data.list[i].weather[0].main + "</td>";
                div += "<td>" + data.list[i].weather[0].description + "</td>";
                div += "<td>" + data.list[i].main.temp + "</td>";
                div += "</tr>";
            }

            $("#forecastWeather").html(div);
            $("#header").html(header);

            $("#city").val('');
            $("#days").val('')

        }


    });
  });
});

$(document).ready(function(){
  $("#submitCity").click(function(){
    var a = getWeather();
    var b = getForecast();
    return a & b;
  });
});

function getWeather(){
    var city = $("#city").val();
    if(city != ''){

        $.ajax({
           url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&appid=9dba112118cf4676909c78c0a170e22e",
            type: "GET",
            dataType: "jsonp",
            success: function(data){
                var widget = showResults(data)
                $("#showWeather").html(widget);
                $("#city").val('');
            }
        });


    }else{
      // error here
    }


};

function showResults(data){

  $(document).on("click", "#celsius-value", function(e) {
    $('#temperature-value').html(data.main.temp);
    $('#celsius-value').addClass('active');
    $('#kelvin-value').removeClass('active');
  });

  $(document).on("click", "#kelvin-value", function(e) {
    calculateKelvin();
    $('#kelvin-value').addClass('active');
    $('#celsius-value').removeClass('active');
  });

  function calculateKelvin() {
    var temp_val = document.querySelector("#temperature-value").innerText;
    var k = document.getElementById('kelvin-value').innerText,
        c =  data.main.temp;

        function cToK() {
          var k = c - 273.15;
          //console.log(temp_val);
        //  return temp_val.html(C);
          $('#temperature-value').html(k);
        };
        cToK();

  }

  var time = new Date();
  var timestamp = time.getHours() + ":" + time.getMinutes();

//populate here more weather description
  if (data.main.temp > 0) {
    var weatherIcon = "<i class='wi wi-night-sleet'></i>";

    var weatherDescription = "<div class='bg-weather-wrapper bg-freezing font-white'>It is cold outside! Stay warm!</div>";
  };

  if (data.main.temp < 0) {
    var weatherIcon = "<i class='wi wi-night-sleet'></i>";

    var weatherDescription = "<div class='bg-weather-wrapper bg-freezing font-white'>It is freezing outside! Stay warm!</div>";
  };

  if (data.main.temp < -1) {
    var weatherIcon = "<i class='wi wi-night-sleet'></i>";

    var weatherDescription = "<div class='bg-weather-wrapper bg-freezing'>It is freezing outside! Stay warm!</div>";
  };

  return  "<h1>" + data.name + ", " + "<span id='country'>" + data.sys.country + "</span>" + "</h1>" +

          "<div class='timestamp'>" + timestamp + "<div>" +
          "<div class='row'>" +
          "<div class='col data-current-main'>" +
          "<h3>" + data.weather[0].main+"</h3>" + weatherIcon +
          "<h3><img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png'> " + data.weather[0].description+"</h3>"+
          "<span>" + "<span id='temperature-value'>" + data.main.temp + "</span>" + "<span id='celsius-value' class='active'>" + " &deg;C" + "</span>" +  " |" + "<span id='kelvin-value'>" + " K" + "</span>" + "</span>" +
          "</div>" +
          "<ul class='col data-current-details'>" +
          "<li>" + "<h3><strong>Pressure</strong>: " + data.main.pressure+" hpa</h3>" + "</li>" +
          "<li>" + "<h3><strong>Humidity</strong>: " + data.main.humidity+"%</h3>" + "</li>" +
          "<li>" + "<h3><strong>Wind Speed</strong>: " + data.wind.speed+"m/s</h3>" + "</li>" +
          "<li>" + "<h3><strong>Wind Direction</strong>: " + data.wind.deg+"&deg;</h3>" + "</li>" +
          "</ul>" +
          "</div>" +
          weatherDescription;
};

function getForecast(){

    var city = $("#city").val();
  console.log('clicked');
    if(city != ''){

        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + "&units=metric" + "&appid=9dba112118cf4676909c78c0a170e22e",
            type: "GET",
            dataType: "jsonp",
            success: function(data){

                var table = '';
                for(var i = 0; i < 8; i++){
                  console.log(data.list.length);
                    table += "<tr>";

                    table += "<td><img src='https://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'></td>";
                    table += "<td>" + data.list[i].weather[0].main + "</td>";
                    table += "<td>" + data.list[i].weather[0].description + "</td>";
                    table += "<td>" + data.list.main.temp + "</td>";


                    table += "</tr>";
                }

                $("#forecastWeather").html(table);
                $("#header").html(header);

                $("#city").val('');
                $("#days").val('')

            }


        });

    }
    else{
      //error here
    }
}
