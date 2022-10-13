const express = require('express')
const router = express.Router()
const filmsController = require('../controllers/films')
//const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', filmsController.getIndex)
router.get('/:id', filmsController.editFilm)
router.get('/delete/:id', filmsController.deleteFilm)
router.post('/save', filmsController.saveFilm)
router.post('/new', filmsController.newFilm)

module.exports = router
