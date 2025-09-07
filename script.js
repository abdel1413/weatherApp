const input = document.getElementById('cityInput');
const form = document.getElementById('weatherForm');
const resultDiv = document.getElementById('weatherResult');
const YOUR_API_KEY = 'd1e34c8fe7600f6587b90b8e32c0f5f8'
const fetchWeather = async (city) => {
  const meteoDdata = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m" );
      let meteoValue = await meteoDdata.json();
      console.log('meteoValue',meteoValue) 
  const     data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${YOUR_API_KEY}&units=metric`);
    return  await data.json();    
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = input.value;
  fetchWeather(city).then(data=>{
    console.log(data )
    const  weatherDescription = data.weather[0].description;
    const  iconCode = data.weather[0].icon;
  const feelsLike = data.main.feels_like;
  const farenheit = (feelsLike * 9/5) + 32;
   console.log( 'fa',farenheit)
   const timstamp = data.dt;
   console.log('ts',timstamp)
   const date = new Date(timstamp * 1000);
    console.log('date',date)
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
    console.log('formattedDate',formattedDate)
    const hour = date.getHours();
    const minutes = date.getMinutes();
   const temparature = data.main.temp;
   const highTemp = data.main.temp_max;
   const lowTemp = data.main.temp_min;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    console.log(iconUrl)
    // Display the weather information 
    hour < 10 ? '0' + hour : hour;
    minutes < 10 ? '0' + minutes : minutes; 
    const amPm = hour >= 12 ? 'PM' : 'AM';  
    resultDiv.innerHTML = `<div class="weather-info">
      
     <p>${city}, ${data.sys.country}</p>
      <p> As of ${hour}:${minutes} ${amPm}</p>  
    </div>

    <h2>Weather today in ${city}</h2>
    <img src="${iconUrl}" alt="Weather Icon">
    <p>Description: ${weatherDescription}</p>
    <p>Temperature: ${temparature} °C</p>
    <p>High: ${highTemp} °C, Low: ${lowTemp} °</p> 
    
    <p>Pressure: ${data.main.pressure} hPa</p>

    <p>Feels Like: ${data.main.feels_like} °C</p>
    <p>Location: ${data.name}, ${data.sys.country}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} m/s</p>
    `;

  
  })
    
  
})
 
