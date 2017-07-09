var tbsp_detail_table;
var trend_chart;

$("#tbspli").on("shown.bs.tab",function(){

	var used =new Array();
	var inc = new Array();
	var tbrow;
	if(tbsp_detail_table==null){
		tbsp_detail_table = $('#tbsp_detail_table').dataTable( {
			"order":[[14,"desc"],[10,"desc"]],
			"paging": true,
			"searching": true,
			"ordering": true,
			"processing": true,
			"info": false,
			"language": {
				  "loadingRecords":"加载数据中",
		        "lengthMenu": "每页 _MENU_ 条记录",
		        "zeroRecords": "没有找到记录",
		        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
		        "infoEmpty": "无记录",
		        "infoFiltered": "(从 _MAX_ 条记录过滤)",
		        "search": "搜索",
		        "paginate": {
		            first:      "第一页",
		            previous:   "上一页",
		            next:   "下一页",
		            last:   "最后一页"
		        },
		    },			
			"ajax": {
			"url": "/dbmon/DBMon_Stor_Table_TbspDetail?dbid=" + GetParam("dbid"),
			"dataSrc": "tbsp_detail_table",
			},
			
			"createdRow": function (row, data, index) {
				$('td',row).eq(8)[0].innerText = formatValue(data[8]);
				$('td',row).eq(9)[0].innerText = formatValue(data[9]);
				$('td',row).eq(10)[0].innerText = formatValue(data[10]);
				$('td',row).eq(12)[0].innerText = formatValue(data[12]);
				$('td',row).eq(14)[0].innerText = formatValue(data[14]);
				
				if((data[6].indexOf("DMS")>=0 && data[7].indexOf("0")>=0) || (data[6].indexOf("DMS")>=0 && data[7].indexOf("1")>=0 && data[8].indexOf("-")<0)){
					$('td',row).eq(6).css('backgroundColor', '#EEEE00');
					$('td',row).eq(7).css('backgroundColor', '#EEEE00');
					
					if(data[8].indexOf("-")<0){
						$('td',row).eq(8).css('backgroundColor', '#EEEE00');
					}
					
					
					if (data[11] * 1 < 20) {
						$('td',row).eq(11).html("<div class=\"progress\"><div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"" +data[10] + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:" + data[11] +"%;\"><font color =\"black\">"  + data[11] + "%" + "</font></div>" + "</div></div>");

					 } else if (data[11] * 1 < 40) {
	                	 $('td',row).eq(11).html("<div class=\"progress\"><div class=\"progress-bar progress-bar\" role=\"progressbar\" aria-valuenow=\"" +data[10] + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:" + data[11] +"%;\"><font color =\"black\">"  + data[11] + "%" + "</font></div>" + "</div></div>");
	                   
	                 } else if (data[11] * 1 < 60) {
	                	 $('td',row).eq(11).html("<div class=\"progress\"><div class=\"progress-bar progress-bar-info\" role=\"progressbar\" aria-valuenow=\"" +data[10] + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:" + data[11] +"%;\"><font color =\"black\">"  + data[11] + "%" + "</font></div>" + "</div></div>");
	                     
	                 } else if (data[11] * 1  < 80) {
	                	 $('td',row).eq(11).html("<div class=\"progress\"><div class=\"progress-bar progress-barr-warning\" role=\"progressbar\" aria-valuenow=\"" +data[10] + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:" + data[11] +"%;\">"  + data[11] + "%" + "</div>" + "</div></div>");
	                    
	                 } else if (data[11] * 1 >= 80) {
	                	 $('td',row).eq(11).html("<div class=\"progress\"><div class=\"progress-bar progress-bar-danger\" role=\"progressbar\" aria-valuenow=\"" +data[10] + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:" + data[11] +"%;\">" + data[11] + "%" + "</div>" + "</div></div>");
	                    
	                 }
				}
	             else{
	            	 if (data[11] * 1 < 60) {
	            		 $('td',row).eq(11).html("<div class=\"progress\"><div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"" +data[10] + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:" + data[11] +"%;\"><font color =\"black\">"  + data[11] + "%" + "</font></div>" + "</div></div>");
	            	 }else{
	            		 $('td',row).eq(11).html("<div class=\"progress\"><div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"" +data[10] + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:" + data[11] +"%;\">" +  data[11] + "%" + "</div>" + "</div></div>");
	            	 }
	            	
	             }
			}
		} );
	}else{
		tbsp_detail_table.fnReloadAjax("/dbmon/DBMon_Stor_Table_TbspDetail?dbid=" + GetParam("dbid"));
	};
	


		
		var dbspaceChar = echarts.init(document.getElementById("db2spacepie"));
		$.ajaxSettings.async = false;
		$.getJSON("../DBMon_Stor_Chart_DB2Space?dbid="+GetParam("dbid"),function(data) {
			dbspace.legend.data = data.itemnames;
			dbspace.xAxis[0].data = data.categories;
			dbspace.series = data.content;
			if(typeof(data.content) != "undefined"){
				for (var i = 0; i < dbspace.series.length; i++) {
				if (dbspace.series[i].name == '使用比例') {
					for (var j = 0; j < dbspace.series[i].data.length; j++) {
						dbspace.series[i].data[j] *= 100;
					}
					dbspace.series[i].type = 'line';
					dbspace.series[i].yAxisIndex = 1;
					dbspace.series[i].symbol = 'rect';
					dbspace.series[i].symbolSize = 10;
				} else {
					dbspace.series[i].type = 'bar';
					dbspace.series[i].stack = '使用情况';
				}
			}
			}
		});
		dbspaceChar.setOption(dbspace, true);
		$(window).resize(function(){
			dbspaceChar.resize();
		});
		
		trend_chart = initNomalEChart([[0,0]],'trend_chart',null,null,null,null,null,"数据库表空间增长趋势");

		refreshNomalEChart("../DBMon_Stor_Chart_DbTrend?dbid="+GetParam("dbid")+"&period=real&interval=5",trend_chart);
		
});

