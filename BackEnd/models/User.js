var mongoose = require('mongoose');
var valid = require('validator');

var userSchema = new  mongoose.Schema({
    name:{
            type:String,
            required: true
        },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    imageProfile:{
        type:String,
        //default:'https://res.cloudinary.com/oscproject/image/upload/v1565617860/ProfilePictures/2019-08-12T13:50:57.784Z.jpg'
    },
    oldPhoto: [{type:String}],
    height:{
        type:String
    },
    weight:{
        type:String
    },
    gender: {
        type: String},
    poids: {
        type: Number},
    birthday:
      {type: String},


});
module.exports=mongoose.model('User',userSchema);

