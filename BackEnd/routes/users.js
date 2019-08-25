const express = require("express");

const UserController = require("../controllers/users");
const authCheck = require("../middleware/check-auth");

const router = express.Router();
router.post("/login", UserController.UserLogin);
router.post("/register", UserController.createUser);
//create level
router.post("/addLevel", UserController.addLevel);
router.post('/addGame',authCheck, UserController.addGame);
router.post("/addUserLevelToGame/:id",authCheck, UserController.addUserLevelToGame);


router.get('/getProfileForConnectedUser',authCheck , UserController.getProfileConnectedUser);

router.get('/getAllProfiles',UserController.getAllProfiles);

router.get('/getInfoUserByEmail/:email', UserController.getInfoUserByEmail);
router.get('/getUserInfo',authCheck ,UserController.getUserInfo);


router.post('/updateUser',authCheck,UserController.updateUser);
  //Add distane , calorie,heartbeat,temps for user
router.post('/addDistance/:id',authCheck, UserController.addDistance);
router.post('/addTemps/:id',authCheck, UserController.addTemps);
router.post('/addScore/:id',authCheck, UserController.addScore);
router.post('/addCalorie/:id',authCheck, UserController.addCalories);
router.post('/addHeartBeat/:id',authCheck, UserController.addHeartBeat);

//filtrer game by date and get what ever you want
router.get('/fetchGameByDate',authCheck, UserController.fetchGameByDate);
//getBestScore
router.get('/BestScoreUser',authCheck,UserController.BestScoreUser);
router.get('/fetchGameByDateByEmail/:email',UserController.fetchGameByDateByEmail);
router.get('/calculTotalTempsByEmail/:email',UserController.calculTotalTempsByEmail);
router.get('/CalculTotalDistancesByEmail/:email',UserController.CalculTotalDistancesByEmail);
router.get('/CalculTotalCaloriesByEmail/:email',UserController.CalculTotalCaloriesByEmail);
router.get('/CalculTotalForEachDayByEmail/:email',UserController.CalculTotalForEachDayByEmail);
//calcul total today
router.get('/CalculTotalTodayByEmail/:email',UserController.CalculTotalTodayByEmail);
//calcul total for this month
router.get('/CalculTotalthisMonthByEmail/:email',UserController.CalculTotalthisMonthByEmail);
//calcul total for this week
router.get('/CalculTotalthisWeekByEmail/:email',UserController.CalculTotalthisWeekByEmail);

//get all temps en minutes by date
router.get('/getAllTempsEnMinutes',authCheck,UserController.getAllTempsEnMinutes);
router.get('/calculTotalTemps',authCheck, UserController.calculTotalTemps);
router.get('/CalculTotalDistances',authCheck,UserController.CalculTotalDistances);
router.get('/CalculTotalCalories',authCheck,UserController.CalculTotalCalories);
router.get('/getAllDistancesTemps',authCheck,UserController.getAllDistancesTemps);


module.exports = router;
