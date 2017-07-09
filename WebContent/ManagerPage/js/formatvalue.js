function formatValue(str){
	if(str.length==0){
		return;
	}
	var con;
	var value="";

	var reg = new RegExp("\\.");
	if(!reg.test(str)){
		value = process(str);
	}else{
		var arr = new Array();
		arr = str.split("\\.");
		value = process(arr[0]);
		
	}
	return value;
}


function process(str){
	var value="";
	var con;
	var dot;
	len = str.length;
	if(len>=4){
		  if(len%3==0){
		     con = len/3-1;
		  }else{
		     con = Math.floor(len/3);
		  }

		}
		for(var i = 0;i<con;i++){
		   dot= str.substring(str.length-3,str.length);

		   value = ","+dot+value;
		   str = str.substring(0,str.length-3);

		}
		
		return value;
}
