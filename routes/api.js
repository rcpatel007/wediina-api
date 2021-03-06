var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

var nodemailer = require('nodemailer');
var randtoken = require('rand-token')
var bcrypt = require('bcryptjs');
var mongojs = require('mongojs');
// var bcrypt = require('bcryptjs');
var config = require('../config');
// db connection

// var db = mongojs('mongodb://chiragramani145:chirag123@ds131932.mlab.com:31932/riddhi');
var db = mongojs('mongodb://chirag:chirag123@ds253857.mlab.com:53857/venuebooking');


router.get('/', (req, res, next) => {
    res.render('index');
});
// login admin
router.post('/admin', (req, res, next) => {
    // db.admin.findOne({ email: req.body.email }, (err, result) => {
    //     if (err) return res.status(500).send('Error on the server.');
    //     if (!result) return res.status(404).send('No user found.');
    //      if (req.body.password == result.password) {
    //         res.json(result);
    //         res.status(200).send({ "message": "Login Sucessfully" });
    //             var passwordIsValid =true;
    //     }
    //     if (passwordIsValid=false) return res.status(401).send('password is not valid');
    // });

    db.admin.findOne({ email: req.body.email }, (err, result) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!result) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
        if (!passwordIsValid) return res.status(401).send('password is not valid');
        // res.json(result);
        res.status(200).send(result);
    });
});
// admin update password
router.put('/admin_update/:id', (req, res, next) => {
    var password = req.body;
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    db.admin.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { password: req.body.hashedPassword } }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "password Updated" });
    });
});




//customer Login
// login user


//validate login credentials
// router.post('/customerLogin', function (req, res) {
//     db.customer.findOne({ email: req.body.email }, function (err, result) {
//         if (err) return res.status(500).send('Error on the server.');
//         if (!result) return res.status(404).send('No user found.');
//         var passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
//         if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
//         var token = jwt.sign({ id: result._id }, config.secret, {
//             expiresIn: 86400 // expires in 24 hours
//         });
//         res.status(200).send({ auth: true, token: token });
//     });
// });
// router.post('/customerLogin', (req, res, next) => {
//     db.customer.findOne({ email: req.body.email }, (err, result) => {
//         if (err) return res.status(500).send('Error on the server.');
//         if (!result) return res.status(404).send('No user found.');
//         var passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
//         if (!passwordIsValid) return res.status(401).send('password is not valid');
//         res.json(result);
//         res.status(200).send({ "message": "Login Sucessfully" });
//     });
// });
router.post('/customerLogin', (req, res,next) => {
    db.customer.findOne({ email: req.body.email }, (err, result) => {
        if (err) return res.status(500).send({"message":"Error on the server."});
        if (!result) return res.status(404).send({"message":"No user found."});
        var passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
        if (!passwordIsValid) return res.status(401).send('password is not valid');
        // res.json(result);
        res.status(200).send(result);
    });
});
//update password
router.put('/customer_pwd_update/:id', (req, res, next) => {
    var password = req.body.password;
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    db.customer.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { password: req.body.hashedPassword } }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "password Updated" });
    });
});


//venue Login
// login user
router.post('/venueLogin', (req, res, next) => {
    db.venues.findOne({ email: req.body.email }, (err, result) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!result) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
        if (!passwordIsValid) return res.status(401).send('password is not valid');
        // res.json(result);
        res.status(200).send(result);
    });
});


//update password
router.put('/venue_pwd_update/:id', (req, res, next) => {
    var password = req.body;
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    db.venues.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { password: req.body.hashedPassword } }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "password Updated" });
    });
});


//Vendors Login
// login user
router.post('/vendorLogin', (req, res, next) => {
    db.vendors.findOne({ email: req.body.email }, (err, result) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!result) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
        if (!passwordIsValid) return res.status(401).send('password is not valid');
        // res.json(result);
        res.status(200).send(result);
    });
});
//update password
router.put('/vendors_pwd_update/:id', (req, res, next) => {
    var password = req.body;
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    db.vendors.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { password: req.body.hashedPassword } }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "password Updated" });
    });
});



