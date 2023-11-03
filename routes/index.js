const express = require('express');
const passport = require('passport');
const router = express.Router();

const user_Controller = require('../controllers/userController');

// render to the home page as a signup page
router.get('/home', user_Controller.homepage);

// render to the the signup page
router.get('/', user_Controller.signupPage);

// render to the login page 
router.get('/login', user_Controller.loginPage);

// render to the  reset page
router.get('/reset', user_Controller.resetPage)

// log out route
router.get('/logout', user_Controller.destroy);

// create new user
router.post('/signup', user_Controller.signup);


// updating the password
router.post('/reset', user_Controller.reset);

// google authentication route
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), user_Controller.signin);

// creating new session 
router.post('/signin', passport.authenticate('local', { failureRedirect: '/login' }), user_Controller.signin);


module.exports = router;