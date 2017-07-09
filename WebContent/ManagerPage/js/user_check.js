/**
 * 
 */
var current_user;

$.ajaxSettings.async = false;
$.getJSON("/dbmon/UserCheck?dbid="+GetParam("dbid"), function(data){
	//alert(data.result);
	if(data.result == "false") {
        	window.location.href = "/dbmon/login.html";
        	window.event.returnValue = false;
        	
	} else {
		current_user = data.result;
		
		if (data.license == "no"){
        	window.location.href = "/dbmon/DB2/config_license.html";
        	window.event.returnValue = false;			
		}
		
		if (GetParam("dbid")!=null && data.autho != "ADMIN" && data.dbautho !="yes") {
			alert("没有对此数据库的访问权限，请联系管理员。");
			window.history.back();
		}
		
	}
	

});	

//alert(current_user);
