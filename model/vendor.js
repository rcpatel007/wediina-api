var mongoose = require('mongoose');  
var Schema = mongoose.Schema;

var VendorSchema = new mongoose.Schema({
    vendor_cat_name:String,
    name: String,
    CompanyName: String,
    contactno:String,
    email:String,
    password: String,
    city: String,
    areaName:String,
    image:String,
    sub_image:Array
}, { collection: 'vendors' });

mongoose.model('vendors', VendorSchema);

module.exports = mongoose.model('vendors');