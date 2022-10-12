const express = require('express')
const router = express.Router()
// add controllers
//const { ensureAuth, ensureGuest } = require('../middleware/auth')

router.get('/', loginController.getLogin)
router.get('/new-acc', loginController.getSignup)
router.get('/logout', loginController.getLogout)
router.post('/', loginController.postLogin)
router.post('/new', loginController.postSignup)

module.exports = router