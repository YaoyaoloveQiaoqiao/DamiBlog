function UserEditable() {
        function restoreRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);

            for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                oTable.fnUpdate(aData[i], nRow, i, false);
            }
            oTable.fnDraw();
        }

        function editRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            var password="";
            $.ajax({  
	             type : "post",  
	             url : "/dbmon/Config_Table_UserUpdate",  
	             data:{username:aData[0]} ,
	             async : false,  
	             success : function(data){  
	            	 password=data;
	             }  
	        });
            var right="";
            if( aData[1].indexOf("ADMIN")!=-1 || aData[1].indexOf("管理员")!=-1 ){
            	right="<option value='ADMIN' select='selected'>管理员</option>"
            		+"<option value='USER'>用户</option> "	;
            	  jqTds[7].innerHTML = "";	

            }else{
            	right="<option value='USER' select='selected' >用户</option> "+
            	"<option value='ADMIN' >管理员</option>"	;
            	  jqTds[7].innerHTML = "<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\""+aData[0]+"\" data-target=\"#myModal\" data-whatever=\""+aData[0]+"\" href=\"#\">可查看数据库</a>";	

            }
            jqTds[1].innerHTML = "<select class='form-control' id='right' name='right'  style='height:28px;padding:3.5px 6px;font-size:11px;'> "
    			+right
    			+"</select>";
            jqTds[0].innerHTML = '<input type="text" class="form-control input-small" id="username"  value="' + aData[0] + '" disabled>';
          
            jqTds[2].innerHTML = '<input type="text" class="form-control input-small" id="department" value="' + aData[2] + '" data-container="body" data-toggle="popover" data-trigger="manual" data-placement="top" data-content="部门不能为空!">';
            jqTds[3].innerHTML = '<input type="password" class="form-control input-small" id="passw"  style="width:50px" value="' +password.substr(0,5) + '" data-container="body" data-toggle="popover" data-trigger="manual" data-placement="top" data-content="密码不能为空!">';
            jqTds[4].innerHTML = '<input type="password" class="form-control input-small" id="repassw" style="width:50px" value="' + password.substr(0,5) + '" data-container="body" data-toggle="popover" data-trigger="manual" data-placement="top" data-content="密码不一致!">';
            $('th').eq(3).removeAttr("style");
            $('th').eq(4).removeAttr("style");
            $('td', nRow).removeAttr("style");
            $('td', nRow).removeAttr("style");
            jqTds[5].innerHTML = '<a class="edit btn btn-sm green"  href="">保存</a>';
            jqTds[6].innerHTML = '<a class="cancel btn btn-sm red" href="">取消</a>';
          
            $("#selectschema").select2({
            	placeholder: "加载中....",
            });
        }
        
        
        
        function editNewRow(oTable, nRow) {
            var jqTds = $('>td', nRow);
            
            
            jqTds[1].innerHTML = "<select class='form-control' id='right' name='right'  style='height:28px;padding:3.5px 6px;font-size:11px;'> "
    			+"<option value='USER' select='selected' >用户</option> "
    			+"<option value='ADMIN' >管理员</option>"
    			+"</select>";
            jqTds[0].innerHTML = '<input type="text" class="form-control input-small" id="username" value=""  data-container="body" data-toggle="popover" data-trigger="manual" data-placement="top" data-content="用户名不能为空!">';
            jqTds[2].innerHTML = '<input type="text" class="form-control input-small" id="department" value="" data-container="body" data-toggle="popover" data-trigger="manual" data-placement="top" data-content="部门不能为空!">';
            jqTds[3].innerHTML = '<input type="password" class="form-control input-small" style="width:50px" id="passw" value="" data-container="body" data-toggle="popover" data-trigger="manual" data-placement="top" data-content="密码不能为空!">';
            jqTds[4].innerHTML = '<input type="password" class="form-control input-small" style="width:50px"id="repassw" value="" data-container="body" data-toggle="popover" data-trigger="manual" data-placement="top" data-content="密码不一致!">';
            $('th').eq(3).removeAttr("style");
            $('th').eq(4).removeAttr("style");
            $('td', nRow).removeAttr("style");
            $('td', nRow).removeAttr("style");
            $('input').popover();
            $("input").bind("keydown",function(){
            	$('input').popover('hide');
            });
            jqTds[5].innerHTML = '<a class="edit btn btn-sm green" href="">保存新用户</a>';
            jqTds[6].innerHTML = '<a class="cancel btn btn-sm red" href="">取消</a>';
            
        }
        
        function deleteRow(oTable, nRow){
        	var aData = oTable.fnGetData(nRow);
        	if(aData[1]!="ADMIN"){
        		oTable.fnDeleteRow(nRow);
	        	$.ajax({  
		             type : "post",  
		             url : "/dbmon/Config_Table_UserUpdate",  
		             data:{name:aData[0],op:'delete',auth:aData[1]},
		             async : false,
		             success:function(data){	 
		             }
		        });	
        	}else{
        		alert("无法删除管理员");
        	}
        	
        }
        
        function saveRow(oTable, nRow,str) {
        	var datas="";
        	var flag=true;
        	var pass=$("#passw").val();
        	var passw=$("#repassw").val();
        	var username=$("#username").val();
        	var right=$("#right").val();
        	var department=$("#department").val();
        	if(username==""){
         		$('#username').popover('show');
         		setTimeout(function(){$('#username').popover('hide')},2000);
        		return false;
        	}
        	
        	if(right==""){
        		$('#right').popover('show');
        		setTimeout(function(){$('#right').popover('hide')},2000);
        		return false;
        	}
        	if(department==""){
        		$('#department').popover('show');
        		setTimeout(function(){$('#department').popover('hide')},2000);
        		return false;
        	}
        	
        	if(pass!="" && pass==passw  ){
        		var jqInputs = $('input', nRow);
        		$.ajax({  
     	             type : "post",  
     	             url : "/dbmon/Config_Table_UserUpdate",  
     	             data:{name:jqInputs[0].value,op:'update',password:jqInputs[2].value,companyid:jqInputs[1].value,auth:right,username:str},
     	             async : false,
     	             success:function(data){
     	            	 
     	            	datas=data.trim();
     	            	
     	             }
     	        });	
        		
        		 if(datas=='false'){
	            		 alert("已存在用户名!");
	            		flag=false;
	            		 return false;
	            	 }
	            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
	            if(right.indexOf("USER")>-1){
	            	oTable.fnUpdate("用户", nRow, 1, false);
	            	oTable.fnUpdate("<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\""+jqInputs[0].value+"\" data-target=\"#myModal\" data-whatever=\""+jqInputs[0].value+"\" href=\"#\">可查看数据库</a>", nRow, 7, false);
	            }else if(right.indexOf("ADMIN")>-1){
	            	oTable.fnUpdate("管理员", nRow, 1, false);
	            	oTable.fnUpdate("", nRow, 7, false);
	            }
	            	
	            
	            oTable.fnUpdate(jqInputs[1].value, nRow, 2, false);
	            $('th').eq(3).attr("style","display:none;");
	            $('th').eq(4).attr("style","display:none;");
	            $('td', nRow).eq(3).attr("style","display:none;");
	            $('td', nRow).eq(4).attr("style","display:none;");
	            oTable.fnUpdate('<a class="edit btn btn-sm green" href="">编辑</a>', nRow, 5, false);
	            oTable.fnUpdate('<a class="delete  btn btn-sm red" href="">删除</a>', nRow, 6, false);
	            
	            oTable.fnDraw();//Config_Table_UserUpdate
	            flag=true;
	           
        	}else if(pass!=""){
        		$('#repassw').popover('show');
        		setTimeout(function(){$('#repassw').popover('hide')},2000);
        		flag=false;
        		return flag;
        	}else{
        		$('#passw').popover('show');
        		setTimeout(function(){$('#passw').popover('hide')},2000);
        		flag=false;
        		return flag;
        	}
        	
        	return flag;
        }

        function cancelEditRow(oTable, nRow,right,user) {
            oTable.fnUpdate('<a class="edit btn btn-sm green"  href="">编辑</a>', nRow, 5, false);
            oTable.fnUpdate('<a class="delete btn btn-sm red" href="">删除</a>', nRow, 6, false);
            oTable.fnUpdate("<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\""+user+"\" data-target=\"#myModal\" data-whatever=\""+user+"\" href=\"#\">可查看数据库</a>", nRow, 7, false);
            if(right.indexOf("USER")>-1){
            	 oTable.fnUpdate("<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\""+user+"\" data-target=\"#myModal\" data-whatever=\""+user+"\" href=\"#\">可查看数据库</a>", nRow, 7, false);
            	oTable.fnUpdate("用户", nRow, 1, false);
            }else if(right.indexOf("ADMIN")>-1){
            	 oTable.fnUpdate("", nRow, 7, false);
            	oTable.fnUpdate("管理员", nRow, 1, false);
            }
            oTable.fnDraw();
        }
        var table = $('#user_table');
        /* Table tools samples: https://www.datatables.net/release-datatables/extras/TableTools/ */

        /* Set tabletools buttons and button container */
        
        $("#username").click(function(){
        	 
        });
        
        $.extend(true, $.fn.DataTable.TableTools.classes, {
            "container": "btn-group",
            "buttons": {
                "normal": "btn btn-sm default",
                "disabled": "btn btn-sm default disabled"
            },
            "collection": {
                "container": "DTTT_dropdown dropdown-menu tabletools-dropdown-menu"
            }
        });
        
        
        
        var oTable = table.dataTable({
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "无用户",
                "info": "显示 _START_ 至 _END_条   共 _TOTAL_ 条",
                "infoEmpty": "没有数据",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "显示 _MENU_ 条",
                "search": "搜索:",
                "zeroRecords": "无用户",
                "paginate": {
		            previous:   "<i class='fa fa-angle-left'></i>",
		            next:   "<i class='fa fa-angle-right'></i>"
		        }
            },

            // Or you can use remote translation file
            //"language": {
            //   url: '//cdn.datatables.net/plug-ins/3cfcc339e89/i18n/Portuguese.json'
            //},

            "order": [
                [0, 'asc']
            ],
            
            "lengthMenu": [
                [5, 10, 15, 20, -1],
                [5, 10, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,
            "ajax": {
				"url": "/dbmon/Config_Table_UserConfig",
 				"dataSrc": "user_table",
            },
            "createdRow": function (row, data, index) {
				$('td', row).eq(3).attr("style","display:none;");
				$('td', row).eq(4).attr("style","display:none;");
				if(data[1].indexOf("USER")>-1){
					$('td', row).eq(1).html("用户");
					$('td', row).eq(7).html("<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\""+data[0]+"\" data-target=\"#myModal\" data-whatever=\""+data[0]+"\" href=\"#\">可查看数据库</a>");	

				}else if(data[1].indexOf("ADMIN")>-1){
					$('td', row).eq(1).html("管理员");
					$('td', row).eq(7).html("<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\""+data[0]+"\" data-target=\"#myModal\" data-whatever=\""+data[0]+"\" href=\"#\" style='display:none'>可查看数据库</a>");	

				}
        		$('td', row).eq(5).html("<a class=\"edit btn btn-sm green\"  href=\"\">编辑</a>");	
        		$('td', row).eq(6).html("<a class=\"delete btn btn-sm red\" href=\"\">删除</a>");	
        		
        	}	

 
            });
        var tableWrapper = $('#user_table_wrapper'); // datatable creates the table wrapper by adding with id {your_table_jd}_wrapper
        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: true //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

        $('#user_table_new').click(function (e) {
            e.preventDefault();
            $("#user_table_new").attr("disabled",true);
            $(".edit").attr("disabled",true);
            if (nNew && nEditing) {
            	$('th').eq(3).attr("style","display:none;");
                $('th').eq(4).attr("style","display:none;");
                $('td', nEditing).eq(3).attr("style","display:none;");
                $('td', nEditing).eq(4).attr("style","display:none;");
            	
            	if (confirm("是否保存数据?")) {
                    saveRow(oTable, nEditing,"-1"); // save
                    $(nEditing).find("td:first").html("Untitled");
                    nEditing = null;
                    nNew = false;

                } else {
                    oTable.fnDeleteRow(nEditing); // cancel
                    nEditing = null;
                    nNew = false;
                    return;
                }
            }
            
            var aiNew = oTable.fnAddData(['','','','','','','']);
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editNewRow(oTable, nRow);
            nEditing = nRow;
            nNew = true;
        });

        table.on('click', '.delete', function (e) {
            e.preventDefault();
            $(".edit").attr("disabled",false);
            
            $("#user_table_new").attr("disabled",false);
            if (confirm("确定删除此用户 ?") == false) {
                return;
            }
            var nRow = $(this).parents('tr')[0];
            deleteRow(oTable,nRow);
            
            
        });

        table.on('click', '.cancel', function (e) {
        	$(".edit").attr("disabled",false);
        	 $("#user_table_new").attr("disabled",false);
        	$('input').popover('hide');
        	var right = $("#right").val();
        	var username=$("#username").val();
            e.preventDefault();
            $('th').eq(3).attr("style","display:none;");
            $('th').eq(4).attr("style","display:none;");
            $('td', nEditing).eq(3).attr("style","display:none;");
            $('td', nEditing).eq(4).attr("style","display:none;");
            if (nNew) {
                oTable.fnDeleteRow(nEditing);
                nEditing = null;
                nNew = false;
            } else {
                restoreRow(oTable, nEditing);
                cancelEditRow(oTable, nEditing,right,username);
                nEditing = null;
            }
        });

        table.on('click', '.edit', function (e) {
            e.preventDefault();
           $(".edit").attr("disabled",true);
           $("#user_table_new").attr("disabled",true);
           $(this).attr("disabled",false);
            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];

            if (nEditing !== null && nEditing != nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            } else if (nEditing == nRow && this.innerHTML == "保存") {
                /* Editing this row and want to save it */
            	if(saveRow(oTable, nEditing,"1")){
            		nEditing = null;
            		 $('input').popover('hide');
                	 $(".edit").attr("disabled",false);
                	 $("#user_table_new").attr("disabled",false);
            	}

            } else if(this.innerHTML=="保存新用户"){
            	if(saveRow(oTable, nEditing,"-1")){
            	 nEditing = null;
            	 $('input').popover('hide');
            	 $(".edit").attr("disabled",false);
            	 $("#user_table_new").attr("disabled",false);
            	}
            	
            }else {
            	editRow(oTable, nRow);
                nEditing = nRow;
            }
           
        });
        
        var datatem=new Array();
        
        var config_table = $("#config_item").dataTable({
    		"paging": false,
            "ordering": false,
    	     "searching": true,
     	    "info": false,
    	        "order": [
    	            [0, 'asc']
    	        ],
            "language": {
          		  "emptyTable": "无数据",
                "info": "",
                "infoEmpty": "无数据",
                "lengthMenu": "显示 _MENU_ 项",
                "search": "搜索:",
                "zeroRecords": "无数据",
            },
            "aoColumns": [   
                        {"sWidth": " 5%"},
          	            {"sWidth": "15%"},   
          	            {"sWidth": "20%"},   
          	            {"sWidth": "20%"}, 
          	            {"sWidth": "20%"},
          	            {"sWidth": "20%"}
          	    ],
            "ajax": {
    			"dataSrc": "config_item",
            },
            "createdRow": function (row, data, index) {
	            	var check="";
	            	datatem.push(data[1]);
	            	if(data[6]=='1'){
	            		check='checked';
	            	}
	            	
	            	$('td',row).eq(0).html("<input id=\""+data[1]+"autho\" type=\"checkbox\" "+check+" name=\"notify\" />");
	            
        		}	
            }); 
        var name;
        $('#myModal').on('show.bs.modal', function (event) {
        	var target = $(event.relatedTarget);
        	name=target.data('whatever');
        	
        	$("#dbnameT").html("--   "+target[0].title+"用户");
        	$.ajaxSettings.async = false; 
        	var str="";
        	config_table.fnReloadAjax("/dbmon/DBMon_USER_Autho?name="+name);
        	//config_table.fnReloadAjax("/dbmon/DBMon_USER_GroupAutho?name="+name);
        	
        });
        
        $('#myModal').on('hide.bs.modal', function (event) {
        	datatem=new Array();
        });
        
        $("#allselect").click(function(){
    		$("input[type=checkbox]").each(function(data){
    			if($(this).prop("checked")==false)
    				$(this).click();
    		});
        });
        
        $("#noselect").click(function(){
    		$("input[type=checkbox]").each(function(data){
    			if($(this).prop("checked")==true)
    				$(this).click();
    		});
        });
        $("#submits").click(function(){
    		var dbids="";
    		var count=0;
    		for(var i=0;i<datatem.length;i++){
    			if($("#"+datatem[i]+"autho").prop('checked')){
    				$("#"+datatem[i]+"autho").parent();
    				dbids+=datatem[i]+",";
    				count++;
    			}
    		}
    		$.ajax({  
                 type : "post",  
                 url : "/dbmon/DBMon_Updata_Autho",
                 //url : "/dbmon/DBMon_Update_GroupAutho",
                 data:{dbids:dbids,name:name},
                 async : false
            });	
    		datatem=new Array();
    	});
}

