var tabschema;
var table;



	

var dbsize_table;

$(document).ready(function() {
	dbsize_table = $('#dbsize_table').dataTable( {
		"paging": false,
		"searching": false,
		"ordering": false,
		"processing": true,
		"info": false,
		"language": {
	        "lengthMenu": "每页 _MENU_ 条记录",
	        "zeroRecords": "没有找到记录",
	        "loadingRecords":"加载数据中",
	        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
	        "infoEmpty": "无记录",
	        "infoFiltered": "(从 _MAX_ 条记录过滤)",
	        "search": "搜索"
	    },			
		"ajax": {
			"url": "/dbmon/DBMon_Stor_Table_DBSize?dbid=" + GetParam("dbid"),
			"dataSrc": "dbsize_table",
		},
		
	});
});




Index.initDbsizeTime("#dbsizetime","/dbmon/DBMon_Stor_Chart_DBSize?", "dbsize", "alert_dbsize");
$(document).ready(function() {
	var endtime = moment().format("YYYYMMDDHHmmss");
	var starttime = moment().subtract('month',1).format("YYYYMMDDHHmmss");
	refreshDbsizeEChart("/dbmon/DBMon_Stor_Chart_DBSize?dbid="+dbid+"&period=-1"+ "&starttime=" + starttime + "&endtime=" + endtime,
			 "dbsize", "alert_dbsize");
	$(window).resize();

});




$("#database").click(function(){
	rotateDIV();
	
	
});
var x,y,n=0,ny=0,rotINT,rotYINT;
function rotateDIV()
{
x=document.getElementById("rotate1")
clearInterval(rotINT)
rotINT=setInterval("startRotate()",1)
}

function startRotate()
{
n=n+1
x.style.transform="rotate(" + n + "deg)"
x.style.webkitTransform="rotate(" + n + "deg)"
x.style.OTransform="rotate(" + n + "deg)"
x.style.MozTransform="rotate(" + n + "deg)"
if (n==180 || n==360)
	{
	clearInterval(rotINT)
	if (n==360){n=0}
	}
}

	var dbspace = {
			title: {},
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
	 	    	/* formatter:function(params){
		        	var res;
		        	for(var i=0;i<params.length;i++){
		        		if(params[i].data!=0){
		        			if(params[i].data>=1000000){
		        				res = Math.round(params[i].data/(1024*1024));
		            			return res+"GB";
		            		}else if(params[i].data>1000&&params[i].data<1000000){
		            			res = Math.round(params[i].data/1024);
		            			return res+"MB";
		            		}else if(params[i].data!=0){
		            			return params[i].data+"KB";
		            		}
		        		}else{
	            			return params[i].data;
	            		}
		        	}
		        } */
			},
			legend: {
				data: [],
				itemGap: 5
					// top: 'top'
			},
			grid: {
				// top: '3%',
				left: '3%',
				right: '4%',
				bottom: '20%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: [],
				axisLabel: {
					interval: 0, //全部显示
					rotate: 20
				}
			}],
			yAxis: [{
				type: 'value',
				position: 'left',
				axisLabel: {
					formatter:function(value){
	            		if(value>=1000000){
	            			value = value/1000000;
	            			return value+"GB";
	            		}else if(value>1000&&value<1000000){
	            			value = value/1000;
	            			return value+"MB";
	            		}else if(value!=0){
	            			return value+"KB";
	            		}
	            		
	            	}
				}

			}, {
				type: 'value',
				position: 'right',
				axisLabel: {
					formatter: '{value} %'
				}

			}],
			color: ['#F6FC29', '#E63E1E', '#3236EA'],
			series: []
		};
    
