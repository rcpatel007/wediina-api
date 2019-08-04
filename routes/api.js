var express = require('express');
var router = express.Router();

var mongojs = require('mongojs');
var bcrypt = require('bcryptjs');
var config = require('../config');
// db connection

// var db = mongojs('mongodb://chiragramani145:chirag123@ds131932.mlab.com:31932/riddhi');
var db = mongojs('mongodb://chirag:chirag123@ds253857.mlab.com:53857/venuebooking');


router.get('/', (req, res, next) => {
    res.render('index');
});
// login admin
router.get('/admin', (req, res, next) => {
    db.admin.findOne({ email: req.body.email }, (err, result) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!result) return res.status(404).send('No user found.');
         if (req.body.password == result.password) {
            res.json(result);
            res.status(200).send({ "message": "Login Sucessfully" });
                var passwordIsValid =true;
        }
        if (passwordIsValid=false) return res.status(401).send('password is not valid');
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
router.get('/customerLogin', (req, res, next) => {
    db.customer.findOne({ email: req.body.email }, (err, result) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!result) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
        if (!passwordIsValid) return res.status(401).send('password is not valid');
        res.json(result);
        res.status(200).send({ "message": "Login Sucessfully" });
    });
});
//update password
router.put('/customer_pwd_update/:id', (req, res, next) => {
    var password = req.body;
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
router.get('/venueLogin', (req, res, next) => {
    db.venues.findOne({ email: req.body.email }, (err, result) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!result) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
        if (!passwordIsValid) return res.status(401).send('password is not valid');
        res.json(result);
        res.status(200).send({ "message": "Login Sucessfully" });
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
router.get('/vendorLogin', (req, res, next) => {
    db.vendors.findOne({ email: req.body.email }, (err, result) => {
        if (err) return res.status(500).send('Error on the server.');
        if (!result) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, result.password);
        if (!passwordIsValid) return res.status(401).send('password is not valid');
        res.json(result);
        res.status(200).send({ "message": "Login Sucessfully" });
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
    db.venue_category.save({ venue_cat_name: req.body.venue_cat_name }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "venue category add" });
    });
});
//update venue category
router.put('/venue_cat/:id', (req, res, next) => {
    db.venue_category.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { venue_cat_name: req.body.venue_cat_name } }, (err, result) => {
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
    db.vendor_category.save({ vendor_cat_name: req.body.vendor_cat_name }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "vendors category add" });
    });
});
//update vendor category
router.put('/vendor_cat/:id', (req, res, next) => {
    var vendor_cat_name = req.body.vendor_cat_name;
    db.vendor_category.update({ _id: mongojs.ObjectId(req.params.id) }, { $set: { vendor_cat_name: req.body.vendor_cat_name } }, (err, result) => {
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
    db.home_ads.find((err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});


//get home slider image by id
router.get('/home_slider/:id', (req, res, next) => {
    db.home_ads.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

// create home slider image
router.post('/new_home_slider', (req, res, next) => {
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
//update home slider image
router.put('/home_slider/:id', (req, res, next) => {

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

//delete home slider image
router.delete('/home_slider/:id', (req, res, next) => {
    db.home_ads.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
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
    var associate = {
        name: req.body.name,
        contact_no: req.body.contact_no,
        email: req.body.email,
        password: req.body.password

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
    db.venues.findOne({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json(result);
    });
});

// create new venue
router.post('/newvenue', (req, res, next) => {
    var associate = {
        venue_cat_id: req.body.venue_cat_id,
        fname: req.body.fname,
        lname: req.body.lname,
        package:req.body.package_time,
        companyName: req.body.companyName,
        contactno: req.body.contactno,
        email: req.body.email,
        gstno: req.body.gstno,
        status:req.body.status,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        parking:req.body.parking,
        catringValue:req.body.catringValue,
        themepermission:req.body.themepermission,
        p_img:req.body.p_img,
        oimg= req.body.oimg,
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
            gstno: req.body.gstno,
            password: req.body.password,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            parking:req.body.parking,
            catringValue:req.body.catringValue,
            themepermission:req.body.themepermission,
            p_img:req.body.p_img,
            oimg= req.body.oimg,
            timeper:req.body.timeper,
            areavenue:req.body.areavenue,
            cop:req.body.cop,
            location:req.body.location,
            desp:req.body.desp,
            video_story:req.body.video_story
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
    var associate = {   
        vendor_cat_id: req.body.vendor_cat_id,
        fname: req.body.fname,
        lname: req.body.lname,
        package:req.body.package_time,
        status:req.body.status,
        companyName: req.body.companyName,
        contactno: req.body.contactno,
        email: req.body.email,
        gstno: req.body.gstno,
        password: req.body.password,
        address: req.body.address,
        city: req.body.city,
        area: req.body.area,
        state: req.body.state,
        video_story:req.body.video_story
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
    db.vendors.update({ _id: mongojs.ObjectId(req.params.id) }, {
        $set: {
            vendor_cat_id: req.body.vendor_cat_id,
            fname: req.body.fname,
            lname: req.body.lname,
            package:req.body.package_time,
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
            images: req.body.images,
            sub_images: req.body.sub_images,
            video_story:req.body.video_story
        }
    }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "vendor details updated" });
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



/************************************************************* */

// send inqury

/******************************************************************** */


// send venue inquiry
router.post('/venue_inquiry', (req, res, next) => {
    var venue__inquiry = {
        customer_id: req.body.customer_id,
        venue_id: req.body.venue_id,
        date: req.body.date,
        email: req.body.email,
        mobileNo: req.body.mobile,
        no_of_person: req.body.person,
        days: req.body.body.days,
        puropse: req.body.puropse
    }
    db.venue_category.save(venue_inquiry, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "vendors category add" });
    });
});

// send vendor inquiry
router.post('/vendor_inquiry', (req, res, next) => {
    var venue__inquiry = {
        customer_id: req.body.customer_id,
        vendor_id: req.body.venue_id,
        date: req.body.date,
        email: req.body.email,
        mobileNo: req.body.mobile,
        location: req.body,
        puropse: req.body.puropse
    }
    db.venue_category.save(venue_inquiry, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "vendors category add" });
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
        res.json({ "message": "home slider image add" });
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
        res.json({ "message": "home slider image update" });
    });
});

//delete home image
router.delete('/review/:id', (req, res, next) => {
    db.review.remove({ _id: mongojs.ObjectId(req.params.id) }, (err, result) => {
        if (err) {
            res.send(err);
        }
        res.json({ "message": "home ads slider image Delete" });
    });
});




module.exports = router;