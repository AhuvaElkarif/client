import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';
import { useEffect } from "react";

const AnyReactComponent = ({ text }) => <input type="button" style={{border:"none"}} value={text}/>;

 const SimpleMap=({type, setLat,setLng, lat,lng})=>{
  // const [lat, setLat] = useState();
  // const [lng, setLng] = useState();
  useEffect(()=>{},[lat,lng])
  const defaultProps = {
    center: {
      lat:lat?lat:31.772561767303255,
      lng:lng?lng:35.16862111683302
    },
    zoom: 15
  };
{console.log(lat+" "+lng)}
  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onClick={(e) => { if(type==1) { setLat(e.lat); setLng(e.lng) }}}
      >
        <AnyReactComponent
          lat={lat?lat:31.772561767303255}         
           lng={lng?lng:35.16862111683302}
          text="אנחנו כאן"
        />
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap