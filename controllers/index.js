const schemas = require('../models/schemas.js')

module.exports = {
    getHome: async (req,res) => {
        let film = schemas.film
        let sesh = req.session

        let filmResult = await film.find({})
        .then((film) => {
            res.render('index', {title: 'Film Tracker', data: filmData, search: '', loggedIn: sesh.loggedIn})
        })
    },
    getSearch: async (req,res) => {
        let film = schemas.film
        let sesh = req.session
        let q = req.body.searchInput
        let filmData = null
        let qry = {name: {$regex: '^' + q, $options: 'i'}}

        if(q != null) {
            let filmResult = await film.find(qry)
            .then((data) => {
                filmData = data
            })
        } else {
            q = 'Search'
            let filmResult = await film.find({})
            .then((data) => {
                filmData = data
            })
        }
        res.render('index', {title: 'Film Tracker', data: filmData, search: q, loggedIn: sesh.loggedIn})
    }
}