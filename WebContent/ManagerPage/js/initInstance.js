function initTable(dbid){
var stateTable;
	stateTable = $('#stateTable').dataTable( {
		"paging": false,
		"ordering": true,
		"searching": false,
		"info": false,
		"processing": true,																						
		"bAutoWidth": false,  
		"language": {
	        "lengthMenu": "每页 _MENU_ 条记录",
	        "zeroRecords": "没有找到记录",
	        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
	        "infoEmpty": "无记录",
	        "loadingRecords":"加载数据中",
	        "processing":"数据加载中"
	    },
	    "aoColumns": [               
	            {"sWidth": "5%"},
	            {"sWidth": "10%"},
	            {"sWidth": "10%"},
	            {"sWidth": "10%"},
	            {"sWidth": "10%"},
	            {"sWidth": "10%"},
	            {"sWidth": "15%"},   
	            {"sWidth": "10%"},   
	            {"sWidth": "10%"}
	                          
	    ],
 		"ajax": {
			"url": "/dbmon/DBMon_Instance_state?dbid="+dbid,
			"dataSrc": "stateTable",
			},			
		} );

var variablesTable;
	variablesTable = $('#variablesTable').dataTable( {
		"scrollY": "300px",	
		"scrollCollapse": true,
		"paging": false,
		"ordering": true,
		"searching": true,
		"info": false,
		"processing": true,																						
		"bAutoWidth": false,  
		"language": {
	        "lengthMenu": "每页 _MENU_ 条记录",
	        "zeroRecords": "没有找到记录",
	        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
	        "infoEmpty": "无记录",
	        "infoFiltered": "(从 _MAX_ 条记录过滤)",
	        "search": "搜索",
	        "loadingRecords":"加载数据中",
		        "processing":"数据加载中"
	    },
	    "aoColumns": [               
	            {"sWidth": "10%"},   
	            {"sWidth": "40%"},   
	            {"sWidth": "20%"},
	            {"sWidth": "30%"}
	    ],
		"ajax": {
		"url": "/dbmon/DBMon_Reg_Variables?dbid="+dbid,
		"dataSrc": "variablesTable",
		},			
	} );


var hoststateTable;
hoststateTable = $('#hoststateTable').dataTable( {
	"paging": false,
	"ordering": true,
	"searching": false,
	"info": false,
	"processing": true,																						
	"bAutoWidth": true,  
	"language": {
		 "loadingRecords":"加载数据中",
		        "processing":"数据加载中",
        "lengthMenu": "每页 _MENU_ 条记录",
        "zeroRecords": "没有找到记录",
        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
        "infoEmpty": "无记录",
        "loadingRecords":"加载数据中",
        "processing":"数据加载中"
    },
    "aoColumns": [               
            {"sWidth": "10%"},
            {"sWidth": "30%"},
            {"sWidth": "30%"},   
            {"sWidth": "30%"}
                          
    ],
		"ajax": {
		"url": "/dbmon/DBMon_Host_state?dbid="+dbid,
		"dataSrc": "hoststateTable",
		},			
	} );



var dbmcfgTable;
	dbmcfgTable = $('#dbmcfgTable').dataTable( {
	"scrollY": "300px",	
	"scrollCollapse": true,
	"paging": false,
	"ordering": true,
	"searching": true,
	"info": false,
	"processing": true,																						
	"bAutoWidth": false,  
	"language": {
        "lengthMenu": "每页 _MENU_ 条记录",
        "zeroRecords": "没有找到记录",
        "loadingRecords":"加载数据中",
        "processing":"加载数据中",
        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
        "infoEmpty": "无记录",
        "search": "搜索"
    },
    "aoColumns": [               
            {"sWidth": "20%"},
            {"sWidth": "20%"},
            {"sWidth": "20%"},
            {"sWidth": "40%"}
    ],
	"ajax": {
		"url": "/dbmon/DBMon_DB_DBMCfg?dbid="+dbid,
		"dataSrc": "dbmcfgTable",
		},
	"createdRow": function (row, data, index) {
			$('td', row).eq(0).html("<a href=\"#\" class=\"moredetail\"  data-toggle=\"modal\""+
	               "data-target=\"#Modals\"  data-name=\""+data[0]+"\">" + data[0]+"</a>");
			$('td', row).eq(1).attr(data[1]);
			$('td', row).eq(2).attr(data[2]);
		}
	} );





var pageTable;
	pageTable = $('#pageTable').dataTable( {
		
	"scrollCollapse": false,
	"paging": false,
	"ordering": true,
	"searching": true,
	"order":[[2, 'desc']],
	"info": false,
	"processing": true,																						
	"language": {
		"loadingRecords":"加载数据中",
		        "processing":"数据加载中",
        "lengthMenu": "每页 _MENU_ 条记录",
        "zeroRecords": "没有找到记录",
        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
        "infoEmpty": "无记录",
        "search": "搜索"
    },
    "aoColumns": [               
            {"sWidth": "10%"},
            {"sWidth": "20%"},
            {"sWidth": "20%"},  
            {"sWidth": "20%"}, 
            {"sWidth": "30%"}
    ],
	"ajax": {
		"url": "/dbmon/DBMon_Page_Info?dbid="+dbid,
		"dataSrc": "pageTable",
		},			
	} );



var cfinfoTable;
	cfinfoTable = $('#cfinfoTable').dataTable( {
	"scrollCollapse": false,
	"paging": false,
	"ordering": false,
	"searching": false,
	"info": false,
	"processing": true,
	"bAutoWidth": true,  
	"language": {
		"loadingRecords":"加载数据中",
		"processing":"数据加载中",
        "lengthMenu": "每页 _MENU_ 条记录",
        "zeroRecords": "没有找到记录",
        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
        "infoEmpty": "无记录",
    },
    "aoColumns": [
            {"sWidth": "22%"},
            {"sWidth": "11%"},
            {"sWidth": "22%"}, 
            {"sWidth": "11%"},  
            {"sWidth": "22%"},  
            {"sWidth": "11%"}
    ],
	"ajax": {
		"url": "/dbmon/DBMon_CF_Info?dbid="+dbid,
		"dataSrc": "cfinfoTable",
		},			
	} );


var wlmTable;
	wlmTable = $('#wlmTable').dataTable({
	"scrollCollapse": false,
	"paging": false,
	"ordering": true,
	"searching": false,
	"info": false,
	"processing": true,																						
	"language":{
        "lengthMenu": "每页 _MENU_ 条记录",
        "zeroRecords": "没有找到记录",
        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
        "infoEmpty": "无记录",
        "loadingRecords":"加载数据中",
        "processing":"加载数据中"
    },
    "aoColumns": [
            {"sWidth": "10%"},
            {"sWidth": "30%"},
            {"sWidth": "30%"},   
            {"sWidth": "30%"}
    ],
	"ajax": {
		"url": "/dbmon/DBMon_WLM_Info?dbid="+dbid,
		"dataSrc": "wlmTable",
		},			
	} );

$("#pro").click(function(){
	$('#pro').tab('show');
	variablesTable._fnReDraw();
	dbmcfgTable._fnReDraw();
});
var  propertyHis;
propertyHis	 = $('#propertyHis').dataTable( {
	"scrollY": "600px",	
	"scrollCollapse": true,
	"paging": false,
	"ordering": true,
	"searching": true,
	"info": false,
	"processing": true,																						
	"bAutoWidth": false,  
	"language": {
        "lengthMenu": "每页 _MENU_ 条记录",
        "zeroRecords": "没有找到记录",
        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
        "infoEmpty": "无记录",
        "search": "搜索",
        "loadingRecords":"加载数据中",
        "processing":"数据加载中"
    },
    "aoColumns": [               
            {"sWidth": "20%"},
            {"sWidth": "20%"},
            {"sWidth": "20%"},
            {"sWidth": "40%"}
    ],
	"ajax": {
		"url": "",
		"dataSrc": "propertyHis",
		}
	} );
	


$('#Modals').on('shown.bs.modal', function (event) {
	var target = $(event.relatedTarget);
	var name=target.data('name');
	propertyHis.fnReloadAjax("/dbmon/DBMon_DB_DBMCfg_HISTORY?dbid="+ GetParam("dbid")+"&propername="+name);
});
}