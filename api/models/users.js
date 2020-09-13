const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    emailAddress: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,   
        unique: true,
    },
    password:{
        type: String,
        required: true,
        trim: true,
    },
})

const User = mongoose.model("User", usersSchema);

module.exports = User;