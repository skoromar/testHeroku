let router = require('express').Router();


const fileUpload = require('express-fileupload');

// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome',
    });
});


/**********************router para controlar ordenes de venta************************/
// Import salesOrder controller
var salesOrderController = require('./controllers/salesorderController');
// Contact routes
router.route('/salesorder')
    .get(salesOrderController.index)
    .post(salesOrderController.new);

router.route('/salesOrder/:salesOrder_id')
    .get(salesOrderController.view)
    .patch(salesOrderController.update)
    .put(salesOrderController.update)
    .delete(salesOrderController.delete);


/***************************router para controlar proveedores*******************/


// Import vendorOrder controller
var vendorController = require('./controllers/vendorController');
// Contact routes
router.route('/vendor')
    .get(vendorController.index)
    .post(vendorController.new);

router.route('/salesOrder/:vendor_id')
    .get(vendorController.view)
    .patch(vendorController.update)
    .put(vendorController.update)
    .delete(vendorController.delete);



/***************************router para controlar categorias*******************/

// Import categoriesController controller
var categoriesController = require('./controllers/categoriesController');
// Contact routes
router.route('/categories')
    .get(categoriesController.index)
    .post(categoriesController.new);

router.route('/categories/:categories_id')
    .get(categoriesController.view)
    .patch(categoriesController.update)
    .put(categoriesController.update)
    .delete(categoriesController.delete);



// Import productsController controller
var productsController = require('./controllers/productController');
// Contact routes
router.route('/products')
    .get(productsController.index)
    .post(productsController.new);
router.route('/updateproducts/:products_id')
    .post(productsController.update);

router.route('/products/:products_id')
    .get(productsController.view)
    .patch(productsController.update)
    .delete(productsController.delete);



/***************************router para controlar categorias*******************/

// Import contactController controller
var contactController = require('./controllers/contactController');
// Contact routes
router.route('/contact')
    .get(contactController.index)
    .post(contactController.new);

router.route('/contact/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.delete);

// Export API routes
module.exports = router;