//--------------------------------------------------------------------------------------------------------


function GroupEditable() {
	
    function restoreRow(oTable, nRow) {
        var aData = oTable.fnGetData(nRow);
        var jqTds = $('>td', nRow);

        for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
            oTable.fnUpdate(aData[i], nRow, i, false);
        }
        oTable.fnDraw();
    }
    
    
    //添加新用户组的表单
    function editNewRow(oTable, nRow) {
        var jqTds = $('>td', nRow);
        jqTds[1].innerHTML = '<input type="text" class="form-control input-small" id="groupname" value=""  data-container="body" data-toggle="popover" data-trigger="manual" data-placement="top" data-content="用户组名不能为空!">';
        $('th').eq(3).removeAttr("style");
        $('th').eq(4).removeAttr("style");
        $('td', nRow).removeAttr("style");
        $('td', nRow).removeAttr("style");
        $('input').popover();
        $("input").bind("keydown",function(){
        	$('input').popover('hide');
        });
        jqTds[4].innerHTML = '<a class="edit btn btn-sm green" href="">保存新用户组</a>&nbsp;<a class="cancel btn btn-sm red" href="">取消</a>';
        //jqTds[5].innerHTML = '<a class="cancel btn btn-sm red" href="">取消</a>';
    }
    
    //删除一条用户组信息
    function deleteRow(oTable, nRow){
    	var aData = oTable.fnGetData(nRow);
    	if(aData[1] != null){
    		oTable.fnDeleteRow(nRow);
        	$.ajax({  
	             type : "post",  
	             url : "/dbmon/Config_Table_GroupUpdate",  
	             data:{groupname:aData[1],op:'delete'},
	             async : false,
	             success:function(data){	 
	             }
	        });	
    	}else{
    		alert("无法删除!!");
    	}
    	
    }
    
    function saveRow(oTable, nRow,str) {
    	var datas="";
    	var flag=true;
    	var groupname=$("#groupname").val();
    	if(groupname==""){
     		$('#groupname').popover('show');
    		return false;
    	}else{
    		$.ajax({  
	             type : "post",  
	             url : "/dbmon/Config_Table_GroupUpdate",  
	             data:{groupname:groupname,op:'add'},
	             async : false,
	             success:function(data){
	            	 if(data.indexOf('此用户组名称已存在！') > -1){
	            		 alert(data);
	            	 }
	             }
	        });
    	}
    	
    	return flag;
    }

    function cancelEditRow(oTable, nRow,right,user) {
        oTable.fnUpdate('<a class="edit btn btn-sm green"  href="">编辑</a>', nRow, 5, false);
        oTable.fnUpdate('<a class="delete btn btn-sm red" href="">删除</a>', nRow, 6, false);
        oTable.fnUpdate("<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\""+user+"\" data-target=\"#myModal\" data-whatever=\""+user+"\" href=\"#\">可查看数据库</a>", nRow, 7, false);
        if(right.indexOf("USER")>-1){
        	 oTable.fnUpdate("<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\""+user+"\" data-target=\"#myModal\" data-whatever=\""+user+"\" href=\"#\">可查看数据库</a>", nRow, 7, false);
        	oTable.fnUpdate("用户", nRow, 1, false);
        }else if(right.indexOf("ADMIN")>-1){
        	 oTable.fnUpdate("", nRow, 7, false);
        	oTable.fnUpdate("管理员", nRow, 1, false);
        }
        oTable.fnDraw();
    }
    var table = $('#group_table');
    /* Table tools samples: https://www.datatables.net/release-datatables/extras/TableTools/ */

    /* Set tabletools buttons and button container */
    
    $("#username").click(function(){
    	 
    });
    
    $.extend(true, $.fn.DataTable.TableTools.classes, {
        "container": "btn-group",
        "buttons": {
            "normal": "btn btn-sm default",
            "disabled": "btn btn-sm default disabled"
        },
        "collection": {
            "container": "DTTT_dropdown dropdown-menu tabletools-dropdown-menu"
        }
    });
    
    
    //显示Group Table列表
    var oTable = table.dataTable({
        "language": {
            "aria": {
                "sortAscending": ": activate to sort column ascending",
                "sortDescending": ": activate to sort column descending"
            },
            "emptyTable": "无数据",
            "info": "显示 _START_ 至 _END_条   共 _TOTAL_ 条",
            "infoEmpty": "没有数据",
            "infoFiltered": "(filtered1 from _MAX_ total entries)",
            "lengthMenu": "显示 _MENU_ 条",
            "search": "搜索:",
            "zeroRecords": "无数据",
            "paginate": {
	            previous:   "<i class='fa fa-angle-left'></i>",
	            next:   "<i class='fa fa-angle-right'></i>"
	        }
        },

        "order": [
            [0, 'asc']
        ],
        
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"] // change per page values here
        ],
        // set the initial value
        "pageLength": 10,
        "ajax": {
			"url": "/dbmon/Config_Table_GroupConfig",
			"dataSrc": "group_table",
        },
        "createdRow": function (row, data, index) {
			//$('td', row).eq(3).attr("style","display:none;");
			//$('td', row).eq(4).attr("style","display:none;");
			$('td', row).eq(2).html("<a class=\"btn btn-sm green\" class=\"moredetail\"  data-toggle=\"modal\" data-target=\"#myModal\" data-whatever=\""+data[1]+"\" href=\"#\">查看</a>");	
			$('td', row).eq(3).html("<a class=\"btn btn-sm green\" class=\"moredetail\"  data-toggle=\"modal\" data-target=\"#myModal2\" data-whatever=\""+data[1]+"\" href=\"#\">查看</a>");	
    		$('td', row).eq(4).html("<a class=\"delete btn btn-sm red\" href=\"\">删除</a>");	
    		//$('td', row).eq(5).html("<a class=\"delete btn btn-sm red\" href=\"\">删除</a>");	
    		
    	}	


        });
    var tableWrapper = $('#user_table_wrapper'); // datatable creates the table wrapper by adding with id {your_table_jd}_wrapper
    tableWrapper.find(".dataTables_length select").select2({
        showSearchInput: true //hide search box with special css class
    }); // initialize select2 dropdown

    var nEditing = null;
    var nNew = false;

    $('#group_table_new').click(function (e) {
        e.preventDefault();
        //$(".edit").attr("disabled",true);
        if (nNew && nEditing) {
        	/*$('th').eq(3).attr("style","display:none;");
            $('th').eq(4).attr("style","display:none;");
            $('td', nEditing).eq(1).attr("style","display:none;");
            $('td', nEditing).eq(4).attr("style","display:none;");*/
        	
        	if (confirm("是否保存数据?")) {
                saveRow(oTable, nEditing,"-1"); // save
                $(nEditing).find("td:first").html("Untitled");
                nEditing = null;
                nNew = false;

            } else {
                oTable.fnDeleteRow(nEditing); // cancel
                nEditing = null;
                nNew = false;
                return;
            }
        }
        
        var aiNew = oTable.fnAddData(['','','','','','','']);
        var nRow = oTable.fnGetNodes(aiNew[0]);
        editNewRow(oTable, nRow);
        nEditing = nRow;
        nNew = true;
    });
    
    
    //页面输出用户组的配置
    table.on('click', '.delete', function (e) {
        e.preventDefault();
        $(".edit").attr("disabled",false);
        
        $("#group_table_new").attr("disabled",false);
        if (confirm("确定删除此用户组 ?") == false) {
            return;
        }
        var nRow = $(this).parents('tr')[0];
        deleteRow(oTable,nRow);
        
        
    });

    table.on('click', '.cancel', function (e) {
    	$(".edit").attr("disabled",false);
    	 $("#group_table_new").attr("disabled",false);
    	$('input').popover('hide');
    	var right = $("#right").val();
    	var username=$("#username").val();
        e.preventDefault();
        //$('th').eq(3).attr("style","display:none;");
        //$('th').eq(4).attr("style","display:none;");
        $('td', nEditing).eq(3).attr("style","display:none;");
        $('td', nEditing).eq(4).attr("style","display:none;");
        if (nNew) {
            oTable.fnDeleteRow(nEditing);
            nEditing = null;
            nNew = false;
        } else {
            restoreRow(oTable, nEditing);
            cancelEditRow(oTable, nEditing,right,username);
            nEditing = null;
        }
    });

    table.on('click', '.edit', function (e) {
       e.preventDefault();
       $(".edit").attr("disabled",true);
       $("#group_table_new").attr("disabled",true);
       $(this).attr("disabled",false);
        /* Get the row as a parent of the link that was clicked on */
        var nRow = $(this).parents('tr')[0];

        if (nEditing !== null && nEditing != nRow) {
            /* Currently editing - but not this row - restore the old before continuing to edit mode */
            restoreRow(oTable, nEditing);
            editRow(oTable, nRow);
            nEditing = nRow;
        } else if (nEditing == nRow && this.innerHTML == "保存") {
            /* Editing this row and want to save it */
        	if(saveRow(oTable, nEditing,"1")){
        		nEditing = null;
        		 $('input').popover('hide');
            	 $(".edit").attr("disabled",false);
            	 $("#group_table_new").attr("disabled",false);
        	}

        } else if(this.innerHTML.indexOf("保存新用户组") > -1){
        	if(saveRow(oTable, nEditing,"-1")){
        	 nEditing = null;
        	 $('input').popover('hide');
        	 $(".edit").attr("disabled",false);
        	 $("#group_table_new").attr("disabled",false);
        	}
        	window.location.reload();
        	
        }else if(this.innerHTML.indexOf('取消')){
        	window.location.reload();
        }else {
        	editRow(oTable, nRow);
            nEditing = nRow;
        }
       
    });
    
    
    //---------------------------------------------------------------------------------------------------
    
    var datatem=new Array();
    
    var config_table = $("#config_item").dataTable({
		"paging": false,
        "ordering": false,
	     "searching": true,
 	    "info": false,
	        "order": [
	            [0, 'asc']
	        ],
        "language": {
      		"emptyTable": "无数据",
            "info": "",
            "infoEmpty": "无数据",
            "lengthMenu": "显示 _MENU_ 项",
            "search": "搜索:",
            "zeroRecords": "无数据",
        },
        "aoColumns": [   
                    {"sWidth": " 5%"},
      	            {"sWidth": "15%"},   
      	            {"sWidth": "20%"},   
      	            {"sWidth": "20%"}, 
      	            {"sWidth": "20%"},
      	            {"sWidth": "20%"}
      	    ],
        "ajax": {
			"dataSrc": "config_item",
        },
        "createdRow": function (row, data, index) {
            	var check="";
            	datatem.push(data[1]);
            	if(data[6]=='1'){
            		check='checked';
            	}
            	
            	$('td',row).eq(0).html("<input id=\""+data[1]+"autho\" type=\"checkbox\" "+check+" name=\"notify\" />");
            
    		}	
        }); 
    
    var name;
    $('#myModal').on('show.bs.modal', function (event) {
    	var target = $(event.relatedTarget);
    	name=target.data('whatever');
    	
    	$("#dbnameT").html("--	" + name);
    	$.ajaxSettings.async = false; 
    	var str="";
    	config_table.fnReloadAjax("/dbmon/DBMon_GROUP_List?groupname="+name);
    	
    });
    
    $('#myModal').on('hide.bs.modal', function (event) {
    	datatem=new Array();
    });
    
    $("#allselect").click(function(){
		$("input[type=checkbox]").each(function(data){
			if($(this).prop("checked")==false)
				$(this).click();
		});
    });
    
    $("#noselect").click(function(){
		$("input[type=checkbox]").each(function(data){
			if($(this).prop("checked")==true)
				$(this).click();
		});
    });
    
    $("#submits").click(function(){
		var dbids="";
		var count=0;
		for(var i=0;i<datatem.length;i++){
			if($("#"+datatem[i]+"autho").prop('checked')){
				$("#"+datatem[i]+"autho").parent();
				dbids+=datatem[i]+",";
				count++;
			}
		}
		$.ajax({  
             type : "post",  
             url : "/dbmon/DBMon_Update_Group",  
             data:{dbids:dbids,name:name},
             async : false
        });	
		datatem=new Array();
	});
    
    //-------------------------------------第二个模态框 UserList---------------------------------------------------
    
    var datatem2 = new Array();
    
  //第二个模态框-->对应config_group.html中
    var config_table2 = $("#config_item2").dataTable({
		"paging": false,
        "ordering": false,
	    "searching": true,
 	    "info": false,
	        "order": [
	            [0, 'asc']
	        ],
        "language": {
      		"emptyTable": "无数据",
            "info": "",
            "infoEmpty": "无数据",
            "lengthMenu": "显示 _MENU_ 项",
            "search": "搜索:",
            "zeroRecords": "无数据",
        },
        "aoColumns": [   
                    {"sWidth": " 5%"},
      	            {"sWidth": "15%"},   
      	            {"sWidth": "20%"},   
      	            {"sWidth": "20%"}, 
      	    ],
        "ajax": {
			"dataSrc": "config_item2",
        },
        "createdRow": function (row, data, index) {
            	var check="";
            	datatem2.push(data[1]);
            	if(data[4]=='1'){
            		check='checked';
            	}
            	
            	$('td',row).eq(0).html("<input id=\""+data[1]+"autho\" type=\"checkbox\" "+check+" name=\"notify\" />");
            
    		}	
        });
    var name2;
  //第二个模态框-->对应config_group.html中
     $('#myModal2').on('show.bs.modal', function (event) {
     	var target = $(event.relatedTarget);
     	name2=target.data('whatever');
     	
     	$("#dbnameT2").html("--	" + name2);
     	$.ajaxSettings.async = false; 
     	var str="";
     	config_table2.fnReloadAjax("/dbmon/DBMon_GROUP_UserList?groupname="+name2);
     	
     });
     
     
     //第二个模态框-->对应config_group.html中
     $('#myModal2').on('hide.bs.modal', function (event) {
     	datatem2=new Array();
     });
    
    
     $("#allselect2").click(function(){
	$("input[type=checkbox]").each(function(data){
		if($(this).prop("checked")==false)
			$(this).click();
	});
});

$("#noselect2").click(function(){
	$("input[type=checkbox]").each(function(data){
		if($(this).prop("checked")==true)
			$(this).click();
	});
});
    
    //第二个模态框的提交-->对应config_group.html中
      $("#submits2").click(function(){
  		var dbids="";
  		var count=0;
  		for(var i=0;i<datatem2.length;i++){
  			if($("#"+datatem2[i]+"autho").prop('checked')){
  				$("#"+datatem2[i]+"autho").parent();
  				dbids+=datatem2[i]+",";
  				count++;
  			}
  		}
  		$.ajax({  
               type : "post",  
               url : "/dbmon/DBMon_Update_Group",  
               data:{dbids:dbids,name:name2,modal:'modal'},
               async : false
          });	
  		datatem2=new Array();
  	});
}













