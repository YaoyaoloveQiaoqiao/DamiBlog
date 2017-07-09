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
	        "infoEmpty": "无记录"
	    },
	    "aoColumns": [               
	            {"sWidth": "70%"},
	            {"sWidth": "30%"},
	    ],
 		"ajax": {
			"url": "/dbmon/Host_State_info?dbid="+dbid,
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
	        "search": "搜索"
	    },
	    "aoColumns": [               
	            {"sWidth": "10%"},   
	            {"sWidth": "10%"},   
	            {"sWidth": "50%"},   
	            {"sWidth": "30%"}
	    ],
		"ajax": {
		"url": "/dbmon/DBMon_Reg_Variables?dbid="+dbid,
		"dataSrc": "variablesTable",
		},			
	} );


var hoststateTable;
hoststateTable = $('#hadrstateTable').dataTable( {
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
    },
    "aoColumns": [               
                  {"sWidth": "25%"},
                  {"sWidth": "8%"},
                  {"sWidth": "25%"}, 
                  {"sWidth": "8%"},  
                  {"sWidth": "25%"},  
                  {"sWidth": "8%"}
                          
    ],
		"ajax": {
		"url": "/dbmon/DBMon_Instance_HADR_State?dbid="+dbid,
		"dataSrc": "hadrstateTable",
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
    },
    "aoColumns": [               
            {"sWidth": "20%"},
            {"sWidth": "40%"},
            {"sWidth": "40%"}
    ],
	"ajax": {
		"url": "/dbmon/DBMon_DB_DBMCfg?dbid="+dbid,
		"dataSrc": "dbmcfgTable",
		},			
	} );




$("#pro").click(function(){
	$('#pro').tab('show');
	variablesTable._fnReDraw();
	dbmcfgTable._fnReDraw();
});

}