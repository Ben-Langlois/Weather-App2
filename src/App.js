// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.scss';
import $ from 'jquery';
import * as icons from './icons/icons.js';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { Line, CategoryScale } from 'react-chartjs-2';
import { Chart } from "chart.js/auto";
import { getByDisplayValue } from '@testing-library/react';


const autocompleteKey = '62e93b34c2ee4337b92e9b81d777029a';
const openWeatherKey = 'ad46bca0cb15937504da590a8559bbae';
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const chartSettings = {
  plugins: {
    legend: false             // Hide legend
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,  
        maxTicksLimit: 6
      }
    },
    x: {
      ticks: {
        maxTicksLimit: 8
      }
    }
  }
}

const WeatherApp2 = () => {
  const [location, setLocation] = useState('');
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const [wData, setwData] = useState({});   // General Weather Data
  const [dData, setdData] = useState([]);   // Daily Data
  const [cData, setcData] = useState({      // empty for chart, so it doesnt get mad
    labels: ['empty'],
    datasets: [{
      label: 'temp',
      data: [0]
    }]
  })

  // componentDidMount (essentially)
  useEffect (() => {
    console.log('Mounted');
  }, []);

  // componentDidUpdate
  useEffect (() => {    // Long/Lat updates
    if(lat && long){   // once vals exist (app calls it once mounted aswell oops)
      console.log('location selected');

      handleSubmit();  // pass vals to api func
    }
  }, [long, lat])

  useEffect(() => {     // Weather Data updates
    if(!$.isEmptyObject(wData)){
      // Determining proper SVG
      let mySVG = weatherCheck(wData.id, wData.dt);

      $('#default').css('display', 'none');                         // hide default
      $('#weekly').css('display', 'flex');                          // display dash
      $('#today').css('display', 'grid');                           // display today
      $('#chart').attr('style', 'display: block !important');       // display weather icon on today
      $('#App #dashboard #today #main img').prop('src', mySVG);     // change src to returned svg


      // format wData hourly for chart
      // Labels
      // - contains the next 24 hours from og dt
      // - hours from each dt of e in wData.hourly
      // - should just be 3pm, 4pm, 5pm, 6pm etc
      let times = [];
      wData.hourly.map((e, i) => {
        times[i] = getTime(e.dt, 'time')
      })

      // Data
      // - temp for each e in wData.hourly
      let temps = []
      wData.hourly.map((e, i) => {
        temps[i] = Math.round(e.temp);
      })

      setcData({
        labels: [...times],
        datasets: [{
          label: 'temp',
          data: [...temps]
        }]
      })

      setdData([
        ...wData.daily
      ])
    }
  }, [wData]);

  const onPlaceSelect = (value) => {
    // console.log(value);

    // on location select (not 'x')
    if(value) {  // this ensures actual place is selected
      setLong(value.properties.lon);
      setLat(value.properties.lat);
      setLocation(value.properties.formatted);
    }
  }

  // Handles submission of location to second API
  const handleSubmit = () => {
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=alerts&appid=${openWeatherKey}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data);

      setwData({    // gather weather data into state
        main: data.current.weather[0].main,
        desc: data.current.weather[0].desc,                // Do i need this?
        id: data.current.weather[0].id,
        dt: data.current.dt,
        clouds: data.current.clouds,
        feelsLike: Math.round(data.current.feels_like),
        humidity: data.current.humidity,
        pressure: data.current.pressure,
        sunrise: data.current.sunrise,
        sunset: data.current.sunset,
        temp: Math.round(data.current.temp),
        uvi: data.current.uvi,
        windspeed: data.current.windspeed,                 // Do i need this?
        zoneShift: data.timezone_offset,                   // Do i need this?

        daily: data.daily,
        hourly: data.hourly.slice(0, 24)                   // limiting to 24 hours
      })

      console.log(data)
    })
    .catch(err => {
      console.error('Call Failed', err)
    })
  }

  /*  getTime
    params
      {dt}: unix time thingy
      {shift}: zone-shift variable 
      {rv}: return value
    returns
      {date}: shortened converted date (11:30, 03:20 etc)
  */
  const getTime = (dt, rv) => {
    let time = dt * 1000,
        date = new Date(time);

    if(rv === 'time'){  // if user requests the time
      if(date.getHours() > 12){
        return (date.getMinutes() < 10 ? `${date.getHours() - 12}:0${date.getMinutes()} pm` : `${date.getHours() - 12}:${date.getMinutes()} pm`)
      } else {
        return (date.getMinutes() < 10 ? `${date.getHours()}:0${date.getMinutes()} am` : `${date.getHours()}:${date.getMinutes()} am`)
      }
    } else if(rv === 'day'){  // if user requests the day 
      return weekdays.slice(date.getDay(), date.getDay() + 1) // returns day of the week corresponding to dt
    }
  }

  /*  isDay
      params
        {dt}: unix time thingy
      returns
        {bool}: day = true, night = false
  */
  const isDay = (dt) => {
    let time = dt * 1000,       
    date = new Date(time);    // getting date object

    if (date.getHours >= 7 && date.getHours <= 19){ // if between 7am and 7pm
      return true;    // true == day
    }
    return false;     // false == night
  }

  /*  weatherCheck(number)
      param 
        {number}: props.main, >=1 digit number
      returns  
        {svg}: icons.xxxxx
      
      determines svg to return based on inputted number
  */ 
  const weatherCheck = (daily, dt) => {   
    // use regex to determine what number daily starts with
    if(/^2/.test(daily.toString())){              // Thunderstorms  
      return daily === 201 ? icons.rainThunderstorm : icons.thunderstormsDefault;
    } else if (/^3/.test(daily.toString())){      // Drizzle
      return icons.drizzle;
    } else if (/^5/.test(daily.toString())){      // Rain
      return daily === 502 ? icons.heavyRain : icons.rainDefault;
    } else if (/^6/.test(daily.toString())){      // Snow
      return icons.snowDefault;
    } else if (/^7/.test(daily.toString())){      // Fog
      return isDay(dt) ? icons.fogDay : icons.fogNight;
    } else if (daily === 800){                    // Clear
      return isDay(dt) ? icons.clearDay : icons.clearNight;
    } else if (/^8/.test(daily.toString())){      // Cloudy
      return icons.cloudyDefault;
    }
  }

  return (
    <div id="App">
      <header id="search-bar">
          <GeoapifyContext id='input-container' apiKey={autocompleteKey}>
            <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
              // type={type}
              // lang={language}
              // position={position}
              // countryCodes={countryCodes}
              // limit={limit}
              // value={displayValue}
              placeSelect={onPlaceSelect}
              // suggestionsChange={onSuggectionChange}
            />
          </GeoapifyContext>          
      </header>
      <div id='dashboard'>
        <div id='default' class='main'>
          <div id='icon'>
            <img src={icons.clearDay} alt=''/>
          </div>
          <div id='title'>
            <h1>Weather<br/>App II</h1>
          </div>
          <div id='desc'>
            <p>
              A Weather Dashboard application, created by <a href='https://ben-langlois.github.io/Portfolio/'>Ben Langlois</a>, aimed to display weather statistics for inputted city. The application is
              built in React and SASS, it utilizes multiple APIs such as: <a href='https://www.geoapify.com/address-autocomplete'>GeoApify</a>, and <a href='https://openweathermap.org/api/one-call-3'>OpenWeatherMap API</a>.<br/><br/>
              The application allows users to search for the weather in a specific city and displays the current weather conditions along with hourly and weekly 
              forecasts. Cards display temperatures and various stats such as: humidity, precipitation, sunrise/set etc.
            </p>
            <div id='socials'>
              <a href='https://github.com/Ben-Langlois/Weather-App2'><img src={icons.github}/></a>
              <a href='https://www.linkedin.com/in/benjaminlanglois/'><img src={icons.linkedin}/></a>
            </div>
          </div>
        </div>      
        <div id='today' class='main'>
          <div id='main'>
            <img src='...' alt=''/>
            <h1 id='temp'>{wData.temp}<p class='degree'>&#8451;</p></h1>
          </div>
          <div id='details'>
            <h1 id='desc'>{wData.main}</h1>
            <h2 id='location'>{location}</h2>
          </div>
          <div id='stats'>
            <h3 id='feelsLike'>Feels like {wData.feelsLike}<p class='degree'>&#8451;</p></h3>
            <h3 id='asOf'>As of {getTime(wData.dt, 'time')}</h3>
            <div id='etc'>
              <div id='uvi' className='etc' title='Cloud Coverage'> {/* should eventually convert css to reflect actual value*/}
                <img src={icons.clouds} alt='...' />
                <p>{wData.clouds} %</p>
              </div>
              <div id='hum' className='etc' title='Humidity'> 
                <img src={icons.humidity} alt='...'/>
                <p>{wData.humidity} %</p> 
              </div>      
              <div id='sunr' className='etc' title='Sunrise'>
                <img src={icons.sunrise} alt='...'/>
                <p>{getTime(wData.sunrise, 'time')}</p>
              </div>
              <div id='suns' className='etc' title='Sunset'>
                <img src={icons.sunset} alt='...'/>
                <p>{getTime(wData.sunset, 'time')}</p>
              </div>   
            </div>
          </div>
          <div id='hourly'>
            <Line
              id='chart'
              data={cData}
              options={chartSettings}
            />
          </div>
        </div>
        <div id='weekly'>
          <h2>8-Day Forecast</h2>
          {
            dData.map((e, i) => {
              return(
                <div class='dayCard'>
                  <p id='day'>{i == 0 ? 'Today' : getTime(e.dt, 'day')}</p>
                  <img src={weatherCheck(e.weather[0].id, e.dt)} />{/* Will implement getIcon or whatever its called soon */}
                  <p id='temp'>L: {Math.round(e.temp.min)}<p class='degree'>&#8451;</p>&nbsp;H: {Math.round(e.temp.max)}<p class='degree'>&#8451;</p></p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default WeatherApp2;