var container_detail_table;
$("#containerli").on("shown.bs.tab",function(){
	if(container_detail_table==null){
		container_detail_table = $('#container_detail_table').dataTable( {
			"order":[7,"desc"],
			"paging": true,
			"searching": true,
			"ordering": true,
			"processing": true,
			"info": false,
			"language": {
		        "lengthMenu": "每页 _MENU_ 条记录",
		        "zeroRecords": "没有找到记录",
		        "info": "第 _PAGE_ 页 ( 总共 _PAGES_ 页 )",
		        "infoEmpty": "无记录",
		        "loadingRecords":"加载数据中",
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
			"ajax": {
				"url": "/dbmon/DBMon_Stor_Table_ContainerDetail?dbid=" + GetParam("dbid"),
				"dataSrc": "container_detail_table",
			},
			"createdRow": function (row, data, index) {
				$('td',row).eq(2).html("<p title=\""+data[8]+"\">"+data[2] +"</p>");
				$('td', row).eq(8).attr("style","display:none;");
				
				if(data[7] < 60){
					$('td',row).eq(7).html("<div class=\"progress\"><div class=\"progress-bar progress-bar-success\" role=\"progressbar\" aria-valuenow=\"" +data[7] + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:"  + data[7] +"%;\"><font color =\"black\">"  + data[7] + "%" + "</font></div>" + "</div></div>");
				}else{
					$('td',row).eq(7).html("<div class=\"progress\"><div class=\"progress-bar progress-bar-danger\" role=\"progressbar\" aria-valuenow=\"" +data[7] + "\" aria-valuemin=\"0\" aria-valuemax=\"100\" style=\"width:" + data[7] +"%;\">" + data[7] + "%" + "</div></div>");
				}
			},
		} );
	}else{
		container_detail_table.fnReloadAjax("/dbmon/DBMon_Stor_Table_ContainerDetail?dbid=" + GetParam("dbid"));
	}
});


var period = "1m";

$(document).ready(function() {
	$("#btn_group_trend button").each(function(){
		$(this).click(function(){
			$(this).addClass("active").siblings().removeClass("active");
		})
	});
});

$('#btn_trend_1m').click(function() {
	period = "1m"
	refreshNomalEChart("../DBMon_Stor_Chart_DbTrend?dbid="+GetParam("dbid")+"&period=1m", trend_chart,"alert_trend_chart");
});
$('#btn_trend_3q').click(function() {
	period = "3q";
	refreshNomalEChart("../DBMon_Stor_Chart_DbTrend?dbid="+GetParam("dbid")+"&period=3q", trend_chart,"alert_trend_chart");
});
$('#btn_trend_1y').click(function() {
	period = "1y";
	refreshNomalEChart("../DBMon_Stor_Chart_DbTrend?dbid="+GetParam("dbid")+"&period=1y", trend_chart,"alert_trend_chart");
});	
$('#btn_trend_all').click(function() {
	period = "all";
	refreshNomalEChart("../DBMon_Stor_Chart_DbTrend?dbid="+GetParam("dbid")+"&period=all", trend_chart,"alert_trend_chart");
});	


