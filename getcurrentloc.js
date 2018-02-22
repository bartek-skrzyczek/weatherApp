$(function(){

    var api="http://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=c66ce389498685b7e056d6e9f86891f7";
    var apiKey = '9dba112118cf4676909c78c0a170e22e';
  //var lat;
  //var long;
  var cel =false; //default in F therefore cel = false
  var apiData;
  var data;
  var id;



  function displayTemp(fTemp, c){
    if (c) return Math.round((fTemp-32)*(5/9)) + '&deg; C';//if c===true "cel" being passed into fuction "c"
    return Math.round(fTemp) + '&deg; F'
  }

function render(data, cel){
             var currentLocation=data.name;
              var currentWeather=data.weather[0].description;
              var currentTemp= displayTemp (data.main.temp,cel);
              var high=data.main.temp_max;
              var low= data.main.temp_min;
              var icon=  data.weather[0].icon
              var apiData=data;

              $('#currentTemp').html(currentTemp);
              $('#currentWeather').html(currentWeather);

              var iconSrc= "http://openweathermap.org/img/w/" + icon + ".png"; // get icon code and insert onto end of html +.png to get correct img

              $('#currentTemp').prepend('<img src=' + iconSrc + '>') //Prepend to add icon
}

backgroundImg = [
         'http://cdn.wallpapersafari.com/38/38/gIQnTC.jpg',
         'http://cdn.wallpapersafari.com/45/71/kU3rqZ.jpg',
         'http://cdn.wallpapersafari.com/42/35/tSNz6n.jpg',
         'https://i.ytimg.com/vi/RuqVnqNPyC0/maxresdefault.jpg',
         'https://static.pexels.com/photos/5230/road-fog-foggy-mist.jpg',
         'http://cdn.wallpapersafari.com/31/12/HdVCQF.jpg',
         'http://wall-papers.info/images/cloudy-sky-wallpaper/cloudy-sky-wallpaper-2.jpg',
  ];




 $.getJSON('https://freegeoip.net/json/')
     .done (function(location)
     {
         $('#country').html(location.country_name);
          $('#country_code').html(location.country_code);
          $('#region').html(location.region_name);
          $('#region_code').html(location.region_code);
          $('#city').html(location.city);
          $('#latitude').html(location.latitude);
          $('#longitude').html(location.longitude);
          $('#timezone').html(location.time_zone);
          $('#ip').html(location.ip);


          //console.log(lat);

              $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat='+location.latitude+'&lon='+location.longitude+'&units=imperial&appid=9dba112118cf4676909c78c0a170e22e', function(data){//--->USE HTTPS^

                console.log(data);//Success!!!

                apiData=data;

                render (apiData,cel);

                $('#toggle').click(function(){
                    cel = !cel;
                    render(data,cel);
                })

                var  id = data.weather[0].id,
                    bgIndex,
                   backgroundId = [299, 499, 599, 699, 799, 800]; // beats if else loops! corisponds to index numbers from api

                  backgroundId.push(id);
                  bgIndex = backgroundId.sort().indexOf(id);

              console.log(id);
                $('body').css('background-image', 'url(' + backgroundImg[bgIndex] + ')'); //this works with munual input...

               });



   //alert(location.city); // test information


     });



});
