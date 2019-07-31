var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var ReviewSchema = new mongoose.Schema({
  customer_id:String,
  venue_id:String,
  Rating:Number,
  comment:String
 }, { collection: 'review' });

mongoose.model('review', ReviewSchema);

module.exports = mongoose.model('review');