/**************************************************************** */
//    venue category
/**************************************************************** */

//get all venue category
router.get('/venue_cat', (req, res, next) => {
    db.venue_category.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});


//get venue category by id
router.get('/venue_cat/:id', (req, res, next) => {
    db.venue_category.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

// create venue category
router.post('/venue_cat', (req, res, next) => {
    // venue_cat_name: req.body.venue_cat_name;
    db.venue_category.save({ venue_cat_name: req.body.venue_cat_name,image: req.body.cat_img }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "venue category add" });
    });
});
//update venue category
router.put('/venue_cat/:id', (req, res, next) => {
    db.venue_category.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { venue_cat_name: req.body.venue_cat_name,image: req.body.cat_img } }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": " venue category update" });
    });
});

//delete venue category
router.delete('/venue_cat/:id', (req, res, next) => {
    db.venue_category.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "venue category Delete" });
    });
});

// **************************************************************** */
//    venue category
/**************************************************************** */

//get all venue category
router.get('/city', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.city.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});


//get venue category by id
router.get('/city/:id', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.city.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

// create venue category
router.post('/city', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // venue_cat_name: req.body.venue_cat_name;
    db.city.save({ city: req.body.city}, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "city add" });
    });
});
//update venue category
router.put('/city/:id', (req, res, next) => {
    db.city.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { city: req.body.city} }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": " city update" });
    });
});

//delete venue category
router.delete('/city/:id', (req, res, next) => {
    db.city.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "city Delete" });
    });
});



/**************************************************************** */
//    vendors category
/**************************************************************** */

//get all vendor category
router.get('/vendor_cat', (req, res, next) => {
    db.vendor_category.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});


//get vendor category by id
router.get('/vendor_cat/:id', (req, res, next) => {
    db.vendor_category.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

// create vendor category
router.post('/vendor_cat', (req, res, next) => {
    db.vendor_category.save({ vendor_cat_name: req.body.vendor_cat_name,image: req.body.cat_img }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "vendors category add" });
    });
});
//update vendor category
router.put('/vendor_cat/:id', (req, res, next) => {
    var vendor_cat_name = req.body.vendor_cat_name;
    db.vendor_category.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { vendor_cat_name: req.body.vendor_cat_name,image: req.body.cat_img } }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "vendors category update" });
    });
});

//delete vendor category
router.delete('/vendor_cat/:id', (req, res, next) => {
    db.vendor_category.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "vendors category Delete" });
    });
});



/**************************************************************** */
//    home ads
/**************************************************************** */

//get all home image
router.get('/home_ads', (req, res, next) => {
    db.home_ads.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});


//get home image by id
router.get('/home_ads/:id', (req, res, next) => {
    db.home_ads.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

// create home image
router.post('/home_ads', (req, res, next) => {
    var associate = {
        name: req.body.name,
        venue_id: req.body.venue_id,
        vendor_id: req.body.vendor_id,
        image: req.body.image,
        city: req.body.city
    }
    db.home_ads.save(associate, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "home slider image add" });
    });
});
//update home image
router.put('/home_ads/:id', (req, res, next) => {

    db.home_ads.update({ _id: mongojs.ObjectId(req.params.id) }, {
        $set: {
            name: req.body.name,
            venue_id: req.body.venue_id,
            vendor_id: req.body.vendor_id,
            image: req.body.image,
            city: req.body.city
        }
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "home slider image update" });
    });
});

//delete home image
router.delete('/home_ads/:id', (req, res, next) => {
    db.home_ads.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "home ads slider image Delete" });
    });
});


/**************************************************************** */
//    home slider
/**************************************************************** */

//get all home slider image
router.get('/home_slider', (req, res, next) => {
    db.home_slider.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});


//get home slider image by id
router.get('/home_slider/:id', (req, res, next) => {
    db.home_slider.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

// create home slider image
router.post('/new_home_slider', (req, res, next) => {
    var associate = {
        image: req.body.image,
    } 
    db.home_slider.save(associate, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "home slider image add" });
    });
});
//update home slider image
router.put('/home_slider/:id', (req, res, next) => {

    db.home_slider.update({ _id: mongojs.ObjectId(req.params.id) }, {
        $set: {
            image: req.body.image,
         }
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "home slider image update" });
    });
});

