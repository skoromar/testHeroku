exports.tplCustomer = function (info) {

		var cart = info.cart.items;
		console.log('my infooo',cart);




		var products = "";
		for(var x in cart){

		products+='		<table cellspacing="0" width="100%">'
		products+='			'
		products+='			<tr>'
		products+='				<td style="border: #e3dddf 1px solid;border-top:none;width:50%">'
		products+='					<table cellspacing="0" width="100%">'
		products+='						<tr>'
		products+='							<td style="border-right: #e3dddf 1px solid; text-align: center;">'
		products+='									<img style="width: 80%;min-width: 50px" src="/public/images/products/'+cart[x].image+'">'
		products+='							</td>'
		products+='							<td>'
		products+='								<table cellspacing="0" width="100%">'
		products+='									<tr>'
		products+='										<td style="border-bottom: #e3dddf 1px solid">'
		products+='											<p style="color:gray;margin-bottom: -10px; font-size:10px; margin:7px;font-weight: bold; ">CANTIDAD :'+cart[x].qty+'</p>'
		products+='											<p style="color:gray;margin-bottom: -10px; font-size:20px; margin:7px; color:#0084bd; font-weight: bold;">'+cart[x].formattedPrice+'</p>'
		products+='										</td>'
		products+='									</tr>'
		products+='								</table>'
		products+='							</td>'
		products+='						</tr>'
		products+='					</table>'
		products+='				</td>'
		products+='				'
		products+='			</tr>'
		products+='		</table>';



		}



		console.log(products)





		html_aux = '<!DOCTYPE html>'
		+'<html lang="es">'
		+'<head>'
		+'	<meta charset="UTF-8">'
		+'	<style>'
		+'		@media (max-width: 500px) {'
		+'			.header{'
		+'				padding: 5px 0!important;'
		+'				padding: 1px 0 5px!important;'
		+'			}'
		+'			.header a{'
		+'				font-size:8px!important;'
		+'			}'
		+'			#registro{'
		+'				padding: 1px 10px!important;'
		+'			}'
		+''
		+'			.td_footer{'
		+'				font-size: 0!important;'
		+'			}'
		+''
		+'			.td_footer .facebook{'
		+'				margin: 5px!important;'
		+'				margin-left: 10px!important;'
		+'				margin-right: 5px!important;'
		+'			}'
		+''
		+'			.td_footer .linkedin{'
		+'				margin: 5px!important;'
		+'				margin-right: 10px!important;'
		+'			}'
		+'			span.hide{'
		+'				display:none!important;'
		+'			}'
		+'			h3{'
		+'				font-size: 14px!important;'
		+'			}'
		+'		}'
		+'	</style>'
		+'</head>'
		+'<body style="margin:0; padding:0; background-color:#f5f5f5; font-family:Verdana; font-size: 14px;">'
		+'	<div id="main" style="max-width:600px;margin:auto;overflow-x:hidden;">'
		+'		<br><br>'
		+'		<div id="header">'
		+'			'
		+'			<h3 style="font-weight: normal;margin: 0.7em;text-align: center;">'
		+'				Gracias por tu compra'
		+'			</h3>'
		+'		</div>'
		+'		<div style="box-shadow: 0px 0px 3px gray; background-color: white;border:1px solid #ddd;">'
		+'			<div style="padding:1em">'
		+'				<table width="100%" cellspacing="0">'
		+'					<tr style="background-color:#f5f5f5; padding:5px 0; text-align:center; font-size:12px;">'
		+'						<td style="width:50%;line-height: 23px;">'
		+'							Número de orden: SO-0'+info.confirm.id
		+'						</td>'
		+'						<td style="width:50%">'
		+'							<span style="font-weight: bold;float:left">|</span>'
		+'							Fecha: '+info.confirm.deliveryDate.split("T")[0] 
		+'						</td>'
		+'					</tr>'
		+'				</table>'
		+''
		+''
		+'				<table style="margin-top:1em">'
		+'					<tr>'
		+'						<td style="color: #1f90c4;font-weight: bold;line-height: 14px;">'
		+'							DATOS DEL CLIENTE'
		+'						</td>'
		+'					</tr>'
		+'				</table>'
		+'				<table width="100%">'
		+'					<tr>'
		+'						<td width="50%" style="vertical-align: top">'
		+'							Nombre: '+info.confirm.name+' '+info.confirm.lastname
		+'						</td>'
		+'					</tr>'
		+'					<tr>'
		+'						<td width="50%" style="vertical-align: top">'
		+'							Telofono: '+info.confirm.phone
		+'						</td>'
		+'					</tr>'
		+'					<tr>'
		+'						<td width="50%" style="vertical-align: top">'
		+'							Correo: '+info.confirm.email
		+'						</td>'
		+'					</tr>'
		+'					<tr>'
		+'						<td width="50%" style="vertical-align: top">'
		+'							Dirección: '+info.confirm.shipAdrress +' -Numero:  '+info.confirm.intnumber
		+'						</td>'
		+'					</tr>'
		+'				</table>'
		+''
		+'				<p style="margin-bottom: 3px;color: gray;font-size: 0.7em;margin-top: 5px;"><b>Gracias por tu compra</b></p>'
		+'				<p style="margin-bottom: 3px;color: gray;font-size: 0.7em;margin-top: 5px;"><b>El proveedor se pondra en contacto contigo</b></p>'
		+''
		+'				<!-- Productos -->'
		+'				<table style="margin-top: 20px">'
		+'					<tr>'
		+'						<td style="color: #1f90c4;font-weight: bold;line-height: 14px;">'
		+'							DETALLES<br>DE COMPRA'
		+'						</td>'
		+'					</tr>'
		+'					<tr>'
		+'						<td style="color: #1f90c4;font-weight: bold;line-height: 14px;">'
		+'							Total: $'+info.confirm.total+'.00'
		+'						</td>'
		+'					</tr>'
		+'				</table>'
		+'  '+products
		+'				'
		+'			</div>'
		+''
		+'			'
		+'		</div>'
		+'		<br><br>'
		+'	</div>'
		+'</body>'
		+'</html>';

		return html_aux;
	
	

}