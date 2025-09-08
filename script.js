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
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    console.log(iconUrl)
    // Display the weather information 
    hour < 10 ? '0' + hour : hour;
    minutes < 10 ? '0' + minutes : minutes; 
    const amPm = hour >= 12 ? 'PM' : 'AM'; 

    //will come back to this to add farenheit
    //<span id='deg-fah'> | ${farenheit.toFixed(2)} °F</span>
    resultDiv.innerHTML = `<div class="weather-info">
      <div class='weather-infor-nav'
     <p>${city}, ${data.sys.country}</p>
      <p> As of ${hour}:${minutes} ${amPm}</p>  
      </div>
      <div class='weather-info-details'>
       <span id='temp'>${temparature}</span>
       <span id='deg-cel'>°</span>
       <span id='icon'><img src="${iconUrl}" alt="Weather Icon"/> </span>
      </div>
      <div class='weather-info-description'>
       <div class='description-items'>
        <p>${weatherDescription}</p>
        <p>H: ${highTemp}°, L: ${lowTemp}°</p> 
        </div>
        <div class='description-items'>
        <button class='more-details'>+</button>
        </div>
       </div
    </div>
    `;

    const moreDetailsButton = document.querySelector('.more-details');
moreDetailsButton.addEventListener('click',()=>{
  if(moreDetailsButton.textContent === '+'){
seeMorDetails(data);
moreDetailsButton.textContent = '-' 
}else{
 const ul = document.querySelector('.items-list');
 ul.remove();
 moreDetailsButton.textContent = '+'
}

});
     
  }).catch(error=>{
    console.error('Error fetching weather data:', error);
    resultDiv.innerHTML = `<p class="error">Could not retrieve weather data for "${input.value}". Please check the city name and try again.</p>`;

  });
    
   input.value = '';  
})


const seeMorDetails = (data) => {
  //  const humidity = data.main.humidity;
     
  //   const pressure = data.main.pressure;
  //   const feelsLike = data.main.feels_like;
     const visibility = data.visibility;
     const windSpeed = data.wind.speed;
    const { humidity, pressure, feels_like, temp_max, temp_min} = data.main

    // Clear previous details if any
    // const existingDetails = document.querySelector('.more-weather-details');
    // if (existingDetails) {
    //     existingDetails.remove();
    // }
 const ul = document.createElement('div');
 ul.classList.add(('items-list'));

 ul.innerHTML = `
   
   <p>Weather today in ${data.name}, ${data.sys.country}</p>

   <div class='pres-sunrise-set'>
      <div class='feels-like'> <div>Feels Like:</div><div class='feels-like-deg'>${feels_like}°<span id='term'>C</span></div></div>
      <div>
      <span>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</span> |
      <span>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</span>
      </div>
  </div> 
  <div class='details-divider'> 
    <div class="info-divider">

      <div class="hibh-low-temp sub-info">
        <div><span>High:</span><span>${temp_max}°C</span></div>
        <div><span>Low:</span><span>${temp_min}°C</span></div>
      </div>

      <div class='sub-info'> <span >Humidity:</span><span>${humidity}%</span></div>
      <div class='sub-info ><span>Pressure: </sapn><span>${pressure} hPa</span></div>
      <div class='sub-info > <span>Visibility:</span> <span>${visibility} meters</span></div>
    </div>

    <div class="info-divider">
      <div class='sub-info'> <span>Wind: </span><span>${windSpeed}m/s</span></div>
      <div class='sub-info'><span>Longtitude:</span> <span> ${(data.coord.lon).toFixed(2)}</span></div>
      <div class='sub-info'><span>Latitude:</span><span>${(data.coord.lat).toFixed(2)}</span></div>
    
    </div> 
  
  </div>
 `;
 resultDiv.appendChild(ul);

}

// Note: Replace  
// const YOUR_API_KEY = 'your_openweathermap_api_key_here';
// with your actual OpenWeatherMap API key.     
 