//delete home slider image
router.delete('/home_slider/:id', (req, res, next) => {
    db.home_slider.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "home ads slider image Delete" });
    });
});




/**************************************************************** */
//    Customer
/**************************************************************** */

//get all home image
router.get('/customer', (req, res, next) => {
    db.customer.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});


//get home image by id
router.get('/customer/:id', (req, res, next) => {
    db.customer.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

// create home image
router.post('/new_customer', (req, res, next) => {
    
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var associate = {
        name: req.body.name,
        contact_no: req.body.contact_no,
        email: req.body.email,
        password: hashedPassword,
        status:true

    }
    db.customer.save(associate, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "New Customer add" });
    });
});
//update home image
router.put('/customer/:id', (req, res, next) => {

    db.customer.update({ _id: mongojs.ObjectId(req.params.id) }, {
        $set: {
            name: req.body.name,
            contact_no: req.body.contact_no,
            email: req.body.email,
            password: req.body.password
            }
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "Customer Detail Update" });
    });
});

router.put('/customer_status/:id', (req, res, next) => {

    db.customer.update({ _id: mongojs.ObjectId(req.params.id) }, {
        $set: {
        status:req.body.status
            }
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "customer status update" });
    });
});

//delete home image
router.delete('/customer/:id', (req, res, next) => {
    db.customer.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "Customer delete successfully" });
    });
});



/**************************************************************** */
//    venues
/**************************************************************** */

//get all venue
router.get('/venue', (req, res, next) => {
    db.venues.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});


//get venue by id
router.get('/venue_by_id/:id', (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    db.venues.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

// create new venue
router.post('/newvenue', (req, res, next) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var associate = {
        venue_cat_id: req.body.venue_cat_id,
        fname: req.body.fname,
        lname: req.body.lname,
        package:req.body.package_time,
        companyName: req.body.companyName,
        area:req.body.area,
        contactno: req.body.contactno,
        email: req.body.email,
        gstno: req.body.gstno,
        status:req.body.status,
        password: hashedPassword,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        parking:req.body.parking,
        catringValue:req.body.catringValue,
        themepermission:req.body.themepermission,
        image:req.body.p_img,
        sub_img: req.body.oimg,
        timeper:req.body.timeper,
        areavenue:req.body.areavenue,
        cop:req.body.cop,
        location:req.body.location,
        desp:req.body.desp,
        video_story:req.body.video_story
    }
    db.venues.save(associate, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "new venue add" });
    });
});
//update venue detail
router.put('/venue_update/:id', (req, res, next) => {
    var venue_cat_id = req.body.venue_cat_id;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var  package =req.body.package_time;
    var companyName = req.body.companyName;
    var contactno = req.body.contactno;
    var email = req.body.email;
    var gstno = req.body.gstno;
    var password = req.body.password;
    var address = req.body.address;
    var city = req.body.city;
    var state = req.body.state;
    var venue = req.body.venuedetail;
    db.venues.update({ _id: mongojs.ObjectId(req.params.id) }, {
        $set: {
            venue_cat_id: req.body.venue_cat_id,
            fname: req.body.fname,
            lname: req.body.lname,
            package:req.body.package_time,
            companyName: req.body.companyName,
            contactno: req.body.contactno,
            email: req.body.email,
            area:req.body.area,
            gstno: req.body.gstno,
            password: req.body.password,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            parking:req.body.parking,
            catringValue:req.body.catringValue,
            themepermission:req.body.themepermission,
            timeper:req.body.timeper,
            areavenue:req.body.areavenue,
            cop:req.body.cop,
            location:req.body.location,
            desp:req.body.desp,
            video_story:req.body.video_story,
        }
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "venue details updated" });
    });
});

//delete venue
router.delete('/venue_delete/:id', (req, res, next) => {
    db.venues.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "venue_delete Delete" });
    });
});

// status change
router.put('/venue_status/:id', (req, res, next) => {
    var status = req.body.Status;
    db.venues.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { status: req.body.Status } }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "Venue Status Updated" });
    });
});

