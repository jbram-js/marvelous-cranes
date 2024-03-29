import React, { useCallback, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { GoogleMap, Marker } from "@react-google-maps/api";
import NavBar from "./NavBar";
import Header from "./Header";
import { getUser } from './utils';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
//comment

import AddFunction from "./AddFunction";

import "../styles/AddCrane.css";

const mapContainerStyle = {
  width: "100vw",
  height: "45vh",
};

const options = {
  disableDefaultUI: true,
};

const center = {
  lat: 53.480759,
  lng: -2.242631,
};

const AddCrane = () => {
  const user = getUser();
  const [markers, setMarkers] = useState([]);
  
  const initialState = {
    fields: {
      craneCaption: "",
      craneRate: "",
      craneBackgroundRate: "",
      userID: user._id,
      craneDescription: "",
      markers: [{ lat: "", lng: "" }],
      dateCreated: new Date(),
    },
  };

  const [fields, setFields] = useState(initialState.fields);

  useEffect(() => {
    setFields({ ...fields, markers });
  }, [markers]);

  const onMapClick = useCallback((event) => {
    setMarkers(() => [
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      },
    ]);
  }, []);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);

  return (
    <div className="map-area">
      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {markers.map((marker) => (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={{
              url: "crane-marker.svg",
              scaledSize: new window.google.maps.Size(35, 35),
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(15, 30),
            }}
          />
        ))}
      </GoogleMap>
      {markers.length !== 1 ? (<p>Locate the crane using the map above.</p>) : (<p>Now enter the cranes details below.</p>)}
      
      {<AddFunction fields={fields} setFields={setFields} />}
      <Header />
      <NavBar />
    </div>
  );
};
//{markers.length === 1 ? (<p>Now enter the cranes details below.</p>) : (console.log(markers))}
const Locate = ({ panTo }) => {
  return (
    <button
      style={{ outline: "none" }}
      className="locate-add"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="compass.svg" alt="find users current location" />
    </button>
  );
};

const Search = ({ panTo }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 53.480759, lng: () => -2.242631 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search-add">
      <Combobox
        style={{ outline: "none" }}
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();
          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log("Error!");
          }
        }}
      >
        <ComboboxInput
          style={{ outline: "none" }}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Search..."
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
};

AddCrane.propType = {
  user: PropTypes.object.isRequired,
};

export default AddCrane;
