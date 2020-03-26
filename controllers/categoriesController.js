/*{ 
    "name" : "Tamales Magos", 
    "category" : "1", 
    "description" : "Tamales Artesanalaes", 
    "zipcode" : "11320", 
    "address" : "addrs1", 
    "phone" : "5529022732", 
    "activecategories" : true, 
    "logo" : "logo1.jpg"
}*/


// ListenController.js
// Import categories model
categories = require('../models/Categories');
// Handle index actions
exports.index = function (req, res) {
    console.log("view");
    categories.get(function (err, categoriess) {
        if (err) {
            console.log("view err",err);
            res.json({
                status: "error",
                message: err,
            });
        }


        res.json({
            status: "success",
            message: "categoriess retrieved successfully",
            data: categoriess
        });
    });
};
// Handle create categories actions
exports.new = function (req, res) {
    console.log("create",req.body);

    try{
        var categoriess = new categories();
        var reqcategories = req.body;
        for(var x in reqcategories){
            categoriess[x] = reqcategories[x];
        }
        // save the categories and check for errors
        categoriess.save(function (err) {
            // Check for validation error
            if (err){
                console.log("view err",err);
                res.json(err);
            }
            else{
                res.json({
                    status: "success",
                    message: "categoriess retrieved successfully",
                    data: categoriess
                });

                
            }
        });
    }catch(error){
        console.log("err",error);
        res.json({error:error});
    }
       
    

};
// Handle view categories info
exports.view = function (req, res) {
    categories.findById(req.params.listen_id, function (err, categoriess) {
        if (err)
            res.send(err);
        res.json({
            message: 'categoriess details loading..',
            data: categories
        });
    });
};
// Handle update categories info
exports.update = function (req, res) {
    categories.findById(req.params.listen_id, function (err, categoriess) {
        if (err)
            res.send(err);
        categoriess.name = req.body.name ? req.body.name : categoriess.name;
        categoriess.gender = req.body.gender;
        categoriess.email = req.body.email;
        categoriess.phone = req.body.phone;
// save the categories and check for errors
        categoriess.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'categories Info updated',
                data: categoriess
            });
        });
    });
};
// Handle delete Listen
exports.delete = function (req, res) {
    categories.remove({
        _id: req.params.listen_id
    }, function (err, categories) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'categories deleted'
        });
    });
};