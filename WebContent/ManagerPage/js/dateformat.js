/**
 * 
 */
function format4(date){
     	var month;
     	var dateDay;
     	var hours;
     	var minute;
     	var seconds;
     	if(date.getMonth()<9){
     		month="0"+(date.getMonth()+1);
     	}else{
     		month=""+(date.getMonth()+1);
     	}
     	if(date.getDate()<10){
     		dateDay="0"+date.getDate();
     	}else{
     		dateDay=""+date.getDate();
     	}
     	if(date.getHours()<10){
     		hours="0"+date.getHours();
     	}else{
     		hours=""+date.getHours();
     	}
     	if(date.getMinutes()<10){
     		minute="0"+date.getMinutes();
     	}else{
     		minute=""+date.getMinutes();
     	}
     	if(date.getSeconds()<10){
     		seconds="0"+date.getSeconds();
     	}else{
     		seconds=""+date.getSeconds();
     	}
     	return date.getFullYear()+"-"+month+"-"+dateDay+" "+hours+":"+minute+":"+seconds;
     }