/*
    Icons           https://github.com/basmilius/weather-icons
    ID Codes        https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2 

    - There are some pointless-potential additions, but for now I think having more than the basics is enough

*/
// (id)
// 2xx Thunderstorm
import thunderstormsDefault from './Monochrome/wi_thunderstorms.svg';                     // 211 default
import rainThunderstorm from './Monochrome/wi_thunderstorms-overcast-rain.svg';           // 201 Thunderstorm with rain
import overcastThunderstorm from './Monochrome/wi_thunderstorms-overcast.svg';            // 221 Ragged thunderstorm

// 3xx Drizzle
import drizzle from './Monochrome/wi_drizzle.svg';                    // 300 Default

// 5xx Rain 
import rainDefault from './Monochrome/wi_rain.svg';           // 500 Default
import heavyRain from './Monochrome/wi_extreme-rain.svg';     // 502 Heavy Rain

// 6xx Snow
import snowDefault from './Monochrome/wi_snow.svg';           // 601 Default
// 600 Light Snow
// 602 Heavy Snow
// 616 Rain and Snow

// 7xx Atmosphere 
import fogDay from './Monochrome/wi_fog-day.svg';             // 701 Fog Day
import fogNight from './Monochrome/wi_fog-night.svg';         // 701 Fog Night

// 800 Clear
import clearDay from './Monochrome/wi_clear-day.svg';             // Day    
import clearNight from './Monochrome/wi_clear-night.svg';         // Night

// 80x Clouds
// 801 Few Clouds
// 802 Scattered Clouds
import cloudyDay from './Monochrome/partly-cloudy-day.svg';             // Day
import cloudyNight from './Monochrome/partly-cloudy-night.svg';         // Night
// 803 Clouds 
import overcastDay from './Monochrome/overcast-day.svg';                // Day
import overcastNight from './Monochrome/overcast-night.svg';            // Night
import cloudyDefault from './Monochrome/wi_cloudy.svg';                 // 804 Overcast

// For stats section
import UVI from './stats/wi_uv-index.svg';
import humidity from './stats/wi_humidity.svg';
import sunrise from './stats/wi_sunrise.svg';
import sunset from './stats/wi_sunset.svg';
import clouds from './stats/wi_cloudy.svg';
import high from './stats/wi_thermometer-warmer.svg';
import low from './stats/wi_thermometer-colder.svg';
// Static icons

// Social Icons
import github from './socials/iconmonstr-github-3.svg';
import linkedin from './socials/iconmonstr-linkedin-3.svg';

export {clearDay, clearNight, cloudyDefault, cloudyDay, cloudyNight, overcastDay, overcastNight, drizzle, rainDefault, heavyRain, thunderstormsDefault, rainThunderstorm, overcastThunderstorm, snowDefault, fogDay, fogNight, UVI, humidity, sunrise, sunset, clouds, high, low, linkedin, github};