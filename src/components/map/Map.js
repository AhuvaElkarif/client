import React, { useState } from "react";
import Autocomplete from 'react-google-autocomplete';
import GoogleMapReact from 'google-map-react';
import { useEffect } from "react";
const AnyReactComponent = ({ text }) => <input type="button" style={{ border: "none" }} value={text} />;

const SimpleMap = ({ type, setLat, setLng, lat, lng }) => {
  const [location,setLocation] = useState({center:{
lat:31.772561767303255, lng:35.16862111683302, 
  }, zoom:15});

  useEffect(() => {  
    setLocation({ center: {
      lat: lat ? lat : 31.772561767303255,
      lng: lng? lng : 35.16862111683302
    },
    zoom: 15})
  }, [lat, lng]);

  const handleChange = (e) => {
    const l1 = e.geometry.location.lat;
    const l2 =  e.geometry.location.lng;
    setLat(l1);
    setLng(l2);
    // setLocation([l1,l2]);
  }
  const defaultProps = {
    center: {
      lat: location.center.lat? location.center.lat : 31.772561767303255,
      lng: location.center.lng ? location.center.lng : 35.16862111683302
    },
    zoom: 15
  };
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      {type==1 && <Autocomplete
        className="autocomplete-address-input"
        options={{
          componentRestrictions: { country: 'ISR' },
          types: ['geocode'],
        }}
        onPlaceSelected={handleChange}
      />} <br/>
{console.log(location.center)}
      <GoogleMapReact
      center={location.center}
        defaultCenter= {defaultProps.center}
        defaultZoom = {defaultProps.zoom}
        onClick={(e) => { if (type == 1) { setLat(e.lat); setLng(e.lng);const x = {...location}; x.center.lat=e.lat; x.center.lng=e.lng; setLocation(x) } }}
      >
        <AnyReactComponent
          lat={location.center.lat ? location.center.lat: 31.772561767303255}// ? location[0] : 31.772561767303255}
          lng={location.center.lng ? location.center.lng: 35.16862111683302} //? location[1] : 35.16862111683302}
          text="אנחנו כאן"
        />
      </GoogleMapReact>
    </div>
  );
}
export default SimpleMap;