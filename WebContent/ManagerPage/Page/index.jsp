<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<!-- 上述3个meta标签*必须*放在最前面，任何其他内容都*必须*跟随其后！ -->
<meta name="description" content="">
<meta name="author" content="">
<link rel="icon" href="../../favicon.ico">

<title>Dashboard Template for Bootstrap</title>

<!-- Bootstrap core CSS -->
<link href="<%=request.getContextPath() %>/PUBLIC/bootstrap/css/bootstrap.min.css" rel="stylesheet">
<link href="<%=request.getContextPath() %>/PUBLIC/css/dashboard.css" rel="stylesheet">
<script src="<%=request.getContextPath() %>/PUBLIC/bootstrap/js/jquery.min.js"></script>
<script src="<%=request.getContextPath() %>/PUBLIC/bootstrap/js/bootstrap.min.js"></script>

<!-- toaster -->
<link href="<%=request.getContextPath() %>/PUBLIC/toastr/toastr.min.css" rel="stylesheet"/>
<script src="<%=request.getContextPath() %>/PUBLIC/toastr/toastr.min.js"></script>

</head>

<body>

	<nav class="navbar navbar-inverse navbar-fixed-top">
		<div class="container-fluid">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle collapsed"
					data-toggle="collapse" data-target="#navbar" aria-expanded="false"
					aria-controls="navbar">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#">DamiBlog</a>
			</div>
			<div id="navbar" class="navbar-collapse collapse">
				
			</div>
		</div>
	</nav>
	
	<div class="container-fluid">
		<div class="row">
			<div class="col-sm-3 col-md-2 sidebar">
				<jsp:include page="leftbar.jsp"></jsp:include>
			</div>
			<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
			</div>
			 <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
          		<h1 class="page-header">文章类型管理</h1>
          		<div class="card">
                	<button type="button" class="btn btn-success" data-toggle="modal" data-target="#myModal">添加</button>
                	
                	<div class="card-content table-responsive">
                        <table class="table" style="table-layout:fixed">
                            <thead class="text-primary">
                                <tr>
                                    <!-- <td>序号</td> -->
                                    <td>文章类型编号</td>
                                    <td>文章类型名称</td>
                                    <td>操作</td>
                                </tr>
                            </thead>
                            <tbody id="article_type">
                            </tbody>
                        </table>
                        
                        <br><br>
                        
                        <div class="btn-group">
                        	<button onclick="Previous()" type="button" class="btn btn-round btn-info"><<</button>
                          	<button id="pagination_content" type="button" class="btn btn-round btn-info">1</button>
                            <button onclick="Next()" type="button" class="btn btn-round btn-info">>></button>
                        </div>
                        
                	</div>
                </div>
          	 </div>
		</div>
	</div>
	
	<!-- Modal -->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
	  <div class="modal-dialog" role="document">
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
	        <h4 class="modal-title" id="myModalLabel">添加</h4>
	      </div>
	      <div class="modal-body">
	        <div class="form-group">
			    <label for="name" >类型名称</label>
			    <input type="text" id="article_type_name" class="form-control" id="name" placeholder="请输入文章类型名称">
			 </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	        <button type="button" id="addBtn" class="btn btn-primary" onclick="addArticleType();">Save</button>
	      </div>
	    </div>
	  </div>
	</div>

	<script>
    function Previous(){
        page_id--;
        if (page_id < 0) {
            page_id = 0;
            /* toastr.warning("已经是第一页了"); */
            return;
        }
        listArticleType();
    }
    
    function Next(){
        page_id++;
        if (page_id > page_count - 1) {
            page_id = page_count - 1;
           /*  toastr.warning("已经是最后一页了"); */
            return;
        }
        listArticleType();
    }
	</script>
	
	<script type="text/javascript">
    var page_id = 0;
    var page_count = 0;
   // var college_id = -1;
    
    listArticleType();
    function listArticleType(){
		$.ajax({  

            url : "<%=request.getContextPath() %>/ArticleTypeServlet?m=list&page_id="+page_id,
            dataType : "json",
            data : {},
            success : function(data) {
                console.log(data);
                if(data.code==200){
                	$('#article_type').empty();
                    var model = data.model;
                    page_count = data.page_count;
                    $('#pagination_content').html("第" + (page_id + 1) + "页，共" + data.page_count + "页");
                    for(var i=0;i<model.length;i++){
                        var item = model[i];
                        var article_type_id = item.article_type_id;
                        var tr = $('<tr></tr>');
                       /*  var td_id = $('<td>' + (i + 1) + '</td>'); */
                        var td_id = $('<td>' + item.article_type_id + '</td>');
                        var td_name = $('<td>' + item.article_type_name + '</td>');
                        var td_do = $('<td>' + '<span class="glyphicon glyphicon-trash" aria-hidden="true" onclick="deleteArticleType('+article_type_id+')"></span>' + '</td>');
                        tr.append(td_id);
                        tr.append(td_name);
                        tr.append(td_do);
                        $('#article_type').append(tr);
                    }
                }
            }  
        });  
	}
				
    </script>
    <script type="text/javascript">
    function deleteArticleType(id){
		$.ajax({  
            url : "<%=request.getContextPath() %>/ArticleTypeServlet?m=delete&article_type_id="+id,
            dataType : "json",
            data : {},
            success : function(data) {
                console.log(data);
                if(data.code==400){
                	console.log("fail");	
                }
                if(data.code == 200){
    				console.log("success");
    				toastr.success('删除成功');
    			}
            }  
         });  
		listArticleType();
	}
				
    </script>
    <script type="text/javascript">
    function addArticleType(){
    	var name = $('#article_type_name').val();
    	console.log(name);
    	$.ajax({
            url : "<%=request.getContextPath()%>/ArticleTypeServlet?m=add",
            data : {
            	article_type_name:name
            },
            type : "POST",
            dataType : "json",
            success : function(data) {
            	console.log(data);
    			if(data.code == 400){
    				console.log("fail");
    			}
    			if(data.code == 200){
    				console.log("success");
    				toastr.success('添加成功');
    			}
    			$('#myModal').modal("hide");
            },
            error : function(e) {
            }
        });
    	
		listArticleType();
    }	
    </script>
	
	
</body>
</html>
