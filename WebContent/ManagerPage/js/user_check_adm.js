/**
 * 
 */
var current_user;

$.ajaxSettings.async = false;
$.getJSON("/dbmon/UserCheck", function(data){
	//alert(data.result);
	if(data.result == "false") {
        	window.location.href = "../login.html";
        	window.event.returnValue = false;

	} else {
		current_user = data.result;
		
		if (data.license == "no"){
        	window.location.href = "../DB2/config_license.html";
        	window.event.returnValue = false;			
		} 
		if (data.autho != "ADMIN") {
			alert("没有访问权限，请使用管理员用户登录。");
			window.history.back();
		}
			
	}
});	

//alert(current_user);
