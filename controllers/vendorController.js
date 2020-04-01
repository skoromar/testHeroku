/*{ 
    "name" : "Tamales Magos", 
    "category" : "1", 
    "description" : "Tamales Artesanalaes", 
    "zipcode" : "11320", 
    "address" : "addrs1", 
    "phone" : "5529022732", 
    "activevendor" : true, 
    "logo" : "logo1.jpg"
}*/


// ListenController.js
// Import vendor model
vendor = require('../models/Vendor');
const KeyVendor = require('../models/KeyVendor');
// Handle index actions
exports.index = function (req, res) {
    console.log("view");
    vendor.get(function (err, vendors) {
        if (err) {
            console.log("view err",err);
            res.json({
                status: "error",
                message: err,
            });
        }


        res.redirect('/skorCoKlDRJBLNanmGQx')
    });
};
// Handle create vendor actions
exports.new = function (req, res) {
    console.log("create",req.body);

    try{
        var vendors = new vendor();
        var keyvendor = new KeyVendor();
        var reqvendor = req.body;
        for(var x in reqvendor){
            vendors[x] = reqvendor[x];
        }
        // save the vendor and check for errors
        vendors.save(function (err) {
            // Check for validation error
            if (err){
                console.log("view err",err);
                res.json(err);
            }
            else{
                var randomstring = Math.random().toString(36).slice(-8);
                keyvendor.name = req.body.name;
                keyvendor.id = vendors.id;
                keyvendor.key = randomstring;
                keyvendor.save(function (err) {
                    if (err){
                        console.log("view err",err);
                        res.json(err);
                    }
                    else{
                            res.redirect('/skorCoKlDRJBLNanmGQx')
                    }
                });
                
            }
        });
    }catch(error){
        console.log("err",error);
        res.json({error:error});
    }
       
    

};
// Handle view vendor info
exports.view = function (req, res) {
    vendor.findById(req.params.listen_id, function (err, vendors) {
        if (err)
            res.send(err);
        res.json({
            message: 'vendors details loading..',
            data: vendor
        });
    });
};
// Handle update vendor info
exports.update = function (req, res) {

    console.log('update',req.body);
    console.log('update--',req.params);
    vendor.findById(req.params.vendor_id, function (err, vendors) {
        if (err)
            res.send(err);
        var reqvendor = req.body;
        for(var x in reqvendor){
            if(reqvendor[x] != ""){
                vendors[x] = reqvendor[x]; 
            }
            
        }


// save the vendor and check for errors
        vendors.save(function (err) {
            if (err)
                res.json(err);
             res.redirect('/skorCoKlDRJBLNanmGQx')
        });
    });
};
// Handle delete Listen
exports.delete = function (req, res) {
    vendor.deleteOne({
        _id: req.params.vendor_id
    }, function (err, vendor) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'vendor deleted'
        });
    });
};