const passport = require('passport');
const googleStretegy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/User');

// tell passport to use new stretegy for google login

passport.use(new googleStretegy({
        clientID: '',

        clientSecret: '',

        callbackURL: '',
        passReqToCallback: true,

    },
    async function(request, accessToken, refreseToken, profile, done) {
        // console.log(profile);
        // find user
        try {
            const user = await User.findOne({ email: profile.emails[0].value });
            if (user) {
                return done(null, user);
            }
            if (!user) {
                // if not found, creat user and set it as req.user
                const newUser = await User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                })
                if (newUser) {
                    return done(null, newUser);
                }

            }

        } catch (error) {
            console.log('error in google stretegy passport', error);
        }


    }
));
module.exports = passport;