var indexs_table;
var indextableoption = {
		"paging" : false,
		"searching" : false,
		"ordering" : true,
		"processing" : true,
		"info" : false,
		"order" : [[ 1, "asc" ]],
		"language" : {
			"lengthMenu" : "每页 _MENU_ 条记录",
			"zeroRecords" : "没有找到记录",
			"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
			"infoEmpty" : "无记录",
			"infoFiltered" : "(从 _MAX_ 条记录过滤)",
			"search" : "搜索"
		},
		"ajax": {
			"url": "",
			"dataSrc": "indexs",
		},
		"createdRow" : function(row, data, index){
			$('td', row).parent().css("cursor","pointer");
			$('td', row).parent().attr("class","indexstr");
			$('td', row).parent().attr("data-indschema",data[0]);
			$('td', row).parent().attr("data-tabschema",data[7]);
			$('td', row).parent().attr("data-index",data[1]);
			$('td', row).parent().attr("data-table",data[6]);
			if(data[4]=='null'){
				$('td', row).eq(4).html("");
			}
		}
	};
	
	
	
var reorginfo;
var reorginfooption = {
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
		"ajax": {
			"url": "",
			"dataSrc": "reorginfo",
	 },
		"createdRow" : function(row, data, index) {
//			if(data[1]=="null"){
//				$('td', row).eq(1).html("");	
//			}
			var num = data[1].replace("%","");
			if(index==0){
				if(num!=-1 && num>=5 ){
					$('td',row).eq(1).css('backgroundColor', '#ff3333');	
				}
			}else if(index==1){
				if(num!=-1 && num<=70 ){
					$('td',row).eq(1).css('backgroundColor', '#ff3333');	
				}
			}else if(index==2){
				if(num!=0 &&num!=-1 && num<=80 ){
					$('td',row).eq(1).css('backgroundColor', '#ff3333');	
				}
			}
		}
	};


var tablestruct;
var tablestructoption = {
		"paging" : false,
		"searching" : true,
		"ordering" : true,
		"processing" : true,
		"info" : false,
		"order" : [ [ 0, "asc" ] ],
		"language" : {
			"lengthMenu" : "每页 _MENU_ 条记录",
			"zeroRecords" : "没有找到记录",
			"info" : "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
			"infoEmpty" : "无记录",
			"infoFiltered" : "(从 _MAX_ 条记录过滤)",
			"search" : "搜索"
		},
		 "ajax": {
				"url": "",
				"dataSrc": "tablestruture",
	     },
		"createdRow" : function(row, data, index) {
			if(data[1]=="null"){
				$('td', row).eq(1).html("");
			}
		}
	};


var spacemana;
spacemana=$('#spacemana').dataTable({
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
	
	"createdRow" : function(row, data, index) {
		if(data[1]=="null"){
			$('td', row).eq(1).html("");	
		}
	}
});
var  stateData;
stateData=$('#stateData').dataTable({
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

	"createdRow" : function(row, data, index) {
		if(data[1]=="null"){
			$('td', row).eq(1).html("");	
		}
	}
});
var  compress;
compress=$('#compress').dataTable({
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
	
	"createdRow" : function(row, data, index) {
		if(data[1]=="null"){
			$('td', row).eq(1).html("");	
		}
	}
});


var index_table;
index_table=$('#index_table').dataTable({
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
	"aoColumns": [   
	                 {"sWidth": "30%"},
	   	         	 {"sWidth": "70%"}
	    	    ],
	"createdRow" : function(row, data, index) {
		if(data[1]=="null"){
			$('td', row).eq(1).html("");	
		}
	}
});


var index_Statistics;
index_Statistics=$('#index_Statistics').dataTable({
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
	"aoColumns": [   
	                 {"sWidth": "35%"},
	   	         	 {"sWidth": "15%"},
	   	      	     {"sWidth": "35%"},
	   	 		     {"sWidth": "15%"}
	   	 
	],
	"createdRow" : function(row, data, index) {
		if(data[1]=="null"){
			$('td', row).eq(1).html("");	
		}
	}
});

