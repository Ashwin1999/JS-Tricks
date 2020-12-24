const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    googleID: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    imageURL: { type: String, required: true }
})

module.exports = mongoose.model('user', UserSchema)