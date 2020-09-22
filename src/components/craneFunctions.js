import axios from "axios";

const initialState = {
    fields: {
      craneID= "",
      craneCaption: "",
      craneRate: "",
      craneBackgroundRate: "",
      craneUser: "",
      craneDescription: "",
      markers: [{ lat: "", lng: "" }],
      craneLikes: null,
      dateCreated: Date(),
    },
  };

  //pull crane by ID 
axios
    .get(`https://test-crane.herokuapp.com/${craneID}/cranes`, {

    })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

//get crane by username
axios
    .get(`https://test-crane.herokuapp.com/cranes/${craneUser}`, {

    })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

//get likes by crane id
axios
    .get(`https://test-crane.herokuapp.com/${craneID}/craneLikes"`, {

    })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });
    
//update crane by ID
axios
    .patch(`https://test-crane.herokuapp.com/${craneID}`, fields)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

//delete crane by ID
axios
    .delete(`https://test-crane.herokuapp.com/${craneID}`, fields)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

