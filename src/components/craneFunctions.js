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


  fields: {
    id : ""
  }
axios
    .get("https://test-crane.herokuapp.com/craneID", fields) 
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

//get crane by username

fields: {
    craneUser : ""
  }

axios
    .get("https://test-crane.herokuapp.com/craneUser", fields)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

//get likes by crane id
fields: {
    id : ""
  }
axios
    .get("https://test-crane.herokuapp.com/craneLikes", fields)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });
    
//update crane by ID
fields: {
    id : ""
  }
axios
    .patch("https://test-crane.herokuapp.com/Update", fields)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

//delete crane by ID
fields: {
    id : ""
  }
axios
    .delete("https://test-crane.herokuapp.com/Delete", fields)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });


    //get/filter cranes by all ratings
fields: {
    bottomRate : ""
    topRate : ""
    bottomRateCrane : ""
    topRateCrane : ""
  }
axios
    .get("https://test-crane.herokuapp.com/AllRatings", fields)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

//get/filter cranes by crane ratings
fields: {
    bottomRate : ""
    topRate : ""
    }
axios
    .get("https://test-crane.herokuapp.com/craneRatings", fields)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });


//get/filter cranes by crane ratings
fields: {
    bottomRate : ""
    topRate : ""
    }
axios
    .get("https://test-crane.herokuapp.com/bkGroundRatings", fields)
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });