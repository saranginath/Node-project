const axios = require('axios');
const chalk = require('chalk');
const {OPENWEATHER_API_KEY} = require('./env');

const city = process.argv[2];

if(!city) {
    console.log(chalk.red('Please provide a city name'));
    process.exit(1);
}

const getWeather = async (cityName) =>{
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${OPENWEATHER_API_KEY}&units=metric`;

try{
const response = await axios.get(url);
const weather = response.data;
console.log(chalk.blue.bold(`\n📍 Weather in ${weather.name}, ${weather.sys.country}`));
    console.log(`🌡️ Temperature: ${weather.main.temp}°C`);
    console.log(`🌤️ Condition : ${weather.weather[0].description}`);
    console.log(`💧 Humidity  : ${weather.main.humidity}%`);
    console.log(`🌬️ Wind Speed: ${weather.wind.speed} m/s\n`);
}
catch(err){
    if(err.response && err.response.status === 404){
        console.log(chalk.red('❌ City not found!'));
    } else{
      console.log(chalk.red('⚠️ Error fetching weather data'), err.message);
    }
}
};
getWeather(city)