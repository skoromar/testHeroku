/*{ 
    "name" : "Tamales Magos", 
    "category" : "1", 
    "description" : "Tamales Artesanalaes", 
    "zipcode" : "11320", 
    "address" : "addrs1", 
    "phone" : "5529022732", 
    "activecontact" : true, 
    "logo" : "logo1.jpg"
}*/


// ListenController.js
// Import contact model
contact = require('../models/Contact');
const Email = require('../lib/email');
// Handle index actions
exports.index = function (req, res) {
    console.log("view");
    contact.get(function (err, contacts) {
        if (err) {
            console.log("view err",err);
            res.json({
                status: "error",
                message: err,
            });
        }


        res.json({
            status: "success",
            message: "contacts retrieved successfully",
            data: contacts
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    console.log("create",req.body);

    try{
        var contacts = new contact();
        var reqcontact = req.body;
        var email_to = "",name="";
        for(var x in reqcontact){
            contacts[x] = reqcontact[x];
            if(x == "email"){
                email_to = reqcontact[x];
            }
            if(x == "name"){
                name = reqcontact[x];
            }
        }
        // save the contact and check for errors
        contacts.save(function (err) {
            // Check for validation error
            if (err){
                console.log("view err",err);
                res.json(err);
            }
            else{

                var obj_email = {
                    from: 'Correo de mi tienda',
                    to: email_to,
                    subject: 'Confirmación de contacto',
                    text: 'Gracias por ponerte en contacto con nosotros.',
                    html: '<h1>Hola: '+name+' </h1><p>Hemos recibido su mensaje, nos pondremos en contacto contigo lo más pronto posible.</p>',
                    
                }

                 Email.sendEmail("",obj_email)
                 res.render('contact', {
                    status:true,
                    pageTitle: 'Contactanos',
                    titileResponse: 'Gracias por ponerte en contacto con nosotros.',
                    mesaggeResponse: 'Hemos recibido su mensaje, nos pondremos en contacto contigo lo más pronto posible.',
                });

                
            }
        });
    }catch(error){
        console.log("err",error);
        res.json({error:error});
    }
       
    

};
// Handle view contact info
exports.view = function (req, res) {
    contact.findById(req.params.listen_id, function (err, contacts) {
        if (err)
            res.send(err);
        res.json({
            message: 'contacts details loading..',
            data: contact
        });
    });
};
// Handle update contact info
exports.update = function (req, res) {
    contact.findById(req.params.listen_id, function (err, contacts) {
        if (err)
            res.send(err);
        contacts.name = req.body.name ? req.body.name : contacts.name;
        contacts.gender = req.body.gender;
        contacts.email = req.body.email;
        contacts.phone = req.body.phone;
// save the contact and check for errors
        contacts.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'contact Info updated',
                data: contacts
            });
        });
    });
};
// Handle delete Listen
exports.delete = function (req, res) {
    contact.remove({
        _id: req.params.listen_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'contact deleted'
        });
    });
};