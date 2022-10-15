const mongoose = require('mongoose')

let filmSchema = new mongoose.Schema({
    name: {type:String, require: true},
    poster: {type:String, require: true},
    imdbUrl: {type:String, require: true},
    rating: {type:Number, require: false},
    lastWatched: {type:Date, default:Date.now}
})

let userSchema = new mongoose.Schema({
    email: {type:String, require: true},
    password: {type:String, require: true},
    entryDate: {type:Date, default:Date.now}
})

let film = mongoose.model('film', filmSchema, 'film');
let users = mongoose.model('users', userSchema, 'users');
let mySchemas = {
    'film' : film,
    'users' : users
}

module.exports = mySchemas;
