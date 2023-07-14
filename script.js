const inputBox = document.querySelector('.input');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind-speed');
const locationError = document.querySelector('.location-not-found');
const weatherBody = document.querySelector('.weather-body');

searchBtn.addEventListener("click",()=>{
    checkWeather(inputBox.value);
});

async function checkWeather(city){
  const api_key = "a92810fab2b9635e5143949356e8ec2b";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

  const weather_data = await fetch(`${url}`).then(response =>
    response.json());

    if(weather_data.cod==='404'){
        locationError.style.display="flex";
        weatherBody.style.display="none";
        console.log("error");
        return;
    }
    
    weatherBody.style.display="flex";
    temperature.innerHTML=`${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML=`${weather_data.weather[0].description}`
    humidity.innerHTML=`${weather_data.main.humidity}%`;
    wind.innerHTML=`${weather_data.wind.speed}km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds' :
        weather_img.src="/images/cloudimage.jpg";
        break;
        case 'Clear':
        weather_img.src ="/images/sun.jpg";
        break;
        case 'Rain':
        weather_img.src ="/images/rain.png";
        break;
        case 'Mist':
        weather_img.src ="/images/mist.webp";
        break;
        case 'Snow':
        weather_img.src ="/images/snow.png";
        break;
    }
    console.log(weather_data);
}