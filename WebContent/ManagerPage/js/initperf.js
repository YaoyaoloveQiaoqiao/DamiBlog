var lockwaitsdetail_table;
var lockdetail_table;
var osinfo_table;
var bufferpool_info_table;
var physical_io_table;
var async_io_table;
var direct_io_table;
var lock_overview_table;
var catalogcache_table;
var sortheap_table;
var packagecache_table;
var bufferIntervalId;
var ioIntervalId;
var lockTablewait;
var lockTablede;
var direct_io_tableint;
var physical_io_tableint;
var async_io_tableint;
var deadlockTable;
var activeEv;
var lockTimeoutTable;

	
$(document).ready(function() {
	osinfo_table = $('#conndel').dataTable( {
	"paging": false,
	"ordering": false,
	"searching": false,
	"info": false,
	"processing": true,
	"bAutoWidth":true,
	"language": {
        "lengthMenu": "每页 _MENU_ 条记录",
        "zeroRecords": "无法找到该链接 ,该链接可能已关闭!",
        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
        "infoEmpty": "无法拿到该链接 ,该链接可能已关闭!",
        "infoFiltered": "(从 _MAX_ 条记录过滤)",
        "search": "搜索",
        "loadingRecords":"加载数据中",
        "loadingRecords":"加载数据中",
        "processing":"数据加载中"
    },			
	"ajax": {
		"url": "/dbmon/DBMon_Conn_Detail?dbid=" + GetParam("dbid")+"&AppHandle=0",
		"dataSrc": "conndel",
	},		
	} );
} );


$('#memoryli').on('show.bs.tab', function (e) {
	meminterl=setInterval(function(){memtable.fnReloadAjax();}, 1000*5);
	
});
$('#memoryli').on('shown.bs.tab', function (e) {
	$(window).resize();
});
$('#memoryli').on('hidden.bs.tab', function (e) {
	clearInterval(meminterl);
});

$('#bufferli').on('shown.bs.tab', function (e) {
	bufferpool_info_table = $('#bufinfo_table')
	.dataTable(
			{
				"paging" : false,
				"searching" : false,
				"ordering" : false,
				"processing" : true,
				"info" : false,
				"language" : {
					"lengthMenu" : "每页 _MENU_ 条记录",
					"zeroRecords" : "没有找到记录",
					"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
					"infoEmpty" : "无记录",
					"infoFiltered" : "(从 _MAX_ 条记录过滤)",
					"search" : "搜索",
					"loadingRecords":"加载数据中",
			        "processing":"数据加载中"
				},
				"ajax" : {
					"url" : "/dbmon/DBMon_Perf_Table_BufInfo?dbid="
							+ GetParam("dbid"),
					"dataSrc" : "bufinfo_table",
				},	
				"createdRow": function (row, data, index) {
					$('td', row).eq(0).html(data[8]);
					$('td', row).eq(1).html(data[0]);
					$('td', row).eq(2).html(data[1]);
					$('td', row).eq(3).html(data[2]);
					$('td', row).eq(4).html(data[3]);
					$('td', row).eq(5).html(data[4]);
					$('td', row).eq(6).html(data[5]);
					$('td', row).eq(7).html(data[6]);
					$('td', row).eq(8).html(data[7]);
				}	
			});
	
		createColumn2("/dbmon/DBMon_Perf_Chart_BufInfo?dbid="+GetParam("dbid"), "db2buffsize");
		var interval_buf = 1000 * 5;
//	var hit_chart = createSpline3("/dbmon/DBMon_Perf_Chart_Hitratio?dbid=" + GetParam("dbid")
//			+ "&period=real&interval=5", "db2bufferhitratio", "",
//			"alert_db2bufferhitratio");
//	bufferIntervalId=setInterval(function() {
//		var time_int =  new Date().getTime();
//		refreshSplineEchart("/dbmon/DBMon_Perf_Chart_Hitratio?dbid=" + GetParam("dbid")
//				+ "&period=real&interval=5"+"&time="+time_int, hit_chart, "单位：%",	"alert_db2bufferhitratio");
//	}, interval_buf);
//	Index.initConDaterange("#select_bufferhitratio_time","/dbmon/DBMon_Perf_Chart_Hitratio",hit_chart,"alert_db2bufferhitratio",bufferIntervalId,5);
	
		var db2bufferhitratio = initNomalEChart([[0,0]],"db2bufferhitratio","","","line","time","","缓冲区瞬时命中率",true);

    	refreshNomalEChart("/dbmon/DBMon_Perf_Chart_Hitratio?dbid="+GetParam("dbid")+"&period=real&interval=5",db2bufferhitratio,"","alert_db2bufferhitratio","db2bufferhitratio","select_bufferhitratio");
		invalId = intervalRefreshEchart_Hitratio("/dbmon/DBMon_Perf_Chart_Hitratio?dbid="+GetParam("dbid")+"&period=real&interval=5",db2bufferhitratio,"","alert_db2bufferhitratio","db2bufferhitratio","select_bufferhitratio");
		Index.initConDaterange("#select_bufferhitratio_time","/dbmon/DBMon_Perf_Chart_Hitratio",db2bufferhitratio,"alert_db2bufferhitratio","db2bufferhitratio",invalId, 5,"select_bufferhitratio");
		    
		$("#select_bufferhitratio").change(function(){
			
			/*刷新方法  会导致多刷一个点*/
			/* var url = timerList2["db2conn"];
			refreshNomalEChart(url,db2conn); */
			
			selected = getSelectedNumber("select_bufferhitratio");
			changeEChart(timerList["db2bufferhitratio"],db2bufferhitratio,selected);
		});
		
});

