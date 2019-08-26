var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require("passport");

const cors = require('cors');


var indexRouter = require('./routes');
var UserRouter = require('./routes/users');
var app = express();
app.set('views', path.join(__dirname, '../src/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
//Routes
app.use('/', indexRouter);
app.use('/users',UserRouter);

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// //serve static assets in production
// if(process.env.NODE_ENV === 'production'){
//   app.use(express.static( '../../black-dashboard-react-master/build'));
//   app.get('*',(req,res)=>{
//     res.sendFile(path.resolve(__dirname,'black-dashboard-react-master','build','index.html'));
//   }
//   );
// }
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
