// Import required modules and setup the Express application
const express = require("express");
const expresslayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const app = express();
const PORT = 8000;

// Import and configure Passport strategies
const passport = require('passport');
const LocalStretegy = require('./config/passport_local_stretegy');
const googleStretegy = require('./config/passport-google-oauth2-stretegy');
const session = require('express-session');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware')

// Configure Express application
app.use(expresslayouts); // Use EJS layouts for rendering views
app.use(express.static('./assets')); // Serve static files from the 'assets' directory
app.set('view engine', 'ejs'); // Set the view engine to EJS
app.set('views', './views'); // Set the directory for views
app.set("layout extractStyles", true); // Enable extraction of styles in layout
app.set('layout extractScript', true); // Enable extraction of scripts in layout

// Parse incoming request data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data

// Configure Express sessions
app.use(session({
    name: "habit_tracker",
    secret: 'balasomthing',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    }
}));

// Initialize and use Passport for authentication
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); // Custom middleware to set authenticated user
app.use(flash()); // Use connect-flash for flash messages
app.use(customMiddleware.setflash); // Custom middleware to set flash messages

// Use the defined routes for the application
app.use('/', require('./routes'));

// Start the Express server on the specified port
app.listen(PORT, () => {
    console.log('The app is running on port', PORT);
});
