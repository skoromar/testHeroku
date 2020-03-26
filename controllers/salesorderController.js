/*

{    
    "status" : 1,
    "customer" : 1,
    "zip" :11320,
    "deliveryDate" :"03/25/2020",
    "total" :2.0,
    "shipAdrress" :"primer direccion",
    "shipCost" :1.0,
    "cuponcode" :"cupo",
    "discount" :0.0,
    "cart": { "items":
               [ { "id": 1,
                   "title": "Clickart 950 000 - Premier image pack (dvd-rom)",
                   "price": 100,
                   "qty": 1,
                   "image": "6.jpeg",
                   "formattedPrice": "$100.00"
                } ],
              "totals": 100,
              "formattedTotals": "$100.00" }
}

*/


// ListenController.js
// Import salesOrder model
salesOrder = require('../models/salesOrder');
// Handle index actions
exports.index = function (req, res) {
    console.log("view");
    salesOrder.get(function (err, salesOrders) {
        if (err) {
            console.log("view err",err);
            res.json({
                status: "error",
                message: err,
            });
        }


        res.json({
            status: "success",
            message: "salesOrders retrieved successfully",
            data: salesOrders
        });
    });
};
// Handle create salesOrder actions
exports.new = function (req, res) {
    console.log("create",req.body);

    try{
        var salesOrders = new salesOrder();
        var reqSalesOrder = req.body;
        for(var x in reqSalesOrder){
            switch(x){
                case "deliveryDate":
                    var date_f = new Date(reqSalesOrder[x]);
                    salesOrders[x] = date_f
                break;
                default:
                    salesOrders[x] = reqSalesOrder[x];
            }
        }
        // save the salesOrder and check for errors
        salesOrders.save(function (err) {
            // Check for validation error
            if (err){
                console.log("view err",err);
                res.json(err);
            }
            else{
                res.json({
                    status: "success",
                    message: "salesOrders retrieved successfully",
                    data: salesOrders
                });

                
            }
        });
    }catch(error){
        console.log("err",error);
        res.json({error:error});
    }
       
    

};
// Handle view salesOrder info
exports.view = function (req, res) {
    salesOrder.findById(req.params.listen_id, function (err, salesOrders) {
        if (err)
            res.send(err);
        res.json({
            message: 'salesOrders details loading..',
            data: salesOrder
        });
    });
};
// Handle update salesOrder info
exports.update = function (req, res) {
    salesOrder.findById(req.params.listen_id, function (err, salesOrders) {
        if (err)
            res.send(err);
        salesOrders.name = req.body.name ? req.body.name : salesOrders.name;
        salesOrders.gender = req.body.gender;
        salesOrders.email = req.body.email;
        salesOrders.phone = req.body.phone;
// save the salesOrder and check for errors
        salesOrders.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'salesOrder Info updated',
                data: salesOrders
            });
        });
    });
};
// Handle delete Listen
exports.delete = function (req, res) {
    salesOrder.remove({
        _id: req.params.listen_id
    }, function (err, salesOrder) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'salesOrder deleted'
        });
    });
};