//多节点 数据刷新方法
function changeEChart(data,eChart,selected){
	if(data.series != null && data.series.length != 0){
		//selected = getSelectedNumber("select_bufferhitratio");
		option = eChart.getOption();
		datalength = 0;
		for(var i=0;i<data.series.length;i++){
			if(selected != data.series[i].member)
				continue;
			option.legend[0].data[datalength] = data.series[i].name;
			option.series[datalength].name = data.series[i].name;
			option.series[datalength].data = data.series[i].data;
			datalength++;
		}
		option.legend[0].data.length = datalength;
		option.series.length = datalength;
		eChart.setOption(option);
	}
}

//$('#bufferli').on('hidden.bs.tab', function (e) {
//	clearInterval(bufferIntervalId);
//	clearInterval($.session.get('db2bufferhitratio'));
//});

$('#cacheli').on('shown.bs.tab', function (e) {
		catalogcache_table = $('#catalogcache_table').dataTable({
			"paging" : false,
			"searching" : false,
			"ordering" : false,
			"processing" : true,
			"bAutoWidth" : false,
			"aoColumns" : [ 
	            {"sWidth": "15%"}, 
	            {"sWidth": "17%"}, 
	            {"sWidth": "17%"}, 
	            {"sWidth": "17%"}, 
	            {"sWidth": "17%"}, 
	            {"sWidth": "17%"}      
		   	],
			"info" : false,
			"language" : {
				"lengthMenu" : "每页 _MENU_ 条记录",
				"zeroRecords" : "没有找到记录",
				"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
				"infoEmpty" : "无记录",
				"infoFiltered" : "(从 _MAX_ 条记录过滤)",
				"search" : "搜索",
				"loadingRecords":"加载数据中",
		        "processing":"数据加载中"
			},
			"ajax" : {
				"url" : "/dbmon/DBMon_Perf_Table_CatalogCache?dbid="
						+ GetParam("dbid"),
				"dataSrc" : "catalogcache_table",
			},
		});
		
		
		
		packagecache_table = $('#packagecache_table').dataTable({
			"paging" : false,
			"searching" : false,
			"ordering" : false,
			"processing" : true,
			"info" : false,
			"language" : {
				"lengthMenu" : "每页 _MENU_ 条记录",
				"zeroRecords" : "没有找到记录",
				"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
				"infoEmpty" : "无记录",
				"infoFiltered" : "(从 _MAX_ 条记录过滤)",
				"search" : "搜索",
				"loadingRecords":"加载数据中",
		        "processing":"数据加载中"
			},
			"bAutoWidth":false,
			"aoColumns": [  
	            {"sWidth": "15%"}, 
	            {"sWidth": "17%"}, 
	            {"sWidth": "17%"}, 
	            {"sWidth": "17%"}, 
	            {"sWidth": "17%"}, 
	            {"sWidth": "17%"}      
		   	],
			"ajax" : {
				"url" : "/dbmon/DBMon_Perf_Table_PackageCache?dbid="
						+ GetParam("dbid"),
				"dataSrc" : "packagecache_table",
			},
		});
		
		createSpline("/dbmon/DBMon_Perf_Chart_CacheHitRate?dbid=" + GetParam("dbid")
				+ "&period=1h", "cachehitrate", "单位：%", "alert_cachehitrate",undefined
				,undefined,undefined,undefined,undefined,"select_cachehitrate");	
		
		
		
});

