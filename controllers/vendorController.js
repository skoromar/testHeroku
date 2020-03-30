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


        res.redirect('/skorCoKlDRJBLNanmGQx')
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