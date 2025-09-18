const input = document.getElementById('cityInput');
const form = document.getElementById('weatherForm');
const resultDiv = document.getElementById('weather-result');
const API_KEY = 'd1e34c8fe7600f6587b90b8e32c0f5f8'

const lon = '13.41'
const lat = '52.52'
let refreshPage = 2*60*1000;

 const getWeatherIcon =(code)=>{
  const iconMap ={
     0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
        45: "🌫️", 48: "🌫️", 51: "🌦️", 53: "🌧️",
        55: "🌧️", 56: "🌧️", 57: "🌧️", 61: "🌧️",
        63: "🌧️", 65: "🌧️", 66: "🌧️", 67: "🌧️",
        71: "🌨️", 73: "🌨️", 75: "❄️", 77: "❄️",
        80: "🌧️", 81: "🌧️", 82: "🌧️", 85: "🌨️",
        86: "🌨️", 95: "⛈️", 96: "⛈️", 99: "⛈️"
  };

  return iconMap[code] || "?";
 }
const fetchWeather = async (city) => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  const     resp = await fetch(url);
  const data = await resp.json()
 
  if(data.cod ===200){
     let lat = data.coord.lat;
     let lon = data.coord.lon
      getHourlyForecast(lat,lon);
    }else{
       document.querySelector('.daily-weather').innerHTML = ''
    }
    return  data; 
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = input.value;
   let erroCode
  fetchWeather(city).then(data=>{
/**
       * display: hour - temp - icon - wind
       * more info: feellike-  wind-  humidity -high -low - long- lat
       */
     console.log('d',data)
    let weatherDescription ;
    let iconCode ;
    let  feelsLike;
     erroCode = data.cod;
     if(data.cod===200){
       weatherDescription = data.weather[0].description;
      iconCode = data.weather[0].icon;
      feelsLike = data.main.feels_like;
     }
    
 //const { humidity, pressure, feels_like, temp_max, temp_min} = data.main
   const timstamp = data.dt;
   const date = new Date(timstamp * 1000);
  
    let hour = date.getHours();
    const minutes = date.getMinutes();
   const temparature = data.main.temp;
   const highTemp = data.main.temp_max;
   const lowTemp = data.main.temp_min;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  
    // Display the weather information 
    hour < 10 ? '0' + hour : hour;
    minutes < 10 ? '0' + minutes : minutes; 
    const amPm = hour >= 12 ? 'PM' : 'AM'; 
    hour = hour %12;
    hour = hour? hour: 12

    resultDiv.innerHTML = `<div class="weather-info">
      <div class='weather-info-nav'>
         <p class='showing-weather'>Showing weather for ${city}, ${data.sys.country}</p>
        <p class='current-time'> As of ${hour}:${minutes} ${amPm}</p>  
      </div>
      <div class='weather-info-details'>
       <span id='temp'>${temparature}</span>
       <span class='deg-cel'>°</span>
       <span id='icon'><img src="${iconUrl}" alt="Weather Icon"/> </span>
       <div class='converter'><button>Fahrenheit</button></div>
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
    ` ;  
 const converterButton = document.querySelector('.converter button');
  let isCelsius = true;   

  const tempSpan = document.getElementById('temp');
  const degCelSpan = document.getElementById('deg-cel');
  converterButton.addEventListener('click',()=>{
    let currentTemp = parseFloat( tempSpan.textContent);
    if(isCelsius){
      // Convert to Fahrenheit'
      if(!document.querySelector(".items-list")){
        
      }
      const fahrenheitTemp = (currentTemp * 9/5) + 32;
      tempSpan.textContent = fahrenheitTemp.toFixed(2);
      const feelsLikeDoc = document.querySelector('.feels-like-deg')
      //degCelSpan.textContent = '°F';
       feelsLike = (feelsLike * 9/5) + 32;
       feelsLikeDoc.textContent = feelsLike.toFixed(2)
      converterButton.textContent = 'Celsius';
       const tempMaxHigh = (highTemp * 9/5) + 32;
       const tempMinLow = (lowTemp * 9/5) + 32;
      const highLowTemp = document.querySelector('.weather-info-description p:nth-child(2)');
       
     if(document.querySelector(".items-list")){
        const tempHigh = document.querySelector('.temp-high span:nth-child(2)')
        const tempLow = document.querySelector('.temp-low span:nth-child(2)')
          tempHigh.textContent = `${tempMaxHigh.toFixed(2)}`
          tempLow.textContent = `${tempMinLow.toFixed(2)}`
      
     }
      const feelsLikeDiv = document.querySelector('.feels-like-deg');
    
      highLowTemp.innerHTML = `H: ${tempMaxHigh.toFixed(2)}°, L: ${tempMinLow.toFixed(2)}°`;
    
      isCelsius = false;
    
    }else{
      const celsiusTemp = (currentTemp - 32) * 5/9;
      feelsLike = (feelsLike - 32) * 5/9;
     
      tempSpan.textContent = celsiusTemp.toFixed(2);
       document.querySelector(".feels-like-deg").textContent = feelsLike.toFixed(2)
      //degCelSpan.textContent = '°C';
      
      const highLowTemp = document.querySelector('.weather-info-description p:nth-child(2)');
      highLowTemp.innerHTML = `H: ${highTemp}°, L: ${lowTemp}°`;
     
       if(document.querySelector(".items-list") && converterButton.textContent ==="Celsius"){
         const tempHigh = document.querySelector('.temp-high span:nth-child(2)')
         const tempLow = document.querySelector('.temp-low span:nth-child(2)')
      
      tempHigh.textContent = highTemp.toFixed(2)
     tempLow.textContent = lowTemp.toFixed(2)
     
       
      }
       converterButton.textContent = 'Fahrenheit';
      isCelsius = true;
    }

  });
    // Add event listener to the more details button
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
    resultDiv.innerHTML = `<p class="error">Could not retrieve weather data for "${city}". Please check the city name and try again.</p>`;

  });
    
   input.value = '';  
})

