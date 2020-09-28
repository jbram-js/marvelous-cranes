import React from "react";
import PropTypes from "prop-types";
import { GoogleMap, Marker } from "@react-google-maps/api";

import "../styles/Map.css";

const mapContainerStyle = {
  width: "100vw",
  height: "40vh",
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const ViewOnMap = ({ markers }) => {
  const latitude = markers[0].lat;
  const longitude = markers[0].lng;

  const center = {
    lat: latitude,
    lng: longitude,
  };

  return (
    <div className="view-on-map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={center}
        options={options}
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

ViewOnMap.propType = {
  markers: PropTypes.array.isRequired,
};

export default ViewOnMap;
