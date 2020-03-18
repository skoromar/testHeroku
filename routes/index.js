var express = require('express');
var router = express.Router();

function calculate() {
	return {

		validateFields: function(sizeL,lineWords,caseNumber){
			//console.log("validacion de tamaño");
			var html ="";
				if(sizeL <= 0 || lineWords <= 0  || caseNumber <= 0 ){
					return {status:false,message:"los valores de L D y N deben ser mayores a 0"};
				}
				if(sizeL <= 10 && lineWords <= 25 && caseNumber <= 10){
					//console.log('chico');
					return {status:true};
				}else if((sizeL > 10 && sizeL <= 15) && (lineWords > 25 && lineWords <= 5000) && (caseNumber > 10 && caseNumber <= 500)){
					//console.log('grande');
					return {status:true};
				}else{
					return {status:false,message:"los parametros no estan dentro del rango"};;
				}

		}
		,validlinesLenght: function(arrayInfo){
			var arrLines = []; 
			var flag = true;
			var infoIn = arrayInfo[0].split(" ")

			var sizeL = parseInt(infoIn[0])|| 0;
			var sizeEnters = parseInt(infoIn[1])||0;
			var siseCase = parseInt(infoIn[2])||0;
			//console.log('arrayInfo',arrayInfo.length);
			//console.log('sizeL: '+sizeL+'  sizeEnters: '+sizeEnters+'  siseCase: '+siseCase);

			if((arrayInfo.length-1) != (sizeEnters+siseCase)){
				return "las entradas y casos son diferentes al numero de datos de entrada";
			}
			var validProcess= this.validateFields(sizeL,sizeEnters,siseCase);
			//console.log(validProcess)
			if(!validProcess.status){
				//console.log('validProcess',validProcess);
				return validProcess.message;
			}

			var index = 0;
			for(var i= 1; i<= sizeEnters; i++){
					if(arrayInfo[i].length > sizeL || arrayInfo[i].length == 0){
						flag = false;
					}else{
						arrLines.push(arrayInfo[i]);
						index = i;
					}

			}
			
			
			if(!flag){
				return "error una combinación no coincide con el tamaño solicitado";
			}else{
				var obj_result= this.validCases(sizeEnters, siseCase,arrLines,arrayInfo);
				var html = [];
				for(var x in obj_result){

					html.push({
						name:'Caso #'+(parseInt(x)+1),
						number: obj_result[x]
					});
					
				}
				return html;
			}
		}
		,validCases: function(sizeEnters, siseCase,arrLines,arrayInfo){
			var flag = true;
			var arrCases= [];
			var obj_result = {};
			
			//console.log(arrayInfo)
			var next = parseInt(sizeEnters)+1
			var end = parseInt(sizeEnters)+parseInt(siseCase)
			for(var i = next; i <= end; i++){
				
				if(arrayInfo[i] == ""  ){
					flag = false;
				}else{
					arrCases.push(arrayInfo[i]);
				}
			}
			//console.log('arrCases',arrCases);
			if(!flag){
				return "error los casos no pueden estar vacios";
			}else{
				var result_clean_arr = [];
				for(var x in arrCases){
					 result_clean_arr.push(this.getCombination(arrCases[x]));
				}
				
				//console.log('result_clean_arr',result_clean_arr)
				
				for(var x in result_clean_arr){
					var count = 0;
					for(var y in result_clean_arr[x]){
						for (var z in arrLines) {
							if(result_clean_arr[x][y] == arrLines[z]){
								count++;
								// break;
							}
						}

					}
					
					obj_result[x]= count;
						
				}
				

			}
			//console.log('obj_result',obj_result)
			return obj_result;
		}
		, getCombination: function (textInput){
			var arr_comb= [];
			var arr_simple = [];
			var newTxt = textInput.split('(');
			for (var i = 0; i < newTxt.length; i++) {
			    if(newTxt[i].indexOf(')') != -1 ){
			        var aux = newTxt[i].split(')')
			        arr_comb.push(aux[0]);
			        if(aux[1].length >0 ){
			            arr_simple.push(aux[1])
			        }
			    }else{
			        arr_simple.push(newTxt[i])
			    }
			}
			// //console.log('arr_comb',arr_comb)
			// //console.log('arr_simple',arr_simple)
			if(arr_comb.length > 0){
				var cleanArray = this.processCombinations(arr_comb);
				for(var x in cleanArray){
					arr_simple.push(cleanArray[x].join(''))
				}
			}
			////console.log('arr_simple',arr_simple);
			return arr_simple;

		}

		,processCombinations: function(arr_comb){
			var arrAux = [];
			for(var x in arr_comb){
				arrAux.push(arr_comb[x].split(''))
			}
			////console.log('arrAux',arrAux)
			var result = cartesian.apply(this, arrAux);
			console.log("lo logre",result)
			return result;
		}

	}
};

function cartesian() {
    var r = [], arg = arguments, max = arg.length-1;
    function helper(arr, i) {
        for (var j=0, l=arg[i].length; j<l; j++) {
            var a = arr.slice(0); // clone arr
            a.push(arg[i][j]);
            if (i==max)
                r.push(a);
            else
                helper(a, i+1);
        }
    }
    helper([], 0);
    return r;
}

router.post('/calculate', function(req, res, next) {

  console.log('hola',req.body);

  var info = req.body.description;
  var nstr = info.split(/\r\n|\r|\n/);//all information text area in array
    console.log(nstr);
    var html = calculate().validlinesLenght(nstr);
    console.log(html);
    var err= "";
    if(typeof(html) != 'object'){
    	err = html;
    	html=[]

    }
  res.render('index', { result: html,error:err });

});

router.get('/calculate', function(req, res, next) {
  res.render('index', { title: 'Express' ,result: []});
});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',result: [] });
});

module.exports = router;
