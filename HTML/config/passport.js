const passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Users');
const config = require('../config/database');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
    //Local Strategy
    passport.use(new LocalStrategy({usernameField: 'Email', passwordField: "Password"},function(username, password, done){
        //Match Username
        User.findOne({Email:username},function(err,user){
            if(err) {return done(err);}
            if(!user){
                console.log('No user found');
                return done(null, false, {message: 'No user found'});
                
            }

            //Match Password
            if (user.Password != password) {
                console.log('Wrong Password');
                return done(null, false, { message: 'Incorrect password.' });
              }
            console.log('Signed in');
            return done(null, user);
        });
    }));

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        User.findById(id, function(err,user){
            done(err,user);
        });
    });
}