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
//router.post("/login", function(req,res) => {
//    User.findOne({ username: req.body.username }).then((user) =>())
//})


module.exports = router;