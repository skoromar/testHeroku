/*{ 
    "name" : "Tamales Magos", 
    "category" : "1", 
    "description" : "Tamales Artesanalaes", 
    "zipcode" : "11320", 
    "address" : "addrs1", 
    "phone" : "5529022732", 
    "activeproducts" : true, 
    "logo" : "logo1.jpg"
}*/


// ListenController.js
// Import products model
products = require('../models/Products');
// Handle index actions
exports.index = function (req, res) {
    console.log("view");
    products.get(function (err, productss) {
        if (err) {
            console.log("view err",err);
            res.json({
                status: "error",
                message: err,
            });
        }


        res.json({
            status: "success",
            message: "productss retrieved successfully",
            data: productss
        });
    });
};
// Handle create products actions
exports.new = function (req, res) {
    console.log("create",req.body);

    try{
        var productss = new products();
        var reqproducts = req.body;
        for(var x in reqproducts){
            productss[x] = reqproducts[x];
        }
        // save the products and check for errors
        productss.save(function (err) {
            // Check for validation error
            if (err){
                console.log("view err",err);
                res.json(err);
            }
            else{
                res.json({
                    status: "success",
                    message: "productss retrieved successfully",
                    data: productss
                });

                
            }
        });
    }catch(error){
        console.log("err",error);
        res.json({error:error});
    }
       
    

};
// Handle view products info
exports.view = function (req, res) {
    products.findById(req.params.listen_id, function (err, productss) {
        if (err)
            res.send(err);
        res.json({
            message: 'productss details loading..',
            data: products
        });
    });
};
// Handle update products info
exports.update = function (req, res) {
    products.findById(req.params.listen_id, function (err, productss) {
        if (err)
            res.send(err);
        productss.name = req.body.name ? req.body.name : productss.name;
        productss.gender = req.body.gender;
        productss.email = req.body.email;
        productss.phone = req.body.phone;
// save the products and check for errors
        productss.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'products Info updated',
                data: productss
            });
        });
    });
};
// Handle delete Listen
exports.delete = function (req, res) {
    products.remove({
        _id: req.params.listen_id
    }, function (err, products) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'products deleted'
        });
    });
};