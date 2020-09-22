import axios from "axios";

const initialState = {
    fields: {
        id="",
        username= "",
        emailAddress= "",
        phoneNumber= "",
        password= "",
        MemberSince= date(),
        LikesReceived= null,
        LikesSent= null
    },
};

//Register - already in code
//log in - already in code

//Get all users


//Get user by ID
axios
    .get(`https://test-crane.herokuapp.com/${id}/users`, {

    })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });

//Get user by username
axios
    .get(`https://test-crane.herokuapp.com/${username}/user`, {

    })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });


axios
    .get(`https://test-crane.herokuapp.com/users/${id}`, {

    })
    .then((response) => {
        console.log(response);
    })
    .catch((err) => {
        console.log(err);
    });


//update user by ID
axios
.patch(`https://test-crane.herokuapp.com/updateUsers/${id}`, fields)
.then((response) => {
    console.log(response);
})
.catch((err) => {
    console.log(err);
});


//update user sent likes by ID
axios
.patch(`https://test-crane.herokuapp.com/updateUsers/sent/${id}`, fields)
.then((response) => {
    console.log(response);
})
.catch((err) => {
    console.log(err);
});

//update user received likes by ID
axios
.patch(`https://test-crane.herokuapp.com/updateUsers/recvd/${id}`, fields)
.then((response) => {
    console.log(response);
})
.catch((err) => {
    console.log(err);
});

//delete user by ID
axios
.delete(`https://test-crane.herokuapp.com/delete/${id}`, fields)
.then((response) => {
    console.log(response);
})
.catch((err) => {
    console.log(err);
});