$('#ioli').on('shown.bs.tab', function (e) {
	physical_io_table = $('#physical_io_table')
	.dataTable(
			{
				"paging" : false,
				"searching" : false,
				"ordering" : false,
				"processing" : true,
				"info" : false,
				"language" : {
					"lengthMenu" : "每页 _MENU_ 条记录",
					"zeroRecords" : "没有找到记录",
					"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
					"infoEmpty" : "无记录",
					"infoFiltered" : "(从 _MAX_ 条记录过滤)",
					"search" : "搜索",
					"loadingRecords":"加载数据中",
			        "processing":"数据加载中"
				},
				"ajax" : {
					"url" : "/dbmon/DBMon_Perf_Table_PhysicalIO?dbid="
							+ GetParam("dbid"),
					"dataSrc" : "physical_io_table",
				},
			});
	async_io_table = $('#async_io_table')
	.dataTable(
			{
				"paging" : false,
				"searching" : false,
				"ordering" : false,
				"processing" : true,
				"info" : false,
				"language" : {
					"lengthMenu" : "每页 _MENU_ 条记录",
					"zeroRecords" : "没有找到记录",
					"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
					"infoEmpty" : "无记录",
					"infoFiltered" : "(从 _MAX_ 条记录过滤)",
					"search" : "搜索",
					"loadingRecords":"加载数据中",
			        "processing":"数据加载中"
				},
				"ajax" : {
					"url" : "/dbmon/DBMon_Perf_Table_AsyncIO?dbid="
							+ GetParam("dbid"),
					"dataSrc" : "async_io_table",
				},
			});
	
	direct_io_table = $('#direct_io_table')
	.dataTable(
			{
				"paging" : false,
				"searching" : false,
				"ordering" : false,
				"processing" : true,
				"info" : false,
				"language" : {
					"lengthMenu" : "每页 _MENU_ 条记录",
					"zeroRecords" : "没有找到记录",
					"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
					"infoEmpty" : "无记录",
					"infoFiltered" : "(从 _MAX_ 条记录过滤)",
					"search" : "搜索",
					"loadingRecords":"加载数据中",
			        "processing":"数据加载中"
				},
				"ajax" : {
					"url" : "/dbmon/DBMon_Perf_Table_DirectIO?dbid="
							+ GetParam("dbid"),
					"dataSrc" : "direct_io_table",
				},
			});
	physical_io_tableint=setInterval(function(){physical_io_table.fnReloadAjax();}, 1000*5);
	async_io_tableint=setInterval(function(){async_io_table.fnReloadAjax();}, 1000*5);
	direct_io_tableint=setInterval(function(){direct_io_table.fnReloadAjax();}, 1000*5);
	
	
	
	var interval_io = 1000 * 5 * 1;
	/*var io_chart = createSpline3("/dbmon/DBMon_Perf_Chart_IO?dbid=" + GetParam("dbid")
			+ "&period=real&interval=5", "db2io", "单位：次", "alert_db2io" );
	ioIntervalId=setInterval(function() {
		var time_int =  new Date().getTime();
		refreshSplineEchart("/dbmon/DBMon_Perf_Chart_IO?dbid="
				+ GetParam("dbid") + "&period=real&interval=5"+"&time="+time_int , io_chart,
				"单位：次", "alert_db2io");
	}, interval_io);
	Index.initConDaterange("#select_io_time","/dbmon/DBMon_Perf_Chart_IO",io_chart,"alert_db2io",ioIntervalId,5);*/
	
	var db2io = initNomalEChart([[0,0]],"db2io","","","line","time","单位:次数","物理读写");
	refreshNomalEChart("/dbmon/DBMon_Perf_Chart_IO?dbid="+GetParam("dbid")+"&period=real&interval=5",db2io,"","alert_db2io","db2io","select_io");
	var invalId = intervalRefreshEchart("/dbmon/DBMon_Perf_Chart_IO?dbid="+GetParam("dbid")+"&period=real&interval=5",db2io,"","alert_db2io","db2io","select_io");
	Index.initConDaterange("#select_io_time","/dbmon/DBMon_Perf_Chart_IO",db2io,"alert_db2io","db2io",invalId, 5,"select_io");
	
	$("#select_io").change(function(){
		selected = getSelectedNumber("select_io");
		changeEChart(timerList["db2io"],db2io,selected);
	});
	
	var async_io_chart = initNomalEChart([[0,0]],"async_io_chart","","","line","time","单位:次数","直接读写");
	refreshNomalEChart("/dbmon/DBMon_Perf_Chart_ASYNC_IO?dbid="+GetParam("dbid")+"&period=real&interval=5",async_io_chart,"","alert_async_io_chart","async_io_chart","select_asyncio");
	var invalId = intervalRefreshEchart("/dbmon/DBMon_Perf_Chart_ASYNC_IO?dbid="+GetParam("dbid")+"&period=real&interval=5",async_io_chart,"","alert_async_io_chart","async_io_chart","select_asyncio");
	Index.initConDaterange("#select_asyncio_time","/dbmon/DBMon_Perf_Chart_ASYNC_IO",async_io_chart,"alert_async_io_chart","async_io_chart",invalId, 5,"select_asyncio");
	
	$("#select_asyncio").change(function(){
		selected = getSelectedNumber("select_asyncio");
		changeEChart(timerList["async_io_chart"],async_io_chart,selected);
	});
	
	$(window).resize();
});


