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
		for(var i=1;i<8;i++){
			 jqTds[i].innerHTML = '<input type="text" class="form-control small2" value="' + aData[i] + '">';
		}
		
		 jqTds[3].innerHTML ='<select name="dbType" id="dbType"><option value="DB2">DB2</option><option value="ORACLE">ORACLE</option></select>';
		 //jqTds[3].innerHTML ='<select name="dbType" id="dbType"><option value="DB2">DB2</option></select>';
		 jqTds[8].innerHTML = '<div class="bootstrap-switch bootstrap-switch-mini"><input id="mon_switch" type="checkbox" name="monitor" />	</div>';
		 jqTds[9].innerHTML = '<div class="bootstrap-switch bootstrap-switch-mini"><input id="no_switch" type="checkbox" name="notify" />	</div>';
		 
		if(aData[8]=="Y"  || aData[8].search("success")!=-1){
			monSwitch="Y";
			$("#mon_switch").bootstrapSwitch('state',true);
		}else{
			monSwitch="N";
			$("#mon_switch").bootstrapSwitch('state',false);
		}
				
		if(aData[9]=="Y"  | aData[9].search("success")!=-1){
			notifySwitch="Y";
			$('#no_switch').bootstrapSwitch('state', true);
		}else{
			notifySwitch="N";
			$('#no_switch').bootstrapSwitch('state', false);
		}
		
