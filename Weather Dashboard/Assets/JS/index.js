//unique API key generated from openweather
var APIKey = "60f3112a35347e9ec12b982f946307b8";
var lat = "";
var lon = "";
var historyArr = []
//saves to local storage
updateLocalStorage = function (key, data) {
    window.localStorage.setItem(key, data)
}
//search function
var searchWeather = function () {
    var city = document.getElementById("city").value;
    window.city = city
    //updates local storage with history
    historyArr.push(city)
    updateLocalStorage("history", JSON.stringify(historyArr))

    window.localStorage.getItem('user');
    
    var geoData;
    console.log("searching weather: " + city);
    //gets data using API + entered data to fetch weather
    fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey)
        .then(response =>
            response.json()
        )
        .then(data => {
            lat = data[0].lat;
            lon = data[0].lon;

            console.log("This is the requested latitude" + lat);
            geoData = data
            console.log("Call getWeather");

            getWeather(data);
        }
        )

};
var getWeather = function (geoData) {
    console.log("Data inside get weather");
    lat = geoData[0].lat;
    lon = geoData[0].lon;
    //uses coordinates to get weather data from API changed from imperial units to metric
    fetch("https://api.openweathermap.org/data/2.5/onecall?units=metric&lat=" + lat + "&lon=" + lon + "&appid=" + APIKey)
        .then(response =>
            response.json()
        )
        .then(data => {
            console.log(data)
            console.log(data.current.temp)
            console.log(data.current.wind_speed)

            for (var i = 0; i <= 5; i++) { // array starts at 0
                console.log(data.daily[i])
                let getChild = document.getElementById("label-" + i);
                getChild.innerHTML = "";

                //remove children of card-i HERE
                var forcast = document.getElementById("label-" + i)


                var dateStamp = document.createElement("p")
                dateStamp.textContent = new Date(data.daily[i].dt * 1000).toLocaleDateString()
                forcast.append(dateStamp)
                //Temperature data displayed in celcius
                var pElTemp = document.createElement("p")
                pElTemp.textContent = "temp: " + data.daily[i].temp.day + `\u00B0`
                forcast.append(pElTemp)
                //humidity data
                var pElHumidity = document.createElement("p")
                pElHumidity.textContent = `Humidity: ${data.daily[i].humidity} %`
                forcast.append(pElHumidity)
                //wind speed
                var pElWind = document.createElement("p")
                pElWind.textContent = `Wind Speed: ${data.daily[i].wind_speed} KPH`
                forcast.append(pElWind)
                //weather icons 
                var imgElIcon = document.createElement("img")
                imgElIcon.setAttribute("src", `https://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`)
                forcast.append(imgElIcon)
            }
            document.getElementById("current-city").innerHTML = (city);
            document.getElementById("current-temperature").innerHTML = (data.current.temp + `\u00B0`);
            document.getElementById("current-humidity").innerHTML = (data.current.humidity);
            document.getElementById("current-wind").innerHTML = (data.current.wind_speed);
            document.getElementById("current-UV").innerHTML = (data.current.uvi);
        }
        );
};