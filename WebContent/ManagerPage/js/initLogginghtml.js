$('#loggingli').on('shown.bs.tab', function (e) {


var logoverview_table;
	logoverview_table = $('#logoverview_table').dataTable( {
		"paging": false,
		"searching": false,
		"ordering": false,
		"processing": true,
		"info": false,
		"language": {
	        "lengthMenu": "每页 _MENU_ 条记录",
	        "zeroRecords": "没有找到记录",
	        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
	        "infoEmpty": "无记录",
	        "infoFiltered": "(从 _MAX_ 条记录过滤)",
	        "search": "搜索"
	    },			
	 	"ajax": {
	 		"url": "/dbmon/DBMon_Log_Table_LogOverview?dbid=" + GetParam("dbid"),
	 		"dataSrc": "logoverview_table",
	 	},
			
	});



	var logusage_table;
	logusage_table = $('#logusage_table').dataTable( {
		"paging": false,
		"searching": false,
		"ordering": false,
		"processing": true,
		"info": false,
		"language": {
	        "lengthMenu": "每页 _MENU_ 条记录",
	        "zeroRecords": "没有找到记录",
	        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
	        "infoEmpty": "无记录",
	        "infoFiltered": "(从 _MAX_ 条记录过滤)",
	        "search": "搜索"
	    },			
	 	"ajax": {
	 		"url": "/dbmon/DBMon_Log_Table_LogUsage?dbid=" + GetParam("dbid"),
	 		"dataSrc": "logusage_table",
	 	},
			
	});



	var logparam_table;
	logusage_table = $('#logparam_table').dataTable( {
		"paging": false,
		"searching": false,
		"ordering": false,
		"processing": true,
		"info": false,
		"language": {
	        "lengthMenu": "每页 _MENU_ 条记录",
	        "zeroRecords": "没有找到记录",
	        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
	        "infoEmpty": "无记录",
	        "infoFiltered": "(从 _MAX_ 条记录过滤)",
	        "search": "搜索"
	    },			
	 	"ajax": {
	 		"url": "/dbmon/DBMon_Log_Table_LogParam?dbid=" + GetParam("dbid"),
	 		"dataSrc": "logparam_table",
	 	},
			
	});
	
	var logchart = initNomalEChart([[0,0]],"logchart","","","line","time","单位:次","日志写次数及平均时间");
	refreshNomalEChart("/dbmon/DBMon_Perf_Chart_LOG_WRITES?dbid="+GetParam("dbid")+"&period=1h",logchart,"","alert_logchart","logchart","select_logchart");
	Index.initLogChartTime("#select_logchart_time","/dbmon/DBMon_Perf_Chart_LOG_WRITES?", logchart, "alert_logchart","logchart","select_logchart");
	$("#select_logchart").change(function(){
		selected = getSelectedNumber("select_logchart");
		changeEChart(timerList["logchart"],logchart,selected);
	});
	$(window).resize();
	
	createLogChart("/dbmon/DBMon_Perf_Chart_Log?dbid="+dbid+"&period=1h", 
			 "db2log", "alert_db2log","select_db2log");
	$(window).resize();
	
});

