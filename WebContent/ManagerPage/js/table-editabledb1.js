function DBEditable() {
	var monSwitch;
	var notifySwitch;
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
        var datas="";
        $.ajax({  
             type : "post",  
             url : "/dbmon/Config_Table_DBUpdate",  
             data:{dbid:aData[0]} ,
             async : false,  
             success : function(data){  
            	 datas=data.split(',');
             }  
        });
        
        jqTds[0].innerHTML = '<input type="text" class="form-control small2" value="' + aData[0] + '" disabled>';
		for(var i=1;i<7;i++){
			 jqTds[i].innerHTML = '<input type="text" class="form-control small2" value="' + aData[i] + '">';
		}
		
		
	
		 jqTds[7].innerHTML = '<div class="bootstrap-switch bootstrap-switch-mini"><input id="mon_switch" type="checkbox" name="monitor" />	</div>';
		 jqTds[8].innerHTML = '<div class="bootstrap-switch bootstrap-switch-mini"><input id="no_switch" type="checkbox" name="notify" />	</div>';
		 
		if(aData[7]=="Y"  || aData[7].search("success")!=-1){
			monSwitch="Y";
			$("#mon_switch").bootstrapSwitch('state',true);
		}else{
			monSwitch="N";
			$("#mon_switch").bootstrapSwitch('state',false);
		}
				
		if(aData[8]=="Y"  | aData[8].search("success")!=-1){
			notifySwitch="Y";
			$('#no_switch').bootstrapSwitch('state', true);
		}else{
			notifySwitch="N";
			$('#no_switch').bootstrapSwitch('state', false);
		}
		
//        jqTds[0].innerHTML = '<input type="text" class="form-control small2" value="' + aData[0] + '">';
//        jqTds[2].innerHTML = '<input type="text" class="form-control small2" value="' + aData[2] + '">';
		
		
        jqTds[11].innerHTML = '<input type="password" class="form-control small2" id="passw" value="' +datas[0] + '">';
        jqTds[10].innerHTML = '<input type="password" class="form-control small2" id="repassw" value="' + datas[0] + '">';
        var typehtml="";
        if(datas[1].indexOf("PURESCALE")!=-1){
        	typehtml="<option value='PURESCALE' select='selected'>PURESCALE</option>"
        		+"<option value='NORMAL'>单节点</option> "	+"<option value='DPF'>DPF</option>"	;
        }else if(datas[1].indexOf("NORMAL")!=-1){
        	typehtml="<option value='NORMAL' select='selected' >单节点</option> "+
        	"<option value='PURESCALE' >PURESCALE</option>"	+"<option value='DPF'>DPF</option>"	;
        }else{
           	typehtml="<option value='DPF' select='selected' >DPF</option> "+
        	"<option value='PURESCALE' >PURESCALE</option>"	+"<option value='NORMAL'>单节点</option>"	;
        }
        jqTds[9].innerHTML = "<select class='form-control' id='db2type' name='db2type'  style='height:28px;padding:3.5px 6px;font-size:11px;'> "
			+typehtml
			+"</select>";
        $('th').eq(11).removeAttr("style");
        $('th').eq(10).removeAttr("style");
        $('th').eq(9).removeAttr("style");
        $('td', nRow).removeAttr("style");
        $('td', nRow).removeAttr("style");
        
        jqTds[12].innerHTML = '<a class="edit btn2 btn-sm2 green"  href="">保存</a>';
        jqTds[13].innerHTML = '<a class="cancel btn2 btn-sm2 red" href="">取消</a>';
        $('#no_switch').on('switchChange.bootstrapSwitch', function(event, state) {
        	if(state){
        		notifySwitch="Y";
        	}else{
        		notifySwitch="N";
        	}
        });
        $('#mon_switch').on('switchChange.bootstrapSwitch', function(event, state) {
        	if(state){
        		monSwitch="Y";
        	}else{
        		monSwitch="N";
        	}
        });
        
    }
    	
    
    function editNewRow(oTable, nRow) {
        var jqTds = $('>td', nRow);
        jqTds[0].innerHTML = '<input type="text" class="form-control small2"  value="" disabled>';
        for(var i=1;i<9;i++){
        	jqTds[i].innerHTML = '<input type="text" class="form-control small2" value="">';
        }
        jqTds[7].innerHTML = '<div class="bootstrap-switch bootstrap-switch-mini"><input id="mon_switch" type="checkbox" name="monitor" />	</div>';
		jqTds[8].innerHTML = '<div class="bootstrap-switch bootstrap-switch-mini"><input id="no_switch" type="checkbox" name="notify" />	</div>';
		$("#mon_switch").bootstrapSwitch('state',true);
		$('#no_switch').bootstrapSwitch('state', false);
		notifySwitch="N";
		monSwitch="Y";
        jqTds[10].innerHTML = '<input type="password" class="form-control small2" id="passw" value="">';
        jqTds[11].innerHTML = '<input type="password" class="form-control small2" id="repassw" value="">';
        jqTds[9].innerHTML = "<select class='form-control' id='db2type' name='db2type'  style='height:28px;padding:3.5px 6px;font-size:11px;'> "
			+"<option value='NORMAL' select='selected'>单节点</option>"
        	+"<option value='PURESCALE'>PURESCALE</option>"
        	+"<option value='DPF'>DPF</option>"
			+"</select>";
        $('th').eq(9).removeAttr("style");
        $('th').eq(10).removeAttr("style");
        $('th').eq(11).removeAttr("style");
        $('td', nRow).removeAttr("style");
        $('td', nRow).removeAttr("style");
        jqTds[12].innerHTML = '<a class="edit btn2 btn-sm2 green"   href="">保存新库</a>';
        jqTds[13].innerHTML = '<a class="cancel btn2 btn-sm2 red" href="">取消</a>';
        jqTds[14].innerHTML='<div class="btn2 btn-sm2" disabled>监控项</div>';
        jqTds[15].innerHTML='<div class="btn2 btn-sm2" disabled>用户权限</div>';
        $('#no_switch').on('switchChange.bootstrapSwitch', function(event, state) {
        	if(state){
        		notifySwitch="Y";
        	}else{
        		notifySwitch="N";
        	}
        });
        
        
        $('#mon_switch').on('switchChange.bootstrapSwitch', function(event, state) {
        	if(state){
        		monSwitch="Y";
        	}else{
        		monSwitch="N";
        	}
        });
    }
    
    
    function deleteRow(oTable, nRow){
    	var aData = oTable.fnGetData(nRow);
    		oTable.fnDeleteRow(nRow);
        	$.ajax({  
	             type : "post",  
	             url : "/dbmon/Config_Table_DBUpdate",  
	             data:{dbid:aData[0],op:'delete'},
	             async : false,
	             success:function(data){	 
	             }
	        });	
    	
    }
    
    function saveRow(oTable, nRow) {
    	var flag=true;
    	var pass=$("#passw").val();
    	var passw=$("#repassw").val();
    	var jqInputs = $('input', nRow);
    	var name=jqInputs[1].value;
    	var contral=$('td', nRow)[14].innerHTML;
    	var userautho=$('td', nRow)[15].innerHTML;
    	var str="";
    	for(var i=1;i<6;i++){
    		if(jqInputs[i].value==""){
    			switch(i){
    			case 1: 
    				str+="数据库名为空! ";
    				break;
    			case 2:
    				str+="数据库别名为空! ";
    				break;
    			case 3:
    				str+="ip为空! ";
    				break;
    			case 4:
    				str+="端口号为空! ";
    				break;
    			case 5:
    				str+="用户名为空!";
    				break;
    			default:break;
    			}
    			flag=false;
    		}
    	}
    	if(!flag){
    		alert(str);
    		return falg;
    	}
    	
    	
    	
    	
    	if(pass!="" && pass==passw){
    		var dbidvar="";
    		if(jqInputs[0].value==null ||jqInputs[0].value==""){
    			dbidvar="-1";
    		}else{
    			dbidvar=jqInputs[0].value;
    		}
    		var pdb2type=$("#db2type").val();
    		$.ajax({  
 	             type : "post",  
 	             url : "/dbmon/Config_Table_DBUpdate",
 	             data:{dbid:dbidvar,dbname:jqInputs[1].value,dbalias:jqInputs[2].value,ip:jqInputs[3].value,port:jqInputs[4].value,username:jqInputs[5].value,email:jqInputs[6].value,monitor:monSwitch,notify:notifySwitch,db2type:pdb2type,password:jqInputs[10].value,op:'update'},
 	             async : false,
 	             success:function(data){
 	            	 dbidvar=data;
 	             }
 	        });
    		if(dbidvar.substr(0, 2)=="no"){
    			flag=false;
    			alert("连接失败:" + dbidvar.substr(3));
    			return flag;
    		}
    		if(dbidvar=="license"){
    			flag=false;
    			alert("到达license最大数据库监控数!");
    			return flag;
    		}
    		if(dbidvar==null || dbidvar==""){
    			dbidvar=jqInputs[0].value;
    		}
    		oTable.fnUpdate(dbidvar, nRow, 0, false);
    		for(var i=1;i<7;i++){
    			oTable.fnUpdate(jqInputs[i].value, nRow, i, false);
    		}
    		
        	if(notifySwitch=="Y"){
        		oTable.fnUpdate("<span class=\"label label-success\">开启</span>",nRow,8,false);
        	}else{
        		oTable.fnUpdate("<span class=\"label label-danger\">关闭</span>",nRow,8,false);
        	}
        	if(monSwitch=="Y"){
        		oTable.fnUpdate("<span class=\"label label-success\">开启</span>",nRow,7,false);
        	}else{
        		oTable.fnUpdate("<span class=\"label label-danger\">关闭</span>",nRow,7,false);
        	}
        	$('th').eq(11).attr("style","display:none;");
            $('th').eq(10).attr("style","display:none;");
            $('th').eq(9).attr("style","display:none;");
            $('td', nRow).eq(10).attr("style","display:none;");
            $('td', nRow).eq(9).attr("style","display:none;");
            $('td', nRow).eq(11).attr("style","display:none;");
            oTable.fnUpdate('<a class="edit btn2 btn-sm2 green" href="">编辑</a>', nRow, 12, false);
            oTable.fnUpdate('<a class="delete btn2 btn-sm2 red" href="">删除</a>', nRow, 13, false);
            oTable.fnUpdate(contral, nRow, 14, false);
            oTable.fnUpdate(userautho, nRow, 15, false);
            
            oTable.fnDraw();//Config_Table_UserUpdate
           
    	}else if(pass!=""){
    		alert("密码不一致!");
    		flag=false;
    		return falg;
    	}else{
    		alert("密码为空!");
    		flag=false;
    		return falg;
    	}
    	return flag;
    }

    function cancelEditRow(oTable, nRow) {
    	   var aData = oTable.fnGetData(nRow);
        if(aData[7]=="Y" ||  aData[7].indexOf("success")>-1){
    		oTable.fnUpdate("<span class=\"label label-success\">开启</span>",nRow,7,false);
    	}else{
    		oTable.fnUpdate("<span class=\"label label-danger\">关闭</span>",nRow,7,false);
    	}
    	if(aData[8]=="Y" ||  aData[8].indexOf("success")>-1){
    		oTable.fnUpdate("<span class=\"label label-success\">开启</span>",nRow,8,false);
    	}else{
    		oTable.fnUpdate("<span class=\"label label-danger\">关闭</span>",nRow,8,false);
    	}

        oTable.fnUpdate('<a class="edit btn2 btn-sm2 green"  href="">编辑</a>', nRow,12, false);
        oTable.fnUpdate('<a class="delete btn2 btn-sm2 red" href="">删除</a>', nRow, 13, false);
        oTable.fnUpdate('<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\"'+aData[1]+'('+aData[2]+')'+'\"  data-target=\"#myModal\"  data-whatever=\"'+aData[0]+'\" href=\"#\">监控项</a>', nRow, 14, false);
        oTable.fnUpdate('<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\"'+aData[1]+'('+aData[2]+')'+'\"  data-target=\"#autho_user\"  data-whatever=\"'+aData[0]+'\" href=\"#\">用户权限</a>', nRow, 15, false);

        oTable.fnDraw();
    }
    var table = $('#database_table');


    $.extend(true, $.fn.DataTable.TableTools.classes, {
        "container": "btn-group tabletools-dropdown-on-portlet",
        "buttons": {
            "normal": "btn2 btn-sm2 default",
            "disabled": "btn2 btn-sm2 default disabled"
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
            "emptyTable": "未添加数据库",
            "info": "显示 _START_ 到 _END_      共_TOTAL_ 条",
            "infoEmpty": "无数据",
            "infoFiltered": "(filtered1 from _MAX_ total entries)",
            "lengthMenu": "显示 _MENU_ 项",
            "search": "搜索:",
            "loadingRecords":"加载数据中",
		        "processing":"数据加载中",
            "zeroRecords": "没有记录"
        },
        "order": [
            [0, 'asc']
        ],
        "aoColumns": [   
                      	{"sWidth": "5%"},
        	            {"sWidth": "6%"},   
        	            {"sWidth": "6%"},   
        	            {"sWidth": "8%"}, 
        	            {"sWidth": "5%"}, 
        	            {"sWidth": "5%"},
        	            {"sWidth": "5%"},
        	            {"sWidth": "5%"},
        	            {"sWidth": "5%"},
        	            {"sWidth": "5%"},
        	            {"sWidth": "10%"},   
        	            {"sWidth": "10%"},   
        	            {"sWidth": "5%"}, 
        	            {"sWidth": "5%"}, 
        	            {"sWidth": "5%"},
        	            {"sWidth": "5%"},
        	    ],
        "lengthMenu": [
            [5, 10, 15, 20, -1],
            [5, 10, 15, 20, "All"] // change per page values here
        ],
        // set the initial value
        "pageLength": 10,
        "ajax": {
			"url": "/dbmon/Config_Table_DBConfig",
				"dataSrc": "database_table",
        },
        "createdRow": function (row, data, index) {
        	if(data[8]=="Y"){
        		$('td',row).eq(8).html("<span class=\"label label-success\">开启</span>");
        	}else{
        		$('td',row).eq(8).html("<span class=\"label label-danger\">关闭</span>");
        	}
        	if(data[7]=="Y"){
        		$('td',row).eq(7).html("<span class=\"label label-success\">开启</span>");
        	}else{
        		$('td',row).eq(7).html("<span class=\"label label-danger\">关闭</span>");
        	}
			$('td', row).eq(11).attr("style","display:none;");
			$('td', row).eq(10).attr("style","display:none;");
			$('td', row).eq(9).attr("style","display:none;");
        	
    		$('td', row).eq(12).html("<a class=\"edit btn2 btn-sm2 green\"  href=\"\">编辑</a>");	
    		$('td', row).eq(13).html("<a class=\"delete  btn2 btn-sm2 red\" href=\"\">删除</a>");	
    		$('td', row).eq(14).html("<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\""+data[1]+"("+data[2]+")"+"\" data-target=\"#myModal\" data-whatever=\""+data[0]+"\" href=\"#\">监控项</a>");	
    		$('td', row).eq(15).html("<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\""+data[1]+"("+data[2]+")"+"\" data-target=\"#autho_user\" data-whatever=\""+data[0]+"\" href=\"#\">用户权限</a>");	
        }	

     });
    var tableWrapper = $('#user_table_wrapper'); // datatable creates the table wrapper by adding with id {your_table_jd}_wrapper

    var nEditing = null;
    var nNew = false;

    $('#user_table_new').click(function (e) {
        e.preventDefault();
        
        if (nNew && nEditing) {
            $('th').eq(10).attr("style","display:none;");
            $('th').eq(9).attr("style","display:none;");
            $('td', nRow).eq(10).attr("style","display:none;");
            $('td', nRow).eq(9).attr("style","display:none;");
        	
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
        
        var aiNew = oTable.fnAddData(['','','','','','','','','','','','','']);
        var nRow = oTable.fnGetNodes(aiNew[0]);
        editNewRow(oTable, nRow);
        nEditing = nRow;
        nNew = true;
    });

    table.on('click', '.delete', function (e) {
        e.preventDefault();

        if (confirm("注意：删除后原有收集数据无法恢复，是否确定删除?") == false) {
            return;
        }

        var nRow = $(this).parents('tr')[0];
        deleteRow(oTable,nRow);
        
        
    });

    table.on('click', '.cancel', function (e) {
   
        e.preventDefault();
        $('th').eq(11).attr("style","display:none;");
        $('th').eq(10).attr("style","display:none;");
        $('th').eq(9).attr("style","display:none;");
        $('td', nEditing).eq(11).attr("style","display:none;");
        $('td', nEditing).eq(10).attr("style","display:none;");
        $('td', nEditing).eq(9).attr("style","display:none;");
       
        if (nNew) {
            oTable.fnDeleteRow(nEditing);
            nEditing = null;
            nNew = false;
        } else {
        	cancelEditRow(oTable, nEditing);
            restoreRow(oTable, nEditing);
            
            nEditing = null;
        }
    });

    table.on('click', '.edit', function (e) {
        e.preventDefault();

        var nRow = $(this).parents('tr')[0];

        if (nEditing !== null && nEditing != nRow) {
            restoreRow(oTable, nEditing);
            editRow(oTable, nRow);
            nEditing = nRow;
        } else if (nEditing == nRow && this.innerHTML == "保存") {
        	if(saveRow(oTable, nEditing,"1")){
        		nEditing = null;
        	}
        } else if(this.innerHTML=="保存新库"){
        	if(saveRow(oTable, nEditing,"-1")){
        		nEditing = null;
        		location.reload();
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
                    {"sWidth": " 3%"},
      	            {"sWidth": "9%"},   
      	            {"sWidth": "4%"},   
      	            {"sWidth": "55%"}, 
      	            {"sWidth": "5%"}, 
      	            {"sWidth": "7%"},
      	            {"sWidth": "7%"}
      	    ],
        "ajax": {
			"dataSrc": "config_item",
        },
        "createdRow": function (row, data, index) {
        	var check="";
        	var disabled="disabled";
        	var disch=""
        	if(data[7]=="1"){
        		check="checked=\"true\"";
        		disabled="";
        	}if( data[0].indexOf("DBACCESS")!=-1){
        		check="checked=\"true\"";
        		disabled="";
        		disch="disabled";
        	}
        	$('td',row).eq(0).html("<input id=\""+data[0]+"\" class='items' type=\"checkbox\" "+check+" name=\"notify\""+disch+ "/>");
        	datatem.push(data[0]);
        	
        	$('td',row).eq(1).html(data[2]);
        	$('td',row).eq(2).html(data[1]);
        	$('td',row).eq(3).html(data[6].substr(0,data[6].indexOf('。')));
        	var unit="";
        	var dis="";
        	if(data[3]=="NUM"){
        		unit="数值";
	        	
        	}else if(data[3]=="PERCENT"){
        		unit="百分比";
        	}else{
        		unit="状态";
        		dis="style='display:none'";
        	}
        	$('td',row).eq(4).html(unit);
        	$('td',row).eq(5).html("<input type=\"text\" class=\"form-control input-sm ko1"+data[0]+"\" value=\""+data[4]+"\""+dis+" "+disabled+"/>");
        	$('td',row).eq(6).html("<input type=\"text\" class=\"form-control input-sm ko2"+data[0]+"\" value=\""+data[5]+"\""+dis+" "+disabled+"/>");
//        	$('td',row).eq(7).html("<input type=\"text\" class=\"form-control input-sm ko3"+data[0]+"\" value=\""+data[6]+"\""+dis+" "+disabled+"/>");
    		}	
        });
    var dbids;
    
    $('#myModal').on('show.bs.modal', function (event) {
    	var target = $(event.relatedTarget);
		dbids=target.data('whatever');
    	$("#dbnameT").html("--   "+target[0].title+"数据库");
    	$.ajaxSettings.async = false; 
    	var str="";
    	config_table.fnReloadAjax("dbmon/DBMon_Alert_Table_Alertthres?dbid="+dbids);
    	for(var i=0;i<datatem.length;i++){
    		$("#"+datatem[i]).change(function(data){
    			if($(".ko1"+data.target.id).attr("disabled")){
    				$(".ko1"+data.target.id).attr("disabled",false);
    				$(".ko2"+data.target.id).attr("disabled",false);
    				$(".ko3"+data.target.id).attr("disabled",false);
    			}else{
    				$(".ko1"+data.target.id).attr("disabled",true);
    				$(".ko2"+data.target.id).attr("disabled",true);
    				$(".ko3"+data.target.id).attr("disabled",true);
    			}
    		});
    	}
    });
    

    
    var   datatems=new Array();
    var autho_userselect = $("#autho_userselect").dataTable({
		"paging": false,
        "ordering": false,
	     "searching": true,
 	    "info": false,
        "language": {
      		  "emptyTable": "无数据",
            "info": "",
            "infoEmpty": "无数据",
            "lengthMenu": "显示 _MENU_ 项",
            "search": "搜索:",
            "zeroRecords": "无数据",
        },
        "aoColumns": [   
                    {"sWidth": " 10%"},
                    {"sWidth": " 45%"},
      	            {"sWidth": " 45%"},   
      	    ],
        "ajax": {
			"dataSrc": "autho_userselect",
        },
        "createdRow": function (row, data, index) {
            	var check="";
            	datatems.push(data[1]);
            	if(data[3]=='1'){
            		check='checked';
            	}
            	$('td',row).eq(0).html("<input id=\""+data[1]+"autho\" class='usercheck' type=\"checkbox\" "+check+" name=\"notify\" />");
    		}	
        }); 
    $("#allselect").click(function(){
		$("input.items[type=checkbox]").each(function(data){
			if($(this).prop("checked")==false)
				$(this).click();
		});
    });
    
    $("#noselect").click(function(){
		$("input.items[type=checkbox]").each(function(data){
			if($(this).prop("checked")==true)
				$(this).click();
		});
    });

    
    
    $('#myModal').on('hide.bs.modal', function (event) {
    	datatem=new Array();
    });
    
    
    
    
    $("#submits").click(function(){
		var items="";
		var values="";
		var value_es="";
		var value_cs="";
		var count=0;
		for(var i=0;i<datatem.length;i++){
			if($("#"+datatem[i]).prop('checked')){
				$("#"+datatem[i]).parent();
				items+=datatem[i]+",";
				values+=$(".ko1"+datatem[i]).val()+",";
				value_es+=$(".ko2"+datatem[i]).val()+",";
				value_cs+=$(".ko3"+datatem[i]).val()+",";
				count++;
			}
			
		}
		$.ajax({  
             type : "post",  
             url : "/dbmon/DBMon_Updata_AlertInfo",  
             data:{dbid:dbids,item:items,value:values,valuee:value_es},
             async : false
        });	
		datatem=new Array();
	});
    var dbids2;
    $('#autho_user').on('show.bs.modal', function (event) {
    	var target = $(event.relatedTarget);
    	dbids2=target.data('whatever');
    	$("#dbnameTS").html("--   "+target[0].title+"数据库");
    	$.ajaxSettings.async = false; 
    	autho_userselect.fnReloadAjax("../DBMon_USER_Autho_Database?dbid="+dbids2);
    	
    });
    $('#autho_user').on('hide.bs.modal', function (event) {
    	datatems=new Array();
    });
    
    $("#allselect_user").click(function(){
		$("input.usercheck[type=checkbox]").each(function(data){
			if($(this).prop("checked")==false)
				$(this).click();
		});
    });
    
    $("#noselect_user").click(function(){
		$("input.usercheck[type=checkbox]").each(function(data){
			if($(this).prop("checked")==true)
				$(this).click();
		});
    });
    
    $("#submits_user").click(function(){
		var usernames="";
		var count=0;
		for(var i=0;i<datatems.length;i++){
			if($("#"+datatems[i]+"autho").prop('checked')){
				$("#"+datatems[i]+"autho").parent();
				usernames+=datatems[i]+",";
				count++;
			}
		}
		$.ajax({  
             type : "post",  
             url : "/dbmon/DBMon_Updata_Autho_Database",  
             data:{dbid:dbids2,user:usernames},
             async : false
        });	
		datatems=new Array();
	});
    
}



