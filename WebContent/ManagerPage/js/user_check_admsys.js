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
		//alert(data.result);
		current_user = data.result;
		if (data.autho != "ADMIN") {
			alert("没有访问权限，请使用管理员用户登录。");
			window.history.back();
		}	
			
	}
});	

//alert(current_user);
