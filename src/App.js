// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.scss';
// import React from 'react';
// import $ from 'jquery';
// import * as icons from './icons/icons.js';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

const autocompleteKey = '62e93b34c2ee4337b92e9b81d777029a';
const openWeatherKey = 'ad46bca0cb15937504da590a8559bbae';

const WeatherApp2 = () => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [long, setLong] = useState('');
  const [lat, setLat] = useState('');
  

  // componentDidMount (essentially)
  useEffect (() => {
    console.log('Mounted?');
  }, []);

  // componentDidUpdate
  useEffect (() => {    // Long/Lat updates
    console.log('location selected');

    if(lat && long){   // once vals exist (app calls it once mounted aswell oops)
      handleSubmit();  // pass vals to api func
    }
  }, [long, lat])

  const onPlaceSelect = (value) => {
    console.log(value);

    // clicking the 'x' button also counts as a place selected
    if(value) {  // this ensures actual place is selected
      // storing long/lat
      setLong(value.properties.lon);
      setLat(value.properties.lat);
    }
  }

  // Handles submission of location to second API
  const handleSubmit = () => {
    fetch(`http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&exclude=alerts&appid=${openWeatherKey}`)
    .then(response => response.json())
    .then(data => {     // storing desired API data in state
        console.log(data.current);
        // pooling values in an object so they're readable and state isnt just a top level eval 
        // const propObj = {current: {...data.current}, daily: [...data.daily], hourly: [...data.hourly]};

        // this.setState({     // pulling from obj above 
        //   main: propObj.current.weather[0].main,
        //   desc: propObj.current.weather[0].desc,
        //   id: propObj.current.weather[0].id,
        //   dt: propObj.current.dt,
        //   clouds: propObj.current.clouds,
        //   feelsLike: Math.round(propObj.current.feels_like),
        //   humidity: propObj.current.humidity,
        //   pressure: propObj.current.pressure,
        //   sunrise: propObj.current.sunrise,
        //   sunset: propObj.current.sunset,
        //   temp: Math.round(propObj.current.temp),
        //   uvi: propObj.current.uvi,
        //   windspeed: propObj.current.windspeed,
        //   zoneShift: data.timezone_offset,          

        //   daily: propObj.daily,
        //   hourly: propObj.hourly.slice(0, 24)                   // limiting to 24 hours
        })
      .catch(err => {
        console.error('Call Failed', err)
      })
  }

  return (
    <div className="App">
      <header className="App-header">
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
        {long}&nbsp;{lat}
      </div>
    </div>
  );
}

export default WeatherApp2;
