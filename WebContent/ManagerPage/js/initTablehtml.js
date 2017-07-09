var sort = "";
var bigtable_table;
var bigtable_tableoption;	
var hottable_table;
var hottable_tableoption;	
var badtable_table;
var badtable_tableoption;
var noneindex_table;
var noneindex_tableoption;
var nouseindex_table;
var nouseindex_tableoption ;
var none_table;
var none_tableoption;
var runstats_table;
var runstats_tableoption;
var reorgchk_table;
var reorgchk_tableoption;
var reorg_index;
var reorg_indexoption;
var tabschema;
var table;



$('#tableli').on('shown.bs.tab', function (e) {
	$('#btn_bigtable').click();
});
	
		bigtable_tableoption = {
				"order": [[8, "desc"]],
				"info": false,
				"paging": true,
	            "lengthMenu": [
	                           [30, 50, 100, -1],
	                           [30, 50, 100, "ALL"]
	                       ],
				"dom": "<'page_not_block'l<'#bigtable_table_excel'B>f>tip",
				"buttons":[{"filename":"大表"+moment().format('YYYY-MM-DD HH:mm:ss'),
					"extend": 'excel' ,"className":"btn btn-primary","text":"导出excel", "exportOptions": {
				         "modifier": {
				             "page": 'current'
				         }
				     }}] ,
				"processing": true,
				"bAutoWidth":false,
			    "aoColumns": [  {"sWidth": "11%"},             
			    	            {"sWidth": "5%"},   
			    	            {"sWidth": "5%"},
			    	            {"sWidth": "5%"}, 
			    	            {"sWidth": "12%"}, 
			    	            {"sWidth": "5%"}, 
			    	            {"sWidth": "5%"}, 
			    	            {"sWidth": "5%"}, 
			    	            {"sWidth": "5%"}, 
			    	            {"sWidth": "12%"}, 
			    	            {"sWidth": "5%"},
			    	            {"sWidth": "5%"} ,     
			    	            {"sWidth": "5%"}, 
			    	            {"sWidth": "5%"}, 
			    	            {"sWidth": "5%"},
			    	            {"sWidth": "5%"} 
			    	    ],
				"language": {
			        "lengthMenu": "每页 _MENU_ 条记录",
			        "zeroRecords": "没有大表相关数据，请确认监控已开启，或等待一段时间。",
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
	 			"ajax": {
	 				"url": "/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=bigtable",
	 				"dataSrc": "bigtable_table",
	 			}
			    ,
			    "createdRow" : function(row, data, index){
					$('td', row).parent().css("cursor","pointer");
					$('td', row).parent().attr("class","tableanalysis");
					var str= data[0].split(".");
					$('td', row).parent().attr("data-tabschema",str[0]);
					$('td', row).parent().attr("data-table",str[1]);
					
					if(data[14]=='-' || data[14]<=200 ){
						$('td',row).eq(14).css('backgroundColor', '#00CD66');	
			    	}else if(data[14]<=500){
			    		$('td',row).eq(14).css('backgroundColor', '#00BFFF');	
			    	}else if(data[14]<=800){
			    		$('td',row).eq(14).css('backgroundColor', '#EEEE00');	
			    	}else if(data[14]<=1024){
			    		$('td',row).eq(14).css('backgroundColor', '#FFA500');	
			    	}else{
			    		$('td',row).eq(14).css('backgroundColor', '#FF9999');	
			    	}
					
					if(data[15]=='-' ||data[15]<=0.1 ){
						$('td',row).eq(15).html(data[15]+"%").css('backgroundColor', '#00CD66');	
			    	}else if(data[15]<=0.5){
			    		$('td',row).eq(15).html(data[15]+"%").css('backgroundColor', '#00BFFF');	
			    	}else if(data[15]<=1){
			    		$('td',row).eq(15).html(data[15]+"%").css('backgroundColor', '#EEEE00');	
			    	}else if(data[15]<=2){
			    		$('td',row).eq(15).html(data[15]+"%").css('backgroundColor', '#FFA500');	
			    	}else{
			    		$('td',row).eq(15).html(data[15]+"%").css('backgroundColor', '#FF9999');	
			    	}
					
				},	   
		};
	

		hottable_tableoption =  {
			"dom": "<'page_not_block'l<'#hottable_table_excel'B>f>tip",
			"buttons":[{"filename":"热表"+moment().format('YYYY-MM-DD HH:mm:ss'),
				"extend": 'excel' ,"className":"btn btn-primary","text":"导出excel", "exportOptions": {
			         "modifier": {
			             "page": 'current'
			         }
			     }}] ,
			"order": [[5, "desc"]],
			"info": false,
			"paging": true,
			  "lengthMenu": [
		                       [30, 50, 100, -1],
		                       [30, 50, 100, "ALL"]
		                   ],
			"processing": true,
			"bAutoWidth":false,
		    "aoColumns": [  {"sWidth": "18%"},             
		    	            {"sWidth": "12%"},   
		    	            {"sWidth": "8%"},
		    	            {"sWidth": "8%"}, 
		    	            {"sWidth": "8%"}, 
		    	            {"sWidth": "8%"}, 
		    	            {"sWidth": "8%"}, 
		    	            {"sWidth": "8%"}, 
		    	            {"sWidth": "8%"}, 
		    	            {"sWidth": "8%"}, 
		    	            {"sWidth": "8%"},
		    	            {"sWidth": "8%"}      		    	                          
		    	    ],
			"language": {
		        "lengthMenu": "每页 _MENU_ 条记录",
		        "zeroRecords": "没有热表相关数据，请确认监控已开启，或等待一段时间。",
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
				"ajax": {
					"url": "/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=hottable",
					"dataSrc": "bigtable_table",
				}
		    ,
		    "createdRow" : function(row, data, index){
				$('td', row).parent().css("cursor","pointer");
				$('td', row).parent().attr("class","tableanalysis");
				var str= data[0].split(".");
				$('td', row).parent().attr("data-tabschema",str[0]);
				$('td', row).parent().attr("data-table",str[1]);
			},
		    
		};
/*	$("#hottable_table_filter").hide();
	$("#hottable_table_length").hide();
	$("#hottable_table_paginate").hide();
	$("#hottable_table_excel").hide();*/

	badtable_tableoption = {
			"dom": "<'page_not_block'l<'#badtable_table_excel'B>f>tip",
			"buttons":[{"filename":"异常表"+moment().format('YYYY-MM-DD HH:mm:ss'),
				"extend": 'excel' ,"className":"btn btn-primary","text":"导出excel", "exportOptions": {
			         "modifier": {
			             "page": 'current'
			         }
			     }}] ,
			"order": [[5, "desc"]],
			"info": false,
			"paging": true,
			  "lengthMenu": [
		                       [30, 50, 100, -1],
		                       [30, 50, 100, "ALL"]
		                   ],
			"processing": true,
			"bAutoWidth":false,
			 "aoColumns": [  {"sWidth": "15%"},             
			    	            {"sWidth": "10%"},   
			    	            {"sWidth": "6%"},
			    	            {"sWidth": "7%"}, 
			    	            {"sWidth": "5%"}, 
			    	            {"sWidth": "7%"}, 
			    	            {"sWidth": "7%"}, 
			    	            {"sWidth": "11%"},
			    	            {"sWidth": "11%"},    	
			    	            {"sWidth": "11%"},
			    	            {"sWidth": "10%"},    
			    	    ],
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
				"ajax": {
					"url": "",
					"dataSrc": "bigtable_table",
				},
		    "createdRow" : function(row, data, index){
				$('td', row).parent().css("cursor","pointer");
				$('td', row).parent().attr("class","tableanalysis");
				var str= data[0].split(".");
				$('td', row).parent().attr("data-tabschema",str[0]);
				$('td', row).parent().attr("data-table",str[1]);
			}
		};


		noneindex_tableoption = {
			"dom": "<'page_not_block'l<'#noneindex_table_excel'B>f>tip",
			"buttons":[{"filename":"无索引表"+moment().format('YYYY-MM-DD HH:mm:ss'),
				"extend": 'excel' ,"className":"btn btn-primary","text":"导出excel", "exportOptions": {
			         "modifier": {
			             "page": 'current'
			         }
			     }}] ,
			"order": [[5, "desc"]],
			"info": false,
			"paging": true,
			  "lengthMenu": [
		                       [30, 50, 100, -1],
		                       [30, 50, 100, "ALL"]
		                   ],
			"processing": true,
			"bAutoWidth":false,
			 "aoColumns": [  {"sWidth": "15%"},             
			    	            {"sWidth": "10%"},   
			    	            {"sWidth": "6%"},
			    	            {"sWidth": "7%"}, 
			    	            {"sWidth": "5%"}, 
			    	            {"sWidth": "7%"}, 
			    	            {"sWidth": "7%"}, 
			    	            {"sWidth": "11%"},
			    	            {"sWidth": "11%"},    	
			    	            {"sWidth": "11%"},
			    	            {"sWidth": "10%"},    
			    	    ],
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
				"ajax": {
					"url": "",
					"dataSrc": "bigtable_table",
				},
		    "createdRow" : function(row, data, index){
				$('td', row).parent().css("cursor","pointer");
				$('td', row).parent().attr("class","tableanalysis");
				var str= data[0].split(".");
				$('td', row).parent().attr("data-tabschema",str[0]);
				$('td', row).parent().attr("data-table",str[1]);
				
			}
		};


		nouseindex_tableoption = {
			"dom": "<'page_not_block'l<'#nouseindex_table_excel'B>f>tip",
			"buttons":[{"filename":"未用索引"+moment().format('YYYY-MM-DD HH:mm:ss'),
				"extend": 'excel',"className":"btn btn-primary","text":"导出excel", "exportOptions": {
			         "modifier": {
			             "page": 'current'
			         }
			     } }] ,
			"info": false,
			"processing": true,
			"bAutoWidth":false,
			"paging": true,
			  "lengthMenu": [
		                       [30, 50, 100, -1],
		                       [30, 50, 100, "ALL"]
		                   ],
		    "aoColumns": [  {"sWidth": "15%"},             
		    	            {"sWidth": "20%"},   
		    	            {"sWidth": "15%"},   
		    	            {"sWidth": "15%"},
		    	            {"sWidth": "15%"}, 
		    	            {"sWidth": "20%"}
		    	    ],
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
				"ajax": {
					"url": "",
					"dataSrc": "bigtable_table",
				},
		    "createdRow" : function(row, data, index){
				$('td', row).parent().css("cursor","pointer");
				$('td', row).parent().attr("class","tableanalysis");
				var str= data[2].split(".");
				$('td', row).parent().attr("data-tabschema",str[0]);
				$('td', row).parent().attr("data-table",str[1]);
			}
		};


		none_tableoption = {
		"dom": "<'page_not_block'l<'#none_table_excel'B>f>tip",
		"buttons":[{"filename":"长期未用表"+moment().format('YYYY-MM-DD HH:mm:ss'),
		"extend": 'excel' ,"className":"btn btn-primary","text":"导出excel", "exportOptions": {
		     "modifier": {
		         "page": 'current'
		     }
		 }}] ,
		"order": [[5, "desc"]],
		"info": false,
		"paging": true,
		"lengthMenu": [
		             [30, 50, 100, -1],
		             [30, 50, 100, "ALL"]
		         ],
		"processing": true,
		"bAutoWidth":false,
		"aoColumns": [  {"sWidth": "15%"},             
			            {"sWidth": "10%"},   
			            {"sWidth": "6%"},
			            {"sWidth": "7%"}, 
			            {"sWidth": "5%"}, 
			            {"sWidth": "7%"}, 
			            {"sWidth": "7%"}, 
			            {"sWidth": "11%"},
			            {"sWidth": "11%"},    	
			            {"sWidth": "11%"},
			            {"sWidth": "10%"},    
			    ],
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
		"ajax": {
			"url": "",
			"dataSrc": "bigtable_table",
		},
		"createdRow" : function(row, data, index){
		$('td', row).parent().css("cursor","pointer");
		$('td', row).parent().attr("class","tableanalysis");
		var str= data[0].split(".");
		$('td', row).parent().attr("data-tabschema",str[0]);
		$('td', row).parent().attr("data-table",str[1]);
		}
		};

		runstats_tableoption = {
		"dom": "<'page_not_block'l<'#runstats_table_excel'B>f>tip",
		"buttons":[{"filename":"需收集统计信息表"+moment().format('YYYY-MM-DD HH:mm:ss'),
		"extend": 'excel' ,"className":"btn btn-primary","text":"导出excel", "exportOptions": {
		     "modifier": {
		         "page": 'current'
		     }
		 }}] ,
		"order": [[9, "desc"]],
		"info": false,
		"paging": true,
		"lengthMenu": [
		             [30, 50, 100, -1],
		             [30, 50, 100, "ALL"]
		         ],
		"processing": true,
		"bAutoWidth":false,
		//"searching": true,
		//"lengthMenu": [30, 50, 100],
		"aoColumns": [  {"sWidth": "15%"},             
			            {"sWidth": "10%"},   
			            {"sWidth": "6%"},
			            {"sWidth": "7%"}, 
			            {"sWidth": "5%"}, 
			            {"sWidth": "7%"}, 
			            {"sWidth": "7%"}, 
			            {"sWidth": "11%"},
			            {"sWidth": "11%"},    	
			            {"sWidth": "11%"},
			            {"sWidth": "10%"},    
			    ],
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
		"ajax": {
			"url": "",
			"dataSrc": "bigtable_table",
		},
		"createdRow" : function(row, data, index){

		$('td', row).parent().css("cursor","pointer");
		$('td', row).parent().attr("class","tableanalysis");
		var str= data[0].split(".");
		$('td', row).parent().attr("data-tabschema",str[0]);
		$('td', row).parent().attr("data-table",str[1]);
		}
		};

		reorgchk_tableoption = {
		"dom": "<'page_not_block'l<'#reorgchk_table_excel'B>f>tip",
		"buttons":[{"filename":"需重组表"+moment().format('YYYY-MM-DD HH:mm:ss'),
		"extend": 'excel' , "className":"btn btn-primary","text":"导出excel","exportOptions": {
		     "modifier": {
		         "page": 'current'
		     }
		 }}] ,
		"order": [[9, "asc"]],
		"info": false,
		"paging": true,
		"lengthMenu": [
		             [30, 50, 100, -1],
		             [30, 50, 100, "ALL"]
		         ],
		"processing": true,
		"bAutoWidth":false,
		//"searching": true,
		//"lengthMenu": [30, 50, 100],
		"aoColumns": [  {"sWidth": "15%"},               
			            {"sWidth": "6%"},
			            {"sWidth": "7%"}, 
			            {"sWidth": "5%"}, 
			            {"sWidth": "7%"}, 
			            {"sWidth": "7%"}, 
			            {"sWidth": "8%"},
			            {"sWidth": "13%"},    	
			            {"sWidth": "13%"},
			            {"sWidth": "10%"},   
			            {"sWidth": "9%"},  
			    ],
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
		"ajax": {
			"url": "",
			"dataSrc": "bigtable_table",
		},
		"createdRow" : function(row, data, index){
			$('td', row).parent().css("cursor","pointer");
			$('td', row).parent().attr("class","tableanalysis");
			var str= data[0].split(".");
			$('td', row).parent().attr("data-tabschema",str[0]);
			$('td', row).parent().attr("data-table",str[1]);
	
			if(data[7]!=-1 && data[7]>=5 ){
				$('td',row).eq(7).css('backgroundColor', '#ff3333');	
			}
			if(data[8]!=-1 && data[8]<=70 ){
				$('td',row).eq(8).css('backgroundColor', '#ff3333');	
			}
			if(data[9]!=-1 && data[9]<=80 ){
				$('td',row).eq(9).css('backgroundColor', '#ff3333');	
			}
			$('td',row).eq(10).css("display","none");
		}
		};


		reorg_indexoption = {
		"dom": "<'page_not_block'l<'#reorg_index_excel'B>f>tip",
		"buttons":[{"filename":"需重组索引"+moment().format('YYYY-MM-DD HH:mm:ss'),
		"extend": 'excel' ,"className":"btn btn-primary","text":"导出excel", "exportOptions": {
		     "modifier": {
		         "page": 'current'
		     }
		 }}] ,
		"order": [[9, "desc"]],
		"info": false,
		"paging": true,
		"lengthMenu": [
		             [30, 50, 100, -1],
		             [30, 50, 100, "ALL"]
		         ],
		"processing": true,
		"bAutoWidth":false,
		//"searching": true,
		//"lengthMenu": [30, 50, 100],
		"aoColumns": [  {"sWidth": "15%"},             
			            {"sWidth": "10%"},   
			            {"sWidth": "6%"},
			            {"sWidth": "7%"}, 
			            {"sWidth": "5%"}, 
			            {"sWidth": "7%"}, 
			            {"sWidth": "7%"}, 
			            {"sWidth": "11%"},
			            {"sWidth": "11%"},    	
			            {"sWidth": "11%"},
			            {"sWidth": "10%"},    
			    ],
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
		"ajax": {
			"url": "",
			"dataSrc": "bigtable_table",
		},
		 "createdRow" : function(row, data, index){
				$('td', row).parent().css("cursor","pointer");
				$('td', row).parent().attr("class","tableanalysis");
				var str= data[2].split(".");
				$('td', row).parent().attr("data-tabschema",str[0]);
				$('td', row).parent().attr("data-table",str[1]);
				
		    	if(data[5]!=-1 && data[5]<=80 ){
					$('td',row).eq(5).css('backgroundColor', '#ff3333');	
		    	}
		    	if(data[6]!=-1 && data[6]<=50 ){
					$('td',row).eq(6).css('backgroundColor', '#ff3333');	
		    	}
		    	if(data[7]!=-1 && data[7]>=100 ){
					$('td',row).eq(7).css('backgroundColor', '#ff3333');	
		    	}
		    	if(data[8]!=-1 && data[8]>=20 ){
					$('td',row).eq(8).css('backgroundColor', '#ff3333');	
		    	}
		    	if(data[9]!=-1 && data[9]>=20 ){
					$('td',row).eq(9).css('backgroundColor', '#ff3333');	
		    	}
		    	$('td',row).eq(10).css("display","none");
			}
		};



	$('#btn_bigtable').click(function() {
		sort = "bigtable";
		$("#bigtable_table_filter").show();
		$("#bigtable_table").show();
		$("#bigtable_table_paginate").show();
		$("#bigtable_table_length").show();
		//$("#bigtable_table_excel").addClass("col-sm-2");
		//$("#bigtable_table_excel a").removeClass("dt-button");
		$("#bigtable_table_excel").show();
		
		$("#hottable_table_filter").hide();
		$("#hottable_table").hide();
		$("#hottable_table_paginate").hide();
		$("#hottable_table_length").hide();
		$("#hottable_table_excel").hide();
		
		$("#badtable_table").hide();
		$("#badtable_table_filter").hide();
		$("#badtable_table_length").hide();
		$("#badtable_table_paginate").hide();
		$("#badtable_table_excel").hide();

		$("#noneindex_table").hide();
		$("#noneindex_table_filter").hide();
		$("#noneindex_table_length").hide();
		$("#noneindex_table_paginate").hide();
		$("#noneindex_table_excel").hide();

		$("#nouseindex_table").hide();
		$("#nouseindex_table_filter").hide();
		$("#nouseindex_table_length").hide();
		$("#nouseindex_table_paginate").hide();
		$("#nouseindex_table_excel").hide();
		
		$("#none_table").hide();
		$("#none_table_filter").hide();
		$("#none_table_length").hide();
		$("#none_table_paginate").hide();
		$("#none_table_excel").hide();
		
		$("#runstats_table").hide();
		$("#runstats_table_filter").hide();
		$("#runstats_table_length").hide();
		$("#runstats_table_paginate").hide();
		$("#runstats_table_excel").hide();
		
		$("#reorgchk_table").hide();
		$("#reorgchk_table_filter").hide();
		$("#reorgchk_table_length").hide();
		$("#reorgchk_table_paginate").hide();
		$("#reorgchk_table_excel").hide();
		
		$("#reorg_index").hide();
		$("#reorg_index_filter").hide();
		$("#reorg_index_length").hide();
		$("#reorg_index_paginate").hide();
		$("#reorg_index_excel").hide();
		
		//$("#tableInfo").show();
		//$("#tableInfo").html("*大表：表的大小信息，默认按照当前表总大小排序，上期时间为七天前");
		$("#tip").html("表的大小信息，默认按照当前表总大小排序，上期时间为七天前");
		if(bigtable_table != null){
			bigtable_table.fnReloadAjax("/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort);
		}else{
			bigtable_tableoption.ajax.url = "/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort;
			bigtable_table = $('#bigtable_table').dataTable(bigtable_tableoption );
		}
		/*bigtable_table.fnReloadAjax("/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort);*/
		bigtable_table.fnSort( [ [8,'desc'] ]);	
		$("#bigtable_table_excel a").removeClass("dt-button");
		$("#exportExcel").val("bigtable_table_excel");
	});
	$('#btn_hottable').click(function() {
		sort = "hottable";
		$("#bigtable_table_filter").hide();
		$("#bigtable_table").hide();
		$("#bigtable_table_paginate").hide();
		$("#bigtable_table_length").hide();
		$("#bigtable_table_excel").hide();
		
		$("#hottable_table_filter").show();
		$("#hottable_table").show();
		$("#hottable_table_paginate").show();
		$("#hottable_table_length").show();
		$("#hottable_table_excel").show();

		$("#badtable_table").hide();
		$("#badtable_table_filter").hide();
		$("#badtable_table_length").hide();
		$("#badtable_table_paginate").hide();
		$("#badtable_table_excel").hide();

		$("#noneindex_table").hide();
		$("#noneindex_table_filter").hide();
		$("#noneindex_table_length").hide();
		$("#noneindex_table_paginate").hide();
		$("#noneindex_table_excel").hide();

		$("#nouseindex_table").hide();
		$("#nouseindex_table_filter").hide();
		$("#nouseindex_table_length").hide();
		$("#nouseindex_table_paginate").hide();
		$("#nouseindex_table_excel").hide();
		
		$("#none_table").hide();
		$("#none_table_filter").hide();
		$("#none_table_length").hide();
		$("#none_table_paginate").hide();
		$("#none_table_excel").hide();
		
		$("#runstats_table").hide();
		$("#runstats_table_filter").hide();
		$("#runstats_table_length").hide();
		$("#runstats_table_paginate").hide();
		$("#runstats_table_excel").hide();
		
		$("#reorgchk_table").hide();
		$("#reorgchk_table_filter").hide();
		$("#reorgchk_table_length").hide();
		$("#reorgchk_table_paginate").hide();
		$("#reorgchk_table_excel").hide();
		
		$("#reorg_index").hide();
		$("#reorg_index_filter").hide();
		$("#reorg_index_length").hide();
		$("#reorg_index_paginate").hide();
		$("#reorg_index_excel").hide();
		
		//$("#tableInfo").html("*热表：表的操作信息，默认按照Select行数排序");
		$("#tip").html("表的操作信息，默认按照Select行数排序");
		if(hottable_table != null){
			hottable_table.fnReloadAjax("/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort);
		}else{
			hottable_tableoption.ajax.url = "/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort;
			hottable_table = $('#hottable_table').dataTable(hottable_tableoption );
		}
		
	/*	hottable_table.fnReloadAjax("/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort);*/
		hottable_table.fnSort( [ [5,'desc'] ]);		
		$("#hottable_table_excel a").removeClass("dt-button");
		$("#exportExcel").val("hottable_table_excel");
	});
	$('#btn_badtable').click(function() {
		sort = "badtable";
		$("#bigtable_table_filter").hide();
		$("#bigtable_table").hide();
		$("#bigtable_table_paginate").hide();
		$("#bigtable_table_length").hide();
		$("#bigtable_table_excel").hide();
		
		$("#hottable_table_filter").hide();
		$("#hottable_table").hide();
		$("#hottable_table_paginate").hide();
		$("#hottable_table_length").hide();
		$("#hottable_table_excel").hide();

		$("#badtable_table").show();
		$("#badtable_table_filter").show();
		$("#badtable_table_length").show();
		$("#badtable_table_paginate").show();
		$("#badtable_table_excel").show();

		$("#noneindex_table").hide();
		$("#noneindex_table_filter").hide();
		$("#noneindex_table_length").hide();
		$("#noneindex_table_paginate").hide();
		$("#noneindex_table_excel").hide();

		$("#nouseindex_table").hide();
		$("#nouseindex_table_filter").hide();
		$("#nouseindex_table_length").hide();
		$("#nouseindex_table_paginate").hide();
		$("#nouseindex_table_excel").hide();
		
		$("#none_table").hide();
		$("#none_table_filter").hide();
		$("#none_table_length").hide();
		$("#none_table_paginate").hide();
		$("#none_table_excel").hide();
		
		$("#runstats_table").hide();
		$("#runstats_table_filter").hide();
		$("#runstats_table_length").hide();
		$("#runstats_table_paginate").hide();
		$("#runstats_table_excel").hide();
		
		$("#reorgchk_table").hide();
		$("#reorgchk_table_filter").hide();
		$("#reorgchk_table_length").hide();
		$("#reorgchk_table_paginate").hide();
		$("#reorgchk_table_excel").hide();
		
		$("#reorg_index").hide();
		$("#reorg_index_filter").hide();
		$("#reorg_index_length").hide();
		$("#reorg_index_paginate").hide();
		$("#reorg_index_excel").hide();

		//$("#tableInfo").html("*异常表：显示状态不为N的表，默认按照表总大小排序");
		$("#tip").html("显示状态不为N的表，默认按照表总大小排序");
		if(badtable_table != null){
			badtable_table.fnReloadAjax("/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort);
		}else{
			badtable_tableoption.ajax.url = "/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort;
			badtable_table = $('#badtable_table').dataTable(badtable_tableoption );
		}
		$("#badtable_table_excel a").removeClass("dt-button");
		$("#exportExcel").val("badtable_table_excel");
	});
	$('#btn_noneindextable').click(function() {
		sort = "noneindextable";
		$("#bigtable_table_filter").hide();
		$("#bigtable_table").hide();
		$("#bigtable_table_paginate").hide();
		$("#bigtable_table_length").hide();
		$("#bigtable_table_excel").hide();
		
		$("#hottable_table_filter").hide();
		$("#hottable_table").hide();
		$("#hottable_table_paginate").hide();
		$("#hottable_table_length").hide();
		$("#hottable_table_excel").hide();
		
		$("#badtable_table").hide();
		$("#badtable_table_filter").hide();
		$("#badtable_table_length").hide();
		$("#badtable_table_paginate").hide();
		$("#badtable_table_excel").hide();

		$("#noneindex_table").show();
		$("#noneindex_table_filter").show();
		$("#noneindex_table_length").show();
		$("#noneindex_table_paginate").show();
		$("#noneindex_table_excel").show();

		$("#nouseindex_table").hide();
		$("#nouseindex_table_filter").hide();
		$("#nouseindex_table_length").hide();
		$("#nouseindex_table_paginate").hide();
		$("#nouseindex_table_excel").hide();
		
		$("#none_table").hide();
		$("#none_table_filter").hide();
		$("#none_table_length").hide();
		$("#none_table_paginate").hide();
		$("#none_table_excel").hide();
		
		$("#runstats_table").hide();
		$("#runstats_table_filter").hide();
		$("#runstats_table_length").hide();
		$("#runstats_table_paginate").hide();
		$("#runstats_table_excel").hide();
		
		$("#reorgchk_table").hide();
		$("#reorgchk_table_filter").hide();
		$("#reorgchk_table_length").hide();
		$("#reorgchk_table_paginate").hide();
		$("#reorgchk_table_excel").hide();
		
		$("#reorg_index").hide();
		$("#reorg_index_filter").hide();
		$("#reorg_index_length").hide();
		$("#reorg_index_paginate").hide();
		$("#reorg_index_excel").hide();
		
		//$("#tableInfo").html("*无索引表：显示没有建立索引的表，默认按照表总大小排序");
		$("#tip").html("显示没有建立索引的表，默认按照表总大小排序");
		
		if(noneindex_table != null){
			noneindex_table.fnReloadAjax("/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort);
		}else{
			noneindex_tableoption.ajax.url = "/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort;
			noneindex_table = $('#noneindex_table').dataTable(noneindex_tableoption );
		}
		$("#noneindex_table_excel a").removeClass("dt-button");
		$("#exportExcel").val("noneindex_table_excel");
	});
	$('#btn_nouseindextable').click(function() {
		sort = "nouseindextable";
		$("#bigtable_table_filter").hide();
		$("#bigtable_table").hide();
		$("#bigtable_table_paginate").hide();
		$("#bigtable_table_length").hide();
		$("#bigtable_table_excel").hide();
		
		$("#hottable_table_filter").hide();
		$("#hottable_table").hide();
		$("#hottable_table_paginate").hide();
		$("#hottable_table_length").hide();
		$("#hottable_table_excel").hide();
		
		$("#badtable_table").hide();
		$("#badtable_table_filter").hide();
		$("#badtable_table_length").hide();
		$("#badtable_table_paginate").hide();
		$("#badtable_table_excel").hide();

		$("#noneindex_table").hide();
		$("#noneindex_table_filter").hide();
		$("#noneindex_table_length").hide();
		$("#noneindex_table_paginate").hide();
		$("#noneindex_table_excel").hide();

		$("#nouseindex_table").show();
		$("#nouseindex_table_filter").show();
		$("#nouseindex_table_length").show();
		$("#nouseindex_table_paginate").show();
		$("#nouseindex_table_excel").show();
		
		$("#none_table").hide();
		$("#none_table_filter").hide();
		$("#none_table_length").hide();
		$("#none_table_paginate").hide();
		$("#none_table_excel").hide();
		
		$("#runstats_table").hide();
		$("#runstats_table_filter").hide();
		$("#runstats_table_length").hide();
		$("#runstats_table_paginate").hide();
		$("#runstats_table_excel").hide();
		
		$("#reorgchk_table").hide();
		$("#reorgchk_table_filter").hide();
		$("#reorgchk_table_length").hide();
		$("#reorgchk_table_paginate").hide();
		$("#reorgchk_table_excel").hide();
		
		$("#reorg_index").hide();
		$("#reorg_index_filter").hide();
		$("#reorg_index_length").hide();
		$("#reorg_index_paginate").hide();
		$("#reorg_index_excel").hide();
		
		//$("#tableInfo").html("*未用索引：显示未使用过或者最后使用时间超过6个月的索引");
		$("#tip").html("显示未使用过或者最后使用时间超过6个月的索引");
		
		if(nouseindex_table != null){
			nouseindex_table.fnReloadAjax("/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort);
		}else{
			nouseindex_tableoption.ajax.url = "/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort;
			nouseindex_table = $('#nouseindex_table').dataTable(nouseindex_tableoption );
		}
		$("#nouseindex_table_excel a").removeClass("dt-button");
		$("#exportExcel").val("nouseindex_table_excel");
	});

	$('#btn_nonetable').click(function() {
		sort = "nonetable";
		$("#bigtable_table_filter").hide();
		$("#bigtable_table").hide();
		$("#bigtable_table_paginate").hide();
		$("#bigtable_table_length").hide();
		$("#bigtable_table_excel").hide();
		
		$("#hottable_table_filter").hide();
		$("#hottable_table").hide();
		$("#hottable_table_paginate").hide();
		$("#hottable_table_length").hide();
		$("#hottable_table_excel").hide();
		
		$("#badtable_table").hide();
		$("#badtable_table_filter").hide();
		$("#badtable_table_length").hide();
		$("#badtable_table_paginate").hide();
		$("#badtable_table_excel").hide();

		$("#noneindex_table").hide();
		$("#noneindex_table_filter").hide();
		$("#noneindex_table_length").hide();
		$("#noneindex_table_paginate").hide();
		$("#noneindex_table_excel").hide();

		$("#nouseindex_table").hide();
		$("#nouseindex_table_filter").hide();
		$("#nouseindex_table_length").hide();
		$("#nouseindex_table_paginate").hide();
		$("#nouseindex_table_excel").hide();
		
		$("#none_table").show();
		$("#none_table_filter").show();
		$("#none_table_length").show();
		$("#none_table_paginate").show();
		$("#none_table_excel").show();
		
		$("#runstats_table").hide();
		$("#runstats_table_filter").hide();
		$("#runstats_table_length").hide();
		$("#runstats_table_paginate").hide();
		$("#runstats_table_excel").hide();
		
		$("#reorgchk_table").hide();
		$("#reorgchk_table_filter").hide();
		$("#reorgchk_table_length").hide();
		$("#reorgchk_table_paginate").hide();
		$("#reorgchk_table_excel").hide();
		
		$("#reorg_index").hide();
		$("#reorg_index_filter").hide();
		$("#reorg_index_length").hide();
		$("#reorg_index_paginate").hide();
		$("#reorg_index_excel").hide();
		
		//$("#tableInfo").html("*长期未用表：显示最后使用时间超过6个月或者为'0001-01-01'的表");
		$("#tip").html("显示最后使用时间超过6个月的表");
		
		if(none_table != null){
			none_table.fnReloadAjax("/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort);
		}else{
			none_tableoption.ajax.url = "/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort;
			none_table = $('#none_table').dataTable(none_tableoption );
		}
		$("#none_table_excel a").removeClass("dt-button");
		$("#exportExcel").val("none_table_excel");
	});
	
	
	$('#btn_runstatstable').click(function() {
		sort = "runstatstable";
		$("#bigtable_table_filter").hide();
		$("#bigtable_table").hide();
		$("#bigtable_table_paginate").hide();
		$("#bigtable_table_length").hide();
		$("#bigtable_table_excel").hide();
		
		$("#hottable_table_filter").hide();
		$("#hottable_table").hide();
		$("#hottable_table_paginate").hide();
		$("#hottable_table_length").hide();
		$("#hottable_table_excel").hide();
		
		$("#badtable_table").hide();
		$("#badtable_table_filter").hide();
		$("#badtable_table_length").hide();
		$("#badtable_table_paginate").hide();
		$("#badtable_table_excel").hide();

		$("#noneindex_table").hide();
		$("#noneindex_table_filter").hide();
		$("#noneindex_table_length").hide();
		$("#noneindex_table_paginate").hide();
		$("#noneindex_table_excel").hide();

		$("#nouseindex_table").hide();
		$("#nouseindex_table_filter").hide();
		$("#nouseindex_table_length").hide();
		$("#nouseindex_table_paginate").hide();
		$("#nouseindex_table_excel").hide();
		
		$("#none_table").hide();
		$("#none_table_filter").hide();
		$("#none_table_length").hide();
		$("#none_table_paginate").hide();
		$("#none_table_excel").hide();
		
		$("#runstats_table").show();
		$("#runstats_table_filter").show();
		$("#runstats_table_length").show();
		$("#runstats_table_paginate").show();
		$("#runstats_table_excel").show();
		
		$("#reorgchk_table").hide();		
		$("#reorgchk_table_filter").hide();
		$("#reorgchk_table_length").hide();
		$("#reorgchk_table_paginate").hide();
		$("#reorgchk_table_excel").hide();
		
		$("#reorg_index").hide();
		$("#reorg_index_filter").hide();
		$("#reorg_index_length").hide();
		$("#reorg_index_paginate").hide();
		$("#reorg_index_excel").hide();
		
		//$("#tableInfo").html("*需收集统计信息表：显示超过3个月未收集统计信息的表");
		$("#tip").html("显示超过3个月未收集统计信息的表");
		if(runstats_table != null){
			runstats_table.fnReloadAjax("/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort);
		}else{
			runstats_tableoption.ajax.url = "/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort;
			runstats_table = $('#runstats_table').dataTable(runstats_tableoption );
		}
		$("#runstats_table_excel a").removeClass("dt-button");
		$("#exportExcel").val("runstats_table_excel");
	});

	$('#btn_reorgchktable').click(function() {
		sort = "reorgchktable";
		$("#bigtable_table_filter").hide();
		$("#bigtable_table").hide();
		$("#bigtable_table_paginate").hide();
		$("#bigtable_table_length").hide();
		$("#bigtable_table_excel").hide();
		
		$("#hottable_table_filter").hide();
		$("#hottable_table").hide();
		$("#hottable_table_paginate").hide();
		$("#hottable_table_length").hide();
		$("#hottable_table_excel").hide();
		
		$("#badtable_table").hide();
		$("#badtable_table_filter").hide();
		$("#badtable_table_length").hide();
		$("#badtable_table_paginate").hide();
		$("#badtable_table_excel").hide();

		$("#noneindex_table").hide();
		$("#noneindex_table_filter").hide();
		$("#noneindex_table_length").hide();
		$("#noneindex_table_paginate").hide();
		$("#noneindex_table_excel").hide();

		$("#nouseindex_table").hide();
		$("#nouseindex_table_filter").hide();
		$("#nouseindex_table_length").hide();
		$("#nouseindex_table_paginate").hide();
		$("#nouseindex_table_excel").hide();
		
		$("#none_table").hide();
		$("#none_table_filter").hide();
		$("#none_table_length").hide();
		$("#none_table_paginate").hide();
		$("#none_table_excel").hide();
		
		$("#runstats_table").hide();
		$("#runstats_table_filter").hide();
		$("#runstats_table_length").hide();
		$("#runstats_table_paginate").hide();
		$("#runstats_table_excel").hide();
		
		$("#reorgchk_table").show();		
		$("#reorgchk_table_filter").show();
		$("#reorgchk_table_length").show();
		$("#reorgchk_table_paginate").show();
		$("#reorgchk_table_excel").show();
		
		$("#reorg_index").hide();
		$("#reorg_index_filter").hide();
		$("#reorg_index_length").hide();
		$("#reorg_index_paginate").hide();
		$("#reorg_index_excel").hide();

		//$("#tableInfo").html("*需重组表：显示需要重组的表信息");
		$("#tip").html("显示需要重组的表信息");
		
		if(reorgchk_table != null){
			reorgchk_table.fnReloadAjax("/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort);
		}else{
			reorgchk_tableoption.ajax.url = "/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort;
			reorgchk_table = $('#reorgchk_table').dataTable(reorgchk_tableoption );
		}
		$("#reorgchk_table_excel a").removeClass("dt-button");
		$("#exportExcel").val("reorgchk_table_excel");
	});
	
	$('#btn_reorgindex').click(function() {
		sort = "reorgindex";
		$("#bigtable_table_filter").hide();
		$("#bigtable_table").hide();
		$("#bigtable_table_paginate").hide();
		$("#bigtable_table_length").hide();
		$("#bigtable_table_excel").hide();
		
		$("#hottable_table_filter").hide();
		$("#hottable_table").hide();
		$("#hottable_table_paginate").hide();
		$("#hottable_table_length").hide();
		$("#hottable_table_excel").hide();
		
		$("#badtable_table").hide();
		$("#badtable_table_filter").hide();
		$("#badtable_table_length").hide();
		$("#badtable_table_paginate").hide();
		$("#badtable_table_excel").hide();

		$("#noneindex_table").hide();
		$("#noneindex_table_filter").hide();
		$("#noneindex_table_length").hide();
		$("#noneindex_table_paginate").hide();
		$("#noneindex_table_excel").hide();

		$("#nouseindex_table").hide();
		$("#nouseindex_table_filter").hide();
		$("#nouseindex_table_length").hide();
		$("#nouseindex_table_paginate").hide();
		$("#nouseindex_table_excel").hide();
		
		$("#none_table").hide();
		$("#none_table_filter").hide();
		$("#none_table_length").hide();
		$("#none_table_paginate").hide();
		$("#none_table_excel").hide();
		
		$("#runstats_table").hide();
		$("#runstats_table_filter").hide();
		$("#runstats_table_length").hide();
		$("#runstats_table_paginate").hide();
		$("#runstats_table_excel").hide();
		
		$("#reorgchk_table").hide();		
		$("#reorgchk_table_filter").hide();
		$("#reorgchk_table_length").hide();
		$("#reorgchk_table_paginate").hide();
		$("#reorgchk_table_excel").hide();
		
		$("#reorg_index").show();
		$("#reorg_index_filter").show();
		$("#reorg_index_length").show();
		$("#reorg_index_paginate").show();
		$("#reorg_index_excel").show();

		//$("#tableInfo").html("*需重组索引：显示需要重组的索引信息");
		$("#tip").html("显示需要重组的索引信息");
		if(reorg_index != null){
			reorg_index.fnReloadAjax("/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort);
		}else{
			reorg_indexoption.ajax.url = "/dbmon/DBMon_Tbl_Table_BigTable?dbid=" + GetParam("dbid") + "&sort=" + sort;
			reorg_index = $('#reorg_index').dataTable(reorg_indexoption );
		}
		$("#reorg_index_excel a").removeClass("dt-button");
		$("#exportExcel").val("reorg_index_excel");
	});	
	



	$("#btn_group_bigtable button").each(function(){
		$(this).click(function(){
			$(this).addClass("active").siblings().removeClass("active");
		})
	});	



	$('#bigtable_table').on('click', 'tbody tr', function(){
		tabschema=$(this).data("tabschema");
		table=$(this).data("table");
		$('#single a').tab('show');
		singleTable(tabschema);
	}); 
		
		$('#hottable_table').on('click', 'tbody tr', function(){
		tabschema=$(this).data("tabschema");
		//console.log(tabschema);
		table=$(this).data("table");
		$('#single a').tab('show');
		singleTable(tabschema);
	});
	
$('#badtable_table').on('click', 'tbody tr', function(){
		tabschema=$(this).data("tabschema");
		table=$(this).data("table");
		$('#single a').tab('show');
		singleTable(tabschema);
	});

$('#noneindex_table').on('click', 'tbody tr', function(){
		tabschema=$(this).data("tabschema");
		table=$(this).data("table");
		if(tabschema.indexOf("SYSPUBLIC") > -1 && table.indexOf("DUAL") > -1){
			return;
		}
		$('#single a').tab('show');
		singleTable(tabschema);
	});

$('#nouseindex_table').on('click', 'tbody tr', function(){
		tabschema=$(this).data("tabschema");
		table=$(this).data("table");
		$('#single a').tab('show');
		singleTable(tabschema);
	});

$('#none_table').on('click', 'tbody tr', function(){
	tabschema=$(this).data("tabschema");
	table=$(this).data("table");
	$('#single a').tab('show');
	singleTable(tabschema);
});

$('#runstats_table').on('click', 'tbody tr', function(){
	tabschema=$(this).data("tabschema");
	table=$(this).data("table");
	$('#single a').tab('show');
	singleTable(tabschema);
});


$('#reorgchk_table').on('click', 'tbody tr', function(){
	tabschema=$(this).data("tabschema");
	table=$(this).data("table");
	$('#single a').tab('show');
	singleTable(tabschema);
});
$('#reorg_index').on('click', 'tbody tr', function(){
	tabschema=$(this).data("tabschema");
	table=$(this).data("table");
	$('#single a').tab('show');
	singleTable(tabschema);
});