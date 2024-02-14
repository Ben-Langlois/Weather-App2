// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.scss';
// import React from 'react';
// import $ from 'jquery';
// import * as icons from './icons/icons.js';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

var autocompleteKey = '62e93b34c2ee4337b92e9b81d777029a';



const WeatherApp2 = () => {
  const [city, setCity] = useState('');
  
  // componentDidMount (essentially)
  useEffect (() => {
    console.log('Mounted?')
  }, []);

  const onPlaceSelect = (value) => {
    console.log(value);
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

      </div>
    </div>
  );
}

export default WeatherApp2;
