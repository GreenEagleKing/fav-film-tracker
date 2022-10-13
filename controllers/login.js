const schemas = require('..models/schemas.js')
const bcrypt = require('bcrypt')

exports.getLogin = (req,res) => {
    res.render('login', {title: 'Login', loggedIn: false, error: null})
}

exports.getSignup = (req,res) => {
    res.render('new-acct', {title: 'New Account', loggedIn: false, error: null})
}

exports.getLogout = (req, res) => {
    req.session.destroy()
    res.redirect('/')
}

exports.postLogin = async (req,res) => {
    let email = req.body.email
    let password = req.body.password
    let loginSuccess = false
    let sesh = req.session
    sesh.loggedIn = false

    let users = schemas.users
    let qry = {email: email}

    // replace with password
    if(email !== '' && password !== '') {
        let usersResult = await users.findOne(qry)
        .then( async(data) => {
            if (data) {
                let passResult = await bcrypt.compare(password, data.password)
                .then((isMatch) => {
                    if (isMatch) {
                    sesh.loggedIn = true
                    loginSuccess = true
                    }
                })
            }
        })
    }
    if (loginSucess === true) {
        res.redirect('/')
    } else {
        res.render('login', {title: 'Login', loggedIn: false, error: 'Invalid Login!'})
    }
}