$('#ioli').on('hidden.bs.tab', function (e) {
	clearInterval(physical_io_tableint);
	clearInterval(async_io_tableint);
	clearInterval(direct_io_tableint);
	clearInterval(ioIntervalId);
	clearInterval($.session.get('db2io'));
});
$('#lockli').on('shown.bs.tab', function (e) {
	lock_overview_table = $('#lock_overview_table')
	.dataTable(
			{
				"paging" : false,
				"searching" : false,
				"ordering" : false,
				"processing" : true,
				"info" : false,
				"language" : {
					"lengthMenu" : "每页 _MENU_ 条记录",
					"zeroRecords" : "没有找到记录",
					"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
					"infoEmpty" : "无记录",
					"infoFiltered" : "(从 _MAX_ 条记录过滤)",
					"search" : "搜索"
				},
				"ajax" : {
					"url" : "/dbmon/DBMon_Perf_Table_LockOverview?dbid="
							+ GetParam("dbid"),
					"dataSrc" : "lock_overview_table",
				},
			});
	
	var interval_lock = 1000 * 60 * 1;
	
	var db2lock = createSpline("/dbmon/DBMon_Perf_Chart_Lock?dbid=" + GetParam("dbid")
			+ "&period=1h", "db2lock", "单位：个数", "alert_db2lock",undefined,undefined,undefined,undefined,undefined,"select_db2lock");
	/*$("#select_db2lock").change(function(){
		selected = getSelectedNumber("select_db2lock");
		changeEChart(timerList["db2lock"],db2lock,selected);
	});*/
	
	/*setInterval(function() {
		var time_int =  new Date().getTime();
		refreshSpline("/dbmon/DBMon_Perf_Chart_Lock?dbid="
				+ GetParam("dbid") + "&period=1h"+"&time="+time_int, "db2lock",
				"单位：个数", "alert_db2lock");
	}, interval_lock);*/
	$(window).resize();
});

