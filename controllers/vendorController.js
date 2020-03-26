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


        res.json({
            status: "success",
            message: "vendors retrieved successfully",
            data: vendors
        });
    });
};
// Handle create vendor actions
exports.new = function (req, res) {
    console.log("create",req.body);

    try{
        var vendors = new vendor();
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
                res.json({
                    status: "success",
                    message: "vendors retrieved successfully",
                    data: vendors
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
    vendor.findById(req.params.listen_id, function (err, vendors) {
        if (err)
            res.send(err);
        vendors.name = req.body.name ? req.body.name : vendors.name;
        vendors.gender = req.body.gender;
        vendors.email = req.body.email;
        vendors.phone = req.body.phone;
// save the vendor and check for errors
        vendors.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'vendor Info updated',
                data: vendors
            });
        });
    });
};
// Handle delete Listen
exports.delete = function (req, res) {
    vendor.remove({
        _id: req.params.listen_id
    }, function (err, vendor) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'vendor deleted'
        });
    });
};