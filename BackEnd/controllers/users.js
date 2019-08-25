//  console.log("file uploaded to Cloudinary");
// remove file from server.js
const multer = require('multer');
var moment = require('moment');

// SEND FILE TO CLOUDINARY
const cloudinary = require("cloudinary").v2;
cloudinary.config({
    cloud_name: "oscproject",
    api_key: "223363731184168",
    api_secret: "BByjzgQzoKQ7nKc70xJem6X_1B0"
});

// MULTER
const MIME_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg"
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "backend/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname
            .toLowerCase()
            .split(" ")
            .join("-");
        const ext = MIME_TYPE_MAP[file.mimetype];
        cb(null, name + "-" + Date.now() + "." + ext);
    }
});
const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/User");
const Game = require("../models/GameSchema");
const Level = require("../models/LevelSchema");


exports.UserLogin = (req, res, next) => {
    // Form validation
    const {errors, isValid} = validateLoginInput(req.body);
// Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
// Find user by email
    User.findOne({email}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found"});
        }
// Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                // User matched
                // Create JWT Payload
                const payload = {
                    userId: user._id,
                    name: user.name,
                    email: user.email,
                    imageProfile: user.imageProfile

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
                            token: "Bearer " + token,
                            user: payload
                        });
                    }
                );
            } else {
                return res
                    .status(400)
                    .json({passwordincorrect: "Password incorrect"});
            }
        });
    }).catch();
};
//create user
exports.createUser = (req, res, next) => {

    // Form validation
    const {errors, isValid} = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({email: req.body.email}).then(user => {


        const newUser = new User({

            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            gender: req.body.gender,
            poids: req.body.poids,
            birthday: req.body.birthday,
            imageProfile: req.body.imageProfile


        });

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                // newUser.oldPhoto.push(req.file.path);
                newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
            });
        });

    });

};
exports.getAllProfiles = (req, res, next) => {
    User.find()
        .then(user => {
            return res.status(200).json(user);
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
exports.getProfileConnectedUser = (req, res, nex) => {
    res.send(req.userData.userId);
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
};
exports.getInfoUserByEmail = (req, res, next) => {
    console.log("get name user by email");
    const email = req.params.email;
    // Find user by email
    User.findOne({email}).then(user => {
        // Check if user exists
        if (!user) {
            return res.status(404).json({emailnotfound: "Email not found"});
        }
        res.json(user);
    });

};
// exports.uploadImage = (req, res, next) => {
//     const upload = multer({storage}).single("imageProfile");
//     upload(req, res, function (err) {
//         if (err) {
//             return res.send(err);
//         }
//         // console.log("file uploaded to server");
//         // console.log(req.file.mimetype);
//         // if ( !req.file.mimetype === "image/jpeg" || !req.file.mimetype === "image/png"
//         //   || !req.file.mimetype === "image/jpg") {
//         //  res.json({success:false,"message":'please add a picture file'})
//         // }
//
//         const path = req.file.path;
//         const uniqueFilename = new Date().toISOString();
//
//         cloudinary.uploader.upload(
//             path,
//             {public_id: `ProfilePictures/${uniqueFilename}`, tags: `ProfilePictures`}, // directory and tags are optional
//             function (err, image) {
//                 if (err) return res.send(err);
//                 //  console.log("file uploaded to Cloudinary");
//                 // remove file from server
//                 const fs = require("fs");
//                 fs.unlinkSync(path);
//                 // return image details
//                 //res.json(image);
//                 // User.findById({_id: req.userData.userId})
//                 const USer1 = new User({
//                     imageProfile: image.secure_url
//                 });
//                 USer1.save().then((user) => {
//                     res.json(user, "added successfully");
//                 });
//                 // User.findById({ _id: req.userData.userId })
//                 //     .then((user) => {
//                 //         user.imageProfile = image.secure_url;
//                 //         user.save();
//                 //         // console.log(user);
//                 //         res.json({ "success": true, "message": "Todos fetched successfully", user });
//                 //     })
//                 //     .catch({
//                 //         if(err) {
//                 //             res.json({ "success": false, "message": "Some Error" });
//                 //         }
//                 //     });
//             }
//         );
//     });
//
// };
//get user infos
exports.getUserInfo = (req, res, next) => {

    // User.findById({_id: req.userData.userId})
    User.findById({_id: req.userData.userId})
        .then((user) => {

            console.log(user);
            res.json({"success": true, "message": "Todos fetched successfully", user});
        })
        .catch({
            if(err) {
                res.json({"success": false, "message": "Some Error"});
            }
        });


};
//update user with image and name
exports.updateUser = (req, res, next) => {

    console.log("update USer");
    console.log(req.userData.userId);
    User.findByIdAndUpdate(
        // the id of the item to find
        {_id: req.userData.userId},

        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        {new: true},

        // the callback function
        (err, todo) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(todo);
        }
    )
};
//fetch game par date by email for seif
exports.fetchGameByDateByEmail = (req, res, next) => {
    let liste_dist = [];
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            console.log("nombre game", gameFetched.length);
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }
                console.log(user._id);
                let iduser = user._id;
                for (let i = 0; i < gameFetched.length; i++) {
                    console.log(gameFetched[i].user);
                    if (gameFetched[i].user._id.equals(iduser)) {
                        liste_dist.push(gameFetched[i]);

                        let date_sort_desc = function (date1, date2) {
                            // This is a comparison function that will result in dates being sorted in
                            // DESCENDING order.
                            if (date1 > date2) return -1;
                            if (date1 < date2) return 1;
                            return 0;
                        };
                        let date_sort_asc = function (date1, date2) {
                            // This is a comparison function that will result in dates being sorted in
                            // ASCENDING order. As you can see, JavaScript's native comparison operators
                            // can be used to compare dates. This was news to me.
                            if (date1 > date2) return 1;
                            if (date1 < date2) return -1;
                            return 0;
                        };

                        liste_dist.sort(date_sort_desc);

                    }


                }
                ;

                res.json({"success": true, "message": "Todos fetched successfully", liste_dist});

            }).catch(err => {
                if (err) {
                    res.send({"success": false, "message": "Some Error"});
                }
            });
        });


};
//calcul total temps parcouru by email
exports.calculTotalTempsByEmail = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let temps = [];
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }
                console.log(user._id);
                let iduser = user._id;

                console.log("before fetch", gameFetched.length);
                for (let i = 0; i < gameFetched.length; i++) {
                    console.log("westtttttttttttttttttttttt");
                    if (gameFetched[i].user._id.equals(iduser)) {
                        console.log("condition");

                        temps.push(gameFetched[i].temps);
                    }
                }
                console.log("liste temps", temps);
                console.log("****************liste de temps*************");
                console.log(temps);
                var listeH = [];
                var listeM = [];
                var listeS = [];
                var totalS = 0;
                var totalM = 0;
                var totalH = 0;

                for (let i = 0; i < temps.length; i++) {
                    let t = temps[i];
                    //le temps est de format 00:00:00
                    let heures = t.substring(0, 2);
                    let minutes = t.substring(3, 5);
                    let secondes = t.substring(6, 8);
                    listeH.push(heures);
                    listeM.push(minutes);
                    listeS.push(secondes);

                }
                //calculer total secondes
                for (let i = 0; i < listeS.length; i++) {
                    console.log(parseInt(listeS[i]));
                    totalS += parseInt(listeS[i]);
                    if (totalS > 59) {
                        totalM += 1;
                        totalS = 0;
                    }
                }
                //calculer total minutes
                for (let i = 0; i < listeM.length; i++) {
                    console.log(parseInt(listeM[i]));
                    totalM += parseInt(listeM[i]);
                    if (totalM > 59) {
                        totalH += 1;
                        totalM = 0;
                    }
                }

                //calculer total heures
                for (let i = 0; i < listeH.length; i++) {
                    console.log(parseInt(listeH[i]));
                    totalH += parseInt(listeH[i]);
                    if (totalH > 23) {
                        totalH = 0;

                    }
                }

                totalM = "" + totalM;
                totalS = "" + totalS;
                totalH = "" + totalH;
                //test sur le total pour ajouter le 0 a gauche
                console.log("*********");
                console.log(totalS.toString().length);

                if (totalS.toString().length === 1) {
                    console.log("west el cond");
                    totalS = totalS.toString().padStart(2, "0");
                    console.log(totalS);
                }

                console.log("**** total minutes");
                console.log(totalM);
                if (totalM.toString().length === 1) {
                    console.log("west el cond");
                    totalM = totalM.toString().padStart(2, "0");
                    console.log(totalM);

                }

                if (totalH.toString().length === 1) {
                    console.log("west el cond");
                    totalH = totalH.toString().padStart(2, "0");
                    console.log(totalH);

                }
                res.json({listeH, listeM, listeS, totalS, totalM, totalH});


            });


        })
        .catch(err => {
            if (err) {
                res.json({"success": false, "message": "Some Error"});
            }
        });


};
//calcul total distance by email
exports.CalculTotalDistancesByEmail = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let list_dist = [];
            let totalD = 0;
            console.log("before fetch", gameFetched.length);
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }
                console.log(user._id);
                let iduser = user._id;
                for (let i = 0; i < gameFetched.length; i++) {


                    if (gameFetched[i].user._id.equals(iduser)) {
                        list_dist.push(gameFetched[i].distance);
                    }

                }
                console.log(list_dist);
                for (let j = 0; j < list_dist.length; j++) {
                    totalD = totalD + parseInt(list_dist[j]);

                }

                if (totalD === 0)
                    res.json({"success": false, totalD});

                res.json({"success": true, totalD});
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
exports.CalculTotalCaloriesByEmail = (req, res, next) => {
    console.log("total calories");
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let list_Cal = [];
            let totalCalories = 0;
            console.log("before fetch", gameFetched.length);
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }
                console.log(user._id);
                let iduser = user._id;
                for (let i = 0; i < gameFetched.length; i++) {


                    if (gameFetched[i].user._id.equals(iduser)) {
                        list_Cal.push(gameFetched[i].calorie);
                    }

                }
                console.log(list_Cal);
                for (let j = 0; j < list_Cal.length; j++) {
                    totalCalories = totalCalories + parseInt(list_Cal[j]);

                }

                if (totalCalories === 0)
                    res.json({"success": false, totalCalories});

                res.json({"success": true, totalCalories});
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
//calcul total pour chaque jour
exports.CalculTotalForEachDayByEmail = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }

                let iduser = user._id;
                let listDistanceByDate = [];
                let totalDistanceByDate = 0;
                for (let i = 0; i < gameFetched.length; i++) {
                    if (gameFetched[i].user._id.equals(iduser)) {
                        let first_date = moment(gameFetched[i].Date).format("DD-MM-YYYY");

                        for (let j =0 ; j < gameFetched.length; j++) {
                            let second_date = (moment(gameFetched[j].Date).format("DD-MM-YYYY"));
                            console.log("first_date", first_date);
                            console.log("second_date", second_date);
                            if (first_date===(second_date)) {
                                console.log("kif kif");
                                listDistanceByDate.push(gameFetched[j]);

                            } else {
                                console.log("mouch kif kif")
                            }

                        }

                        for (let j = 0; j < listDistanceByDate.length; j++) {
                            totalDistanceByDate+=parseInt(listDistanceByDate[i]);
                        }
                        console.log("length",listDistanceByDate.length);
                    }
                }
               // console.log(listDistanceByDate);
                // for (let j = 0; j < list_dist.length; j++) {
                //     totalD = totalD + parseInt(list_dist[j]);
                //
                // }
                //
                // if (totalD === 0)
                //     res.json({"success": false, totalD});
                //
                res.json({"success": true, listDistanceByDate});
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
//get all for that day
exports.CalculTotalTodayByEmail = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }

                let iduser = user._id;
                const listDistanceByDate = [];
                const listTempsByDate = [];
                const listCaloriesByDate = [];
                const listScoreByDate = [];
                const listHeartBeatByDate = [];
                let totalDistanceByDate = 0;
                let totalTempsByDate = 0;
                let totalCaloriesByDate = 0;
                let totalScoreByDate = 0;
                let totalHeartBeatByDate = 0;

                for(let i = 0;i<gameFetched.length;i++) {
                    if (gameFetched[i].user._id.equals(iduser)) {
                        let first_date = moment(gameFetched[i].Date).format("MM-DD-YYYY");

                        console.log("first_date", first_date);
                        console.log("dateActuelle", moment().format("MM-DD-YYYY"));

                        if (moment().format("MM-DD-YYYY") === first_date) {
                            console.log("kif kif");
                            listDistanceByDate.push(gameFetched[i].distance);
                            listCaloriesByDate.push(gameFetched[i].calorie);
                            listHeartBeatByDate.push(gameFetched[i].heartBeat);
                            listScoreByDate.push(gameFetched[i].score);
                        } else {
                            console.log("mouch kif kif")
                        }


                    }
                    console.log("length", listDistanceByDate.length);

                }
                //calcul total distance
                for (let j = 0; j < listDistanceByDate.length; j++) {
                    totalDistanceByDate+=parseInt(listDistanceByDate[j]);
                }
                //calcul total calories
                for (let j = 0; j < listCaloriesByDate.length; j++) {
                    totalCaloriesByDate+=parseInt(listCaloriesByDate[j]);
                }
                //calcul total heartbeat
                for (let j = 0; j < listHeartBeatByDate.length; j++) {
                    totalHeartBeatByDate+=parseInt(listHeartBeatByDate[j]);
                }
                //calcul total score

                for (let j = 0; j < listScoreByDate.length; j++) {
                    totalScoreByDate+=parseInt(listScoreByDate[j]);
                }
                //calcul total temps
                console.log("****************liste de temps*************");
                console.log(listTempsByDate);
                let listeTempsEnMinutes = [];
                let totalTemsp = 0;
                let HeuresEnMinutes = 0;

                for (let i = 0; i < listTempsByDate.length; i++) {
                    let t = listTempsByDate[i];
                    //le temps est de format 00:00:00
                    let heures = t.substring(0, 2);
                    let minutes = t.substring(3, 5);
                    console.log("*******heures*");
                    console.log(heures);
                    console.log("*******minutes*");
                    console.log(minutes);
                    HeuresEnMinutes = parseInt(heures) * 60;
                    console.log(HeuresEnMinutes);
                    totalTemsp = HeuresEnMinutes + parseInt(minutes);
                    console.log(totalTemsp);
                    listeTempsEnMinutes.push(totalTemsp);
                }

                let totalTemps = 0;
                console.log(listeTempsEnMinutes);
                for (let j = 0; j < listeTempsEnMinutes.length; j++) {
                    totalTemps = totalTemps + parseInt(listeTempsEnMinutes[j]);

                }

                res.json(
                    {
                        listDistanceByDate,totalDistanceByDate,
                        listCaloriesByDate,totalCaloriesByDate,
                        listHeartBeatByDate,totalHeartBeatByDate,
                        listScoreByDate,totalScoreByDate,
                        listTempsByDate,listeTempsEnMinutes,totalTemps});
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
//get all for a month
exports.CalculTotalthisMonthByEmail = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }

                let iduser = user._id;
                const listDistanceByDate = [];
                const listTempsByDate = [];
                const listCaloriesByDate = [];
                const listScoreByDate = [];
                const listHeartBeatByDate = [];
                let totalDistanceByDate = 0;
                let totalCaloriesByDate = 0;
                let totalScoreByDate = 0;
                let totalHeartBeatByDate = 0;

                for(let i = 0;i<gameFetched.length;i++) {
                    if (gameFetched[i].user._id.equals(iduser)) {
                        let first_date = moment(gameFetched[i].Date).format("MM-YYYY");

                        console.log("first_date", first_date);
                        console.log("dateActuelle", moment().format("MM-YYYY"));

                        if (moment().format("MM-YYYY") === first_date) {
                            console.log("kif kif");
                            listDistanceByDate.push(gameFetched[i].distance);
                            listCaloriesByDate.push(gameFetched[i].calorie);
                            listHeartBeatByDate.push(gameFetched[i].heartBeat);
                            listScoreByDate.push(gameFetched[i].score);
                            listTempsByDate.push(gameFetched[i].temps);
                        } else {
                            console.log("mouch kif kif")
                        }

                    }
                    console.log("length", listDistanceByDate.length);

                }
                //calcul total distance
                for (let j = 0; j < listDistanceByDate.length; j++) {
                    totalDistanceByDate+=parseInt(listDistanceByDate[j]);
                }
                //calcul total calories
                for (let j = 0; j < listCaloriesByDate.length; j++) {
                    totalCaloriesByDate+=parseInt(listCaloriesByDate[j]);
                }
                //calcul total heartbeat
                for (let j = 0; j < listHeartBeatByDate.length; j++) {
                    totalHeartBeatByDate+=parseInt(listHeartBeatByDate[j]);
                }
                //calcul total score
                for (let j = 0; j < listScoreByDate.length; j++) {
                    totalScoreByDate+=parseInt(listScoreByDate[j]);
                }

                //calcul total temps
                //recuperer le temps et le tranformer en minutes seulement

                console.log("****************liste de temps*************");
                console.log(listTempsByDate);
                let listeTempsEnMinutes = [];
                let totalTemsp = 0;
                let HeuresEnMinutes = 0;

                for (let i = 0; i < listTempsByDate.length; i++) {
                    let t = listTempsByDate[i];
                    //le temps est de format 00:00:00
                    let heures = t.substring(0, 2);
                    let minutes = t.substring(3, 5);
                    console.log("*******heures*");
                    console.log(heures);
                    console.log("*******minutes*");
                    console.log(minutes);
                    HeuresEnMinutes = parseInt(heures) * 60;
                    console.log(HeuresEnMinutes);
                    totalTemsp = HeuresEnMinutes + parseInt(minutes);
                    console.log(totalTemsp);
                    listeTempsEnMinutes.push(totalTemsp);
                }

                let totalTemps = 0;
                console.log(listeTempsEnMinutes);
                for (let j = 0; j < listeTempsEnMinutes.length; j++) {
                    totalTemps = totalTemps + parseInt(listeTempsEnMinutes[j]);

                }


                console.log("length",listDistanceByDate.length);


                res.json(
                    {
                        listDistanceByDate,totalDistanceByDate,
                        listCaloriesByDate,totalCaloriesByDate,
                        listHeartBeatByDate,totalHeartBeatByDate,
                        listScoreByDate,totalScoreByDate,
                        listTempsByDate,listeTempsEnMinutes,totalTemps});
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
//get all for a week
exports.CalculTotalthisWeekByEmail = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            const email = req.params.email;
            // Find user by email
            User.findOne({email}).then(user => {
                // Check if user exists
                if (!user) {
                    return res.status(404).json({emailnotfound: "Email not found"});
                }

                let iduser = user._id;
                const listDistanceByDate = [];
                const listTempsByDate = [];
                const listCaloriesByDate = [];
                const listScoreByDate = [];
                const listHeartBeatByDate = [];
                let totalDistanceByDate = 0;
                let totalTempsByDate = 0;
                let totalCaloriesByDate = 0;
                let totalScoreByDate = 0;
                let totalHeartBeatByDate = 0;

                for(let i = 0;i<gameFetched.length;i++) {
                    if (gameFetched[i].user._id.equals(iduser)) {
                        let date_list = moment(gameFetched[i].Date).format("DD-MM-YYYY");
                        let dateToday = new Date();
                        console.log("first_date", date_list);
                       // console.log("dateToday", dateToday);
                        let dateLastWeek = new Date(dateToday.getFullYear(),dateToday.getMonth(),dateToday.getDate()-7);
                        console.log("last weeek",moment(dateLastWeek).format("DD-MM-YYYY"));

                        if ((date_list>=moment(dateLastWeek).format("DD-MM-YYYY"))&&
                            (date_list<=moment(dateToday).format("DD-MM-YYYY")))
                             {
                            console.log("kif kif");
                            listDistanceByDate.push(gameFetched[i].distance);
                            listCaloriesByDate.push(gameFetched[i].calorie);
                            listHeartBeatByDate.push(gameFetched[i].heartBeat);
                            listScoreByDate.push(gameFetched[i].score);
                        } else {
                            console.log("mouch kif kif")
                        }


                    }
                    console.log("length", listDistanceByDate.length);

                }
                //calcul total distance
                for (let j = 0; j < listDistanceByDate.length; j++) {
                    totalDistanceByDate+=parseInt(listDistanceByDate[j]);
                }
                //calcul total calories
                for (let j = 0; j < listCaloriesByDate.length; j++) {
                    totalCaloriesByDate+=parseInt(listCaloriesByDate[j]);
                }
                //calcul total heartbeat
                for (let j = 0; j < listHeartBeatByDate.length; j++) {
                    totalHeartBeatByDate+=parseInt(listHeartBeatByDate[j]);
                }
                //calcul total score
                for (let j = 0; j < listScoreByDate.length; j++) {
                    totalScoreByDate+=parseInt(listScoreByDate[j]);
                }

                //calcul total temps
                console.log("****************liste de temps*************");
                console.log(listTempsByDate);
                let listeTempsEnMinutes = [];
                let totalTemsp = 0;
                let HeuresEnMinutes = 0;

                for (let i = 0; i < listTempsByDate.length; i++) {
                    let t = listTempsByDate[i];
                    //le temps est de format 00:00:00
                    let heures = t.substring(0, 2);
                    let minutes = t.substring(3, 5);
                    console.log("*******heures*");
                    console.log(heures);
                    console.log("*******minutes*");
                    console.log(minutes);
                    HeuresEnMinutes = parseInt(heures) * 60;
                    console.log(HeuresEnMinutes);
                    totalTemsp = HeuresEnMinutes + parseInt(minutes);
                    console.log(totalTemsp);
                    listeTempsEnMinutes.push(totalTemsp);
                }

                let totalTemps = 0;
                console.log(listeTempsEnMinutes);
                for (let j = 0; j < listeTempsEnMinutes.length; j++) {
                    totalTemps = totalTemps + parseInt(listeTempsEnMinutes[j]);

                }
                res.json(
                    {
                        listDistanceByDate,totalDistanceByDate,
                        listCaloriesByDate,totalCaloriesByDate,
                        listHeartBeatByDate,totalHeartBeatByDate,
                        listScoreByDate,totalScoreByDate,
                        listTempsByDate,listeTempsEnMinutes,totalTemps});
            });
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};

