var mongoose = require('mongoose');
var LevelSchema = new  mongoose.Schema({
  nameLevel:{type: String}
});
module.exports=mongoose.model('Level',LevelSchema);
