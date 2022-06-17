//   user model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
}, {
    collection: 'new-users'
})

userSchema.plugin(uniqueValidator, {message: "Email already exists"})
module.exports = mongoose.model('User', userSchema)