var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var WishlistSchema = new mongoose.Schema({
    customer_id:String,
    venue_id:Array,
    vendor_id:Array
 }, { collection: 'wishlist' });

mongoose.model('wishlist', WishlistSchema);

module.exports = mongoose.model('wishlist');