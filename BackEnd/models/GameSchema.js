var mongoose = require('mongoose');



var GameSchema = new  mongoose.Schema({
  user:{ type: mongoose.Schema.ObjectId, ref: 'User' },
  level:{ type: mongoose.Schema.ObjectId, ref: 'Level' },
  heartBeat:{type:Number},
  distance:{type:String},
  calorie:{type:String},
  temps:{type:String},
  status:{type:String},
  score:{type:Number},
  Date:{
    type:Date,
    default:Date.now()
  }
});
module.exports=mongoose.model('Game',GameSchema);
