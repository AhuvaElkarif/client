// googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDQ5QucqinNGfUQlvrRHPtQuqDwxrjrKG4&v=3.exp&libraries=geometry,drawing,places",
// import { compose, withProps } from "recompose";
// import { withScriptjs, withGoogleMap, GoogleMap, Marker, } from "google-map-react";
// //import { withScriptjs, withGoogleMap, GoogleMap, Marker, } from "react-google-maps";


// const MapWithAMarkerClustered = compose(
//   withProps({
//     googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAmSz5YciOiq-rPQ9Pjy3ntdfB60Swex_s&v=3.exp&libraries=geometry,drawing,places",
//     loadingElement: <div style={{ height: `100%` }} />,
//     containerElement: <div style={{ height: `500px` }} />,
//     mapElement: <div style={{ height: `100%` }} />,
//   }),

//   withScriptjs,
//   withGoogleMap
// )(({ markers, setAddMarks, deleteMarker,centerPlace :{lat,lng}}) => {

//   return <GoogleMap
//     defaultZoom={16}
//     defaultCenter={{ lat, lng }}
//     onClick={({ latLng }) => setAddMarks({ lat: latLng.lat(), lng: latLng.lng() })}
//   >
//     {markers.map(marker => <Marker key={marker.Id} label={marker.PointName}
//       onClick={() => deleteMarker(marker)}
//       title={marker.PointName} position={{ lat: marker.lat, lng: marker.lng }} />)}
//   </GoogleMap>
// }
// );

// export default MapWithAMarkerClustered;