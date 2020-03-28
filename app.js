'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');
const favicon = require('serve-favicon');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const app = express();
const config = require('./lib/config.js');

mongoose.Promise = Promise;
mongoose.connect(config.db.url);
mongoose.set('useFindAndModify', false);

const Products = require('./models/Products');
const Category = require('./models/Categories');
const Vendor = require('./models/Vendor');
const Cart = require('./lib/Cart');
const Email = require('./lib/email');
const Utils = require('./utils');
const Security = require('./lib/Security');

let apiRoutes = require("./api-routes");

const store = new MongoDBStore({
    uri: config.db.url,
    collection: config.db.sessions
});

app.disable('x-powered-by');

app.set('view engine', 'ejs');
app.set('env', 'development');

app.locals.paypal = config.paypal;
app.locals.locale = config.locale;

app.use(favicon(path.join(__dirname, 'favicon.png')));
app.use('/public', express.static(path.join(__dirname, '/public'), {
  maxAge: 0,
  dotfiles: 'ignore',
  etag: false
}));


app.use(session({secret:'XASDASDA'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(helmet());
app.use(session({
    resave: false,
    saveUninitialized: true,
    unset: 'destroy',
    store: store,
    name: config.name + '-' + Security.generateId(),
    genid: (req) => {
        return Security.generateId()
    }
}));





app.get('/', (req,res)=>{
	try{
		Category.find().sort().then(categories => {
	      console.log('categories',categories);
	      res.render('index', {
	          pageTitle: 'Bienvenido',
	          categories: categories,
	      });
		}).catch(err => {
		  res.status(400).send('Bad request');
		});
	}catch(err){
		console.log(err);
	}
	
})



app.get('/category/:id', (req,res)=>{
	var id = req.params.id;
	console.log(id);
	Vendor.find({category:id}).sort().then(vendors => {
	      console.log(vendors);
	      res.render('vendor', {
	          pageTitle: 'Nuestra comunidad',
	          vendors: vendors,
	          id: id
	      });
	}).catch(err => {
	  res.status(400).send('Bad request');
	});
	
})



app.get('/products/:id', (req, res) => {

	try{
		var id = req.params.id;
		console.log('id',id);
		  if(!req.session.cart) {
		      req.session.cart = {
		          items: [],
		          totals: 0.00,
		          formattedTotals: ''
		      };
		  }  
		  Products.find({vendor: id}).then(products => {
		      let format = new Intl.NumberFormat(req.app.locals.locale.lang, {style: 'currency', currency: req.app.locals.locale.currency });
		      products.forEach( (product) => {
		         product.formattedPrice = format.format(product.price);
		      });
              req.session.vendorID = id;
		      res.render('products', {
		          pageTitle: 'Nuestros productos',
		          products: products,
                  category: id,
		          nonce: Security.md5(req.sessionID + req.headers['user-agent'])
		      });

		  }).catch(err => {
		      res.status(400).send('Bad request');
		  });
	}catch(err){
		console.log(err);
	}
  

});

app.get('/cart', (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    let idvendor = req.session.vendorID;
    console.log('cart',cart);
    res.render('cart', {
        pageTitle: 'Carrito',
        cart: cart,
        vendorID:idvendor,
        nonce: Security.md5(req.sessionID + req.headers['user-agent'])
    });
});

app.get('/cart/remove/:id/:nonce', (req, res) => {
   let id = req.params.id;
   if(id && Security.isValidNonce(req.params.nonce, req)) {
       Cart.removeFromCart(id, req.session.cart);
       res.redirect('/cart');
   } else {
       res.redirect('/');
   }
});

app.get('/cart/empty/:nonce', (req, res) => {
    if(Security.isValidNonce(req.params.nonce, req)) {
        Cart.emptyCart(req);
        res.redirect('/cart');
    } else {
        res.redirect('/');
    }
});

app.post('/cart', (req, res) => {
    try{

        let qty = parseInt(req.body.qty, 10);
        let product = parseInt(req.body.product_id, 10);

        console.log('qty',qty);
        console.log('product',product);
        if(qty > 0 && Security.isValidNonce(req.body.nonce, req)) {
            Products.findOne({id: product}).then(prod => {
                let cart = (req.session.cart) ? req.session.cart : null;
                Cart.addToCart(prod, qty, cart);
                res.redirect('/cart');
            }).catch(err => {
               res.redirect('/');
            });
        } else {
            res.redirect('/');
        }
    }catch(err){
        console.log(err);

    }
});

app.get('/cart/add/:id', (req, res) => {
    try{
        let cart = req.session.cart;
        let id = req.params.id;
        for(var x in cart['items']){
            var value = cart.items[x].qty;
            if(cart.items[x].id == id){
                cart.items[x].qty = value+1;
            }
        }
        Cart.calculateTotals(cart);
        res.redirect('/cart');
    }catch(err){
        console.log(err);
    }

});
app.get('/cart/sub/:id', (req, res) => {
    try{
        let cart = req.session.cart;
        let id = req.params.id;
        for(var x in cart['items']){
            var value = cart.items[x].qty;
            if(cart.items[x].id == id){
                cart.items[x].qty =  (value > 1) ? (value - 1) : 1;
            }
        }
        Cart.calculateTotals(cart);
        res.redirect('/cart');
        // res.render('cart', {
        //     pageTitle: 'Carrito',
        //     cart: cart,
        //     nonce: Security.md5(req.sessionID + req.headers['user-agent'])
        // });
    }catch(err){
        console.log(err);
    }
    
});


app.post('/cart/update', (req, res) => {
    
    let ids = req.body["product_id[]"];
    let qtys = req.body["qty[]"];
    if(Security.isValidNonce(req.body.nonce, req)) {
        let cart = (req.session.cart) ? req.session.cart : null;
        let i = (!Array.isArray(ids)) ? [ids] : ids;
        let q = (!Array.isArray(qtys)) ? [qtys] : qtys;
        Cart.updateCart(i, q, cart);
        res.redirect('/cart');
    } else {
        res.redirect('/');
    }
});

app.get('/checkout', (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    res.render('checkout', {
        pageTitle: 'Checkout',
        cart: cart,
        checkoutDone: false,
        nonce: Security.md5(req.sessionID + req.headers['user-agent'])
    });
});

app.post('/checkout', (req, res) => {
    let sess = req.session;
    let cart = (typeof sess.cart !== 'undefined') ? sess.cart : false;
    if(Security.isValidNonce(req.body.nonce, req)) {
        res.render('checkout', {
            pageTitle: 'Checkout',
            cart: cart,
            checkoutDone: true
        });
    } else {
        res.redirect('/');
    }
});

app.get('/contact', (req, res) => {
    let sess = req.session;
    res.render('contact', {
        status:false,
        pageTitle: 'Contactanos',
        nonce: Security.md5(req.sessionID + req.headers['user-agent'])
    });
});
app.get('api/contact', (req, res) => {
    res.render('contact', {
        status:false,
        pageTitle: 'Contactanos'
    });
});



app.get('/faq', (req, res) => {
    let sess = req.session;
    res.render('faq', {
        pageTitle: 'Preguntas Frcuentes',
        nonce: Security.md5(req.sessionID + req.headers['user-agent'])
    });
});


app.get('/terms', (req, res) => {
    let sess = req.session;
    res.render('terms', {
        pageTitle: 'Terminos y condiciones',
        nonce: Security.md5(req.sessionID + req.headers['user-agent'])
    });
});

app.get('/success', (req, res) => {

    try{
        let sess = req.session;
        console.log(sess);
        res.render('success',{

            pageTitle:"hola que hace",
            cart:sess.cart,
            confirm: sess.confirm
        });
        
    }catch(err){
        console.log("ocurrio un error con su commpra");
    }
    

    
});


app.get('/admincreatorfNWmlHUQBd',(req,res)=>{

    res.render('admincreatorskor');

    

});


app.get('/test', (req, res) => {
    
    res.render('test');
});

app.use('/api', apiRoutes);



if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
});

app.listen(port);