const seeMorDetails = (data) => {
     const visibility = data.visibility;
     const windSpeed = data.wind.speed;
    const { humidity, pressure, feels_like, temp_max, temp_min} = data.main
 const ul = document.createElement('div');
 ul.classList.add(('items-list'));
 ul.innerHTML = `
   <p>Weather today in ${data.name}, ${data.sys.country}</p>
   <div class='pres-sunrise-set'>
      <div class='feels-like'> <div class='feels-like-text'>Feels Like:</div>
      <div ><span class='feels-like-deg'>${(feels_like)}</span><span class='deg-cel deg'>°</span>
      </div>
      </div>
      <div class='sunrise-set'>
      <span class='sunrise'>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</span> |
      <span class='sunset'>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</span>
      </div>
  </div> 
  <div class='details-divider'> 
    <div class="info-divider">
      <div class="hibh-low-temp sub-info">
        <div class='temp-high'><span>High:</span><span>${temp_max}</span><span>°</span></div>
        <div class='temp-low'><span>Low:</span><span >${temp_min}</span><span>°</span></div>
      </div>
      <div class='sub-info'> <span >Humidity:</span><span>${humidity}%</span></div>
      <div class='sub-info ><span>Pressure: </sapn><span>${pressure} hPa</span></div>
      <div class='sub-info > <span>Visibility:</span> <span>${visibility} meters</span></div>
    </div>
    <div class="info-divider">
      <div class='sub-info'> <span>Wind: </span><span>${windSpeed}m/s</span></div>
      <div class='sub-info'><span>Longitude:</span> <span> ${(data.coord.lon).toFixed(2)}</span></div>
      <div class='sub-info'><span>Latitude:</span><span>${(data.coord.lat).toFixed(2)}</span></div>
    </div> 
  </div>
 `;
 resultDiv.appendChild(ul);
}

// let isCelsius = true;
// const converter=(temp)=>{
//   if(isCelsius){
//     // Convert to Fahrenheit
//     const fahrenheitTemp = (temp * 9/5) + 32;
//     return fahrenheitTemp.toFixed(2);
   
//   }else{
 
