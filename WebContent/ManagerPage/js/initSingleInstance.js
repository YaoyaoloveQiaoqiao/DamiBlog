function initTable_Single(dbid){
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
	            {"sWidth": "20%"},
	            {"sWidth": "20%"},
	            {"sWidth": "20%"},
	            {"sWidth": "20%"}
	    ],
 		"ajax": {
			"url": "/dbmon/DBMon_InstanceSingle_state?dbid="+dbid,
			"dataSrc": "stateTable",
			},		
		"createdRow": function (row, data, index) {
				if(data[3] == "ACTIVE") { 
				$('td',row).eq(3).html("<span class=\"label label-success\">"+data[3]+"</span>"); 
				} 
		}				
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
	            {"sWidth": "20%"},   
	            {"sWidth": "30%"},   
	            {"sWidth": "20%"},
	            {"sWidth": "30%"}
	    ],
		"ajax": {
		"url": "/dbmon/DBMon_Reg_Variables?dbid="+dbid,
		"dataSrc": "variablesTable",
		"createdRow":function(row, data, index){
			$('td', row).eq(0).html("<a href=\"#\" class=\"moredetail\"  data-toggle=\"modal\""+
		               "data-target=\"#Modals\" data-property=\""+data[1]+"\" data-member=\""+data[0]+"\" data-dbid=\""+data[1]+"\">" + data[0]+"</a>");
			
		}
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
		"url": "/dbmon/DBMon_DB_DBMCfg?dbid="+dbid,
		"dataSrc": "dbmcfgTable",
		},
		
		"createdRow":function(row, data, index){
			$('td', row).eq(0).html("<a href=\"#\" class=\"moredetail\"  data-toggle=\"modal\""+
		               "data-target=\"#Modals\"  data-name=\""+data[0]+"\">" + data[0]+"</a>");
			
		}
	} );

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
	
$("#pro").click(function(){
	$('#pro').tab('show');
	variablesTable._fnReDraw();
	dbmcfgTable._fnReDraw();
});


$('#Modals').on('shown.bs.modal', function (event) {
	var target = $(event.relatedTarget);
	var name=target.data('name');
	propertyHis.fnReloadAjax("/dbmon/DBMon_DB_DBMCfg_HISTORY?dbid="+ GetParam("dbid")+"&propername="+name);
});
}



