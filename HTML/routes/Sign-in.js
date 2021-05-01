const express = require('express');
var bodyParser = require('body-parser')
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
//Bring in user model
let User = require('../models/Users')

//Render Page
router.get('/', function(req, res) {
    User.find({}, function(err, Users){
        if(err){
            console.log(err);
        }
        else{
    res.render('Sign-in', {
        title: 'APW Dealership',
        title1: 'Find your dream-car with us!',
        title3: 'Sign-in:',
        title4: 'Please provide us with your email and password. Then tell us if you are a staff member or not.',
        Users: Users
            });
        }
    });
});

//Login process
router.post('/', function(req,res, next){
    passport.authenticate('local', {
        successRedirect:'/Create-A-Car',
        failureRedirect:'/Sign-in'
    })(req,res,next);
    
});

module.exports = router;