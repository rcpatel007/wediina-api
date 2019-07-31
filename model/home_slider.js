var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var HomesliderSchema = new mongoose.Schema({
  image:String,
 }, { collection: 'home_slider' });

mongoose.model('home_slider', HomesliderSchema);

module.exports = mongoose.model('home_slider');