$('#lockwaitsli').on('shown.bs.tab', function (e) {
	lockdetail_table = $('#lockdetail_table').dataTable({
		"scrollCollapse" : true,
		"info" : false,
		"paging" : false,
		"processing" : true,
		"language" : {
			"lengthMenu" : "每页 _MENU_ 条记录",
			"zeroRecords" : "没有找到记录",
			"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
			"infoEmpty" : "无记录",
			"infoFiltered" : "(从 _MAX_ 条记录过滤)",
			"search" : "搜索",
			"loadingRecords":"加载数据中",
	        "processing":"数据加载中"
		},
		"ajax" : {
			"url" : "/dbmon/DBMon_Perf_Table_LockDetail?dbid="
					+ GetParam("dbid"),
			"dataSrc" : "lockdetail_table",
		},
		
		"createdRow": function (row, data, index) {
			$('td',row).eq(0).html("<a href=\"#\" class=\"moredetail\"  data-toggle=\"modal\" data-target=\"#myModal\" "+
	               "data-target=\"#myModal\" data-apphandle=\""+data[0]+"\" data-member=\""+data[1]+"\">" + data[0]+"</a>");
		}
	});
	
	lockTablewait=setInterval(function(){lockdetail_table.fnReloadAjax();}, 1000*5);
	
	lockwaitsdetail_table = $('#lockwaitsdetail_table')
	.dataTable(
			{
				"scrollCollapse" : true,
				"info" : false,
				"ordering": false,
				"paging" : false,
				"processing" : true,
				"language" : {
					"lengthMenu" : "每页 _MENU_ 条记录",
					"zeroRecords" : "没有找到记录",
					"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
					"infoEmpty" : "无记录",
					"infoFiltered" : "(从 _MAX_ 条记录过滤)",
					"search" : "搜索",
					"loadingRecords":"加载数据中",
			        "processing":"数据加载中"
				},
				"ajax" : {
					"url" : "/dbmon/DBMon_Perf_Table_LockwaitsDetail?dbid="
							+ GetParam("dbid"),
					"dataSrc" : "lockwaitsdetail_table",
				},
				
				"createdRow": function (row, data, index) {
					$('td', row).eq(0).css("cursor","pointer");
					$('td', row).eq(0).html("<p class=\"fasize\" style=\"height: 10px;\" ><i class=\"fa fa-plus-square-o\"  ></i></p>");	
					$('td', row).eq(1).html(data[0]);
					$('td', row).eq(2).html(data[1]);
					$('td', row).eq(3).html(data[2]);
	 				$('td', row).eq(4).html(data[3]);
	 				$('td', row).eq(5).html(data[4]);
	 				$('td', row).eq(6).html(data[5]);								
					$('td', row).eq(7).html(data[6]);
	 				$('td', row).eq(8).html(data[7]);
	 				$('td',row).eq(8).html("<a href=\"#\" class=\"moredetail\"  data-toggle=\"modal\" data-target=\"#myModal\" "+
	 		               "data-target=\"#myModal\" data-apphandle=\""+data[7]+"\" data-member=\""+data[8]+"\">" + data[7]+"</a>");
	 				$('td', row).eq(9).html(data[8]);
	 				$('td', row).eq(10).html(data[9]);
	 				$('td',row).eq(10).html("<a href=\"#\" class=\"moredetail\"  data-toggle=\"modal\" data-target=\"#myModal\" "+
	 		               "data-target=\"#myModal\" data-apphandle=\""+data[9]+"\" data-member=\""+data[10]+"\">" + data[9]+"</a>");
	 				$('td', row).eq(11).html("<p title=\""+data[11]+"\">"+data[10] +"</p>");	
				}
			});
	
	$('#lockwaitsdetail_table').on('click', ' tbody tr td .fasize', function () {
		 var nTr = $(this).parent().parent()[0];
		 var text=$(this).parent().parent().children().eq(11).find('p').attr('title');
         if (lockwaitsdetail_table.fnIsOpen(nTr)) {
            $(this).children().find("i").addClass("fa-plus-square-o").removeClass("fa-minus-square-o ");
            lockwaitsdetail_table.fnClose(nTr);
         } else {
             $(this).children().find("i").addClass("fa-minus-square-o").removeClass("fa-plus-square-o");
             lockwaitsdetail_table.fnOpen(nTr, text, 'details');
         }
   });
//	lockTablede=setInterval(function(){lockwaitsdetail_table.fnReloadAjax();}, 1000*5);
	$(window).resize();
});
$('#lockwaitsli').on('hidden.bs.tab', function (e) {
	clearInterval(lockTablewait);
	clearInterval(lockTablede);
});





