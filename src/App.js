// import logo from './logo.svg';
import { useState, useEffect } from 'react';

import './App.scss';
import React from 'react';
// import $ from 'jquery';
// import * as icons from './icons/icons.js';
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'

var autocompleteKey = '62e93b34c2ee4337b92e9b81d777029a';



function WeatherApp2() {
  const [city, setCity] = useState('')
  

  // const autocomplete = new GeocoderAutocomplete(
  //   document.getElementById("autocomplete"), 
  //   autocompleteKey, 
  //   { /* Geocoder options */ });

  useEffect (() => {
    // const autocomplete = new GeocoderAutocomplete(
    //   document.getElementById("autocomplete"), 
    //   autocompleteKey, 
    //   { /* Geocoder options */ });

    // When location is selected
    // autocomplete.on('select', (location) => {
    //   // console.log(location);
    //   // this.setState({
    //   //   city: location.properties.city,
    //   //   formatted: location.properties.formatted,
    //   //   country: location.properties.country,
    //   //   lat: location.properties.lat,
    //   //   lon: location.properties.lon
    //   // });
    //   // console.log(this.state)

    //   // this.handleSubmit();                                          

    // });
  })

  return (
    <div className="App">
      <header className="App-header">
          <GeoapifyContext id='input-container' apiKey={autocompleteKey}>
            <GeoapifyGeocoderAutocomplete id='input' placeholder="Enter address here"
              // type={type}
              // lang={language}
              // position={position}
              // countryCodes={countryCodes}
              // limit={limit}
              // value={displayValue}
              // placeSelect={onPlaceSelect}
              // suggestionsChange={onSuggectionChange}
              />
          </GeoapifyContext>          
      </header>
    </div>
  );
}

export default WeatherApp2;
