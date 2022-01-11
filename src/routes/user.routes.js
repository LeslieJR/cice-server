const {Router} = require('express');

const router = Router();
const controllers = require('../controllers');
const passport = require('passport');
const helpers = require("../helpers")

router.post('/sign-up', controllers.user.signup);
router.post('/sign-in', controllers.user.signin);
router.post('/add-details', helpers.isTokenValid.isTokenValid, controllers.user.addDetails)

//auth with google
router.get('/google', passport.authenticate('google', {
    scope:['profile']
}))

//callback route for google to redirect to
//here 'passport.authenticate('google')' takes the code and exchange it for the user info
router.get('/google/redirect', passport.authenticate('google'), (req, res)=>{
    res.send('You reached the callback URI')
})
router.get('/logout', (req, res)=>{
    //handle with passport
    res.send('logging out')
})

module.exports = router;