//     const celsiusTemp = (temp - 32) * 5/9;
//    return celsiusTemp.toFixed(2);
    
//   }
    
// }



//WILL COMEBAC TO SET INTERVAL
// setInterval(
//   fetchWeather, (refreshPage));

// Note: Replace  
// const YOUR_API_KEY = 'your_openweathermap_api_key_here';
// with your actual OpenWeatherMap API key.     
 
  const getHourlyForecast =  async(lon, lat)=>{
 const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${API_KEY}`
 const resp = await fetch(url)
 const respons = await resp.json()
 const hourly  = respons.hourly.slice(0, 24)
    let hourlyList =``
   let hourlyView = ``
   let feelsLike = '';
   let windSpeed = ''
   let humidity = ''
   const feels = [];
    const wind = [];
    const humid = [];
    const tp = []

    hourly.forEach((hour,i) =>{
      
      const date = new Date(hour.dt *1000)
      let hours = date.getHours();
     let minutes = date.getMinutes()
      let description= hour.weather[0].description;
      let icon = hour.weather[0].icon
      let amPm = hours >= 12 ? 'PM' : 'AM';
       minutes = minutes < 10 ? "0"+ minutes : minutes
      hours = hours%12;
      hours = hours ? hours: 12;
      const temp = hour.temp;
      humidity = hour.humidity;
      feelsLike = hour.feels_like
     windSpeed = hour.wind_speed;
     
          feels.push(hour.feels_like)
          humid.push(hour.humidity)
          tp.push(hour.temp)
          wind.push(hour.wind_speed)
          
      const weatherIcon = `http://openweathermap.org/img/wn/${icon}.png`
      //  hourlyList += `<div class='hourly-list'>
      //  <div>
      //    <span>${hours}</span>${description}</span><span>°C</span></span>
      //     <span>${temp}</span><span>°C</span>
      //     <span>${icon}</span>
      //     <span>${description}</span>
      //     <span>${windSpeed}</span><span>m/s.</span>
      //    </div>
      //  </div>`
     hourlyView += `
       <div class='detail-summary' data-set-id="${i}">
         <div>${hours}:${minutes} ${amPm}</div>
        <div>${temp} <span>°</span></div>
        <div><img src="${weatherIcon}" alt="${getWeatherIcon(i)}" class='weather-icon'/></div>
       <div>${description}</div>
        <div>${windSpeed}<span>m/s</span></div>
        <div>
        <button class='display-more-info' id='${i}'>+</button>
        </div>
       </div>
       `



    })

  const hourlyForcastHeaders = `
       <div class='hourly-forcast-headers'>
         <div class='time'>Time</div>
         <div class='temp'>Temp(°C)</div>
         <div class='icon'>Icon</div>
         <div class='humidity'>Description</div>
         <div class='wind'>wind</div>
         <div class='more'>More</div>
         </div>`
   document.querySelector('.daily-weather').innerHTML = `${ hourlyForcastHeaders+hourlyView}`

    const moreInfo = document.querySelectorAll('.display-more-info')
     const moreInfoArray = Array.from(moreInfo)
     moreInfoArray.forEach((btn ,i)=>{
      const hourlyMoreInfo  = `<div>
         <div> feelslke: ${tp[i]}</div>
         <div> feelslke: ${feels[i]}</div>
         <div>wind: ${wind[i]}</div>
         <div>himidity: ${humid[i]}</div>
         <div> high </div>
         <div>low</div>
         <div>lat: ${lat}</div>
         <div>lon: ${lon} </div>
        </div>` 
      btn.addEventListener('click',()=>{
        const daily =   Array.from( document.querySelectorAll(".detail-summary"))   
          const  appendDetailToParent = btn.parentNode.parentNode
        const div = document.createElement('div')
        div.classList.add("more-info-div")
        div.innerHTML = hourlyMoreInfo
    
   
      console.log( appendDetailToParent.lastElementChild)
      const children = Array.from( appendDetailToParent.children)
       
      children[children.length] = hourlyMoreInfo
      console.log(children)
      
      })
     })
}

 
