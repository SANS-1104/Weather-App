let loc = document.getElementById("loc");
let feels = document.getElementById("feels");
let desc = document.getElementById("desc");
let min_max = document.getElementById("min_max");
let humidity = document.getElementById("humidity");
let wind_speed = document.getElementById("wind_speed");
let err = document.querySelector(".error");
let inp = document.querySelector("input");

let submit = document.querySelector(".submit");
let reset = document.querySelector(".reset");
let weather_display = document.querySelector(".visib");



submit.addEventListener("click", ()=>{
    let cityInput = document.getElementById("city");
    let city = cityInput.value;
    if(city == ""){
        alert("Enter City Name");   
    }
    const apiKey = 'b8114d666184008512032410bf565905';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(apiUrl)
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response was not ok");
            }
            return response.json();
        })
        .then(data =>{
            let city2 = city.toUpperCase();
            loc.innerText = `${city2},${data.sys.country}`;
            feels.innerText = `Feels Like ${data.main.feels_like}`;
            desc.innerText = `${data.weather[0].description}`;
            min_max.innerHTML = `${data.main.temp_min}<sub>&deg;</sub>C / ${data.main.temp_max}<sub>&deg;</sub>C`;
            humidity.innerText = `Humidity : ${data.main.humidity}`;
            wind_speed.innerText = `Wind Speed : ${data.wind.speed}`;
            weather_display.classList.remove("visib");
        })
        .catch(error =>{
            cityInput.value = "";
            if(city!=""){
                alert("OOPS! No Such City/ Place Found..");
            }
            console.error('There was a problem fetching weather data:', error);
            
        })
});


reset.addEventListener("click", ()=>{
    let cityInput = document.getElementById("city");
    cityInput.value = "";
    weather_display.classList.add("visib");
});
