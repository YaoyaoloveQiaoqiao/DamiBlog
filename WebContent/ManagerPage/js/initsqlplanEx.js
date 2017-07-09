function  initEx(dbid, sqlmember, sqlid, sqlhashid, startDate, endDate, sqlstmt, sqlstmt1, period){
	$(document).ready(
			function() {
				$("#btn_group_sqloverview button").each(
						function() {
							$(this).click(
									function() {
										$(this).addClass("active")
												.siblings().removeClass(
														"active");
									})
						});
			});

	var explain_sql = "";
	var pretty_sql = "";
	//alert("explain_sql");
	$(".select_schema").show();
	$("#explainsql").show();
	$("#advissql").show();
	$(document)
			.ready(
					function() {
						//alert(GetParam("sql_id"));
						var url = "/dbmon/DBMon_CurSQL_Detail?dbid="
								+ dbid + "&member="+sqlmember + "&sqlid=" + sqlid + "&sqlhashid=" + sqlhashid + "&starttime=" + startDate + "&endtime=" + endDate;
						//alert(explain_sql);
						
											if (sqlstmt) {
												$("#explainsql").css("display","block");
												explain_sql = sqlstmt1;
												$.session.set('explainSql',
														explain_sql);
												$.session.set('startDate',
														startDate);
												$.session.set('endDate',
														endDate);
												$.session.set('periodtopsql',
														period);
												// alert(data.Pretty_text);
												var Pretty_text = sqlstmt;
												var text=Pretty_text.trim();
												
												
												if(text.indexOf("CALL")>-1 && text.indexOf("CALL")<4){
													$(".select_schema").hide();
													$("#explainsql").hide();
													$("#advissql").hide();
												}
												
												Pretty_text = Pretty_text.replace("\n", "");
												Pretty_text = Pretty_text.replace("/\t/ig", "");
												Pretty_text = Pretty_text.replace(/\n/ig,"<br/>");
												Pretty_text = Pretty_text.replace(/  /ig,"&nbsp;&nbsp;");
												//alert(Pretty_text);
												/*var sInHtml = "<table  width='100%' class='table table-striped dataTable' role='grid' aria-describedby='example_info' border='1'>";

												sInHtml = sInHtml
														+ "<tr><td width='20%'>执行次数:</td><td width='13%'>"
														+ (d.NUM_EXECUTIONS == 'null' ? ''
																: d.NUM_EXECUTIONS)
														+ "</td>";
												sInHtml = sInHtml
														+ "    <td width='20%'>执行总时长(ms):</td><td width='14%'>"
														+ (d.TOTAL_EXEC_TIME == 'null' ? ''
																: d.TOTAL_EXEC_TIME)
														+ "</td>";
												sInHtml = sInHtml
														+ "    <td width='20%'>执行平均时长(ms):</td><td width='13%'>"
														+ (d.AVG_EXEC_TIME == 'null' ? ''
																: d.AVG_EXEC_TIME)
														+ "</td></tr>";
												sInHtml = sInHtml
														+ "<tr><td width='20%'>CPU总时长(μs):</td><td width='13%'>"
														+ (d.TOTAL_CPU_TIME == 'null' ? ''
																: d.TOTAL_CPU_TIME)
														+ "</td>";
												sInHtml = sInHtml
														+ "    <td width='20%'>CPU平均时长(μs):</td><td width='14%'>"
														+ (d.AVG_CPU_TIME == 'null' ? ''
																: d.AVG_CPU_TIME)
														+ "</td>";
												sInHtml = sInHtml
														+ "    <td width='20%'>总活动时长(ms):</td><td width='13%'>"
														+ (d.TOTAL_ACT_TIME == 'null' ? ''
																: d.TOTAL_ACT_TIME)
														+ "</td></tr>";
												sInHtml = sInHtml
														+ "<tr><td width='20%'>总等待时长(ms):</td><td width='13%'>"
														+ (d.TOTAL_ACT_WAIT_TIME == 'null' ? ''
																: d.TOTAL_ACT_WAIT_TIME)
														+ "</td>";
												sInHtml = sInHtml
														+ "    <td width='20%'>逻辑读次数:</td><td width='14%'>"
														+ (d.POOL_L_READS == 'null' ? ''
																: d.POOL_L_READS)
														+ "</td>";
												sInHtml = sInHtml
														+ "    <td width='20%'>物理读次数:</td><td width='13%'>"
														+ (d.POOL_P_READS == 'null' ? ''
																: d.POOL_P_READS)
														+ "</td></tr>";
												sInHtml = sInHtml
														+ "<tr><td width='20%'>物理写次数:</td><td width='13%'>"
														+ (d.POOL_WRITES == 'null' ? ''
																: d.POOL_WRITES)
														+ "</td>";
												sInHtml = sInHtml
														+ "    <td width='20%'>平均物理读时间(ms):</td><td width='14%'>"
														+ (d.POOL_P_READ_AVG_TIME == 'null' ? ''
																: d.POOL_P_READ_AVG_TIME)
														+ "</td>";
												sInHtml = sInHtml
														+ "    <td width='20%'>平均物理写时间(ms):</td><td width='13%'>"
														+ (d.POOL_WRITE_AVG_TIME == 'null' ? ''
																: d.POOL_WRITE_AVG_TIME)
														+ "</td></tr>";
												sInHtml = sInHtml
														+ "<tr><td width='20%'>读取行数:</td><td width='13%'>"
														+ (d.ROWS_READ == 'null' ? ''
																: d.ROWS_READ)
														+ "</td>";
												sInHtml = sInHtml
														+ "    <td width='20%'>返回行数:</td><td width='14%'>"
														+ (d.ROWS_RETURNED == 'null' ? ''
																: d.ROWS_RETURNED)
														+ "</td>";
												sInHtml = sInHtml
														+ "    <td width='20%'>修改行数:</td><td width='13%'>"
														+ (d.ROWS_MODIFIED == 'null' ? ''
																: d.ROWS_MODIFIED)
														+ "</td></tr>";
												sInHtml = sInHtml
														+ "<tr><td width='20%'>锁等待次数:</td><td width='13%'>"
														+ (d.LOCK_WAITS == 'null' ? ''
																: d.LOCK_WAITS)
														+ "</td>";
												sInHtml = sInHtml
														+ "    <td width='20%'>锁升级次数:</td><td width='14%'>"
														+ (d.LOCK_ESCALS == 'null' ? ''
																: d.LOCK_ESCALS)
														+ "</td>";
												sInHtml = sInHtml
														+ "    <td width='20%'>死锁次数:</td><td width='13%'>"
														+ (d.DEADLOCKS == 'null' ? ''
																: d.DEADLOCKS)
														+ "</td></tr>";

												sInHtml = sInHtml
														+ "</table>";*/
												window.document
														.getElementById("sql_stmt").innerHTML = Pretty_text;
/*												window.document
														.getElementById("sql_deltail").innerHTML = sInHtml;
												window.document
												.getElementById("sql_piechart_comparison").innerHTML = sInHtml;*/
												var  text=Pretty_text.toUpperCase();
												
											
												/*var opt = echarts.init(document.getElementById("sql_piechart"),'macarons');
												var option = {
														 title : {
														        x:'center'
														    },
														    tooltip : {
														        trigger: 'item',
														        formatter: "{a} <br/>{b} : {c} ({d}%)"
														    },
														    legend: {
														        orient: 'vertical',
														        left: 'left',
														    },
														    series : [
														        {
														            name: 'SQL时间开销分布',
														            type: 'pie',
														            radius : '45%',
														            center: ['50%', '50%'],
														            data:[
														                {value:parseInt(d.TOTAL_ACT_TIME - d.TOTAL_ACT_WAIT_TIME), name:'执行时间'},
														                {value:parseInt(d.LOCK_WAIT_TIME), name:'LOCK_WAIT_TIME'},
														                {value:parseInt(d.LOG_BUFFER_WAIT_TIME), name:'LOG_BUFFER_WAIT_TIME'},
														                {value:parseInt(d.LOG_DISK_WAIT_TIME), name:'LOG_DISK_WAIT_TIME'},
														                {value:parseInt(d.FCM_RECV_WAIT_TIME), name:'FCM_RECV_WAIT_TIME'},
														                {value:parseInt(d.FCM_SEND_WAIT_TIME), name:'FCM_SEND_WAIT_TIME'},
														                {value:parseInt(d.AUDIT_SUBSYSTEM_WAIT_TIME), name:'AUDIT_SUBSYSTEM_WAIT_TIME'},
														                {value:parseInt(d.EVMON_WAIT_TIME), name:'EVMON_WAIT_TIME'},
														                {value:parseInt(d.AUDIT_FILE_WRITE_WAIT_TIME), name:'AUDIT_FILE_WRITE_WAIT_TIME'},
														                {value:parseInt(d.DIAGLOG_WRITE_WAIT_TIME), name:'DIAGLOG_WRITE_WAIT_TIME'},
														                {value:parseInt(d.POOL_READ_TIME), name:'POOL_READ_TIME'},
														                {value:parseInt(d.POOL_WRITE_TIME), name:'POOL_WRITE_TIME'},
														                {value:parseInt(d.DIRECT_READ_TIME), name:'DIRECT_READ_TIME'},
														                {value:parseInt(d.DIRECT_WRITE_TIME), name:'DIRECT_WRITE_TIME'},
														                {value:parseInt(d.TOTAL_EXTENDED_LATCH_WAIT_TIME), name:'TOTAL_EXTENDED_LATCH_WAIT_TIME'},
														                {value:parseInt(d.PREFETCH_WAIT_TIME), name:'PREFETCH_WAIT_TIME'},
														                {value:parseInt(d.IDA_SEND_WAIT_TIME), name:'IDA_SEND_WAIT_TIME'},
														                {value:parseInt(d.IDA_RECV_WAIT_TIME), name:'IDA_RECV_WAIT_TIME'},
														                {value:parseInt(d.CF_WAIT_TIME), name:'CF_WAIT_TIME'},
														                {value:parseInt(d.RECLAIM_WAIT_TIME), name:'RECLAIM_WAIT_TIME'},
														                {value:parseInt(d.SPACEMAPPAGE_RECLAIM_WAIT_TIME), name:'SPACEMAPPAGE_RECLAIM_WAIT_TIME'},
														                {value:parseInt(d.OTHER_WAIT_TIME), name:'其它等待时间'}
														            ],
														            itemStyle: {
														            	normal:{
														            		
														            		borderColor : '#fff',
														            		borderWidth : 1,
														            		label:{
														                        show:true,
														                        formatter: '{b} : {c} ({d}%)'
														                        }
														                },
														            	
														                emphasis: {
														                    shadowBlur: 10,
														                    shadowOffsetX: 0,
														                    shadowColor: 'rgba(0, 0, 0, 0.5)'
														                }
														            }
														        }
														    ]
													};
												opt.setOption(option);*/

											}else{
												$("#explainsql").css("display","none");
												window.document
												.getElementById("sql_deltail").innerHTML="";
												window.document
												.getElementById("sql_piechart").innerHTML="";
												window.document
													.getElementById("sql_stmt").innerHTML="该SQL语句已经不在数据库Package Cache中，可以点击\"SQL历史分析\"查看该SQL的历史运行状况。";
											}

										
					});
}

