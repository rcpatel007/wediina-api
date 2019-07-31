var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var HomeadsSchema = new mongoose.Schema({
  name:String,
  venue_id:String,
  vendor_id:String,
  image:String,
  city:String
}, { collection: 'home_ads' });

mongoose.model('home_ads', HomeadsSchema);

module.exports = mongoose.model('home_ads');