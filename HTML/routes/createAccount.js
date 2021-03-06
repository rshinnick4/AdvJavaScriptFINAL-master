const express = require('express');
const router = express.Router();
router.use(express.json());

//Bring in user model
let User = require('../models/Users');
const { db } = require('../models/Users');

//Renders CreateAccount Page
router.get('/', function(req, res) {
    User.find({}, function(err, Users){
        if(err){
            console.log(err);
        }
        else{
    res.render('createAccount', {
        title: 'APW Dealership',
        title1: 'Find your dream-car with us!',
        title3: 'Create-Account:',
        title4: 'Please fill out the boxes below.',
        Users: Users
            });
        }  
    });    
});

//createAccount Post route
router.post('/', function(req,res){
    const FirstName = req.body.FirstName;
    const LastName = req.body.LastName;
    const Email = req.body.Email;
    const Password = req.body.Password;

    if(FirstName == '' || LastName == '' || Email == '' || Password == ''){
        req.flash('danger', 'Please Fill Out All Fields');
        res.redirect('/createAccount');
    }else{
        let newUser = new User({
            FirstName:FirstName,
            LastName:LastName,
            Email:Email,
            Password:Password
        });
        const confirm = req.body.Confirm;
        if(confirm == newUser.Password){
            newUser.save(function(err){
                if(err){
                    console.log(err);
                    return;
                }else{
                    //Confirms account creation and redirects to Sign-in
                    req.flash('success','Account Created');
                    console.log('Account Created');
                    res.redirect('/Sign-in');
                }
            });
        }else{
            req.flash('danger','Passwords Do Not Match');
            console.log('Passwords dont match');
            res.redirect('/createAccount');
        }
    }
    
    
});
module.exports = router;