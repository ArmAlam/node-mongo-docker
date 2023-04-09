const { model, Schema, Model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        require: [true, "user name required"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "password required"],

    }
});

const User = model("User", userSchema);

module.exports = User;