router.put('/venue_bookdate/:id', (req, res, next) => {
    var bookingdate = req.body.bookingdate;
    db.venues.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { bookingdate: req.body.bookingdate } }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "Venue date Updated" });
    });
});



/**************************************************************** */
// vendors   
/**************************************************************** */

//get all vendors
router.get('/vendor', (req, res, next) => {
    db.vendors.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});


//get vendors by id
router.get('/vendor_by_id/:id', (req, res, next) => {
    db.vendors.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});



// create vendors
router.post('/newvendor', (req, res, next) => {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var associate = {   
        vendor_cat_id: req.body.vendor_cat_id,
        fname: req.body.fname,
        lname: req.body.lname,
        package:req.body.package,
        status:req.body.status,
        companyName: req.body.companyName,
        contactno: req.body.contactno,
        email: req.body.email,
        gstno: req.body.gstno,
        image:req.body.image,
        sub_images:req.body.sub_images,
        password: hashedPassword,
        address: req.body.address,
        city: req.body.city,
        area: req.body.area,
        state: req.body.state,
        video_story:req.body.video_story,
        desp:req.body.desp,
        bookingdate:req.body.bookingdate,
        weblink:null,
        prime_user:false
    }
    db.vendors.save(associate, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "new vendor add" });
    });
});


//update vendor by id
router.put('/vendor_update/:id', (req, res, next) => {
    var vendor_cat_id = req.body.vendor_cat_id;
    var fname = req.body.fname;
    var lname = req.body.lname;
    var package=req.body.package_time;
    var companyName = req.body.companyName;
    var contactno = req.body.contactno;
    var email = req.body.email;
    var gstno = req.body.gstno;
    var password = req.body.password;
    var address = req.body.address;
    var city = req.body.city;
    var area = req.body.area;
    var state = req.body.state;
    var images = req.body.images;
    var sub_images = req.body.sub_images;
   var weblink =req.body.weblink;
    //   var prime_user =req.body.prime_user;
    db.vendors.update({ _id: mongojs.ObjectId(req.params.id) }, {
        $set: {
            vendor_cat_id: req.body.vendor_cat_id,
            fname: req.body.fname,
            lname: req.body.lname,
            package:req.body.package,
            status:req.body.status,
            companyName: req.body.companyName,
            contactno: req.body.contactno,
            email: req.body.email,
            gstno: req.body.gstno,
            password: req.body.password,
            address: req.body.address,
            area: req.body.area,
            city: req.body.city,
            state: req.body.state,
            video_story:req.body.video_story,
            desp:req.body.desp,
            weblink:req.body.weblink
        }
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "vendor details updated" });
    });
});

//update vendor by id
router.put('/vendor_prime_status/:id', (req, res, next) => {
      var prime_user =req.body.prime_user;
    db.vendors.update({ _id: mongojs.ObjectId(req.params.id) }, {
        $set: {
            prime_user:req.body.prime_user
        }
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "vendor prime Update updated" });
    });
});


//delete vendor
router.delete('/vendor_delete/:id', (req, res, next) => {
    db.vendors.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "venue_delete Delete" });
    });
});


// status change
router.put('/vendor_status/:id', (req, res, next) => {
    var status = req.body.Status;
    db.vendors.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { status: req.body.Status } }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "Vendor Status Updated" });
    });
});

router.put('/vendor_bookdate/:id', (req, res, next) => {
    var bookingdate = req.body.bookingdate;
    db.vendors.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { bookingdate: req.body.bookingdate } }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "Vendor Status Updated" });
    });
});





/************************************************************* */

// send inqury

/******************************************************************** */