$('#deadlockNtimeoutli').on('shown.bs.tab', function (e) {
	deadlockTable=	$("#deadlockTable").dataTable({
		"paging" : false,
		"searching" : false,
		"ordering" : false,
		"processing" : true,
		"info" : false,
		"language" : {
			"lengthMenu" : "每页 _MENU_ 条记录",
			"zeroRecords" : "无死锁信息",
			"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
			"infoEmpty" : "无死锁信息",
			"infoFiltered" : "(从 _MAX_ 条记录过滤)",
			"search" : "搜索"
		},
		"ajax" : {
			"url" : "/dbmon/DBMon_Perf_DeadLock?dbid="
					+ GetParam("dbid"),
			"dataSrc" : "deadlockTable",
		},
		 "aoColumns": [   
                    {"sWidth": "5%"},
       	            {"sWidth": "10%"},   
       	            {"sWidth": "25%"},   
       	            {"sWidth": "10%"}, 
       	            {"sWidth": "10%"}, 
    	            {"sWidth": "10%"}, 
    	            {"sWidth": "10%"},
    	            {"sWidth": "10%"},
       	         
       	    ],
		"createdRow": function (row, data, index) {
			$('td', row).eq(0).html("<a href='#' class='moredetail' data-toggle='modal' data-target='#myModals' data-apphandle='15511' data-member='0'>"+data[0]+"</a><pre style='display:none'>"+data[8]+"</pre>");
			if(data[1]=="DEADLOCK"){
				$('td',row).eq(1).html("<span class=\"label label-danger\">死锁</span>");
			}
			else{
				$('td',row).eq(1).html("<span class=\"label label-danger\">锁超时</span>");
			}
//			"<a href=\"#\" class=\"moredetail\"  data-toggle=\"modal\" data-target=\"#myModal\" "+ "data-target=\"#myModal\" data-apphandle=\""+data[9]+"\" data-member=\""+data[11]+"\">" + data[7]+"</a>"
			$('td',row).eq(7).html(data[7]);
			
		
		}
	});
	
	
	lockTimeoutTable=	$("#lockTimeoutTable").dataTable({
		"paging" : false,
		"searching" : false,
		"ordering" : false,
		"processing" : true,
		"info" : false,
		"language" : {
			"lengthMenu" : "每页 _MENU_ 条记录",
			"zeroRecords" : "无锁超时",
			"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
			"infoEmpty" : "无锁超时",
			"infoFiltered" : "(从 _MAX_ 条记录过滤)",
			"search" : "搜索"
		},
		"ajax" : {
			"url" : "/dbmon/DBMon_Perf_LOCKTIME?dbid="
					+ GetParam("dbid"),
			"dataSrc" : "lockTimeoutTable",
		},
		 "aoColumns": [   
                    {"sWidth": "5%"},
       	            {"sWidth": "10%"},   
       	            {"sWidth": "25%"},   
       	            {"sWidth": "10%"}, 
       	            {"sWidth": "10%"}, 
    	            {"sWidth": "10%"}, 
    	            {"sWidth": "10%"},
       	         
       	    ],
		"createdRow": function (row, data, index) {
			$('td', row).eq(0).html("<a href='#' class='moredetail' data-toggle='modal' data-target='#myModals' data-apphandle='15511' data-member='0'>"+data[0]+"</a><pre style='display:none'>"+data[7]+"</pre>");
			if(data[1]=="DEADLOCK"){
				$('td',row).eq(1).html("<span class=\"label label-danger\">死锁</span>");
			}
			else{
				$('td',row).eq(1).html("<span class=\"label label-danger\">锁超时</span>");
			}
//			"<a href=\"#\" class=\"moredetail\"  data-toggle=\"modal\" data-target=\"#myModal\" "+ "data-target=\"#myModal\" data-apphandle=\""+data[9]+"\" data-member=\""+data[11]+"\">" + data[7]+"</a>"
			$('td',row).eq(6).html(data[6]);
			
		
		}
	});
	
	
	
	
	var  switchdataid=new Array();
	var  activeArr=new Array();
	var count=0;
	var countL=0;
	var stat=1;
	var  del=false;
	activeEv=$("#activeEv").dataTable({
		"paging" : false,
		"searching" : false,
		"ordering" : false,
		"processing" : true,
		"info" : false,
		"language" : {
			"lengthMenu" : "每页 _MENU_ 条记录",
			"zeroRecords" : "没有找到记录",
			"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
			"infoEmpty" : "无记录",
			"infoFiltered" : "(从 _MAX_ 条记录过滤)",
			"search" : "搜索"
		},
		"ajax" : {
			"url" : "/dbmon/DBMon_Perf_Table_EVENTSACTIVE?dbid="
					+ GetParam("dbid"),
			"dataSrc" : "activeEv",
		},
		 "aoColumns": [   
                    {"sWidth": "16%"},
       	            {"sWidth": "20%"},   
       	         {"sWidth": "30%"}, 
       	      {"sWidth": "10%"},  
       	 ],
		"createdRow": function (row, data, index) {
			
			var  data1=$.trim(data[0]);
			switchdataid[count]=data1;
			activeArr[count]=data[2];
			stat = data[2];
			$('td',row).eq(0).html(data1);
			$('td',row).eq(2).css("padding-top: 0px; padding-bottom: 0px;");
			$('td',row).eq(2).html("<div class='bootstrap-switch bootstrap-switch-mini'><input id='switch"+data1+"' type='checkbox' name='monitor'/></div>");
			$('td',row).eq(3).html('<button  id="del'+data[0]+'" title='+data[0]+' class="delete btn2 btn-sm2 " >删除</button> ');
			if(data[1]=="LOCKING"){
				countL++;
			}
			count++;
			
		},
		"drawCallback": function( settings ) {
			
			for(var i=0;i<switchdataid.length;i++){
				
				if(activeArr[i]==1){
					$("#switch"+switchdataid[i]).bootstrapSwitch('state',false);
				}else{
					$("#switch"+switchdataid[i]).bootstrapSwitch('state',false);
				}
				
			}
			$(".delete").click(function(){
				var name=  this.id.substring(3);
				if(confirm("是否确认删除?")){
				
				var nRow= $(this).parent().parent()[0];
				  $.ajax({
					  url:"/dbmon/DBMon_Perf_Table_EVENTS_DELETE",
					  async: false,
					  data:{dbid:GetParam("dbid"),name:name},
					  success:function(){
						  countL--;
					  }
				  });
				}
			
				$("#reactiveEv").click();
			});
			$(".bootstrap-switch-container >span").click(function() {
				var checkbox=$(this).parent().find("input");
				var id=$(this).parent().find("input")[0].id;
				var d=$("#"+id).bootstrapSwitch("state");
				var   str="";
				
				if(d){
					stat=1;
					str="是否开启监控器?";
				}else{
					stat=0;
					str="关闭监控器将无法分析死锁和锁超时事件，是否确认关闭?";
				}
				
				
				
				if (confirm(str)) {
					$.ajax({
						url:"/dbmon/DBMon_Perf_DeadLock_EventState_Change",
						data:{dbid:GetParam("dbid"),name:id.substring(6),state:stat}
					});	
	            }else{
	            	$("#"+id).bootstrapSwitch("state",!d);
	            }
				
			});
			
			if(countL>=1 ){
				$("#new_mon").attr("disabled",true);
			}else{
				$("#new_mon").attr("disabled",false);
			}
			del=true;
			if(stat == 1){
				$(".bootstrap-switch-container").attr("style", "width: 99px; margin-left: 0px;");
			}else{
				$(".bootstrap-switch-container").attr("style", "width: 99px; margin-left: -33px;");
			}
	    }
	});
	 
	 Index.initTableDaterange("#deadlocktime","/dbmon/DBMon_Perf_DeadLock",deadlockTable,"/dbmon/DBMon_Perf_LOCKTIME",lockTimeoutTable);
	 
	 $.getJSON("/dbmon/UserCheck", function(data){
			//alert(data.result);
			if(data.result == "false") {
		        	window.location.href = "./login.html";
		        	window.event.returnValue = false;

			} else {
				//alert(data.result);
				current_user = data.result;
				if (data.autho != "ADMIN") {
					 $("#new_mon").attr("disabled",true);
				}	
					
			}
		});	
	
});