var indexreorginfo;
var indexreorginfooption = {
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
		"aoColumns": [   
	                 {"sWidth": "50%"},
	   	         	 {"sWidth": "50%"},
				],
		"ajax": {
			"url": "",
			"dataSrc": "indexreorginfo",
	 },
		"createdRow" : function(row, data, index) {
//			if(data[1]=="null"){
//				$('td', row).eq(1).html("");	
//			}
			var num = data[1].replace("%","");
			if(index==0){
				if(num!=-1 && num<=80 ){
					$('td',row).eq(1).css('backgroundColor', '#ff3333');	
				}
			}else if(index==1){
				if(num!=-1 && num<=50 ){
					$('td',row).eq(1).css('backgroundColor', '#ff3333');	
				}
			}else if(index==2){
				if(num!=-1 && num>=100 ){
					$('td',row).eq(1).css('backgroundColor', '#ff3333');	
				}
			}else if(index==3){
				if(num!=-1 && num>=20 ){
					$('td',row).eq(1).css('backgroundColor', '#ff3333');	
				}
			}else if(index==4){
				if(num!=-1 && num>=20 ){
					$('td',row).eq(1).css('backgroundColor', '#ff3333');	
				}
			}
		}
	};


var physicalsize;
physicalsize=$('#physicalsize').dataTable({
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
	"aoColumns": [   
	                 {"sWidth": "50%"},
	   	         	 {"sWidth": "50%"},
			],
	"createdRow" : function(row, data, index) {
		if(data[1]=="null"){
			$('td', row).eq(1).html("");	
		}
	}
});

var logicalsize;
logicalsize=$('#logicalsize').dataTable({
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
	"aoColumns": [   
               {"sWidth": "50%"},
 	         	 {"sWidth": "50%"},
			],
	"createdRow" : function(row, data, index) {
		if(data[1]=="null"){
			$('td', row).eq(1).html("");	
		}
	}
});

var reorg;
reorg=$('#reorg').dataTable({
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
	"aoColumns": [   
	                 {"sWidth": "50%"},
	   	         	 {"sWidth": "50%"},
			],
	"createdRow" : function(row, data, index) {
		if(data[1]=="null"){
			$('td', row).eq(1).html("");	
		}	
	}
});


var other;
other=$('#other').dataTable({
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
	"aoColumns": [   
             {"sWidth": "50%"},
         	 {"sWidth": "50%"},
	],
	"createdRow" : function(row, data, index) {
		if(data[1]=="null"){
			$('td', row).eq(1).html("");	
		}
	
	}
});

var index_status;
var index_statusoption = {
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
		
		"ajax": {
			"url": "",
			"dataSrc": "index_status",
	 	},
		"createdRow" : function(row, data, index) {

		}
	};


var index_structure;
var index_structureoption = {
		"paging" : false,
		"searching" : false,
		"ordering" : true,
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
		"aoColumns": [   
	                 {"sWidth": "5%"},
	   	         	 {"sWidth": "35%"},
	   	      	     {"sWidth": "40%"},
	   	 		     {"sWidth": "5%"},
	   	             {"sWidth": "8%"},
	   	             {"sWidth": "7%"},
		],
		"ajax": {
			"url": "",
			"dataSrc": "index_structure",
	 },
		"createdRow" : function(row, data, index) {
		
		}
	};

var index_compressiontable;
var index_compressiontableoption = {
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
		"ajax": {
			"url": "",
			"dataSrc": "index_compression",
	 },
		"createdRow" : function(row, data, index) {
			if(data[4]=="Y"){
				$('td', row).eq(4).html("<span class='label label-danger'>已压缩</span>");	
			}else if(data[4]=="N"){
				$('td', row).eq(4).html("<span class='label label-danger'>未压缩</span>");	
			}else {
				$('td', row).eq(4).html("<span class='label label-danger'>"+data[4]+"</span>");	
			}
		}
	};



	



var selectData;
function singleTable(tableschema){
	var schema = [];
	var  tabe=table;
	 $("#selectschema").select2({
		data:[{id:"1",text:"加载中.."}],
		placeholder: "加载中....",
	}); 
	 $.getJSON("../DBMon_TABLE_ANALYSIS_GETSchemaAndTable?dbid="
			+ GetParam('dbid'), function(data) {
				selectData=data;
		$.each(data, function(i, item) {
			schema.push({
				id : i.trim(),
				text : i.trim()
			});
		});
		$("#selectschema").empty();
	 	$("#selectschema").select2({
			placeholder: "请选择",
			allowClear: true,
			data:schema
		});  
		//var  tabsch=window.sessionStorage.getItem("tabschema");
		//console.log(tabsch);
		//tabe=window.sessionStorage.getItem("table");
		$("#selectschema").val(tableschema).trigger("change");

	});

}