// send venue inquiry
router.post('/venue_inquiry', (req, res, next) => {
    console.log(req.body.customer_name);
    
    var associate = {
        customer_name: req.body.customer_name,
        venue_id: req.body.venue_id,
        date: req.body.date,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        no_of_person: req.body.no_of_person,
        purpose: req.body.purpose
    }
    db.venue_inquiry.save(associate, (err, result) => {
        if (err) {
            res.send(err);
        }
        console.log("inquiry",associate);
        
         //send email
         var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'wediina11@gmail.com',
                pass: 'Bj9638127136@'
            }
        });
        var mailOptions = {
            from: 'wediina11@gmail.com',
            to: req.body.v_email,
            subject: 'Inquiery of your venues',
            text: 'Please get your Inquiery',
            html: '<h3>Please get your inquiry and update with client:</h3> <br />  <br /><b>Customer Name </b>' + req.body.customer_name + 
            '<br /><b>Email: </b><span>' + req.body.email + '</span>'+
            '<br /><b>Mobile No: </b><span>' + req.body.mobileNo + '</span>'+
            '<br /><b>Booking Date: </b><span>' + req.body.date + '</span>'+
            '<br /><b>No of Person: </b><span>' + req.body.no_of_person + '</span>'+
            '<br /><b>purpose of inquiry: </b><span>' + req.body.purpose + '</span>'
        };
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.json({ "message": "Venue inquiry Sent" });
    });
});

router.get('/venue_inquiry', (req, res, next) => {
    db.venue_inquiry.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

// router.get('/venue_inquiry/:id', (req, res, next) => {
//     // res.setHeader('Access-Control-Allow-Origin', '*');
//     db.venue_inquiry.findOne({  }, (err, result) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(result);
//     });
// });
// send vendor inquiry
router.post('/vendor_inquiry', (req, res, next) => {
    var vendor_inquiry = {
        customer_name: req.body.customer_name,
        vendor_id: req.body.venue_id,
        date: req.body.date,
        email: req.body.email,
        mobileNo: req.body.mobileNo,
        location: req.body,
        purpose: req.body.purpose
    }
    db.vendor_inquiry.save(vendor_inquiry, (err, result) => {
        if (err) {
            res.send(err);
        }  //send email
        var transporter = nodemailer.createTransport({
           service: 'gmail',
           auth: {
               user: 'wediina11@gmail.com',
               pass: 'Bj9638127136@'
           }
       });
       var mailOptions = {
           from: 'wediina11@gmail.com',
           to: req.body.v_email,
           subject: 'Inquiery of your venues',
           text: 'Please get your Inquiery',
           html: '<h3>Please get your inquiry and update with client:</h3> <br />  <br /><b>Customer Name </b>' + req.body.customer_name + 
           '<br /><b>Email: </b><span>' + req.body.email + '</span>'+
           '<br /><b>Mobile No: </b><span>' + req.body.mobileNo + '</span>'+
           '<br /><b>Booking Date: </b><span>' + req.body.date + '</span>'+
           '<br /><b>Location: </b><span>' + req.body.location + '</span>'+
           '<br /><b>purpose of inquiry: </b><span>' + req.body.purpose + '</span>'
       };
       
       transporter.sendMail(mailOptions, function (error, info) {
           if (error) {
               console.log(error);
           } else {
               console.log('Email sent: ' + info.response);
           }
       });
       res.json({ "message": "Vendor inquiry Sent" });
   });
});


router.get('/vendor_inquiry/:id', (req, res, next) => {
    // res.setHeader('Access-Control-Allow-Origin', '*');
    db.vendor_inquiry.findOne({ vendor_id:req.params.vid }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});
router.get('/vendor_inquiry', (req, res, next) => {
    db.vendor_inquiry.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});


/**************************************************************** */
//    Review
/**************************************************************** */

//get all home image
router.get('/review', (req, res, next) => {
    db.review.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});


//get home image by id
router.get('/review/:id', (req, res, next) => {
    db.review.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

// create home image
router.post('/review', (req, res, next) => {
    var associate = {
        customer_id: req.body.customer_id,
        venue_id: req.body.venue_id,
        vendor_id: req.body.vendor_id,
        rating: req.body.rating,
        comment:req.body.comment
    }
    db.review.save(associate, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "review add",result });
    });
});
//update home image
router.put('/review/:id', (req, res, next) => {

    db.review.update({ _id: mongojs.ObjectId(req.params.id) }, {
        $set: {
            customer_id: req.body.customer_id,
            venue_id: req.body.venue_id,
            vendor_id: req.body.vendor_id,
            rating: req.body.rating,
            comment:req.body.comment
        }
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "review update" });
    });
});

