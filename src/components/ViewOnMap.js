import React from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";

import "../styles/Map.css";

const mapContainerStyle = {
  width: "90vw",
  height: "80vh",
};

const ViewOnMap = ({ markers }) => {
  const latitude = markers[0].lat;
  const longitude = markers[0].lng;

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <div className="ViewOnMap">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
      >
        <Marker
          position={{ lat: latitude, lng: longitude }}
          icon={{
            url: "crane-marker.svg",
            scaledSize: new window.google.maps.Size(35, 35),
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 30),
          }}
        />
      </GoogleMap>
    </div>
  );
};

export default ViewOnMap;
