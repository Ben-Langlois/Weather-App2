/*
    Icons           https://github.com/basmilius/weather-icons
    ID Codes        https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2 

    - There are some pointless-potential additions, but for now I think having more than the basics is enough

*/
// (id)
// 2xx Thunderstorm
import thunderstormsDefault from './Dynamic/thunderstorms.svg';                     // 211 default
import rainThunderstorm from './Dynamic/thunderstorms-overcast-rain.svg';           // 201 Thunderstorm with rain
import overcastThunderstorm from './Dynamic/thunderstorms-overcast.svg';            // 221 Ragged thunderstorm

// 3xx Drizzle
import drizzle from './Dynamic/drizzle.svg';                    // 300 Default

// 5xx Rain 
import rainDefault from './Dynamic/rain.svg';           // 500 Default
import heavyRain from './Dynamic/extreme-rain.svg';     // 502 Heavy Rain

// 6xx Snow
import snowDefault from './Dynamic/snow.svg';           // 601 Default
// 600 Light Snow
// 602 Heavy Snow
// 616 Rain and Snow

// 7xx Atmosphere 
import fogDay from './Dynamic/fog-day.svg';             // 701 Fog Day
import fogNight from './Dynamic/fog-night.svg';         // 701 Fog Night


// 800 Clear
import clearDay from './Dynamic/clear-day.svg';             // Day    
import clearNight from './Dynamic/clear-night.svg';         // Night


// 80x Clouds
import cloudyDefault from './Dynamic/cloudy.svg';                  // 803 Clouds Default
// 801 Few Clouds
// 802 Scattered Clouds
// 804 Overcast

// For stats section
import UVI from './stats/uv-index.svg';
import humidity from './stats/humidity.svg';
import sunrise from './stats/sunrise.svg';
import sunset from './stats/sunset.svg';
import clouds from './stats/cloudy.svg';
import high from './stats/thermometer-warmer.svg';
import low from './stats/thermometer-colder.svg';
// Static icons

// Social Icons
import github from './socials/iconmonstr-github-3.svg';
import linkedin from './socials/iconmonstr-linkedin-3.svg';

export {clearDay, clearNight, cloudyDefault, drizzle, rainDefault, heavyRain, thunderstormsDefault, rainThunderstorm, overcastThunderstorm, snowDefault, fogDay, fogNight, UVI, humidity, sunrise, sunset, clouds, high, low, linkedin, github};