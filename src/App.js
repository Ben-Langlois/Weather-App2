// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.scss';
import $ from 'jquery';
import * as icons from './icons/icons.js';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { Line } from 'react-chartjs-2';

const autocompleteKey = '62e93b34c2ee4337b92e9b81d777029a';
const openWeatherKey = 'ad46bca0cb15937504da590a8559bbae';
var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const WeatherApp2 = () => {
  const [location, setLocation] = useState('');
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  const [wData, setwData] = useState({});

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
      $('#default').css('display', 'none');       // display dash/hide default
      // $('#daily').css('display', 'flex');  


      // format wData hourly for chart
      // Labels
      // - contains the next 24 hours from og dt
      // - hours from each dt of e in wData.hourly
      // - should just be 3pm, 4pm, 5pm, 6pm etc
      let labels = wData.hourly.map((e) => {
        getTime(e, 'time');
      });

      // Dataset
      // - temp for each e in wData.hourly
      // let dataset = [
      //   {

      //   }
      // ]

      // const data = {
      //   labels: labels,
      //   datasets: dataset
      // }
       
      // $('#hourly').append(<Line
      //   data={
      //  labels: wData.dt}
      // />)

      console.log(labels);
    }
  }, [wData]);

  const onPlaceSelect = (value) => {
    console.log(value);

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
        desc: data.current.weather[0].desc,
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
        windspeed: data.current.windspeed,
        zoneShift: data.timezone_offset,          

        daily: data.daily.slice(0.24),
        hourly: data.hourly.slice(0, 24)                   // limiting to 24 hours
      })
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
    } else if(rv == 'day'){  // if user requests the day 
      return weekdays.slice(date.getDay(), date.getDay() + 1) // returns day of the week corresponding to dt
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
        <div id='daily'>
          <div id='default'>
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

          <div id='main'>
            <img src={icons.clearDay} alt=''/>
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
            {/* <Line
              data={wData.hourly}
            /> */}
          </div>
        </div>
        <div id='weekly'>
          This is where weekly data will be displayed
        </div>
      </div>
    </div>
  );
}

export default WeatherApp2;