//        jqTds[0].innerHTML = '<input type="text" class="form-control small2" value="' + aData[0] + '">';
//        jqTds[2].innerHTML = '<input type="text" class="form-control small2" value="' + aData[2] + '">';
		
		
        jqTds[12].innerHTML = '<input type="password" class="form-control small2" id="passw" value="' +datas[0] + '">';
        jqTds[11].innerHTML = '<input type="password" class="form-control small2" id="repassw" value="' + datas[0] + '">';
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
        jqTds[10].innerHTML = "<select class='form-control' id='db2type' name='db2type'  style='height:28px;padding:3.5px 6px;font-size:11px;'> "
			+typehtml
			+"</select>";
        $('th').eq(12).removeAttr("style");
        $('th').eq(11).removeAttr("style");
        $('th').eq(10).removeAttr("style");
        $('td', nRow).removeAttr("style");
        $('td', nRow).removeAttr("style");
        
        jqTds[13].innerHTML = '<a class="edit btn2 btn-sm2 green"  href="">保存</a>';
        jqTds[14].innerHTML = '<a class="cancel btn2 btn-sm2 red" href="">取消</a>';
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
        for(var i=1;i<10;i++){
        	jqTds[i].innerHTML = '<input type="text" class="form-control small2" value="">';
        }
        jqTds[3].innerHTML ='<select name="dbType" id="dbType"><option value="DB2">DB2</option><option value="ORACLE">ORACLE</option></select>';
        //jqTds[3].innerHTML ='<select name="dbType" id="dbType"><option value="DB2">DB2</option></select>';
        jqTds[8].innerHTML = '<div class="bootstrap-switch bootstrap-switch-mini"><input id="mon_switch" type="checkbox" name="monitor" />	</div>';
		jqTds[9].innerHTML = '<div class="bootstrap-switch bootstrap-switch-mini"><input id="no_switch" type="checkbox" name="notify" />	</div>';
		$("#mon_switch").bootstrapSwitch('state',true);
		$('#no_switch').bootstrapSwitch('state', false);
		notifySwitch="N";
		monSwitch="Y";
        jqTds[11].innerHTML = '<input type="password" class="form-control small2" id="passw" value="">';
        jqTds[12].innerHTML = '<input type="password" class="form-control small2" id="repassw" value="">';
        jqTds[10].innerHTML = "<select class='form-control' id='db2type' name='db2type'  style='height:28px;padding:3.5px 6px;font-size:11px;'> "
			+"<option value='NORMAL' select='selected'>单节点</option>"
        	+"<option value='PURESCALE'>PURESCALE</option>"
        	+"<option value='DPF'>DPF</option>"
			+"</select>";
        $('th').eq(10).removeAttr("style");
        $('th').eq(11).removeAttr("style");
        $('th').eq(12).removeAttr("style");
        $('td', nRow).removeAttr("style");
        $('td', nRow).removeAttr("style");
        jqTds[13].innerHTML = '<a class="edit btn2 btn-sm2 green"   href="">保存新库</a>';
        jqTds[14].innerHTML = '<a class="cancel btn2 btn-sm2 red" href="">取消</a>';
        jqTds[15].innerHTML='<div class="btn2 btn-sm2" disabled>监控项</div>';
        jqTds[16].innerHTML='<div class="btn2 btn-sm2" disabled>用户权限</div>';
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
    	var dbType = $("#dbType").val();
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
    				str+="数据库类型为空! ";
    				break;
    			case 4:
    				str+="ip为空! ";
    				break;
    			case 5:
    				str+="端口号为空! ";
    				break;
    			case 6:
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
 	             data:{dbid:dbidvar,dbname:jqInputs[1].value,dbalias:jqInputs[2].value,type:dbType,ip:jqInputs[3].value,port:jqInputs[4].value,username:jqInputs[5].value,email:jqInputs[6].value,monitor:monSwitch,notify:notifySwitch,db2type:pdb2type,password:jqInputs[10].value,op:'update'},
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
    		for(var i=1;i<8;i++){
    			oTable.fnUpdate(jqInputs[i].value, nRow, i, false);
    		}
    		
        	if(notifySwitch=="Y"){
        		oTable.fnUpdate("<span class=\"label label-success\">开启</span>",nRow,9,false);
        	}else{
        		oTable.fnUpdate("<span class=\"label label-danger\">关闭</span>",nRow,9,false);
        	}
        	if(monSwitch=="Y"){
        		oTable.fnUpdate("<span class=\"label label-success\">开启</span>",nRow,8,false);
        	}else{
        		oTable.fnUpdate("<span class=\"label label-danger\">关闭</span>",nRow,8,false);
        	}
        	$('th').eq(12).attr("style","display:none;");
            $('th').eq(11).attr("style","display:none;");
            $('th').eq(10).attr("style","display:none;");
            $('td', nRow).eq(10).attr("style","display:none;");
            $('td', nRow).eq(11).attr("style","display:none;");
            $('td', nRow).eq(12).attr("style","display:none;");
            oTable.fnUpdate('<a class="edit btn2 btn-sm2 green" href="">编辑</a>', nRow, 13, false);
            oTable.fnUpdate('<a class="delete btn2 btn-sm2 red" href="">删除</a>', nRow, 14, false);
            oTable.fnUpdate(contral, nRow, 15, false);
            oTable.fnUpdate(userautho, nRow, 16, false);
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
    	window.location.reload();
    	return flag;
    }

    function cancelEditRow(oTable, nRow) {
    	   var aData = oTable.fnGetData(nRow);
        if(aData[8]=="Y" ||  aData[8].indexOf("success")>-1){
    		oTable.fnUpdate("<span class=\"label label-success\">开启</span>",nRow,8,false);
    	}else{
    		oTable.fnUpdate("<span class=\"label label-danger\">关闭</span>",nRow,8,false);
    	}
    	if(aData[9]=="Y" ||  aData[9].indexOf("success")>-1){
    		oTable.fnUpdate("<span class=\"label label-success\">开启</span>",nRow,9,false);
    	}else{
    		oTable.fnUpdate("<span class=\"label label-danger\">关闭</span>",nRow,9,false);
    	}
    	
    	if(aData[3] == "DB2" || aData[8].indexOf("DB2") > -1){
    		oTable.fnUpdate("<span class=\"label label-success\">DB2</span>",nRow,3,false);
    	}else if(aData[3] == "ORACLE" || aData[8].indexOf("ORACLE") > -1){
    		oTable.fnUpdate("<span class=\"label label-primary\">ORACLE</span>",nRow,3,false);
    	}else if(aData[3] == "SQLSERVER" || aData[8].indexOf("SQLSERVER") > -1){
    		oTable.fnUpdate("<span class=\"label label-success\">SQLSERVER</span>",nRow,3,false);
    	}else if(aData[3] == "HANA" || aData[8].indexOf("HANA") > -1){
    		oTable.fnUpdate("<span class=\"label label-info\">HANA</span>",nRow,3,false);
    	}
    	
    	oTable.fnUpdate('<a class="edit btn2 btn-sm2 green"  href="">编辑</a>', nRow,13, false);
        oTable.fnUpdate('<a class="delete btn2 btn-sm2 red" href="">删除</a>', nRow, 14, false);
        var modelId="";
        oTable.fnUpdate('<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\"'+aData[1]+'('+aData[2]+')'+'\"  data-target=\"#myModal\"  data-whatever=\"'+aData[0]+'\" href=\"#\">监控项</a>', nRow, 15, false);
        oTable.fnUpdate('<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\"'+aData[1]+'('+aData[2]+')'+'\"  data-target=\"#autho_user\"  data-whatever=\"'+aData[0]+'\" href=\"#\">用户权限</a>', nRow, 16, false);

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
                      	{"sWidth": "2%"},
        	            {"sWidth": "6%"},   
        	            {"sWidth": "6%"},   
        	            {"sWidth": "5%"},
        	            {"sWidth": "8%"}, 
        	            {"sWidth": "5%"}, 
        	            {"sWidth": "5%"},
        	            /*{"sWidth": "5%"},*/
        	            {"sWidth": "5%"},
        	            {"sWidth": "5%"},
        	            {"sWidth": "5%"},
        	            {"sWidth": "5%"},//报表邮箱
        	            {"sWidth": "5%"},//告警邮箱
        	            {"sWidth": "9%"},   
        	            {"sWidth": "9%"},   
        	            {"sWidth": "5%"}, 
        	            {"sWidth": "5%"}, 
        	            {"sWidth": "5%"},
        	            {"sWidth": "2%"},
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
        	var dataModel="myModal";
        	if(data[3].indexOf("DB2")>=0){
        		$('td',row).eq(3).html("<span class=\"label label-success\">DB2</span>");
        	}else if(data[3].indexOf("ORACLE")>=0){
        		$('td',row).eq(3).html("<span class=\"label label-primary\">ORACLE</span>");
        	}else if(data[3].indexOf("MySQL")>=0){
        		$('td',row).eq(3).html("<span class=\"label label-warning\">MySQL</span>");
        	}else if(data[3].indexOf("SQLSERVER")>=0){
        		$('td',row).eq(3).html("<span class=\"label label-sql\">SQLSERVER</span>");
        	}else if(data[3].indexOf("HANA")>=0){
        		$('td',row).eq(3).html("<span class=\"label label-info\">HANA</span>");
        		dataModel="myModalforHana";
        	}
        	
        	
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
        	$('td', row).eq(9).html("<p title=\"" +data[9]+ "\">" +data[11]+ "</p>");//报表邮箱
        	$('td', row).eq(10).html("<p title=\"" +data[10]+ "\">" +data[12]+ "</p>");//告警邮箱
        	
			$('td', row).eq(13).attr("style","display:none;");
			$('td', row).eq(12).attr("style","display:none;");
			$('td', row).eq(11).attr("style","display:none;");
        	
    		$('td', row).eq(14).html("<a class=\"edit btn2 btn-sm2 green\"  href=\"\" data-target=\"#editDbModal\" data-toggle=\"modal\" data-whatever=\""+data[0]+"\">编辑</a>");	
    		$('td', row).eq(15).html("<a class=\"delete  btn2 btn-sm2 red\" href=\"\">删除</a>");	

    		$('td', row).eq(16).html("<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\""+data[1]+"("+data[2]+")"+"\" data-type='"+data[3]+"' data-target=\"#"+dataModel+"\" data-whatever=\""+data[0]+"\" href=\"#\">监控项</a>");	
    		$('td', row).eq(17).html("<a class=\" btn2 btn-sm2\" class=\"moredetail\"  data-toggle=\"modal\" title=\""+data[1]+"("+data[2]+")"+"\" data-target=\"#autho_user\" data-whatever=\""+data[0]+"\" href=\"#\">用户权限</a>");	
        }	

        });
    var tableWrapper = $('#user_table_wrapper'); // datatable creates the table wrapper by adding with id {your_table_jd}_wrapper

    var nEditing = null;
    var nNew = false;

    /*$('#user_table_new').click(function (e) {
        e.preventDefault();
        
        
        
        if (nNew && nEditing) {
            $('th').eq(11).attr("style","display:none;");
            $('th').eq(10).attr("style","display:none;");
            $('td', nRow).eq(11).attr("style","display:none;");
            $('td', nRow).eq(10).attr("style","display:none;");
        	
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
    });*/

    table.on('click', '.delete', function (e) {
        e.preventDefault();

        if (confirm("注意：删除后原有收集数据无法恢复，是否确定删除?") == false) {
            return;
        }

        var nRow = $(this).parents('tr')[0];
        deleteRow(oTable,nRow);
        window.location.reload();
        
    });

    table.on('click', '.cancel', function (e) {
   
        e.preventDefault();
        $('th').eq(12).attr("style","display:none;");
        $('th').eq(11).attr("style","display:none;");
        $('th').eq(10).attr("style","display:none;");
        $('td', nEditing).eq(12).attr("style","display:none;");
        $('td', nEditing).eq(11).attr("style","display:none;");
        $('td', nEditing).eq(10).attr("style","display:none;");
       
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
    
    
    //编辑
    /*table.on('click', '.edit', function (e) {
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
        
    });*/
    
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
        	}if( data[0].indexOf("DBACCESS")!=-1 || data[0].indexOf("DBHANG")!=-1 || data[0].indexOf("ACCESS")!=-1){
        		check="checked=\"true\"";
        		disabled="";
        		disch="disabled";
        	}
        	$('td',row).eq(0).html("<input id=\""+data[0]+"\" class='items' type=\"checkbox\" "+check+" name=\"notify\""+disch+ "/>");
        	datatem.push(data[0]);
        	
        	$('td',row).eq(1).html(data[2]);
        	$('td',row).eq(2).html(data[1]);
        	var content=data[6];
        	if(data[6].indexOf('。')>-1){
        		content=data[6].substr(0,data[6].indexOf('。'));
        	}
        	
        	$('td',row).eq(3).html(content);
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
    
    var hanadatatem=new Array();
    var hana_config_table = $("#hana_config_item").dataTable({
		"paging": false,
        "ordering": true,
      /*  "scrollCollapse": true,
		"scrollX": true,*/
	    "searching": true,
	    "paging": true,
	    "bAutoWidth": true,
		"lengthMenu": [[10, 20, 25, -1 ],[10, 20, 25, "ALL"]],
 	    "info": false,
 	   "order":[[2,"desc"],[0,"asc"],[9,"asc"]],
        "language": {
      		"emptyTable": "无数据",
            "info": "",
            "infoEmpty": "无数据",
            "lengthMenu": "显示 _MENU_ 项",
            "search": "搜索:",
            "zeroRecords": "无数据",
        },
       /* "aoColumns": [   
                    {"sWidth": "2%"},
      	            {"sWidth": "8%"},   
      	            {"sWidth": "2%"},   
      	            {"sWidth": "8%"}, 
      	            {"sWidth": "8%"}, 
      	            {"sWidth": "22%"},
      	            {"sWidth": "15%"},
      	            {"sWidth": "8%"}, 
      	            {"sWidth": "8%"}, 
      	            {"sWidth": "8%"},
      	            {"sWidth": "8%"}
      	    ],*/
        "ajax": {
			"dataSrc": "data",
        },
        "createdRow": function (row, data, index) {
        	
        	if(data[9]=="Info"){
        		$('td',row).eq(9).html("<span class=\"label label-success\">"+data[9]+"</span>");
        	}else if(data[9]=="Low"){
        		$('td',row).eq(9).html("<span class=\"label label-primary\">"+data[9]+"</span>");
        	}else if(data[9]=="Medium"){
        		$('td',row).eq(9).html("<span class=\"label label-info\">"+data[9]+"</span>");
        	}else if(data[9]=="High"){
        		$('td',row).eq(9).html("<span class=\"label label-warning\">"+data[9]+"</span>");
        	}else if(data[3]=="Error"){
        		$('td',row).eq(9).html("<span class=\"label label-danger\">"+data[9]+"</span>");
        	}
        	hanadatatem.push(data[0]);
        	var dis = "";
        	var disabled = "";
        	if(data[11].trim() == '-'){
        		dis="style='display:none'";
        		disabled="disabled";
        	}
        	
        	$('td',row).eq(11).html("<input type=\"text\" class=\"form-control input-sm ko1"+data[11]+"\" value=\""+data[11]+"\""+dis+" "+disabled+"/>");
        	
        	if(data[2] == data[9]){
        		$('td',row).eq(2).html($('td',row).eq(9).html());
        		
        	}
        }	
    });
    
    
    
    var dbids;
    
    $('#myModal').on('show.bs.modal', function (event) {
    	var target = $(event.relatedTarget);
		dbids=target.data('whatever');
		var dbtype=target.data('type');
		$("#dbnameT").html(dbtype+"--   "+target[0].title+"数据库");
    	$.ajaxSettings.async = false; 
    	var str="";
    	var urlForType="";
    	$("#submits").data("dbtype",dbtype);
    	urlForType="../DBMon_Alert_Table_Alertthres?dbid="+dbids;
    	/*if(dbtype=='DB2'){
    		urlForType="../DBMon_Alert_Table_Alertthres?dbid="+dbids;
    	}else if(dbtype=='ORACLE'){
    		urlForType="../Ora_Alert_Table_Alertthres?dbid="+dbids;
    	}else if(dbtype == 'MySQL'){
    		urlForType = "MySQL_Alert_Table_Alertthres?dbid=" + dbids; 
    	}*/
    	config_table.fnReloadAjax(urlForType);
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
    
    $('#myModalforHana').on('show.bs.modal', function (event) {
    	var target = $(event.relatedTarget);
		dbids=target.data('whatever');
		var dbtype=target.data('type');
		$("#dbnameT").html(dbtype+"--   "+target[0].title+"数据库");
    	$.ajaxSettings.async = false; 
    	var str="";
    	var urlForType="";
    	$("#hanasubmits").data("dbtype",dbtype);
    	urlForType="../webapi/HanaAlert/getHanaAlertThresholds?dbid="+dbids;
    	/*if(dbtype=='DB2'){
    		urlForType="../DBMon_Alert_Table_Alertthres?dbid="+dbids;
    	}else if(dbtype=='ORACLE'){
    		urlForType="../Ora_Alert_Table_Alertthres?dbid="+dbids;
    	}else if(dbtype == 'MySQL'){
    		urlForType = "MySQL_Alert_Table_Alertthres?dbid=" + dbids; 
    	}*/
    	hana_config_table.fnReloadAjax(urlForType);
    	/*for(var i=0;i<datatem.length;i++){
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
    	}*/
    	
    	
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
    
    
    
    
    $("#hanasubmits").click(function(){
    	var datype=$("#hanasubmits").data("dbtype");
    	
    	
    	var items="";
		var values="";
		var count=0;
		for(var i=0;i<hanadatatem.length;i++){
			if($("#"+hanadatatem[i]).prop('checked')){
				$("#"+hanadatatem[i]).parent();
				items+=hanadatatem[i]+",";
				values+=$(".ko1"+hanadatatem[i]).val()+",";
				count++;
			}
			
		}
		var url="/dbmon/DBMon_Updata_AlertInfo";
		/*if(datype=="DB2"){
			url="/db2mon/DBMon_Updata_AlertInfo";
		}else if(datype=="ORACLE"){
			url="/db2mon/Ora_Updata_AlertInfo";
		}else if(datype == "MySQL"){
			url = "/db2mon/MySQL_Updata_AlertInfo"
		}*/
		$.ajax({  
             type : "post",  
             url : url,  
             data:{datype:datype,dbid:dbids,item:items},
             async : false
        });	
		hanadatatem=new Array();
	});
    
    $("#submits").click(function(){
    	var datype=$("#submits").data("dbtype");
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
		var url="/dbmon/DBMon_Updata_AlertInfo";
		/*if(datype=="DB2"){
			url="/db2mon/DBMon_Updata_AlertInfo";
		}else if(datype=="ORACLE"){
			url="/db2mon/Ora_Updata_AlertInfo";
		}else if(datype == "MySQL"){
			url = "/db2mon/MySQL_Updata_AlertInfo"
		}*/
		$.ajax({  
             type : "post",  
             url : url,  
             data:{datype:datype,dbid:dbids,item:items,value:values,valuee:value_es},
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
    
    $('#newDbModal').on('show.bs.modal', function (event) {
        $("#MONITOR").bootstrapSwitch('state',true);
		$("#NOTIFY").bootstrapSwitch('state', false);
    });
    
    
    var editId;
    $('#editDbModal').on('show.bs.modal', function (event) {
    	
    	var target = $(event.relatedTarget);
		editId=target.data('whatever');
    	
		var editdb;
    	$.ajax({  
            type : "post",  
            url : "/dbmon/Config_Table_DBConfig",
            data:{dbid:editId,op:"update"},
            async : false,
            success:function(data){
            	editdb = $.parseJSON(data);
            }
       });
    	
       $("#DBNAME2").val(editdb.dbname);
       $("#DBALIAS2").val(editdb.dbalias);
       $("#PRODUCT2").val(editdb.product);
       $("#IP2").val(editdb.ip);
       $("#PORT2").val(editdb.port);
       $("#USERNAME2").val(editdb.username);
       if(editdb.monitor == 'Y'){
    	   $("#MONITOR2").bootstrapSwitch('state',true);
       }else{
    	   $("#MONITOR2").bootstrapSwitch('state',false);
       }
       
       if(editdb.notify == 'Y'){
    	   $("#NOTIFY2").bootstrapSwitch('state', true);
       }else{
    	   $("#NOTIFY2").bootstrapSwitch('state', false);
       }
       
       $("#DBTYPE2").val(editdb.dbtype);
       $("#CHECKITEMS2").val(editdb.checkitems);
       $("#PASSWORD2").val(editdb.password);
       $("#REPASSWORD2").val(editdb.password);
       $("#REPORTMAIL2").val(editdb.reportmail);//回显报表邮箱
       $("#ALERTMAIL2").val(editdb.alertmail); //回显告警邮箱
    	
    });
    
    //监控切换
    var monSwitch2 = "Y";
	$("#MONITOR2").on('switchChange.bootstrapSwitch', function(event, state) {
    	if(state){
    		monSwitch2="Y";
    	}else{
    		monSwitch2="N";
    	}
    });
	
	//通知切换
	var notifySwitch2 = "Y";
	$('#NOTIFY2').on('switchChange.bootstrapSwitch', function(event, state) {
    	if(state){
    		notifySwitch2="Y";
    	}else{
    		notifySwitch2="N";
    	}
    });
	
	var monSwitch1 = "Y";
	$("#MONITOR").on('switchChange.bootstrapSwitch', function(event, state) {
    	if(state){
    		monSwitch1="Y";
    	}else{
    		monSwitch1="N";
    	}
    });
	
	//通知切换
	var notifySwitch1 = "Y";
	$('#NOTIFY').on('switchChange.bootstrapSwitch', function(event, state) {
    	if(state){
    		notifySwitch1="Y";
    	}else{
    		notifySwitch1="N";
    	}
    });
	
	//正则验证收邮件的邮箱
	function REGMail(mailId,alterId) {
		var mail = $(mailId).val();
		if(!mail.length){
			$(alterId).hide();
			return true;
		}
		var mails = mail.split(";");
		for(var i=0;i<mails.length;i++){
			var emailreg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
			//console.log(phonenum[i]);
			if(mails[i]){
				emailflag = emailreg.test(mails[i]);
				if(emailflag){
					$(alterId).hide();
					
				}else{
					$(alterId).show();
					return false;
				}
			}
			
		}
		return true;
	}
	$("#REPORTMAIL").blur(function(){
		REGMail("#REPORTMAIL","#alert_email")
	});
	$("#ALERTMAIL").blur(function(){
		REGMail("#ALERTMAIL","#alert_email")
	});
	$("#REPORTMAIL2").blur(function(){
		REGMail("#REPORTMAIL2","#alert_email2")
	});
	$("#ALERTMAIL2").blur(function(){
		REGMail("#ALERTMAIL2","#alert_email2")
	});
	
	
	
	
    $("#submits_db").click(function(){
    	var falg = true;
    	var dbname = $("#DBNAME").val().trim();
		var dbalias = $("#DBALIAS").val().trim();
		var ip = $("#IP").val().trim();
		var port = $("#PORT").val().trim();
		var username = $("#USERNAME").val().trim();
		var password = $("#PASSWORD").val().trim();
		var repass = $("#REPASSWORD").val().trim();
		var checkitems = $("#CHECKITEMS").val().trim();
		var reportmail = $("#REPORTMAIL").val().trim();
		var alertmail = $("#ALERTMAIL").val().trim();
		
		var product = $("#PRODUCT option:selected").val().trim();
		
		var dbtype = $("#DBTYPE option:selected").val().trim();
		
		if(dbname == null || dbname.trim() == ""){
			alert("请输入数据库名！");
			$("#DBNAME").focus();
			return false;
		}
		
    	if(dbalias == null || dbalias.trim() == ""){
			alert("请输入数据库别名！");
			$("#DBALIAS").focus();
			return false;
		}
    	
    	if(reportmail != null || reportmail.trim() != ""){
    		var reg = REGMail("#REPORTMAIL","#alert_email");
    		if(!reg){
    			$("#REPORTMAIL").focus();
    			return false;
    		}
		}
    	
    	if(alertmail != null || alertmail.trim() != ""){
    		var reg = REGMail("#ALERTMAIL","#alert_email");
    		if(!reg){
    			$("#ALERTMAIL").focus();
    			return false;
    		}
			
		}
    	
    	$.getJSON("/dbmon/Home_Table_DatabaseOverview",function(data){
    		if(data.db2overview != undefined){
    		for(i = 0;i<data.db2overview.length;i++){
    			var indexIp = data.db2overview[i][4].indexOf(":");
    			if(dbalias == data.db2overview[i][2] && ip == data.db2overview[i][4].substring(0,(indexIp))){
        			alert("已有的数据库别名！请重新输入");
        			$("#DBALIAS").focus();
        			falg = false;
        		}
    		}
    		}
    		
    		/*if(data.orcleoverview != undefined){
    		for(i = 0;i<data.oracleoverview.length;i++){
    			var indexIp = data.oracleoverview[i][3].indexOf(":");
    			if(dbalias == data.oracleoverview[i][1] && ip == data.oracleoverview[i][3].substring(0,(indexIp))){
    			alert("已有的数据库别名！请重新输入");
    			$("#DBALIAS").focus();
    			falg = false;
    			}
    		}
    		}
    		if(data.sqlserveroverview != undefined){
    		for(i = 0;i<data.sqlserveroverview.length;i++){
    			var indexIp = data.sqlserveroverview[i][3].indexOf(":");
    			if(dbalias == data.sqlserveroverview[i][1] && ip == data.sqlserveroverview[i][3].substring(0,(indexIp))){
        			alert("已有的数据库别名！请重新输入");
        			$("#DBALIAS").focus();
        			falg = false;
        		}
    		}
    		}
    		if(data.mysqloverview != undefined){
    		for(i = 0;i<data.mysqloverview.length;i++){
    			var indexIp = data.mysqloverview[i][3].indexOf(":");
    			if(dbalias == data.mysqloverview[i][1] && ip == data.mysqloverview[i][3].substring(0,(indexIp))){
        			alert("已有的数据库别名！请重新输入");
        			$("#DBALIAS").focus();
        			falg = false;
        		}
    		}
    		}*/
		})
    	
		if(!falg){
			return falg;
		}
		
		if(ip == null || ip.trim() == ""){
			alert("请输入IP！");
			$("#IP").focus();
			return false;
		}
		if(port == null || port.trim() == ""){
			alert("请输入端口号！");
			$("#PORT").focus();
			return false;
		}
		if(username == null || username.trim() == ""){
			alert("请输入用户名！");
			$("#USERNAME").focus();
			return false;
		}
		if(password == null || password.trim() == ""){
			alert("请输入密码！");
			$("#PASSWORD").focus();
			return false;
		}
		if(repass == null || repass.trim() == ""){
			alert("请输入重复密码！");
			$("#REPASSWORD").focus();
			return false;
		}
		
		if(password != repass){
			alert("两次输入的密码不一致!");
			$("#REPASSWORD").focus();
			return false;
		}
		
		var dbidvar;
		
		$.ajax({  
             type : "post",  
             url : "/dbmon/Config_Table_DBUpdate",
             data:{dbid:"-1",dbname:dbname,dbalias:dbalias,type:product,ip:ip,port:port,username:username,monitor:monSwitch1,notify:notifySwitch1,db2type:dbtype,password:password,checkitems:checkitems,reportmail:reportmail,alertmail:alertmail,op:'update'},
             async : false,
             success:function(data){
            	 dbidvar = data;
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
		
		window.location.reload();
		
    })
    
    var change = true;
   $("#DBALIAS2").change(function(){
	   return change = false;
   })
   
    $("#edit_db").click(function(){
    	var falg = true;
    	var dbid = editId;
    	var dbname = $("#DBNAME2").val().trim();
		var dbalias = $("#DBALIAS2").val().trim();
		var ip = $("#IP2").val().trim();
		var port = $("#PORT2").val().trim();
		var username = $("#USERNAME2").val().trim();
		var password = $("#PASSWORD2").val().trim();
		var repass = $("#REPASSWORD2").val().trim();
		var checkitems = $("#CHECKITEMS2").val().trim();
		var reportmail = $("#REPORTMAIL2").val().trim();
		var alertmail = $("#ALERTMAIL2").val().trim();
		
		
		var product = $("#PRODUCT2 option:selected").val().trim();
		
		var dbtype = $("#DBTYPE2 option:selected").val().trim();
		
		if(dbname == null || dbname.trim() == ""){
			alert("请输入数据库名！");
			$("#DBNAME2").focus();
			return false;
		}
    	if(dbalias == null || dbalias.trim() == ""){
			alert("请输入数据库别名！");
			$("#DBALIAS2").focus();
			return false;
		}
    	if(reportmail != null || reportmail.trim() != ""){
    		var reg = REGMail("#REPORTMAIL2","#alert_email2");
    		if(!reg){
    			$("#REPORTMAIL2").focus();
    			return false;
    		}
		}
    	
    	if(alertmail != null || alertmail.trim() != ""){
    		var reg = REGMail("#ALERTMAIL2","#alert_email2");
    		if(!reg){
    			$("#ALERTMAIL2").focus();
    			return false;
    		}
			
		}
    	
    	$.getJSON("/dbmon/Home_Table_DatabaseOverview",function(data){
    		if(data.db2overview != undefined ){
	    		for(i = 0;i<data.db2overview.length;i++){
	    			var indexIp = data.db2overview[i][4].indexOf(":");
	    			if(dbalias == data.db2overview[i][2] && ip == data.db2overview[i][4].substring(0,(indexIp))){
	    				if(!change){
	    				alert("已有的数据库别名！请重新输入");
	        			$("#DBALIAS2").focus();
	        			falg = false;
	        			}
	        		}
	    		}
    		}
    		/*for(i = 0;i<data.oracleoverview.length;i++){
    			var indexIp = data.oracleoverview[i][3].indexOf(":");
    			if(dbalias == data.oracleoverview[i][1] && ip == data.oracleoverview[i][3].substring(0,(indexIp))){
    			if(!change){
    			alert("已有的数据库别名！请重新输入");
    			$("#DBALIAS2").focus();
    			falg = false;
    				}
    			}
    		}
    		for(i = 0;i<data.sqlserveroverview.length;i++){
    			var indexIp = data.sqlserveroverview[i][3].indexOf(":");
    			if(dbalias == data.sqlserveroverview[i][1] && ip == data.sqlserveroverview[i][3].substring(0,(indexIp))){
        			if(!change){
        				alert("已有的数据库别名！请重新输入");
            			$("#DBALIAS").focus();
            			falg = false;
        			}
        		}
    		}
    		for(i = 0;i<data.mysqloverview.length;i++){
    			var indexIp = data.mysqloverview[i][3].indexOf(":");
    			if(dbalias == data.mysqloverview[i][1] && ip == data.mysqloverview[i][3].substring(0,(indexIp))){
        			if(!change){
        				alert("已有的数据库别名！请重新输入");
            			$("#DBALIAS").focus();
            			falg = false;
        			}
        		}
    		}*/
		})
		
		if(!falg){
			return falg;
		}
    	
		if(ip == null || ip.trim() == ""){
			alert("请输入IP！");
			$("#IP2").focus();
			return false;
		}
		if(port == null || port.trim() == ""){
			alert("请输入端口号！");
			$("#PORT2").focus();
			return false;
		}
		if(username == null || username.trim() == ""){
			alert("请输入用户名！");
			$("#USERNAME2").focus();
			return false;
		}
		if(password == null || password.trim() == ""){
			alert("请输入密码！");
			$("#PASSWORD2").focus();
			return false;
		}
		if(repass == null || repass.trim() == ""){
			alert("请输入重复密码！");
			$("#REPASSWORD2").focus();
			return false;
		}
		
		if(password != repass){
			alert("两次输入的密码不一致!");
			$("#REPASSWORD").focus();
			return false;
		}
		
		var dbidvar;
		
		$.ajax({  
             type : "post",  
             url : "/dbmon/Config_Table_DBUpdate",
             data:{dbid:dbid,dbname:dbname,dbalias:dbalias,type:product,ip:ip,port:port,username:username,monitor:monSwitch2,notify:notifySwitch2,db2type:dbtype,password:password,checkitems:checkitems,reportmail:reportmail,alertmail:alertmail,op:'update'},
             async : false,
             success:function(data){
            	 dbidvar = data;
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
		
		window.location.reload();
		
		
    })  
    
}


