//delete home image
router.delete('/review/:id', (req, res, next) => {
    db.review.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "review Delete",result });
    });
});


/**************************************************************** */
// prime photographer   
/**************************************************************** */

//get all vendors
router.get('/prime_photo', (req, res, next) => {
    db.primephotos.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});


//get primephotos by id
router.get('/prime_photo/:id', (req, res, next) => {
    db.primephotos.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

// create primephotos
router.post('/prime_photo', (req, res, next) => {

    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    var associate = {   
        fname: req.body.fname,
        lname: req.body.lname,
        package:req.body.package,
        status:req.body.status,
        companyName: req.body.companyName,
        contactno: req.body.contactno,
        email: req.body.email,
        gstno: req.body.gstno,
        image:req.body.image,
        sub_images:req.body.sub_images,
        password: hashedPassword,
        address: req.body.address,
        city: req.body.city,
        area: req.body.area,
        state: req.body.state,
        video_story:req.body.video_story,
        weblink:req.body.weblink,
        bookingdate:req.body.bookingdate
    }
    db.primephotos.save(associate, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "new vendor add" });
    });
});


//update vendor by id
router.put('/prime_photo/:id', (req, res, next) => {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var package=req.body.package_time;
    var companyName = req.body.companyName;
    var contactno = req.body.contactno;
    var email = req.body.email;
    var gstno = req.body.gstno;
    var password = req.body.password;
    var address = req.body.address;
    var city = req.body.city;
    var area = req.body.area;
    var state = req.body.state;
    var images = req.body.images;
    var sub_images = req.body.sub_images;
    db.primephotos.update({ _id: mongojs.ObjectId(req.params.id) }, {
        $set: {
            fname: req.body.fname,
            lname: req.body.lname,
            package:req.body.package,
            status:req.body.status,
            companyName: req.body.companyName,
            contactno: req.body.contactno,
            email: req.body.email,
            gstno: req.body.gstno,
            password: req.body.password,
            address: req.body.address,
            area: req.body.area,
            city: req.body.city,
            state: req.body.state,
            video_story:req.body.video_story,
               weblink:req.body.weblink,
            bookingdate:req.body.bookingdate
        }
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "vendor details updated" });
    });
});


//delete vendor
router.delete('/prime_photo/:id', (req, res, next) => {
    db.primephotos.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "venue_delete Delete" });
    });
});

router.post('/contact_detail', (req, res, next) => {
    console.log(req.body.customer_name);
    
    var associate = {
        customer_name: req.body.name,
        email: req.body.email,
        MobileNo: req.body.mobileNo,
        email: req.body.subject,
        message: req.body.message,
    }
    db.contact.save(associate, (err, result) => {
        if (err) {
            res.send(err);
        }
        console.log("inquiry",associate);
        
         //send email
         var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'wediina11@gmail.com',
                pass: 'Bj9638127136@'
            }
        });
        var mailOptions = {
            from: 'wediina11@gmail.com',
            to: "info@wediina.com",
            subject: req.body.subject,
            text: 'Please get your Inquiery ' ,
            html: '<h3>Please get your inquiry and update with client:</h3> <br />  <br /><b>Customer Name </b>' + req.body.name + 
            '<br /><b>Email: </b><span>' + req.body.email + '</span>'+
            '<br /><b>Mobile No: </b><span>' + req.body.mobileNo + '</span>'+
            '<br /><b>Message: </b><span>' + req.body.message+ '</span>'
        };
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
        res.json({ "message": "contact detail submit" });
    });
});



// status change
router.put('/prime_status/:id', (req, res, next) => {
    var status = req.body.Status;
    db.primephotos.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { status: req.body.Status } }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "Vendor Status Updated" });
    });
});

router.put('/prime_bookdate/:id', (req, res, next) => {
    var bookingdate = req.body.bookingdate;
    db.primephotos.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { bookingdate: req.body.bookingdate } }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "Vendor Status Updated" });
    });
});

module.exports = router;