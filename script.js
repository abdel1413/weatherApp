const input = document.getElementById('cityInput');
const form = document.getElementById('weatherForm');
const resultDiv = document.getElementById('weatherResult');
const YOUR_API_KEY = 'd1e34c8fe7600f6587b90b8e32c0f5f8'
const fetchWeather = async (city) => {
    
    const     data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${YOUR_API_KEY}&units=metric`);
    return  await data.json();

    //https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_
}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    const city = input.value;
  fetchWeather(city).then(data=>{
    console.log(data)
  })
    
  
})
 