function initsqlcomparison(dbid, sqlmember, sqlid, sqlhashid, startDate1, endDate1, startDate2, endDate2){
	$.ajax({
		url: "/dbmon/Dbmon_sql_chart_comparison",
		  type:"POST",
		  data: {dbid:GetParam("dbid"),sqlhashid:sqlhashid,sqlmember:sqlmember,startDate1:startDate1,endDate1:endDate1,startDate2:startDate2,endDate2:endDate2},
		  success: function(d){
			  var dataj=$.parseJSON(d);
			  var time1 = dataj.columns.categories;
			  var time2 = dataj.lines.categories;
			  var data1 = dataj.columns.data;
			  var data2 = dataj.lines.data;
			  var    option = {
			                  title: {
			                      text: '时间段对比图',
			                      x: 'center'
			                  },
			                  tooltip: {
							        trigger: 'axis',
							        formatter: function(params) {
								    	var str="";
								    	for(var i=0;i<params.length;i++){
								    		if(params[i].dataIndex>=0){
								    			
								    			str="时间:"+format4( new Date(params[i].data[0]))+"";
								    			break;
								    		}
								    	}
								    	var returnStr="";
								    	for(var i=0;i<params.length;i++){
								    		if(params[i].dataIndex >= 0){
								    			
								    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] ;
								    		}
								    	}
								    	
							            return str+returnStr;
							        },
							    },
			                  legend: {
			                      data:['流量','降雨量'],
			                      x: 'left'
			                  },
			                  grid: [{
			                      left: 50,
			                      right: 50,
			                      height: '35%'
			                  }, {
			                      left: 50,
			                      right: 50,
			                      top: '55%',
			                      height: '35%'
			                  }],
			                  xAxis : [
			                      {
			                          type : 'time',
			                          boundaryGap : false,
			                          axisLine: {onZero: true},
			                         // data: time1
			                      },
			                      {
			                          gridIndex: 1,
			                          type : 'time',
			                          boundaryGap : false,
			                          axisLine: {onZero: true},
			                          //data: time2,
			                          position: 'top'
			                      }
			                  ],
			                  yAxis : [
			                      {
			                          name : '缓冲池命中率',
			                          type : 'value',
			                          //max : 500
			                      },
			                      {
			                          gridIndex: 1,
			                          name : '缓冲池命中率',
			                          type : 'value',
			                          inverse: true
			                      }
			                  ],
			                  series : [
			                      {
			                          name:'时间靠前',
			                          type:'line',
			                          symbolSize: 8,
			                          hoverAnimation: false,
			                          data: data1
			                      },
			                      {
			                          name:'时间靠后',
			                          type:'line',
			                          xAxisIndex: 1,
			                          yAxisIndex: 1,
			                          symbolSize: 8,
			                          hoverAnimation: false,
			                          data: data2
			                      }
			                  ]
			              };
				var opt = echarts.init(document.getElementById(""),'macarons');
				opt.setOption(option);
		  }
	});
}