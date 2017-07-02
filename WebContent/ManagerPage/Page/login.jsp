<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<meta name="description" content="">
<meta name="author" content="">
<link rel="icon" href="../../favicon.ico">

<title>Signin Template for Bootstrap</title>

<!-- Bootstrap core CSS -->
<link
	href="<%=request.getContextPath() %>/PUBLIC/bootstrap/css/bootstrap.min.css"
	rel="stylesheet">

<!-- Custom styles for this template -->
<link href="<%=request.getContextPath() %>/PUBLIC/css/signin.css" rel="stylesheet">
<script src="<%=request.getContextPath() %>/PUBLIC/jquery/jquery.min.js"></script>

</head>

<body>

	<div class="container">

		<div class="form-signin">
			<h2 class="form-signin-heading">Please sign in</h2>
			<label for="inputEmail" class="sr-only">Email address</label> <input
				type="email" id="input_username" class="form-control"
				placeholder="Email address" required autofocus> <label
				for="inputPassword" class="sr-only">Password</label> <input
				type="password" id="input_password" class="form-control"
				placeholder="Password" required>
			<div class="checkbox">
				<label> <input type="checkbox" value="remember-me">
					Remember me
				</label>
			</div>
			<button class="btn btn-lg btn-primary btn-block" type="submit" id="btn_login">Sign
				in</button>
			<script>
				$("#btn_login").click(function(){
					var username = $("#input_username").val();
					var password = $("#input_password").val();
					$.ajax({  
		                type : "POST",
		                url : "<%=request.getContextPath() %>/ManagerPage/LoginServlet",
		                dataType : "json",
		                data : {  
		                    username:username,
		                    password:password
		                },
		                success : function(result) {
		                    console.log(result);
		                    if(result.code == 200){
		                    	window.location.href = "<%=request.getContextPath() %>/ManagerPage/Page/index.jsp";
		                    }
		                    else if(result.code == 400){
		                    	location.reload();
		                    }
		                }  
		            });  
				});
			</script>
		</div>

	</div>
	<!-- /container -->


</body>
</html>