//fetch distance by date for user connected
exports.fetchGameByDate = (req, res, next) => {
    const iduser = req.userData.userId;
    let liste_dist = [];
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            console.log("nombre game", gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {

                const idlevel = req.params.id;

                if (gameFetched[i].user == iduser) {
                    liste_dist.push(gameFetched[i]);

                    let date_sort_desc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // DESCENDING order.
                        if (date1 > date2) return -1;
                        if (date1 < date2) return 1;
                        return 0;
                    };
                    let date_sort_asc = function (date1, date2) {
                        // This is a comparison function that will result in dates being sorted in
                        // ASCENDING order. As you can see, JavaScript's native comparison operators
                        // can be used to compare dates. This was news to me.
                        if (date1 > date2) return 1;
                        if (date1 < date2) return -1;
                        return 0;
                    };

                    liste_dist.sort(date_sort_desc);

                }
            }

            res.json({"success": true, "message": "Todos fetched successfully", liste_dist});

        }).catch(err => {
        if (err) {
            res.send({"success": false, "message": "Some Error"});
        }
    });


};
//calcul total temps parcourus for user connected
exports.calculTotalTemps = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let temps = [];

            console.log("before fetch", gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;

                if (gameFetched[i].user.equals(iduser)) {
                    temps.push(gameFetched[i].temps);
                }

            }

            console.log("****************liste de temps*************");
            console.log(temps);
            var listeH = [];
            var listeM = [];
            var listeS = [];
            var totalS = 0;
            var totalM = 0;
            var totalH = 0;

            for (let i = 0; i < temps.length; i++) {
                let t = temps[i];
                //le temps est de format 00:00:00
                let heures = t.substring(0, 2);
                let minutes = t.substring(3, 5);
                let secondes = t.substring(6, 8);
                listeH.push(heures);
                listeM.push(minutes);
                listeS.push(secondes);

            }
            //calculer total secondes
            for (let i = 0; i < listeS.length; i++) {
                console.log(parseInt(listeS[i]));
                totalS += parseInt(listeS[i]);
                if (totalS > 59) {
                    totalM += 1;
                    totalS = 0;
                }
            }
            //calculer total minutes
            for (let i = 0; i < listeM.length; i++) {
                console.log(parseInt(listeM[i]));
                totalM += parseInt(listeM[i]);
                if (totalM > 59) {
                    totalH += 1;
                    totalM = 0;
                }
            }

            //calculer total heures
            for (let i = 0; i < listeH.length; i++) {
                console.log(parseInt(listeH[i]));
                totalH += parseInt(listeH[i]);
                if (totalH > 23) {
                    totalH = 0;

                }
            }

            totalM = "" + totalM;
            totalS = "" + totalS;
            totalH = "" + totalH;
            //test sur le total pour ajouter le 0 a gauche
            console.log("*********");
            console.log(totalS.toString().length);

            if (totalS.toString().length === 1) {
                console.log("west el cond");
                totalS = totalS.toString().padStart(2, "0");
                console.log(totalS);
            }

            console.log("**** total minutes");
            console.log(totalM);
            if (totalM.toString().length === 1) {
                console.log("west el cond");
                totalM = totalM.toString().padStart(2, "0");
                console.log(totalM);

            }

            if (totalH.toString().length === 1) {
                console.log("west el cond");
                totalH = totalH.toString().padStart(2, "0");
                console.log(totalH);

            }

            res.json({listeH, listeM, listeS, totalS, totalM, totalH});


        })
        .catch(err => {
            if (err) {
                res.json({"success": false, "message": "Some Error"});
            }
        });


};
//calcul total distance for user connected
exports.CalculTotalDistances = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let list_dist = [];
            let totalD = 0;
            console.log("before fetch", gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;

                if (gameFetched[i].user.equals(iduser)) {
                    list_dist.push(gameFetched[i].distance);
                }

            }
            console.log(list_dist);
            for (let j = 0; j < list_dist.length; j++) {
                totalD = totalD + parseInt(list_dist[j]);

            }

            if (totalD === 0)
                res.json({"success": false, totalD});

            res.json({"success": true, totalD});
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
//get all temps et distances for user connected
exports.getAllDistancesTemps = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let listedistances = [];
            let list_temps = [];
            let valueT = null;
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;

                if (gameFetched[i].user.equals(iduser)) {

                    listedistances.push(gameFetched[i].distance);
                    list_temps.push(gameFetched[i].temps);
                }
            }
            console.log("****************liste distance*************");
            console.log(listedistances);

            //recuperer le temps et le tranformer en minutes seulement

            console.log("****************liste de temps*************");
            console.log(list_temps);
            let listeTempsEnMinutes = [];
            let totalTemsp = 0;
            let HeuresEnMinutes = 0;

            for (let i = 0; i < list_temps.length; i++) {
                let t = list_temps[i];
                //le temps est de format 00:00:00
                let heures = t.substring(0, 2);
                let minutes = t.substring(3, 5);
                console.log("*******heures*");
                console.log(heures);
                console.log("*******minutes*");
                console.log(minutes);
                HeuresEnMinutes = parseInt(heures) * 60;
                console.log(HeuresEnMinutes);
                totalTemsp = HeuresEnMinutes + parseInt(minutes);
                console.log(totalTemsp);
                listeTempsEnMinutes.push(totalTemsp);
            }

            res.json({listedistances, list_temps, listeTempsEnMinutes});


        }).catch(err => console.log(err));
};
//get all temps en minutes
exports.getAllTempsEnMinutes = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let list_temps = [];
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;

                if (gameFetched[i].user.equals(iduser)) {


                    list_temps.push(gameFetched[i].temps);
                }
            }

            //recuperer le temps et le tranformer en minutes seulement

            console.log("****************liste de temps*************");
            console.log(list_temps);
            let listeTempsEnMinutes = [];
            let totalTemsp = 0;
            let HeuresEnMinutes = 0;

            for (let i = 0; i < list_temps.length; i++) {
                let t = list_temps[i];
                //le temps est de format 00:00:00
                let heures = t.substring(0, 2);
                let minutes = t.substring(3, 5);
                console.log("*******heures*");
                console.log(heures);
                console.log("*******minutes*");
                console.log(minutes);
                HeuresEnMinutes = parseInt(heures) * 60;
                console.log(HeuresEnMinutes);
                totalTemsp = HeuresEnMinutes + parseInt(minutes);
                console.log(totalTemsp);
                listeTempsEnMinutes.push(totalTemsp);
            }

            let totalTemps = 0;
            console.log(listeTempsEnMinutes);
            for (let j = 0; j < listeTempsEnMinutes.length; j++) {
                totalTemps = totalTemps + parseInt(listeTempsEnMinutes[j]);

            }

            res.json({totalTemps, listeTempsEnMinutes});


        }).catch(err => console.log(err));
};
//calcul total calories for user connected
exports.CalculTotalCalories = (req, res, next) => {
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            let list_calories = [];
            let totalC = 0;
            console.log("before fetch", gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;

                if (gameFetched[i].user == iduser) {
                    list_calories.push(gameFetched[i].calorie);
                }

            }
            console.log(list_calories);
            for (let j = 0; j < list_calories.length; j++) {
                totalC = totalC + parseInt(list_calories[j]);

            }

            if (totalC === 0)
                res.json({"success": false, totalC});

            res.json({"success": true, totalC});
        }).catch(err => {
        if (err) {
            res.json({"message": "Error"});
        }
    });
};
//add heart beat for user
exports.addHeartBeat = (req, res, next) => {

    console.log("id user", req.userData.userId);
    console.log("id level", req.params.id);
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            ;
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;
                console.log("id user", req.userData.userId);
                console.log(gameFetched[i].user);
                console.log(gameFetched[i].level);
                if (gameFetched[i].user == iduser && gameFetched[i].level == idlevel) {


                    let heart = req.body.heartBeat;

                    gameFetched[i].heartBeat = heart;
                    gameFetched[i].save();
                    res.json("heartbeat successfully added");
                }

            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
//add temps for user
exports.addTemps = (req, res, next) => {

    console.log("id user", req.userData.userId);
    console.log("id level", req.params.id);
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;
                console.log("id user", req.userData.userId);
                console.log(gameFetched[i].user);
                console.log(gameFetched[i].level);
                if (gameFetched[i].user == iduser && gameFetched[i].level == idlevel) {


                    let temps = req.body.temps;

                    gameFetched[i].temps = temps;
                    gameFetched[i].save();
                    res.json("successfully added");
                }

            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
//Add calories for user
exports.addCalories = (req, res, next) => {


    console.log("id user", req.userData.userId);
    console.log("id level", req.params.id);
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }

            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;
                console.log("id user", req.userData.userId);
                console.log(gameFetched[i].user);
                console.log(gameFetched[i].level);
                if (gameFetched[i].user == iduser && gameFetched[i].level == idlevel) {


                    let calorie = req.body.calorie;
                    gameFetched[i].calorie = calorie;
                    gameFetched[i].save();
                    res.json("successfully added");
                }

            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
//add distance for user
exports.addDistance = (req, res, next) => {
    console.log("id user", req.userData.userId);
    console.log("id level", req.params.id);
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            ;
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;
                console.log("id user", req.userData.userId);
                console.log(gameFetched[i].user);
                console.log(gameFetched[i].level);
                if (gameFetched[i].user == iduser && gameFetched[i].level == idlevel) {

                    let dist = req.body.distance;
                    gameFetched[i].distance = dist;
                    gameFetched[i].save();
                    res.json(" distance successfully added");
                }

            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
//add score for user
exports.addScore = (req, res, next) => {
    console.log("id user", req.userData.userId);
    console.log("id level", req.params.id);
    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;
                const idlevel = req.params.id;
                console.log("id user", req.userData.userId);
                console.log(gameFetched[i].user);
                console.log(gameFetched[i].level);
                if (gameFetched[i].user == iduser && gameFetched[i].level == idlevel) {


                    let score = req.body.score;

                    gameFetched[i].score = score;
                    gameFetched[i].save();
                    res.json("score successfully added");
                }

            }
        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching profiles failed!"
            });
        });
};
//ajouter niveau
exports.addLevel = (req, res, next) => {

    const level1 = new Level({
        nameLevel: req.body.nameLevel
    });
    level1.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send("level Created successfully");
    });
};
//ajouter game
exports.addGame = (req, res, next) => {

    const game1 = new Game({
        status: req.body.status
    });
    game1.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send("Game Created successfully");
    });
};
//ajouter game avec id level and id user
exports.addUserLevelToGame = (req, res, next) => {

    //fetch level by id
    Level.findById(req.params.id)
        .then(level => {
            if (!level) {
                return res.status(400).json({
                    message: "level not found"
                });
            }
            console.log("level id", level._id);

            User.findById({_id: req.userData.userId})
                .then((user) => {
                    if (!user) {
                        return res.json({
                            message: "undefined user"
                        });
                    }
                    console.log("user di ", user._id);
                    //creating the game
                    const game1 = new Game({
                        user: user._id,
                        level: level._id,
                        status: "done"
                    });

                    game1.save(function (err) {
                        if (err) {
                            return next(err);
                        }
                        res.send("Game affected successfully");
                    });

                });
            // .catch(err => {
            //   res.status(200).json({
            //     message: "error user "
            //   });
            // });

        })
        .catch(err => {
            console.log(err);
            return res.status(401).json({
                message: "Fetching levels failed!"
            });
        });

};
//get best score for user
exports.BestScoreUser = (req, res, next) => {

    Game.find()
        .then(gameFetched => {
            if (!gameFetched) {
                return res.json({
                    message: "undefined game"
                });
            }

            let listeScore = [];
            let listeDate = [];
            console.log(gameFetched.length);
            for (let i = 0; i < gameFetched.length; i++) {
                const iduser = req.userData.userId;

                if (gameFetched[i].user.equals(iduser)) {
                    listeScore.push(gameFetched[i].score);
                    //  listeScore.push(gameFetched[i].score);
                }


            }

            listeScore.sort(function (a, b) {
                return b - a;
            });
            // console.log("max",Math.min.apply(Math, listeScore)  );
            res.json({listeScore: listeScore});
        }).catch(err => {
        console.log(err);
        return res.status(401).json({
            message: " failed!"
        });
    });
};