var data=[];
$(document).ready(function(){ 
	  $("#selecttable").select2({
		data:[{id:"1",text:"请选择schema"}],
		allowClear: true,
	  });
	  singleTable(" ");
}); 


$("#selectschema").change(function(){
	var val=this.value;
	if(val!=""){
		
		$.each(selectData,function(i,item){
			if(i.trim()==val){
			$.each(item, function(k, v) {
				data.push({
					id : v.trim(),
					title:i.trim(),
					text : v.trim()
				});
			});
			}
		});
		
		$('#inputtable').val(table);
		getdata(val,table);
/* 		$("#selecttable").empty();
		$("#selecttable").select2({
			placeholder: "请选择",
			allowClear: true,
			data:data
		});
		$("#selecttable").val(tabe).trigger("change"); */
		window.sessionStorage.clear();
	}
});
//D010INC

$('#inputtable').keydown(function(e){
	if(e.keyCode==13){
		var text=this.value.trim().toUpperCase();
		var val=$("#selectschema").val();
		getdata(val,text);
	}
});


	

function getdata(val,text){
	if(val==undefined)val="";
	if(tablestruct != null){
		tablestruct.fnReloadAjax("/dbmon/DBMon_TABLE_STRUTURE?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text);
	}else{
		tablestructoption.ajax.url = "/dbmon/DBMon_TABLE_STRUTURE?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text;
		tablestruct = $('#tablestruct').dataTable(tablestructoption);
	}
	
	
	if(reorginfo != null){
		reorginfo.fnReloadAjax("/dbmon/DBMon_TABLE_REORGCHK?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text);
	}else{
		reorginfooption.ajax.url="/dbmon/DBMon_TABLE_REORGCHK?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text;
		reorginfo = $('#reorginfo').dataTable(reorginfooption);
	}
	
	if(indexreorginfo != null){
		indexreorginfo.fnReloadAjax("/dbmon/DBMon_INDEX_REORGCHK?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text);
	}else{
		indexreorginfooption.ajax.url="/dbmon/DBMon_INDEX_REORGCHK?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text;
		indexreorginfo=$('#indexreorginfo').dataTable(indexreorginfooption);
	}
	
	$.ajaxSetup({async:false});
	if(indexs_table!=null){
		
		indexs_table.fnReloadAjax("/dbmon/DBMon_INDEXS?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text);
	}else{
		indextableoption.ajax.url="/dbmon/DBMon_INDEXS?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text;
		indexs_table = $('#indexs_table').dataTable(indextableoption);
	}
	$.ajaxSetup({async:true});
	if(indexs_table.find("tr").length<3){
		if(index_status != null){
			index_status.fnReloadAjax("/dbmon/DBMon_INDEX_STATUS?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text);
		}else{
			index_statusoption.ajax.url="/dbmon/DBMon_INDEX_STATUS?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text;
			index_status = $('#index_status').dataTable(index_statusoption);
		}
		
		if(index_structure != null){
			index_structure.fnReloadAjax("/dbmon/DBMon_INDEX_STRUCTURE?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text);
		}else{
			index_structureoption.ajax.url = "/dbmon/DBMon_INDEX_STRUCTURE?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text;
			index_structure=$('#index_structure').dataTable(index_structureoption);
		}
		
		
		if(index_compressiontable != null){
			index_compressiontable.fnReloadAjax("/dbmon/DBMon_INDEX_COMPRESSION?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text);
		}else{
			index_compressiontableoption.ajax.url = "/dbmon/DBMon_INDEX_COMPRESSION?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text;
			index_compressiontable=$('#index_compressiontable').dataTable(index_compressiontableoption);
		}
		

		$.getJSON("/dbmon/DBMon_INDEX_SYSTEM_CATALOG?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text,function(data){
			index_table.fnClearTable();
			index_table.api().rows.add(data.index_table);
			index_table.api().draw();
			index_Statistics.fnClearTable();
			index_Statistics.api().rows.add(data.index_Statistics);
			index_Statistics.api().draw();
		});
	
	}
	$.getJSON("/dbmon/DBMon_TABLE_SYSTEM_CATALOG?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text,function(data){
		spacemana.fnClearTable();
		spacemana.api().rows.add(data.spacemana.space);
		spacemana.api().draw();
		stateData.fnClearTable();
		stateData.api().rows.add(data.spacemana.statdata);
		stateData.api().draw();
		compress.fnClearTable();
		compress.api().rows.add(data.spacemana.compress);
		compress.api().draw();
	});
	$.getJSON("/dbmon/DBMon_TABLE_STATUS?dbid="+ GetParam("dbid")+"&schname="+val+"&tablename="+text,function(data){
		physicalsize.fnClearTable();
		physicalsize.api().rows.add(data.physical);
		physicalsize.api().draw();
		logicalsize.fnClearTable();
		logicalsize.api().rows.add(data.logical);
		logicalsize.api().draw();
		reorg.fnClearTable();
		reorg.api().rows.add(data.reorg);
		reorg.api().draw();
		other.fnClearTable();
		other.api().rows.add(data.other);
		other.api().draw();
	});
	
	index_status.fnClearTable();
	index_status.api().draw();
	index_structure.fnClearTable();
	index_structure.api().draw();
	index_compressiontable.fnClearTable();
	index_compressiontable.api().draw();
	index_table.fnClearTable();
	index_table.api().draw();
	index_Statistics.fnClearTable();
	index_Statistics.api().draw();
	
	
}


	

$('#indexs_table').on('click', ' tbody tr', function(){
	$(this).parent().find("tr").css("background-color","#fff");
	$(this).css("background-color","rgba(67, 161, 241, 0.57)");

	var index=$(this).data("index").trim();
	var table=$(this).data("table").trim();
	var tabschema=$(this).data("tabschema").trim();
	var indschema=$(this).data("indschema").trim();
	if(index_status != null){
		index_status.fnReloadAjax("/dbmon/DBMon_INDEX_STATUS?dbid="+ GetParam("dbid")+"&schname="+tabschema+"&tablename="+table+"&index="+index+"&indschema="+indschema);
	}else{
		index_statusoption.ajax.url="/dbmon/DBMon_INDEX_STATUS?dbid="+ GetParam("dbid")+"&schname="+tabschema+"&tablename="+table+"&index="+index+"&indschema="+indschema;
		index_status = $('#index_status').dataTable(index_statusoption);
	}
	
	if(index_structure != null){
		index_structure.fnReloadAjax("/dbmon/DBMon_INDEX_STRUCTURE?dbid="+ GetParam("dbid")+"&schname="+tabschema+"&tablename="+table+"&index="+index+"&indschema="+indschema);
	}else{
		index_structureoption.ajax.url = "/dbmon/DBMon_INDEX_STRUCTURE?dbid="+ GetParam("dbid")+"&schname="+tabschema+"&tablename="+table+"&index="+index+"&indschema="+indschema;
		index_structure=$('#index_structure').dataTable(index_structureoption);
	}
	
	
	
	if(index_compressiontable != null){
		index_compressiontable.fnReloadAjax("/dbmon/DBMon_INDEX_COMPRESSION?dbid="+ GetParam("dbid")+"&schname="+tabschema+"&tablename="+table+"&index="+index+"&indschema="+indschema);
	}else{
		index_compressiontableoption.ajax.url = "/dbmon/DBMon_INDEX_COMPRESSION?dbid="+ GetParam("dbid")+"&schname="+tabschema+"&tablename="+table+"&index="+index+"&indschema="+indschema;
		index_compressiontable=$('#index_compressiontable').dataTable(index_compressiontableoption);
	}
	
	
	$.getJSON("/dbmon/DBMon_INDEX_SYSTEM_CATALOG?dbid="+ GetParam("dbid")+"&schname="+tabschema+"&tablename="+table+"&index="+index+"&indschema="+indschema,function(data){
		index_table.fnClearTable();
		index_table.api().rows.add(data.index_table);
		index_table.api().draw();
		index_Statistics.fnClearTable();
		index_Statistics.api().rows.add(data.index_Statistics);
		index_Statistics.api().draw();
	});
});
    
    
    
    
    

