	var oTable;
			var period = "1h";
		
			oTable = $('#db2globalalert').dataTable( {
			"scrollX": true,
			"order": [[3, "desc"]],
			"search":true,
			"info": true,
			"paging": true,
			"processing": true,
			"language": {
		        "lengthMenu": "每页 _MENU_ 条记录",
		        "zeroRecords": "没有找到记录",
		        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
		        "infoEmpty": "无记录",
		        "infoFiltered": "(从 _MAX_ 条记录过滤)",
		        "search": "搜索",
		        "loadingRecords":"加载数据中",
		        "processing":"数据加载中",
		        "paginate": {
		            first:      "第一页",
		            previous:   "上一页",
		            next:   "下一页",
		            last:   "最后一页"
		        },
		    },	
		    "aoColumns": [
						{"sWidth": "0%"}, // 0
						{"sWidth": "0%"}, // 1
						{"sWidth": "0%"}, // 2
		    			{"sWidth": "10%"},//检测时间   3
		    			{"sWidth": "10%"},//第一次告警时间  4
		    			{"sWidth": "6%"}, //主机  5
		    	        {"sWidth": "5%"}, //数据库名  6
		    	        {"sWidth": "4%"}, //数据库类型  7
		    	        {"sWidth": "4%"}, //级别  8
		    	        {"sWidth": "4%"}, //类型  9
		    	        {"sWidth": "6%"}, //报警项  10
		    	        {"sWidth": "9%"}, //描述   11
		    	        {"sWidth": "4%"},//峰值12
		    	        {"sWidth": "4%"}, //告警次数13
		    	        {"sWidth": "5%"}, //告警升级14
		    	        {"sWidth": "4%"},  //提醒  15
		    	        {"sWidth": "11%"},  //提醒 时间16 
		    	        {"sWidth": "11%"}, //操作  17
		    	        {"sWidth": "3%"},  //选择  18
		    	        
		   	],
			"ajax": {
				"url": "/dbmon/Alert_Table_GlobalAlert?dbid=" + GetParam("dbid") + "&period=" + GetParam("period"),
				"dataSrc": "db2globalalert",
			},
			"createdRow": function (row, data, index) {
				$('td', row).eq(0).html(data[0]);
				$('td', row).eq(0).attr("style","display:none;");
				$('td', row).eq(1).attr("style","display:none;");
				$('td', row).eq(2).attr("style","display:none;");
				//检测时间
				$('td',row).eq(3).attr({ "style":"text-align: center;"}).html("<span class=\"glyphicon glyphicon-time\"></span>&nbsp&nbsp"+data[3]);
				//第一次告警时间
				$('td',row).eq(4).attr({ "style":"text-align: center;" }).html("<span  class=\"glyphicon glyphicon-time\"></span>&nbsp&nbsp"+data[4]);
				//主机
				$('td',row).eq(5).attr({ "style":"text-align: center;"  }).html(data[5]);
				//数据库名
				$('td',row).eq(6).attr({ "style":"text-align: center;" }).html(data[6]);
				//数据库类型
				if(data[7].indexOf("ORACLE")>=0){
					$('td',row).eq(7).attr({ "style":"text-align: center;" }).html("ORACLE");
				}else if(data[7].indexOf("DB2")>=0){
					$('td',row).eq(7).attr({ "style":"text-align: center;" }).html("DB2");
				}else if(data[7].indexOf("MySQL")>=0){
					$('td',row).eq(7).attr({ "style":"text-align: center;" }).html("MySQL");
				}else{
					$('td',row).eq(7).attr({ "style":"text-align: center;" }).html("SQLSERVER");
				}
				//级别
				if(data[8] == '2') {
					$('td',row).eq(8).attr({ "style":"text-align: center;" }).html("<span class=\"label label-danger\">严重</span>");
				} else if (data[8] == '1') {
					$('td',row).eq(8).attr({ "style":"text-align: center;" }).html("<span class=\"label label-warning\">一般</span>");
				} 
				//类型：如性能
				if(data[9] == '状态'){
					$('td',row).eq(9).attr({ "style":"text-align: center;" }).html("<span class=\"label label-primary\" style='background-color: #1fb7b7'>"+data[9]+"</span>");
					$('td',row).eq(10).attr({ "style":"text-align: center;" }).html("<span class=\"label label-primary\" style='background-color: #1fb7b7'>"+data[10]+"</span>");
				}else if(data[9] == '安全'){
					$('td',row).eq(9).attr({ "style":"text-align: center;" }).html("<span class=\"label label-primary\" style='background-color: rgb(28, 107, 185)'>"+data[9]+"</span>");
					$('td',row).eq(10).attr({ "style":"text-align: center;" }).html("<span class=\"label label-primary\" style='background-color: rgb(28, 107, 185)'>"+data[10]+"</span>");
				}else if(data[9] == '资源'){
					$('td',row).eq(9).attr({ "style":"text-align: center;" }).html("<span class=\"label label-primary\" style='background-color: rgb(228, 204, 38)'>"+data[9]+"</span>");
					$('td',row).eq(10).attr({ "style":"text-align: center;" }).html("<span class=\"label label-primary\" style='background-color: rgb(228, 204, 38)'>"+data[10]+"</span>");
				}else if(data[9] == '性能'){
					$('td',row).eq(9).attr({ "style":"text-align: center;" }).html("<span class=\"label label-primary\" style='background-color: rgb(143, 79, 165)'>"+data[9]+"</span>");
					$('td',row).eq(10).attr({ "style":"text-align: center;" }).html("<span class=\"label label-primary\" style='background-color: rgb(143, 79, 165)'>"+data[10]+"</span>");
				}
				//$('td',row).eq(9).attr({ "style":"text-align: center;" }).html("<span class=\"label label-primary\">"+data[9]+"</span>");
				//报警项
				//$('td',row).eq(10).attr({ "style":"text-align: center;" }).html("<span class=\"label label-success\">"+data[10]+"</span>");
				
				//描述
				$('td',row).eq(11).attr({"style":"text-align: center;"}).html("<span title=\""+data[11]+"\">"+data[11].substring(0,10)+"</span>");
				//告警峰值
				$('td', row).eq(12).attr({ "style":"text-align: center;" }).html(data[12]);
				//告警数量
				$('td', row).eq(13).attr({ "style":"text-align: center;" }).html(data[13]);
				//告警升级
				if(data[14] == 1) {
					$('td',row).eq(14).attr({ "style":"text-align: center;" }).html("<span  class=\"label label-success\">是</span>");
				} else {
					$('td',row).eq(14).attr({ "style":"text-align: center;" }).html("<span  class=\"label label-warning\">否</span>");
				}
				//提醒
				if(data[15] == "Y") {
					$('td',row).eq(15).attr({ "style":"text-align: center;" }).html("<span class=\"label label-success\">是</span>");
				} else {
					$('td',row).eq(15).attr({ "style":"text-align: center;" }).html("<span  class=\"label label-warning\">否</span>");
				}
				$('td',row).eq(15).css('display','none');
				//提醒时间
				$('td',row).eq(16).attr({ "style":"text-align: center;"  }).html("<span  class=\"glyphicon glyphicon-time\"></span>&nbsp&nbsp"+data[16]);
				//操作
				$('td',row).eq(17).attr({ "style":"text-align: center;" }).html("<button type=\"button\" id=\"history\"  onclick=\"showGlobalHistory(" 
						+ "'" + data[1] + "'" +  "," + data[2] + ")\" class=\"btn btn-default btn-sm\" >"+
						"告警历史</button>&nbsp;<button type=\"button\" id=\"clear\" onclick=\"clearAlert(" + data[0] + ")\" class=\"btn btn-default btn-sm\">清除</button>");
				//选择框
				$('td',row).eq(18).attr({ "style":"text-align: center;" }).html("<input id=\""+data[0]+"\" class=\"clears\" type=\"checkbox\" name=\"checkbox\" />");
			}   
		});
			
			
			
		$('#btn_1h').on('click', function() {
		
			period = "1h";
			oTable.fnReloadAjax("/dbmon/Alert_Table_GlobalAlert?dbid=" + GetParam("dbid") + "&period=1h");
		});	
		$('#btn_1d').on('click', function() {
			period = "1d";
			oTable.fnReloadAjax("/dbmon/Alert_Table_GlobalAlert?dbid=" + GetParam("dbid") + "&period=1d");
		});	
		$('#btn_1w').on('click', function() {
			period = "1w";
			oTable.fnReloadAjax("/dbmon/Alert_Table_GlobalAlert?dbid=" + GetParam("dbid") + "&period=1w");		
		});	
		$('#btn_all').on('click', function() {
			period = "all";
			oTable.fnReloadAjax("/dbmon/Alert_Table_GlobalAlert?dbid=" + GetParam("dbid") + "&period=all");
		
		});				
		
		$("#selectPage").click(function(){
			$("[name='checkbox']").prop("checked",true);
		});
		$("#noselectPage").click(function(){
			$("[name='checkbox']").prop("checked",false);
		});
		
		$("#deletealert").click(function(){
			var id="";
			$("[name='checkbox']").each(function(){
				if($(this).prop('checked')){
					id+=$(this).attr('id')+",";
				}
			});
			bootbox.confirm("是否批量删除告警", function(result) {
				if (result == true) {
					oTable.api().ajax.url("/dbmon/Alert_Table_GlobalAlert?dbid=" + GetParam("dbid") + "&period=" + period + "&alert_ids=" + id).load();
				} 
			});
		});		
	
		
		
		
		//类型
		$("#type").change(function(){
			var  text=this.value;
			if(text=="RESOURCE"){
				text="资源";
			}else if(text=="STATUS"){
				text="状态";
			}else if(text=="SECURITY"){
				text="安全";
			}else if(text=="PERFORMANCE"){
				text="性能";
			}else{
				text="";
			}
			$('#db2globalalert').DataTable().column(9).search(text).draw();
		});
		
		
		//严重级别
		$("#level").change(function(){
			var  text=this.value;
			if(text=='-1'){
				text="";
			}
			$('#db2globalalert').DataTable().column(8).search(text).draw();
		});
		//数据库
		getDBlistsAlert("dbname");
		$("#dbname").change(function(){
			var  val=this.value;
			if(this.value.indexOf(",")>=0){
				val="";
			}
			$('#db2globalalert').DataTable().column(2).search(val).draw();
//			var val=this.value.split(",");
//			$('#db2globalalert').DataTable().column(4).search(val[0]).draw();
//			$('#db2globalalert').DataTable().column(5).search(val[1]).draw();
		});
		//数据库类型
		$("#dbtype").change(function(){
			$('#db2globalalert').DataTable().column(7).search(this.value).draw();
//			var val=this.value.split(",");
//			$('#db2globalalert').DataTable().column(4).search(val[0]).draw();
//			$('#db2globalalert').DataTable().column(5).search(val[1]).draw();
		});
		
		//告警项
		getAlertlists("item");
		$("#item").change(function(){
			
			$('#db2globalalert').DataTable().column(10).search(this.value).draw();
		});
		
		//dbid
		var dbid=GetParam("dbid");
		if(dbid){
			var regExSearch = "^"+dbid+"$";
			$('#db2globalalert').DataTable().column(2).search(regExSearch,true,false).draw();
		}
		//
		var level=GetParam("level");
		if(level){
			if(level=='d'){
				level="2";
			}else{
				level="1";
			}
			$('#db2globalalert').DataTable().column(8).search(level).draw();
		}
		
		
		function showGlobalHistory(alert_type, dbid) {
			//alert("display history");
			window.location.href="dbmon_alert_history.html?dbid=" + dbid + "&alert_type=" + alert_type;
		}
		
		function clearAlert(alert_id) {
			//alert("clear alert");
			bootbox.confirm("是否删除该告警", function(result) {
				if (result == true) {
					oTable.api().ajax.url("/dbmon/Alert_Table_GlobalAlert?dbid=" + GetParam("dbid") + "&period=" + period + "&alert_id=" + alert_id).load();
				} 
			});
		}