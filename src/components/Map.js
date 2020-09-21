import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";

import NavBar from "./NavBar";

import "../styles/Map.css";

const mapContainerStyle = {
  width: "70vw",
  height: "80vh",
};

const center = { lat: 53.480759, lng: -2.242631 };

const Map = () => {
  const [markers, setMarkers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://test-crane.herokuapp.com/cranes")
        .then(({ data }) => {
          const markerArray = data.map((e) => e.markers);
          setMarkers(markerArray);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    fetchData();
  }, []);

  console.log(markers);

  return (
    <div className="ViewOnMap">
      <NavBar />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
      >
        {markers.map((marker) => (
          <Marker
            position={{ lat: marker[0].lat, lng: marker[0].lng }}
            icon={{
              url: "crane-pin.svg",
              scaledSize: new window.google.maps.Size(35, 35),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 30),
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default Map;