$("#deadlockNtimeoutli").on('hidden.bs.tab', function (e) {
});
//CREATE EVENT MONITOR EVMON_LOCKING FOR LOCKING WRITE TO UNFORMATTED EVENT TABLE
$("#new_mon").click(function(){
     if(confirm("LOCKING类型的锁事件监控器，开启锁事件监控器会带来一部分系统开销，是否确认创建LOCKING类型锁事件监控器?")){
    	 if(confirm("开启死锁和锁超时事件监控器需要将系统默认监控器类型DETAILDEADLOCKS的关闭并删除，DB2V97以后不推荐使用的事件监视器的事件类型DETAILDEADLOCKS，然后创建一个监控器类型为LOCKING的监控器。是否确定?")){
	    	$.ajax({  
	   	         type : "post",  
	   	         url : "/dbmon/DBMon_Perf_Table_EVENTS_UPDATA",
	   	         data:{dbid:GetParam("dbid")},
	   	         async : false,
	   	         success:function(data){
	   	        	 dbidvar=data;
	   	         }
	   	    });
	    	$("#reactiveEv").click();
    	 }
     }
});


$('#sortli').on('shown.bs.tab', function (e) {
	sortheap_table = $('#sortheap_table')
	.dataTable(
			{
				"paging" : false,
				"searching" : false,
				"ordering" : false,
				"processing" : true,
				"info" : false,
				"language" : {
					"lengthMenu" : "每页 _MENU_ 条记录",
					"zeroRecords" : "没有找到记录",
					"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
					"infoEmpty" : "无记录",
					"infoFiltered" : "(从 _MAX_ 条记录过滤)",
					"search" : "搜索"
				},
				"ajax" : {
					"url" : "/dbmon/DBMon_Perf_Table_SortHeap?dbid="
							+ GetParam("dbid"),
					"dataSrc" : "sortheap_table",
				},
			});
	var interval_sort = 1000 * 60 * 1;
	var db2sort = createSpline("/dbmon/DBMon_Perf_Chart_Sort?dbid=" + GetParam("dbid")
			+ "&period=1h", "db2sort", "单位：次数", "alert_db2sort",undefined,undefined
			,undefined,undefined,undefined,"select_sort");
	/*$("#select_sort").change(function(){
		selected = getSelectedNumber("select_sort");
		changeEChart(timerList["db2sort"],db2sort,selected);
	});*/
	/*setInterval(function() {
		var time_int =  new Date().getTime();
		refreshSpline("/dbmon/DBMon_Perf_Chart_Sort?dbid="
				+ GetParam("dbid") + "&period=1h"+"&time="+ time_int, "db2sort",
				"单位：次数", "alert_db2sort");
	}, interval_sort);*/

	$(window).resize();

});




