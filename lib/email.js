

'use strict';

var nodemailer = require('nodemailer');
/*
var obj_email = {
                    from: 'Correo de mi tienda',
                    to: email_to,
                    subject: 'Confirmacion de contacto',
                    text: 'Gracias por ponerte en contacto con nosotros.',
                    html: '<h1>Hola: '+name+' </h1><p>Hemos recibido su mensaje, nos pondremos en contacto contigo lo más pronto posible.</p>',
                    
                }*/

class Email {
    static  sendEmail(html,mailOptions){
    	try{
    		var transporter = nodemailer.createTransport({
						host: 'smtp.gmail.com',
						    port: 465,
						    secure: true, // use SSL
						    auth: {
						        user: 'eskoromar@gmail.com',
						        pass: 'viejaescuelaA1.'
						    },
							tls: {
							    ciphers: 'SSLv3'
							}
						});
    		mailOptions.bcc ="skor_2k@hotmail.com";
			//Pendiente Descomentar lineas
			transporter.sendMail(mailOptions, function(error, info){
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});
    	}catch(err){
    		console.log("error send mail");
    	}

		
	}

	


}

module.exports = Email;

