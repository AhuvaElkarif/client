import { compose, withProps } from "recompose";
// import { withScriptjs, withGoogleMap, } from "google-map-react";
import { withScriptjs, withGoogleMap, Marker, GoogleMap} from "react-google-maps";


const MapWithAMarkerClustered = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDQ5QucqinNGfUQlvrRHPtQuqDwxrjrKG4&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `500px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }), 

    withScriptjs,
    withGoogleMap
)(({ marker, setAddMarks }) => {

    return <GoogleMap
        defaultZoom={16}
        defaultCenter={{ lat: marker.lat, lng: marker.lng }}
        onClick={({ latLng }) => setAddMarks({ lat: latLng.lat(), lng: latLng.lng() })}
    >
        <Marker label={marker.PointName}
            title={marker.PointName} position={{ lat: marker.lat, lng: marker.lng }} />
            
    </GoogleMap>
}
);

export default MapWithAMarkerClustered;
{/* <Map2 marker={markersSow}  /> */ }
 //  <Map2 marker={markersSow} setAddMarks={setNewMarks}  />
