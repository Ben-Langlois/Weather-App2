// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.scss';
// import React from 'react';
import $ from 'jquery';
// import * as icons from './icons/icons.js';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

const autocompleteKey = '62e93b34c2ee4337b92e9b81d777029a';
const openWeatherKey = 'ad46bca0cb15937504da590a8559bbae';

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
      $('#default').css('display', 'none');
      $('#daily').css('display', 'flex');  
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
      console.log(data.current);

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

        daily: data.daily,
        hourly: data.hourly.slice(0, 24)                   // limiting to 24 hours
      })
    })
    .catch(err => {
      console.error('Call Failed', err)
    })
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
        <div id='default'>
          The default dash, where the desc, icon, etc will go
        </div>
        <div id='daily'>
          {location}<br/>
          {wData.temp}
        </div>
        <div id='weekly'>
          This is where weekly data will be displayed
        </div>
      </div>
    </div>
  );
}

export default WeatherApp2;
