const input = document.getElementById('cityInput');
const form = document.getElementById('weatherForm');
const resultDiv = document.getElementById('weatherResult');
const API_KEY = 'd1e34c8fe7600f6587b90b8e32c0f5f8'

const lat = '52.52'
const lon = '13.41'

//`https://api.open-meteo.com/v1/forecast?latitude=${currentLat}&longitude=${currentLon}&current=temperature_2m,wind_speed_10m,weathercode&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode`

//`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}{&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_hum


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
  const meteoDdata = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m,weathercode&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m,weathercode` );
      let meteoValue = await meteoDdata.json();
      let hourlyCode = meteoValue.hourly.weathercode


   console.log('dsssd',meteoValue)
   console.log('hour', meteoValue.hourly)
   console.log('hourlycode', meteoValue.hourly.weathercode)

   // get hourly code then create an url including that code
    // https.....
    //then create an img which is src = url 
   //  

   //const weatherIcon = `http://openweathermap.org/img/wn/${iconCode}.png`

      let currentCode = meteoValue.current.weathercode
      console.log('curre conde ', currentCode)
      let codeUrl = `https://raw.githubusercontent.com/basmilius/weather-icons/master/production/fill/all/${currentCode}.svg`
      const hourlyTime = meteoValue.hourly['time'];
      const hourlyTemp = meteoValue.hourly['temperature_2m'];
      const hourlyHumidity = meteoValue.hourly['relative_humidity_2m'];
      const hourlyWindSpeed = meteoValue.hourly['wind_speed_10m'];
    
      

       const currDate = new Date();
     const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currDate.toLocaleDateString(undefined, options);
    let date = formattedDate.substring(0,22)
    
      let currHours = currDate.getHours();
       let minutes = currDate.getMinutes()
         
        let amPm = currHours >= 12 ? 'PM' : 'AM';
       minutes = minutes < 10 ? "0"+ minutes : minutes
      
       let  hourlyView = ''
      
      
      
       const hourlyForcastHeaders = `
       <div class='hourly-forcast-headers'>
         <div>Hour</div>
         <div>Temperature</div>
         <div>Icon</div>
         <div>Humidity</div>
         <div>wind speed</div>
         </div>`

         for(let i = currHours; i< currHours+24 ; i++){
           console.log('icon ', hourlyCode[i])
           let houryIcon =`http://openweathermap.org/img/wn/${hourlyCode[1]}.png`
         
        let hour = hourlyTime[i].substring(11,13)
        let amPm = hour >= 12 ? 'PM' : 'AM';
      hour = hour%12;
       hour = hour ? hour: 12;
         hourlyView += `
       
  
       <div class='detail-summary' data-set-id="${i}">
    
         <div>${hour} ${amPm}:</div>
        <div>${hourlyTemp[i]} <span>°C</span></div>
        <div><img src="${houryIcon}" alt="${getWeatherIcon(hourlyCode[i])}" class='weather-icon'/></div>
       <div>${hourlyHumidity[i]} <span>%</span></div>
        <div>${hourlyWindSpeed[i]}<span> mph</span></div>
        <div>
        <button class='display-more-info' id='${i}'>+</button>
        </div>
       </div>
      
       `
      
      }


       const hourlyForcastTitle = `<strong>Nex 24h  hours forcast in </strong><span>${city}</span>
       <div> As of ${currHours}:${minutes} ${amPm}</div>
       <h2>${date}</h2>
       `

     hourlyView =  hourlyForcastTitle + hourlyForcastHeaders  + hourlyView
       document.querySelector('.daily-weather').innerHTML = `${hourlyView}`

 let dateString = ''       
    
      for(let i=currHours; i < hourlyTime.length; i++){
      let time = hourlyTime[i]
     
          const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }

// console.log('t',hourlyTime[i].toLocaleDateString(undefined, options))

     
      const date = new Date(time); 
      let hours = currDate.getHours();
      let minutes = currDate.getMinutes();
      const amPm = hours >= 12 ? 'PM' : 'AM'; 
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      
  

    
      dateString = (`At ${hours}: ${minutes} ${amPm}, the temperature is ${hourlyTemp[i]}°C, humidity is ${hourlyHumidity[i]}%, and wind speed is ${hourlyWindSpeed[i]} m/s.`);
     
 
       const hourlyList = `<div class='hourly-list'>
       <div>
         <span>${hours}:</span>${hourlyTemp[i]}</span><span>°C</span></span>
          <span>${hourlyHumidity[i]}</span><span>°C</span>
          <span>${hourlyTemp[i]}</span><span>°C</span>
          <span>${hourlyHumidity[i]}</span><span>%</span>
          <span>${hourlyWindSpeed[i]}</span><span>m/s.</span>
         </div>
       </div>`


      }
  const     data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    return  await data.json();    
}


form.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = input.value;



  fetchWeather(city).then(data=>{
/**
       * display: hour - temp - icon - wind
       * more info: feellike-  wind-  humidity -high -low - long- lat
       */
     const moreInfo = document.querySelectorAll('.display-more-info')
     const moreInfoArray = Array.from(moreInfo)
     moreInfoArray.forEach(btn =>{
      btn.addEventListener('click',()=>{
        
        const daily =    document.querySelector(".detail-summary")
        
          const  appendDetailToParent = btn.parentNode.parentNode
        console.log('ap',appendDetailToParent)
        const hourlyMoreInfo  = `<div>
         <div> feelslke</div>
         <div>wind</div>
         <div>himidity</div>
         <div> high</div>
         <div>low</div>
         <div>lon/div>
         <div>lat</div>
        </div>`   
      })
     })

     // hourlyForcast(meteoValue)
    const  weatherDescription = data.weather[0].description;
    const  iconCode = data.weather[0].icon;
  let  feelsLike = data.main.feels_like;
  
 //const { humidity, pressure, feels_like, temp_max, temp_min} = data.main
  
   const timstamp = data.dt;
   
   const date = new Date(timstamp * 1000);
   
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString(undefined, options);
  
    const hour = date.getHours();
    const minutes = date.getMinutes();
   const temparature = data.main.temp;
   const highTemp = data.main.temp_max;
   const lowTemp = data.main.temp_min;
    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
  
    // Display the weather information 
    hour < 10 ? '0' + hour : hour;
    minutes < 10 ? '0' + minutes : minutes; 
    const amPm = hour >= 12 ? 'PM' : 'AM'; 

    
    resultDiv.innerHTML = `<div class="weather-info">
      <div class='weather-infor-nav'
     <p>Showing weather for ${city}, ${data.sys.country}</p>
      <p> As of ${hour}:${minutes} ${amPm}</p>  
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
    resultDiv.innerHTML = `<p class="error">Could not retrieve weather data for "${input.value}". Please check the city name and try again.</p>`;

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
      <div class='feels-like'> <div>Feels Like:</div>
      <div ><span class='feels-like-deg'>${(feels_like)}</span><span class='deg-cel deg'>°</span>
      </div>
      </div>
      <div>
      <span>Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</span> |
      <span>Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</span>
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
let isCelsius = true;
const converter=(temp)=>{
  if(isCelsius){
    // Convert to Fahrenheit
    const fahrenheitTemp = (temp * 9/5) + 32;
    return fahrenheitTemp.toFixed(2);
   
  }else{
 
    const celsiusTemp = (temp - 32) * 5/9;
   return celsiusTemp.toFixed(2);
    
  }
    
}

const hourlyForcast =  async(data)=>{

}
// Note: Replace  
// const YOUR_API_KEY = 'your_openweathermap_api_key_here';
// with your actual OpenWeatherMap API key.     
 
