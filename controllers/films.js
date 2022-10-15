const schemas = require('../models/schemas.js')
const { Schema } = require('mongoose')

module.exports = {
    getIndex: function (req,res) {
        res.render('index', {title: 'Film Items'})
    },
    editFilm: async(req, res) => {
        let sesh = req.session

        if(!sesh.loggedIn) {
            res.render('film', {title: 'Edit', loggedIn: false, error: 'Invalid request'})
        } else {
            let id = req.params.id
            let err = ''
            
            let film = schemas.film
            let qry = {_id:id}

            let itemResult = await film.find(qry)
            .then((itemData) => {
                if (itemData == null) {
                    err = 'Invalid ID'
                }
                res.render('film', {title: 'Edit Film', item:itemData, loggedIn: sesh.loggedIn, error: err})
            })
        }
    },
    deleteFilm: async (req,res) => {
        let sesh = req.session

        if(!sesh.loggedIn) {
            res.redirect('/login')
        } else {
            let film = schemas.film
            let filmId = req.params.id
            let qry = {_id:filmId}
            let deleteResult = await film.deleteOne(qry)
            res.redirect('/')
        }
    },
    saveFilm: async (req,res) => {
        let sesh = req.session

        if(!sesh.loggedIn) {
            res.redirect('/login')
        } else {
           let filmId = req.body.filmId
           let filmName = req.body.filmName
           let filmPoster = req.body.filmPoster
           let filmImdbUrl = req.body.filmImdbUrl
           let film = schemas.film

           let qry = {_id:filmId}

           let saveData = {
                $set : {
                    name: filmName,
                    poster: filmPoster,
                    imdbUrl: filmImdbUrl
                }
           }

           let updateResult = await film.updateOne(qry, saveData)
           res.redirect('/')
        }
    },

    newFilm: async(req,res) => {
        let sesh = req.session

        if(!sesh.loggedIn) {
            res.redirect('/login')
        } else {
           let filmName = req.body.filmName
           let filmPoster = req.body.filmPoster
           let filmImdbUrl = req.body.filmImdbUrl
           let film = schemas.film

           let qry = {name: filmName}

           let searchResults = await film.findOne(qry)
           .then(async (filmData) => {
                if(!filmData) {
                    let newFilm = new schemas.film({
                        name: filmName,
                        poster: filmPoster,
                        imdbUrl: filmImdbUrl
                    })
                    let saveFilm = await newFilm.save()
                }
           })

           res.redirect('/')
        }
    }
}