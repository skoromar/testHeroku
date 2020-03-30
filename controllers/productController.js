/*{ 
    
    title : "Clickart 950 000 - Premier image pack (dvd-rom)", 
    description : "Clickart 950 000 - Premier image pack (dvd-rom)", 
    manufacturer : "Broderbund", 
    price : 100.0, 
    image : "6.jpeg", 
    category : 1.0, 
    vendor : 1.0, 
    subcategory : 1.0
}*/


// ListenController.js
// Import products model
products = require('../models/Products');

const Vendor = require('../models/Vendor');
const Products = require('../models/Products');
fileUpload = require('express-fileupload');
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

        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let avatar = req.files.fileUploaded;
        var productss = new products();
        var reqproducts = req.body;
        var vendor_folder = req.body.vendor;
        var key = req.body.key;
        delete reqproducts.key;
        for(var x in reqproducts){
            productss[x] = reqproducts[x];
        }
        productss['image'] = avatar.name;
        // save the products and check for errors
        productss.save(function (err) {
            // Check for validation error
            if (err){
                console.log("view err",err);
                res.json(err);
            } else{
                //Use the mv() method to place the file in upload directory (i.e. "uploads")
                avatar.mv('./public/images/products/vendor'+vendor_folder+'/'+ avatar.name);

                res.redirect('/'+key)

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
    console.log('update',req.body);
    console.log('update--',req.params);

    try{
        products.findById(req.params.products_id, function (err, productss) {
            if (err)
                res.send(err);

            var reqproducts = req.body;
            var vendor_folder = req.body.vendor;
            var key = req.body.key;
            delete reqproducts.key;

            if(req.files){

                let avatar = req.files.fileUploaded;
                productss['image'] = avatar.name;
                avatar.mv('./public/images/products/vendor'+vendor_folder+'/'+ avatar.name);
                console.log("file true",avatar);
            }
            for(var x in reqproducts){
                if(reqproducts[x] != ""){
                    productss[x] = reqproducts[x]; 
                }
                
            }
            
    // save the products and check for errors
            productss.save(function (err) {
                if (err)
                    res.json(err);
                res.redirect('/'+key)
            });
        });
    }catch(err){
        console.log("err",err);
    }
    
};
// Handle delete Listen
exports.delete = function (req, res) {
    console.log(req.body)
    console.log(req.params)
    products. deleteOne({
        _id: req.params.products_id
    }, function (err, products) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'products deleted'
        });
    });
};