const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const User = require("../../models/User");

var DistanceSchema=require('../../models/DistanceSchema');
var mongoose = require('mongoose');

const Distance = mongoose.model('Distance',DistanceSchema);

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({

                name: req.body.name,
                email: req.body.email,
                role: 'joueur',
                password: req.body.password
            });
// Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});



// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
// Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    userId: user._id,
                    name: user.name
                };
// Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926 // 1 year in seconds
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({ passwordincorrect: "Password incorrect" });
            }
        });
    });
});


//GetAll users
router.get('/GetAll',(req,res,next)=>{
    console.log("liste des users");
    // User.find()
    //     .then(users => {
    //         res.json(users);
    //
    //     }).catch(err => {
    //     res.status(500).send({
    //         message: err.message || "Some error occurred while retrieving notes."
    //     });
    // });

    // res.locals.currentUser = req.user;
    // console.log(res.locals.currentUser);
    let os = require('os')
    console.log(os.userInfo());


});

// GetUSer by id
router.get('/GetUserById/:id',(req,res)=>{
    console.log("get user by id");

    var id = req.params.id;
    User.findById({_id: req.userData.userId})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + id
                });
            }
            res.json(user);
            console.log(user)

        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + id
                });
            }
            return res.status(500).send({
                message: "Error retrieving note with id " + id
            });
    });
});

//UPADTE USER
router.put('/UpdateUser/:idUser',(req,res)=>{

    var idUser = req.params.idUser;
    // Validate Request
    // if(!req.body.content) {
    //     return res.status(400).send({
    //         message: "User content can not be empty"
    //     });
    // }

    // Find note and update it with the request body
    User.findByIdAndUpdate((idUser), {
        title: req.body.title || "Untitled User",
        content: req.body.content
    }, {new: true})
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "user not found with id " + idUser
                });
            }
            res.send(user);
        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "user not found with id " + idUser
            });
        }
        return res.status(500).send({
            message: "Error updating user with id " + idUser
        });
    });
});

//DELETE USER
router.delete('/DeleteUser/:idUser' ,(req, res) => {
    console.log("delete member");

    var idUser = req.params.idUser;
    console.log("id user");
    console.log(idUser);


    User.findByIdAndRemove(req.params.noteId)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + idUser
                });
            }
            res.send({message: "User deleted successfully!"});
        }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + idUser
            });
        }
        return res.status(500).send({
            message: "Could not delete User with id " + idUser
        });
    });




});


// Create a new user
router.post('/addUser', (req,res)=>{



    const Distance1 = new Distance({
        distance:"25km",
        duree:"25min"
    });
    const Distance2 = new Distance({
        distance:"30km",
        duree:"30min"
    });
    // const newUser = new User({
    //     name: "fafi",
    //     email: "fafi@esprit.tn",
    //     role: 'joueur',
    //     password: "hello",
    //     distances:[Distance1,Distance2]
    // });
    console.log(req.userData.userId)
    // newUser.save().then(user => res.json(user));
    User.findById({_id: req.userData.userId})
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "undifined user"
                });
            }
            fetchedUser = user;
        })
        .then(() => {

            distances=[Distance1,Distance2];
            fetchedUser.save();
            res.send({
                message: fetchedUser
            });
        })
        .catch(err => {
            console.log(err);
        });
});


//fetch all distance by idUser
router.get('/GetDistancesByIdUser/:id',(req,res)=>{
    console.log("get user by id");

    var id = req.params.id;
    User.findById(id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + id
                });
            }
            res.json(user.distances);
            console.log(user)

        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + id
        });
    });
});


//get name by email
router.get('/GetNameByEmail/:email',(req,res)=>{
    console.log("get name user by email");

    const email = req.params.email;
// Find user by email
    User.findOne({ email }).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        res.json({
            name:user.name,
            id: user._id
        });
    });

});

//find distance by date
router.get('/GetDistancesByDate/:id',(req,res)=>{
    console.log("get user by id");

    var id = req.params.id;
    User.findById(id)
        .then(user => {
            if(!user) {
                return res.status(404).send({
                    message: "User not found with id " + id
                });
            }
            // res.json(user.distances);
            // console.log(user)
            user.distances.find({ $gte: new ISODate("2019-07-17 11:14:13.480") })
                .then(userD=>res.json(userD));

        }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + id
            });
        }
        return res.status(500).send({
            message: "Error retrieving note with id " + id
        });
    });
});

const authCheck = require("../../middleware/check-auth");


//get profile connected user
router.get('/getProfileForConnectedUser',authCheck,(req, res, next) => {
    //res.send(req.userData.userId);
    User.findOne({_id: req.userData.userId})
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "user not found"
                });
            }
            return res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profile failed!"
            });
        });
});
module.exports = router;