$("#redeadlock").click(function(){
	$("#redeadlock > i").addClass("fa-spin"); 
	setTimeout(function(){
		$("#redeadlock > i").removeClass("fa-spin"); 
	},1400);
	deadlockTable.fnReloadAjax("/dbmon/DBMon_Perf_DeadLock?dbid="+ GetParam("dbid"));
	lockTimeoutTable.fnReloadAjax("/dbmon/DBMon_Perf_LOCKTIME?dbid="+ GetParam("dbid"));
});

$("#reactiveEv").click(function(){
	$("#reactiveEv > i").addClass("fa-spin"); 
	setTimeout(function(){
		$("#reactiveEv > i").removeClass("fa-spin"); 
	},1400);
	activeEv.fnReloadAjax("/dbmon/DBMon_Perf_Table_EVENTSACTIVE?dbid="+ GetParam("dbid"));
});



$("#btn_relock").click(function(){
	$("#btn_relock > i").addClass("fa-spin"); 
	setTimeout(function(){
		$("#btn_relock > i").removeClass("fa-spin"); 
	},2000);
	lockdetail_table.fnReloadAjax("/dbmon/DBMon_Perf_Table_LockDetail?dbid="+ GetParam("dbid"));
});


$("#btn_refreshdetail").click(function(){
	$("#btn_refreshdetail > i").addClass("fa-spin"); 
	setTimeout(function(){
		$("#btn_refreshdetail > i").removeClass("fa-spin"); 
	},2000);
	lockwaitsdetail_table.fnReloadAjax("/dbmon/DBMon_Perf_Table_LockwaitsDetail?dbid="+ GetParam("dbid"));
});


$('#myModal').on('show.bs.modal', function (event) {
	var target = $(event.relatedTarget);
	var app=target.data('apphandle');
	var member=target.data('member');
	osinfo_table.fnReloadAjax("/dbmon/DBMon_Conn_Detail?dbid="+ GetParam("dbid")+"&AppHandle="+app+"&member="+member);
});
$('#myModals').on('show.bs.modal', function (event) {
	var target = $(event.relatedTarget);
	var html=target.parent().find("pre").html();
	$("#deadlock").html("<pre>"+html+"</pre>");
});



//showSplineChart_f("","historyModal");



