import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

 const SimpleMap=()=>{
  const defaultProps = {
    center: {
      lat: 31.772561767303255,
      lng: 35.16862111683302
    },
    zoom: 15
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        
      >
        <AnyReactComponent
          lat={31.772561767303255}         
           lng={35.16862111683302}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default SimpleMap