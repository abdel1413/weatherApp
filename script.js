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
 
   console.log('code',data.cod, typeof data.cod)
   const converterB = document.querySelector(".converter button");
   const dailyForecast = document.querySelector(".daily-forcast")
   let weatherRes = document.querySelector("#weather-result")
  if(data.cod ===200){
     let lat = data.coord.lat;
     let lon = data.coord.lon
     converterB.style.display ='block'
     dailyForecast.style.display= 'block'
     weatherRes.style.display= 'block'
     
     getHourlyForecast(lat,lon);
    }else if(data.cod ==="404"){
      converterB.style.display = 'none'
      dailyForecast.style.display= 'none'
      weatherRes.style.display= 'none'
      
    document.querySelector(".hourly-forecast-elements").innerHTML = ""
    }
    return  data; 
}


 let isCelsius = true;   
form.addEventListener('submit', function(event) {
     
    event.preventDefault();
   
    const city = input.value;
   
  fetchWeather(city).then(data=>{
/**
       * display: hour - temp - icon - wind
       * more info: feellike-  wind-  humidity -high -low - long- lat
       */
  
    let weatherDescription ;
    let iconCode ;
    let  feelsLike;
    
     if(data.cod===200){
       weatherDescription = data.weather[0].description;
      iconCode = data.weather[0].icon;
      feelsLike = data.main.feels_like;
     
    
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
    console.log('dsdsdsfasd',document.querySelector(".input").value)
    resultDiv.innerHTML = `<div class="weather-info">
      <div class='weather-info-nav'>
         <p class='showing-weather'>Showing weather for ${city}, ${data.sys.country}</p>
        <p class='current-time'> As of ${hour}:${minutes} ${amPm}</p>  
      </div>
      <div class='weather-info-details'>
       <span id='temp' class='temp'>${temparature}</span>
       <span class='deg-cel'>°</span>
       <span id='icon'><img src="${iconUrl}" alt="Weather Icon"/> </span>
       
      </div>
      
      <div class='weather-info-description'>
       <div class='description-items'>
        <p>${weatherDescription}</p>
        <div class='high-low-temp'>
        <div> H:<span class='high-temp temp'>${highTemp}</span><span>°</span> </div>
        <div> L:<span class='low-temp temp'>${lowTemp}</span><span>°</span></div> 
        </div>
        </div>
        <div class='description-items'>
        <button class='more-details'>+</button>
        </div>
       </div
    </div>
    ` ;  
 const converterButton = document.querySelector('.converter button');  
  converterButton.addEventListener('click',()=>{
    console.log('item list in btn', document.querySelector(".items-list"))
  
     let allTemps=  document.querySelectorAll('.temp')
      converter(allTemps)
    //

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
}   
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
   
      
    
    console.log('fll lllikkk', data.main.feels_like, typeof data.main.feels_like)
 const ul = document.createElement('div');
 ul.classList.add(('items-list'));
 ul.innerHTML = `
   <p>Weather today in ${data.name}, ${data.sys.country}</p>
   
   <div class='pres-sunrise-set'>
       <div class='feels-like'>
            <div class='feels-like-text'>Feels Like: </div>
            <div >
              <span class='feels-like-deg '>${data.main.feels_like}</span> 
              <span class='deg-cel deg'>°</span>
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
        <div class='temp-high'><span>High:</span><span class='temp'>${temp_max}</span><span>°</span></div>
        <div class='temp-low'><span>Low:</span><span class='temp' >${temp_min}</span><span>°</span></div>
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
const converter=(temp)=>{
    const feelslike = (document.querySelector(".feels-like-deg"))
   let fellsLikeTx = parseFloat(feelslike.textContent)
  Array.from(temp).forEach(t =>{
    

      let currTemp = parseFloat(t.textContent)
    
    if(isCelsius){
      let rtext =   (fellsLikeTx *9/5)+ 32;
      const allTempFah = (currTemp * 9/5) +32 ;
       t.textContent = toFixedFunction(allTempFah);
       feelslike.textContent = toFixedFunction(rtext)
       isCelsius = false;
       document.querySelector(".converter button").textContent = "Celsius"
    }else{
      const allTempCel = (currTemp -32) * 5/9
      const rcelText = (fellsLikeTx -32) * 5/9
      t.textContent = toFixedFunction(allTempCel);
      feelslike.textContent = toFixedFunction(rcelText)
      isCelsius = true;
      document.querySelector(".converter button").textContent = "Fahrenheit"
    }

   })
      
}

 const toFixedFunction  = (num)=>{
  return num.toFixed(2);
 }

//WILL COMEBAC TO SET INTERVAL
// setInterval(
//   fetchWeather, (refreshPage));

// Note: Replace  
// const YOUR_API_KEY = 'your_openweathermap_api_key_here';
// with your actual OpenWeatherMap API key.     
 
  const getHourlyForecast =  async(lon, lat)=>{
    const cit = document.querySelector('.input')
    console.log('cit', cit)
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
 let hourlyInfo =   document.querySelector('.hourly-forecast-elements');
 console.log('hourli info',hourlyInfo)
  hourlyInfo.innerHTML = ""
    console.log('input', input.value)
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
      
     hourlyView = `
       <div class='detail-summary' data-set-id="${i}">

       <div class='details'>
            <div>${hours}:${minutes} ${amPm}</div>
            <div > <span class='temp'>${temp}</span><span>°</span></div>
            <div><img src="${weatherIcon}" alt="${getWeatherIcon(i)}" class='weather-icon'/></div>
          <div>${description}</div>
            <div>${windSpeed}<span>m/s</span></div>
          <button class='display-more-info-btn' id='${i}'>+</button> 
       </div>
       <div class=''>
          <div class='hourly-more-info' id='${i}'></div>
       </div>
       </div>
       `
      hourlyInfo. innerHTML += `${hourlyView}`
    })


    let moreInfoBtn = document.querySelectorAll('.display-more-info-btn')
    
     const moreInfoArray = Array.from(moreInfoBtn)
      
     moreInfoArray.forEach((btn ,i)=>{
     
       btn.addEventListener('click',()=>{

          
     
          displayHouryMoreInfo(btn.id)
      
      
      })
     })



     
     const displayHouryMoreInfo = (id)=>{ 
        id = Number(id)
     
       const hourlyMoreInfo  = `<div>
           <div> feelslke: ${tp[id]}</div>
           <div> feelslke: ${feels[id]}</div>
           <div>wind: ${wind[id]}</div>
           <div>himidity: ${humid[id]}</div>
           <div> high </div>
           <div>low</div>
           <div>lat: ${lat}</div>
           <div>lon: ${lon} </div>
          </div>` 
          const  allMoreInfo = Array.from(document.querySelectorAll('.hourly-more-info'))
        let moreInfoBtn = Array.from(document.querySelectorAll('.display-more-info-btn'))
       
           allMoreInfo.forEach(el =>{
            
            if(id === Number(el.id) ){
              if(moreInfoBtn[id].textContent === "+"){
                 el.innerHTML = `${hourlyMoreInfo}`
                moreInfoBtn[id].textContent = "-" 
                
              }else{
               el.innerHTML =''
                moreInfoBtn[id].textContent = "+"
              }
            }
            })
           
     }
}

 