const express = require("express");
const router = express();
const User = require("../models/users");

//create new user
router.post("/", async (req,res) => {
    const user = await User({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        password: req.body.password
    })

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    };

})

//User Login
router.post("/login", function(req,res) {
    User.findOne({ username: req.body.username }).then((user) =>{
        if(!user) {
            res.status(401).json({
                message: "User/Password not found."
            })
        } else {
            if(user.validatePassword(req.body.password)) {
                res.status(200).json(user)
                //jwt token/cookies - remember me log in
            } else {
                res.status(401).json({
                    message: "Password/User not found."
                });
            }
        }
    }).catch((err) => {
        console.log(err);
        res.status(500);
    });
});


module.exports = router;