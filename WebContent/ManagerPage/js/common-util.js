/**
 */
var widthside;
function GetParam(name) {  
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r!=null) return unescape(r[2]); return null; 
}

function getDBlists(select){
	$.ajaxSettings.async = false;
	datas="";
	$.getJSON("/dbmon/GetSmallestDBIDServlet",function(data){
   		$.each(data,function(i,item){
    	   	$.each(item,function(k,v){
				datas+="<option value='"+k+"'>"+v+"</option>"
       		});
   		})
 	$("#"+select).html(datas);
	});
}	

function getAlertlists(select){
	$.ajaxSettings.async = false;
	datas="<option value='' selected>告警项</option>";
	$.getJSON("/dbmon/GlobalAlert_Get_Name_Item",function(data){
   		$.each(data,function(i,item){
    	   	$.each(item,function(k,v){
				datas+="<option value='"+v+"'>"+v+"</option>"
       		});
   		})
 	$("#"+select).html(datas);
	});
}	



function gethisdbid(){
	var dbids=[];
	$.ajaxSettings.async = false;
	$.getJSON("/dbmon/GetSmallestDBIDServlet",function(data){
		
   		$.each(data,function(i,item){
    	   	$.each(item,function(k,v){
				dbids.push({
					id:k,
					text:v[0]+"-"+v[1]+"("+v[3]+")"
				});
       		});
   		})
	});
	return dbids;
}


function getDBlistsAlert(select){
	$.ajaxSettings.async = false;
	datas="<option value=',' selected>数据库</option>";
	$.getJSON("/dbmon/GetSmallestDBIDServlet",function(data){
		
   		$.each(data,function(i,item){
    	   	$.each(item,function(k,v){
				datas+="<option value='"+v[2]+","+v[1]+"'>"+v[0]+"-"+v[1]+"("+v[3]+")</option>"
       		});
   		})
 	$("#"+select).html(datas);
	});
}

function getDBlistsReportNAlert(select){
	$.ajaxSettings.async = false;
	datas="";
	$.getJSON("/dbmon/GetSmallestDBIDServlet",function(data){
		
   		$.each(data,function(i,item){
    	   	$.each(item,function(k,v){
				datas+="<option value='"+k+"'>"+v[0]+"-"+v[1]+"("+v[3]+")</option>"
       		});
   		})
 	$("#"+select).html(datas);
	});
}

function getDBlistsAlert(select){
	$.ajaxSettings.async = false;
	datas="<option value=',' selected>数据库</option>";
	$.getJSON("/dbmon/GetSmallestDBIDServlet",function(data){
		
   		$.each(data,function(i,item){
    	   	$.each(item,function(k,v){
				datas+="<option value='"+k+"'>"+v[0]+"-"+v[1]+"("+v[3]+")</option>"
       		});
   		})
 	$("#"+select).html(datas);
	});
}


function getAlertCount(){
	 var  htmlobj=$.ajax({url:"DBMon_Alert_Table_Count",async:false});
	  $("#alertcount").html(htmlobj.responseText);
}

function getDbSizeSum(){
	 var  htmlobj=$.ajax({url:"Index_DB2_Sumsize",async:false});
	  $("#dbsumv").html(htmlobj.responseText);
}

function getBackCount(){
	 var  htmlobj=$.ajax({url:"Backup_Table_Backup_Count",async:false});
	  $("#backcount").html(htmlobj.responseText);
}



function getAlertCount(starttime,endtime){
	 var  htmlobj=$.ajax({url:"DBMon_Alert_Table_Count?starttime="+starttime+"&endtime="+endtime,async:false});
	  $("#alertcount").html(htmlobj.responseText);
}


function getBackCount(starttime,endtime){
	 var  htmlobj=$.ajax({url:"Backup_Table_Backup_Count?starttime="+starttime+"&endtime="+endtime,async:false});
	  $("#backcount").html(htmlobj.responseText);
}


function getDbSizeSum(starttime,endtime){
	 var  htmlobj=$.ajax({url:"Index_DB2_Sumsize?starttime="+starttime+"&endtime="+endtime,async:false});
	  $("#dbsumv").html(htmlobj.responseText);
}






function getDBlists2(select){
	
	$.ajaxSettings.async = false;
	var database="";
	var count =0;
	$.getJSON("/dbmon/GetSmallestDBIDServlet",function(data){
   		$.each(data,function(i,item){
    	   	$.each(item,function(k,v){
		count++;
		database+="<li><a href=\"\"><i class=\"fa fa-bars\"></i>"+v+"</a></li>";
       		});
   		})
 		$("#"+select).html(database);
	});
	return  count;
}
function getmax(){
	var selectI=document.getElementsByName("item");
	var arrayItem=new Array();
	var count=0;
	for(var i=0;i<selectI.length;i++){
		if(selectI[i].checked){
			arrayItem[count]=selectI[i].value+","+selectI[i].text; 
			count++;
		}
	} 
//	$.cookie("array",arrayItem);
}


function showInnerNav(dbid){
	var  urldb="../DB2/";
	if(window.location.href.indexOf("ora_")>=0){
		urldb="/dbmon/oracle/ora_";
	}else if(window.location.href.indexOf("mysql_")>=0){
		urldb="/dbmon/mysql/mysql_";
	}else if(window.location.href.indexOf("sqlserver_")>=0){
		urldb="/dbmon/sqlserver/sqlserver_";
	}else if(window.location.href.indexOf("hana_")>=0){
		urldb="/dbmon/hana/hana_";
	}
	
	document.write("<ul class=\"nav nav-tabs main-tabs\">");
	document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_basicinfo.html?dbid="+ dbid + "\">基本信息</a></li>");
	document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_property.html?dbid=" + dbid + "\">数据库参数</a></li>");
	document.write("<li role=\"presentation\" ><a href=\""+urldb+"dbmon_conn.html?dbid=" + dbid + "\">工作负载</a></li>");
	
	if(urldb=="../DB2/"){	
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_perf.html?dbid=" + dbid + "\">性能</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_hardware.html?dbid=" + dbid + "\">主机</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_storage.html?dbid=" + dbid + "\">容量</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_topsql.html?dbid=" + dbid + "\">TOP SQL</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_diaglog.html?dbid=" + dbid + "\">诊断日志</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_perfscore.html?dbid=" + dbid + "\">性能评分</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_daily_report.html?dbid=" + dbid + "\">数据库日报</a></li>");
	}

	if(window.location.href.indexOf("ora_")>=0){	
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_perf.html?dbid=" + dbid + "\">性能</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_hardware.html?dbid=" + dbid + "\">主机</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_storage.html?dbid=" + dbid + "\">存储</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_topsql.html?dbid=" + dbid + "\">TOP SQL</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_bigtable.html?dbid=" + dbid + "\">表分析</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_singletable_analysis.html?dbid=" + dbid + "\">单表分析</a></li>");
	}

	
	if(window.location.href.indexOf("mysql_") >= 0){
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_cache.html?dbid=" + dbid + "\">缓存</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_innodb.html?dbid=" + dbid + "\">InnoDB</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_topsql.html?dbid=" + dbid + "\">TOP SQL</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_bigtable.html?dbid=" + dbid + "\">表分析</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_diaglog.html?dbid=" + dbid + "\">日志</a></li>");
	}
	
	if(window.location.href.indexOf("sqlserver_")>=0){
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_perf.html?dbid=" + dbid + "\">性能</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_hardware.html?dbid=" + dbid + "\">主机</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_topsql.html?dbid=" + dbid + "\">TOP SQL</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_bigtable.html?dbid=" + dbid + "\">表分析</a></li>");
	}
	
	if(window.location.href.indexOf("hana_") >= 0){
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_perf.html?dbid=" + dbid + "\">性能</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_hardware.html?dbid=" + dbid + "\">主机</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_storage.html?dbid=" + dbid + "\">容量</a></li>");//之后可能改为容量
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_backup.html?dbid=" + dbid + "\">备份</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_diaglog.html?dbid=" + dbid + "\">诊断日志</a></li>");
		document.write("<li role=\"presentation\"><a href=\""+urldb+"dbmon_alert.html?dbid=" + dbid + "\">告警</a></li>");
	}
	
	
	
	document.write("</ul>");//ul标签结尾
	var isHADR = false;
	
	if(window.location.href.indexOf("ora_")<0 && window.location.href.indexOf("mysql_")<0
			&& window.location.href.indexOf("sqlserver_")<0 && window.location.href.indexOf("hana_") < 0){
		$.ajaxSettings.async = true;
		$.getJSON("/dbmon/IsHADRServlet?dbid="+dbid,function(data){
	   		$.each(data,function(i,item){
	    	   	$.each(item,function(k,v){
					//alert(k);
					isHADR = v;
					if(isHADR == "true") {
						if(window.location.href.indexOf("dbmon_hadr.html")>-1){
							$(".main-tabs").append("<li role=\"presentation\" class=\"active\"><a href=\"../DB2/dbmon_hadr.html?dbid=" + dbid + "\">HADR</a></li>");
						}else{
							$(".main-tabs").append("<li role=\"presentation\"><a href=\"../DB2/dbmon_hadr.html?dbid=" + dbid + "\">HADR</a></li>");
						}
			 		} 
	       		});
	   		})
		});
	}
	
//	if(window.location.href.indexOf("sqlserver_") >= 0){
//		
//	}
	
}

function CreatStorNav(dbid){
	var div = document.getElementById("StorNav");
	var ul = document.createElement("<ul class=\"nav nav-tabs\" role=\"tablist\" style=\"margin-bottom: 5px;\"></ul>");
	var li1= document.createElement("<li role=\"presentation\" class=\"active\"><a href=\"#db\" role=\"tab\" data-toggle=\"tab\">数据库</a></li>");
	var li2= document.createElement("<li role=\"presentation\"><a href=\"#tbs\" role=\"tab\" data-toggle=\"tab\">表空间</a></li>");
	var li3= document.createElement("<li role=\"presentation\"><a href=\"#tabinfo\" role=\"tab\" data-toggle=\"tab\">表分析</a></li>");
	var li4= document.createElement("<li role=\"presentation\"><a href=\"../DB2/dbmon_singletable_analysis.html?dbid=" + dbid + "\"  role=\"tab\" data-toggle=\"tab\">单表分析</a></li>");
	div.appendChild(ul);
	ul.appendChild(li1);
	ul.appendChild(li2);
	ul.appendChild(li3);
	ul.appendChild(li4);

	
	
	
}

function showTopNav() {
	var db_status = [];//X轴数据集
	var db_name = [];//Y轴数据集	
	var db_id = [];
	
	function getDBlist(){
		$.ajaxSettings.async = false;
		$.getJSON("/dbmon/GetSmallestDBIDServlet",function(data){
	   		$.each(data,function(i,item){
	    	   	$.each(item,function(k,v){
	       			db_id.push(k);
	           		db_name.push(v);
	       		});
	   		})
	    	//console.log(xset); 
			//console.log(yset);
			//showLeftNav(xset,yset);
		});
	}	
	
	function draw() {
		document.write("<nav class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">");
		document.write("<div class=\"container-fluid\">");
		document.write("<div class=\"navbar-header\" style=\"text-align:center;\">");
//	    document.write("<button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-expanded=\"false\" aria-controls=\"navbar\">");
//	    document.write("<span class=\"sr-only\">Toggle navigation</span>");
//	    document.write("<span class=\"icon-bar\"></span>");
//	    document.write("<span class=\"icon-bar\"></span>");
//	    document.write("<span class=\"icon-bar\"></span>");	    
//	    document.write("</button>");
	    document.write("<a class=\"navbar-brand\"><img src=\"/dbmon/Common_Plugin/img/logo_inverse.png\" height=\"39\" width=\"186\"></a>");
	    //document.write("<img src=\"./img/logo_inverse.png\" height=\"70%\" width=\"70%\"> ");
	    document.write("</div>");
	    document.write("<div id=\"navbar\" class=\"navbar-collapse collapse\">");
	    document.write("<ul class=\"nav navbar-nav navbar-left\">");
	    document.write("<li><a href=\"/dbmon/DB2/home.html\">首页</a></li>");
	    document.write("<li><a href=\"/dbmon/DB2/cockpitNew.html\">仪表盘</a></li>");
		document.write("<li><a href=\"/dbmon/DB2/global_alert.html\">全局报警</a></li>");
	    document.write("<li><a href=\"/dbmon/DB2/backup.html\">备份</a></li>");
	    document.write("<li><a href=\"/dbmon/DB2/database_report.html\" >报表</a></li>");
	    document.write("<li><a href=\"/dbmon/PC/home.html\" >性能</a></li>");
	    document.write("<li><a href=\"/dbmon/PC/db2sizeoverview.html\" >容量</a></li>");
	   
	    document.write("<li class=\"dropdown\">");
	    document.write("<a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\" role=\"button\" aria-expanded=\"false\">配置<span class=\"caret\"></span></a>");
	    document.write("<ul class=\"dropdown-menu\" role=\"menu\">");
	    document.write("<li><a href=\"/dbmon/DB2/config_user.html\">用户配置</a></li>");
        document.write("<li><a href=\"/dbmon/DB2/config_group.html\">数据库组配置</a></li>");
	    document.write("<li><a href=\"/dbmon/DB2/config_db.html\">数据库配置</a></li>");
	    document.write("<li><a href=\"/dbmon/DB2/config_system.html\">系统配置</a></li>");
	    document.write("<li><a href=\"/dbmon/DB2/config_license.html\">授权配置</a></li>");
	    document.write("<li><a href=\"/dbmon/DB2/config_his_mgmt.html\">历史数据管理</a></li>");
	    document.write("<li><a href=\"/dbmon/DB2/config_monconf.html\">监控项配置管理</a></li>");
	    
	    document.write("</ul>");
	    document.write("</li>");
	    document.write("<li><a href=\"/dbmon/DB2/about.html\">关于</a></li>");
	    document.write("</ul>");
	    document.write("<p class=\"navbar-text pull-right\">");
	    document.write("<span class=\"glyphicon glyphicon-user\" aria-hidden=\"true\"></span>&nbsp; " + current_user + " &nbsp; <a href=\"../LogOut\" class=\"navbar-link\">登出</a>");
	    document.write("</p>");
	    document.write("</div>");
	    document.write("</div>");
	    document.write("</nav>");
	}
	
	getDBlist();		
	draw();
	
}

function database(id,item){
	this.id=id;
	this.DBALIAS=item[0];
	this.DBTYPE=item[1];
	this.INSTANCENAME=item[2];
	this.IP=item[3];
	this.type=item[4];
	this.DBNAME=item[5];
}


function showLeftNav(url) {
	var db_status = [];//X轴数据集
	var db_name = [];//Y轴数据集	
	var db_id = [];
	var db_info=[];
	function getDBlist(){
		$.ajaxSettings.async = false;
		$.getJSON("/dbmon/GetDBInfoServlet",function(data){
	   		$.each(data,function(i,item){
				db_id.push(i);
				db_info.push(new database(i,item));
	    	   	$.each(item,function(k,v){
//	           		db_name.push(v);
	       		});
	   		})
		});
	}

	function draw() {
		
		var isDB2 = false;
		var isOracle = false;
		var isMysql = false;
		var isSqlServer = false;
		var isHana = false;
		for(var i=0;i<db_info.length;i++){
			if(db_info[i].type.trim()=='DB2'){
				isDB2 = true;
			}
			if(db_info[i].type.trim()=='ORACLE'){
				isOracle = true;
			}
			if(db_info[i].type.trim()=='MySQL'){
				isMysql = true;
			}
			if(db_info[i].type.trim()=='SQLSERVER'){
				isSqlServer = true;
			}
			if(db_info[i].type.trim()=='HANA'){
				isHana = true;
			}
		}
		
		document.write("<div id=\"tree\" style='' > <ul class=\"nav  \">");
		document.write("<li>");
		document.write("<a href=\"/dbmon/DB2/home.html\"><i class=\"glyphicon glyphicon-home \"></i><span class='content'>&nbsp;&nbsp;总览</span></a>");
		document.write("</li>");
		document.write("<li class=\"parent_li\"><a id=\"database\"  class=\"\" style='width:80%' href=\"# \"><i class=\"glyphicon glyphicon-bookmark  \">" +
				//"</i><span class='content'>&nbsp;&nbsp;数据库</span></a><select class='js-example-data-array' style=''	id='databseselect'></select><div  class=\"angle\" style=\"position: absolute;left: 81%;top: 0px;\"><i  class=\"fa fa-angle-down\"  ></i></div>");
				"</i><span class='content'>&nbsp;&nbsp;数据库</span></a><div  class=\"angle\" style=\"position: absolute;left: 81%;top: 0px;\"><i  class=\"fa fa-angle-down\"  ></i></div>");
		if(isDB2){
			document.write("<ul  class=\"nav databaseul\" id='DB2ul'>");
			document.write("<li class=\"parent_li\"><a id=\"database\"  class=\"\" style='width:72%' href=\"/dbmon/DB2/home_db2.html\"><i class=\"glyphicon glyphicon-tags \">" +
			"</i><span class='content'>&nbsp;&nbsp;DB2</span></a><div  class=\"angle\" style=\"position: absolute;left: 72%;top: 0px;\"><i  class=\"fa fa-angle-left\"  ></i></div>");
			document.write("<ul  class=\"nav\" id='db2content'>");
			document.write("</ul>");
			document.write("</li>");
			document.write("</ul>");
		}
		if(isOracle){
			document.write("<ul  class=\"nav databaseul\" id='ORACLEul'>");
			document.write("<li class=\"parent_li\"><a id=\"database\"  class=\"\" style='width:72%' href=\"/dbmon/oracle/ora_home.html\"><i class=\"glyphicon glyphicon-tag \">" +
			"</i><span class='content'>&nbsp;&nbsp;ORACLE</span></a><div  class=\"angle\" style=\"position: absolute;left: 72%;top: 0px;\"><i  class=\"fa fa-angle-left\"  ></i></div>");
			document.write("<ul  class=\"nav\" id='oraclecontent'>");
			document.write("</ul>");
			document.write("</li>");
			document.write("</ul>");
		}
		if(isMysql){
			document.write("<ul  class=\"nav databaseul\" id='MYSQLul'>");
			document.write("<li class=\"parent_li\"><a id=\"database\"  class=\"\" style='width:72%' href=\"/dbmon/mysql/mysql_home.html\"><i class=\"glyphicon glyphicon-tag \">" +
			"</i><span class='content'>&nbsp;&nbsp;MySQL</span></a><div  class=\"angle\" style=\"position: absolute;left: 72%;top: 0px;\"><i  class=\"fa fa-angle-left\"  ></i></div>");
			document.write("<ul  class=\"nav\" id='mysqlcontent'>");
			document.write("</ul>");
			document.write("</li>");
			document.write("</ul>");
		}if(isSqlServer){
			document.write("<ul  class=\"nav databaseul\" id='SQLSERVERul'>");
			document.write("<li class=\"parent_li\"><a id=\"database\"  class=\"\" style='width:72%' href=\"/dbmon/sqlserver/sqlserver_home.html\"><i class=\"glyphicon glyphicon-tag \">" +
			"</i><span class='content'>&nbsp;&nbsp;SQLSERVER</span></a><div  class=\"angle\" style=\"position: absolute;left: 72%;top: 0px;\"><i  class=\"fa fa-angle-left\"  ></i></div>");
			document.write("<ul  class=\"nav\" id='sqlservercontent'>");
			document.write("</ul>");
			document.write("</li>");
			document.write("</ul>");
		}
		if(isHana){
			document.write("<ul  class=\"nav databaseul\" id='HANARul'>");
			document.write("<li class=\"parent_li\"><a id=\"database\"  class=\"\" style='width:72%' href=\"#\"><i class=\"glyphicon glyphicon-tag \">" +
			"</i><span class='content'>&nbsp;&nbsp;HANA</span></a><div  class=\"angle\" style=\"position: absolute;left: 72%;top: 0px;\"><i  class=\"fa fa-angle-left\"  ></i></div>");
			document.write("<ul  class=\"nav\" id='hanacontent'>");
			document.write("</ul>");
			document.write("</li>");
			document.write("</ul>");
		}
		
		document.write("</li>");
		document.write("</div>");
		document.write("</ul>");
		document.write("<div id=\"in\" class='' style='width:12px;float: right;height:99%; '>");
		document.write("<li class='leftin'>");
		document.write("<a> <i id='showminileft' class=\"glyphicon glyphicon-chevron-left\" style='cursor:pointer;color: #7B7B7B; position: relative; top: 18px;border-radius: 2px;'></i></a>");
		document.write("</li>");
		document.write("</div>");
		document.write("<ul id=\"rightss\" style=\"position:fixed; bottom:0;\"><a href=http://www.newdt.cn target=_blank>新数科技</a>©版权所有</ul>");
		
		
		var instname="";
		var instnameOra="";
		var tempNameOra="";
		var dbnameForOracle="";
		var ip="";
		var ipOra="";
		var page="instance_single.html";
		var pageOra="";
		var  tempName ="";
		var tempNameOra=""
		var appendForDB="";
		var appendForORACLE="";
		var appendForMYSQL="";
		
		var instnameMySQL="";
		var ipMySQL="";
		var pageMySQL="";
		var tempNameMySQL="";
		var appendForMySQL="";
		
		var instnameSqlServer="";
		var ipSqlServer="";
		var pageSqlServer="";
		var tempNameSqlServer="";
		var appendForSqlServer=""; 
		
		var instnameHana="";
		var ipHana="";
		var pageHana="";
		var tempNameHana="";
		var appendForHana=""; 
		
		for(var i=0;i<db_info.length;i++){
			if(db_info[i].type.trim()=='DB2'){
				if(instname.indexOf(db_info[i].INSTANCENAME+db_info[i].IP)<0 ){
					tempName=db_info[i].IP+"-"+db_info[i].INSTANCENAME;
					if(db_info[i].DBTYPE=="PURESCALE"){
						page="/dbmon/DB2/instance_purescale.html";
					}else if(db_info[i].DBTYPE=="NORMAL"){
						page="/dbmon/DB2/instance_single.html";
					}else{
						page="/dbmon/DB2/instance_single.html";
					}
					if(tempName.length>15){
						tempName=db_info[i].IP+"";
					}
					appendForDB+="<li class=\"parent_li\" id=\""+db_info[i].INSTANCENAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")+"\" title=\""+db_info[i].IP+"-"+db_info[i].INSTANCENAME+"\" style=\"display: none;\"><a " +
						"class=\"instance col-md-7\" href=\""+page+"?dbid="
						+db_info[i].id+"\" style='padding-right:0px'><i class=\"glyphicon glyphicon-list \"  ></i><span class='content'>&nbsp;&nbsp;"+tempName
						+"</span></a><div class=\"angle col-md-3\" id=\"rotate1\"style=\"font-size:14\"><i  class=\"fa fa-angle-left\"></i></div></li>";
					instname+=db_info[i].INSTANCENAME+db_info[i].IP+",";
					ip+=db_info[i].IP+",";
				}else if(ip.indexOf(db_info[i].IP)<0){
					if(db_info[i].DBTYPE=="PURESCALE"){
						page="/dbmon/instance_purescale.html";
					}else if(db_info[i].DBTYPE=="NORMAL"){
						page="/dbmon/instance_single.html";
					}else{
						page="/dbmon/instance_single.html";
					}
					appendForDB+="<li class=\"parent_li\" id=\""+db_info[i].INSTANCENAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")+"\" title=\""+db_info[i].IP+"\"  style=\"display: none;\"><a " +
							"class=\"instance col-md-7\" href=\""+page+"?dbid="
							+db_info[i].id+"\"><i class=\"glyphicon glyphicon-list \"  ></i><span class='content'>&nbsp;&nbsp;"+db_info[i].INSTANCENAME
							+"</span></a><div class=\"angle col-md-3\" id=\"rotate1\"style=\"font-size:14\"><i  class=\"fa fa-angle-left\"></i></div></li>";
						instname+=db_info[i].INSTANCENAME+db_info[i].IP+",";
						ip+=db_info[i].IP+",";
				}
				
			}else if(db_info[i].type.trim()=='ORACLE'){
					if(instnameOra.indexOf(db_info[i].IP)<0){
					tempNameOra=db_info[i].IP+"-"+db_info[i].INSTANCENAME;
					pageOra="/dbmon/oracle/ora_instance_single.html";
					appendForORACLE+="";
					if(tempNameOra.length>15){
						tempNameOra=db_info[i].IP+"";
					}
					appendForORACLE+="<li class=\"parent_li\" id=\""+db_info[i].IP.replace(new RegExp('\\.','g'),"")+"\" title=\""+db_info[i].IP+"\" style=\"display: none;\"><a " +
						"class=\"instance col-md-7\" href=\""+pageOra+"?dbid="
						+db_info[i].id+"\" style='padding-right:0px'><i class=\"glyphicon glyphicon-list \"  ></i><span class='content'>&nbsp;&nbsp;"+tempNameOra
						+"</span></a><div class=\"angle col-md-3\" id=\"rotate1\"style=\"font-size:14\"><i  class=\"fa fa-angle-left\"></i></div></li>";
					instnameOra+=db_info[i].DBNAME+db_info[i].IP+",";
					ipOra+=db_info[i].IP+",";
				}else if(ipOra.indexOf(db_info[i].IP)<0){
					appendForORACLE+="<li class=\"parent_li\" id=\""+db_info[i].DBNAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")+"\" title=\""+db_info[i].IP+"\"  style=\"display: none;\"><a " +
					"class=\"instance col-md-7\" href=\""+pageOra+"?dbid="
					+db_info[i].id+"\"><i class=\"glyphicon glyphicon-list \"  ></i><span class='content'>&nbsp;&nbsp;"+db_info[i].INSTANCENAME
					+"</span></a><div class=\"angle col-md-3\" id=\"rotate1\"style=\"font-size:14\"><i  class=\"fa fa-angle-left\"></i></div></li>";
					instnameOra+=db_info[i].DBNAME+db_info[i].IP+",";
					ipOra+=db_info[i].IP+",";
				}
			}else if(db_info[i].type.trim()=='MySQL'){
				if(instnameMySQL.indexOf(db_info[i].DBNAME+db_info[i].IP)<0){
					tempNameMySQL=db_info[i].IP+"-"+db_info[i].DBNAME;
					//pageMySQL="/dbmon/MySQL/mysql_instance_single.html";
					
					//pageMySQL="/dbmon/mysql/mysql_dbmon_basicinfo.html";

					pageMySQL="#";
					appendForMySQL+="";
					if(tempNameMySQL.length>15){
						tempNameMySQL=db_info[i].IP+"";
					}
					appendForMySQL+="<li class=\"parent_li\" id=\""+db_info[i].DBNAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")+"\" title=\""+db_info[i].IP+"-"+db_info[i].DBNAME+"\" style=\"display: none;\"><a " +
					"class=\"instance col-md-7\" href=\""+pageMySQL+"?dbid="
					+db_info[i].id+"\" style='padding-right:0px'><i class=\"glyphicon glyphicon-list \"  ></i><span class='content'>&nbsp;&nbsp;"+tempNameMySQL
					+"</span></a><div class=\"angle col-md-3\" id=\"rotate1\"style=\"font-size:14\"><i  class=\"fa fa-angle-left\"></i></div></li>";
					instnameMySQL+=db_info[i].DBNAME+db_info[i].IP+",";
					ipMySQL+=db_info[i].IP+",";	
				}else if(ipMySQL.indexOf(db_info[i].IP)<0){
					appendForMySQL+="<li class=\"parent_li\" id=\""+db_info[i].DBNAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")+"\" title=\""+db_info[i].IP+"\"  style=\"display: none;\"><a " +
					"class=\"instance col-md-7\" href=\""+pageMySQL+"?dbid="
					+db_info[i].id+"\"><i class=\"glyphicon glyphicon-list \"  ></i><span class='content'>&nbsp;&nbsp;"+db_info[i].DBNAME
					+"</span></a><div class=\"angle col-md-3\" id=\"rotate1\"style=\"font-size:14\"><i  class=\"fa fa-angle-left\"></i></div></li>";
					instnameMySQL+=db_info[i].DBNAME+db_info[i].IP+",";
					ipMySQL+=db_info[i].IP+",";
				}
			} else if(db_info[i].type.trim()=='SQLSERVER'){
				if(instnameSqlServer.indexOf(db_info[i].INSTANCENAME+db_info[i].IP)<0){
					tempNameSqlServer=db_info[i].IP+"-"+db_info[i].INSTANCENAME;
					pageSqlServer="/dbmon/sqlserver/sqlserver_instance_single.html";
					appendForSqlServer+="";
					if(tempNameSqlServer.length>15){
						tempNameSqlServer=db_info[i].IP+"";
					}
					appendForSqlServer+="<li class=\"parent_li\" id=\""+db_info[i].INSTANCENAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")+"\" title=\""+db_info[i].IP+"-"+db_info[i].INSTANCENAME+"\" style=\"display: none;\"><a " +
					"class=\"instance col-md-7\" href=\""+pageSqlServer+"?dbid="
					+db_info[i].id+"\" style='padding-right:0px'><i class=\"glyphicon glyphicon-list \"  ></i><span class='content'>&nbsp;&nbsp;"+tempNameSqlServer
					+"</span></a><div class=\"angle col-md-3\" id=\"rotate1\"style=\"font-size:14\"><i  class=\"fa fa-angle-left\"></i></div></li>";
					instnameSqlServer+=db_info[i].INSTANCENAME+db_info[i].IP+",";
					ipSqlServer+=db_info[i].IP+",";	
				}else if(ipSqlServer.indexOf(db_info[i].IP)<0){
					appendForSqlServer+="<li class=\"parent_li\" id=\""+db_info[i].INSTANCENAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")+"\" title=\""+db_info[i].IP+"\"  style=\"display: none;\"><a " +
					"class=\"instance col-md-7\" href=\""+pageSqlServer+"?dbid="
					+db_info[i].id+"\"><i class=\"glyphicon glyphicon-list \"  ></i><span class='content'>&nbsp;&nbsp;"+db_info[i].INSTANCENAME
					+"</span></a><div class=\"angle col-md-3\" id=\"rotate1\"style=\"font-size:14\"><i  class=\"fa fa-angle-left\"></i></div></li>";
					instnameSqlServer+=db_info[i].INSTANCENAME+db_info[i].IP+",";
					ipSqlServer+=db_info[i].IP+",";
				}
			} else if(db_info[i].type.trim()=='HANA'){

				if(instnameHana.indexOf(db_info[i].INSTANCENAME+db_info[i].IP)<0){
					tempNameHana=db_info[i].IP+"-"+db_info[i].INSTANCENAME;
					pageHana="/dbmon/hana/hana_instance.html";
					appendForHana+="";
					if(tempNameHana.length>10){
						tempNameHana=db_info[i].IP+"";
					}
					appendForHana+="<li class=\"parent_li\" id=\""+db_info[i].INSTANCENAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")+"\" title=\""+db_info[i].IP+"-"+db_info[i].INSTANCENAME+"\" style=\"display: none;\"><a " +
					"class=\"instance col-md-7\" href=\""+pageHana+"?dbid="
					+db_info[i].id+"\" style='padding-right:0px'><i class=\"glyphicon glyphicon-list \"  ></i><span class='content'>&nbsp;&nbsp;"+tempNameHana
					+"</span></a><div class=\"angle col-md-3\" id=\"rotate1\"style=\"font-size:14\"><i  class=\"fa fa-angle-left\"></i></div></li>";
					instnameHana+=db_info[i].INSTANCENAME+db_info[i].IP+",";
					ipHana+=db_info[i].IP+",";	
				}else if(ipHana.indexOf(db_info[i].IP)<0){
					appendForHana+="<li class=\"parent_li\" id=\""+db_info[i].INSTANCENAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")+"\" title=\""+db_info[i].IP+"\"  style=\"display: none;\"><a " +
					"class=\"instance col-md-7\" href=\""+pageHana+"?dbid="
					+db_info[i].id+"\"><i class=\"glyphicon glyphicon-list \"  ></i><span class='content'>&nbsp;&nbsp;"+db_info[i].INSTANCENAME
					+"</span></a><div class=\"angle col-md-3\" id=\"rotate1\"style=\"font-size:14\"><i  class=\"fa fa-angle-left\"></i></div></li>";
					instnameHana+=db_info[i].INSTANCENAME+db_info[i].IP+",";
					ipHana+=db_info[i].IP+",";
				}
			
				
			} 
			
			
		}
		$("#db2content").append(appendForDB);
		$("#oraclecontent").append(appendForORACLE);
		$("#sqlservercontent").append(appendForSqlServer);
		$("#mysqlcontent").append(appendForMySQL);
		$("#hanacontent").append(appendForHana);
//		alert(instname+"   "+ip.replace(new RegExp('\\.','g'),"")+" "+new RegExp('\\.'));
		for(var i=0;i<db_info.length;i++){
			var x;
			var urlDB2 = url;
			var urlOracle = url;
			var urlMySQL = url;
			var urlSqlServer = url;
			var urlHana = url;
			//性能评分//数据库日报
			//dbmon_perfscore.html//dbmon_daily_report.html
			
			//DB2中没有的模块
			if(db_info[i].type.trim()=='DB2'){
				if(url.indexOf('./dbmon_bigtable.html') > -1  ){
						urlDB2 = 'dbmon_basicinfo.html';
				}
			}
			
			//hadr
			if(url.indexOf('./dbmon_hadr.html') > -1){
				if(db_info[i].id != GetParam("dbid")){
					urlDB2    = 'dbmon_basicinfo.html';
				}
				urlOracle    = 'dbmon_basicinfo.html';
				urlSqlServer = 'dbmon_basicinfo.html';
				urlMySQL     = 'dbmon_basicinfo.html';
				urlHana ='dbmon_basicinfo.html';
				
			}
			
			//告警历史
			if(url.indexOf('./dbmon_alert_history.html') > -1){
				
				urlDB2    = 'dbmon_basicinfo.html';
				urlOracle    = 'dbmon_basicinfo.html';
				urlSqlServer = 'dbmon_basicinfo.html';
				urlMySQL     = 'dbmon_basicinfo.html';
				urlHana ='dbmon_basicinfo.html';
				
			}
			
		
			
			//oracle中没有诊断日志//性能评分//数据库日报模块
			if(db_info[i].type.trim()=='ORACLE'){
				if(url.indexOf('./dbmon_diaglog.html') > -1 || url.indexOf('./dbmon_perfscore.html') > -1 
						|| url.indexOf('./dbmon_daily_report.html') > -1 ){
					urlOracle = 'dbmon_basicinfo.html';
				}
			}
			
			//sqlserver中没有诊断日志模块、单表分析模块、存储//性能评分//数据库日报模块
			if(db_info[i].type.trim()=='SQLSERVER'){
				if(url.indexOf('./dbmon_diaglog.html') > -1 || url.indexOf('./dbmon_storage.html') > -1 
						|| url.indexOf('./dbmon_perfscore.html') > -1 || url.indexOf('./dbmon_daily_report.html') > -1 ){
					urlSqlServer = 'dbmon_basicinfo.html';
				}
			}
			
			if(db_info[i].type.trim()=='MySQL'){
				if((url.indexOf('./dbmon_perf.html') > -1) || (url.indexOf('./dbmon_hardware.html') > -1) 
						|| (url.indexOf('./dbmon_storage.html') > -1) 
						|| (url.indexOf('./dbmon_perfscore.html') > -1)|| (url.indexOf('./dbmon_daily_report.html') > -1)){
					urlMySQL = 'dbmon_basicinfo.html';
				}
				
			}
			
			//HANA中没有的模块
			if(db_info[i].type.trim()=='HANA' ){
				if(url.indexOf('./dbmon_bigtable.html') > -1  || url.indexOf('./dbmon_topsql.html') > -1 
						|| url.indexOf('./dbmon_perfscore.html') > -1 || url.indexOf('./dbmon_daily_report.html') > -1){
						urlHana ='dbmon_basicinfo.html';
				}
			}
			
			//只有mysql有的
			if((url.indexOf('./dbmon_cache.html') > -1) || (url.indexOf('./dbmon_innodb.html') > -1)){
				
					urlDB2 = 'dbmon_basicinfo.html';
					urlOracle = 'dbmon_basicinfo.html';
					urlSqlServer = 'dbmon_basicinfo.html';
					urlHana ='dbmon_basicinfo.html';
			}
			
			//单表分析只有Oracle有
			if(url.indexOf('./dbmon_singletable_analysis.html') > -1){
				
				urlDB2 = 'dbmon_basicinfo.html';
				urlMySQL = 'dbmon_basicinfo.html';
				urlSqlServer = 'dbmon_basicinfo.html';
				urlHana ='dbmon_basicinfo.html';
			}
			
			//告警,备份只有HANA有
			if(url.indexOf('./dbmon_alert.html') > -1 || url.indexOf('./dbmon_backup.html') > -1){
				
				urlDB2 = 'dbmon_basicinfo.html';
				urlMySQL = 'dbmon_basicinfo.html';
				urlOracle ='dbmon_basicinfo.html';
				urlSqlServer = 'dbmon_basicinfo.html';
				
			}
			
			
			
			if(db_info[i].type=="ORACLE"){
				x="/dbmon/oracle/ora_"+urlOracle.substring(urlOracle.indexOf("/")+1);
				var str="<ul  class=\"nav  \">"
					+"<li id=\""+db_info[i].id+"li\" class=\"col-md-8\"  style=\"list-style-type :none; display: none\" title=\""+db_info[i].IP+"-"+db_info[i].INSTANCENAME+"\">"
					+"<a id=\""+db_info[i].id+"\" class=\"\" href="+x+"?dbid=" +db_info[i].id + ">"
					+"<i class=\"fa fa-database \" ></i>&nbsp;&nbsp;" + db_info[i].DBALIAS + "</a></li></ul>";
				$("#"+db_info[i].IP.replace(new RegExp('\\.','g'),"")).append(str);
			}else if(db_info[i].type=="DB2"){
				x="../DB2/"+urlDB2;
				var str="<ul  class=\"nav  \">"
					+"<li id=\""+db_info[i].id+"li\" class=\"col-md-8\"  style=\"list-style-type :none; display: none\">"
					+"<a id=\""+db_info[i].id+"\" class=\"\" href="+x+"?dbid=" +db_info[i].id +">"
					+"<i class=\"fa fa-database \" ></i>&nbsp;&nbsp;" + db_info[i].DBALIAS + "</a></li></ul>";
				$("#"+db_info[i].INSTANCENAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")).append(str);
			}else if(db_info[i].type=="MySQL"){
				x="/dbmon/mysql/mysql_"+urlMySQL.substring(urlMySQL.indexOf("/")+1);
				var str="<ul  class=\"nav  \">"
					+"<li id=\""+db_info[i].id+"li\" class=\"col-md-8\"  style=\"list-style-type :none; display: none\">"
					+"<a id=\""+db_info[i].id+"\" class=\"\" href="+x+"?dbid=" +db_info[i].id + ">"
					+"<i class=\"fa fa-database \" ></i>&nbsp;&nbsp;" + db_info[i].DBALIAS + "</a></li></ul>";
				$("#"+db_info[i].DBNAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")).append(str);
			}else if(db_info[i].type=="SQLSERVER"){
				x="/dbmon/sqlserver/sqlserver_"+urlSqlServer.substring(urlSqlServer.indexOf("/")+1);
				var str="<ul  class=\"nav  \">"
					+"<li id=\""+db_info[i].id+"li\" class=\"col-md-8\"  style=\"list-style-type :none; display: none\">"
					+"<a id=\""+db_info[i].id+"\" class=\"\" href="+x+"?dbid=" +db_info[i].id + ">"
					+"<i class=\"fa fa-database \" ></i>&nbsp;&nbsp;" + db_info[i].DBALIAS + "</a></li></ul>";
					$("#"+db_info[i].INSTANCENAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")).append(str);
			}else if(db_info[i].type=="HANA"){
				x="/dbmon/hana/hana_"+urlHana.substring(urlHana.indexOf("/")+1);
				var str="<ul  class=\"nav  \">"
					+"<li id=\""+db_info[i].id+"li\" class=\"col-md-8\"  style=\"list-style-type :none; display: none\">"
					+"<a id=\""+db_info[i].id+"\" class=\"\" href="+x+"?dbid=" +db_info[i].id + ">"
					+"<i class=\"fa fa-database \" ></i>&nbsp;&nbsp;" + db_info[i].DBALIAS + "</a></li></ul>";
					$("#"+db_info[i].INSTANCENAME+db_info[i].IP.replace(new RegExp('\\.','g'),"")).append(str);
			}
			
			
		}
		
		
		
		
		
		
		$(".leftin").click(function(){
			var width=$(".sidebar").css("width");
			if($("#tree>.nav").hasClass("nav-closed")){
				$("#tree>.nav").removeClass("nav-closed");
				$(".sidebar").css({
					"width":widthside,
					"padding-left":"15px"
				});
				$("#tree").css("width","230px");
				$("#showminileft").addClass("glyphicon-chevron-left").removeClass("glyphicon-chevron-right");
				$(".main").css("margin-left",widthside);
				$("#rightss").css("display","");
				window.sessionStorage.setItem('leftnavstate', 'open');
				$(".parent_li>span").show();
			}else {
				$("#tree>.nav").addClass("nav-closed");
				$("#rightss").css("display","none");
				widthside=width;
				$(".sidebar").css({
					"width":"45px",
					"padding-left":"0px"
				});
				$("#tree").css("width","36px");
				$("#showminileft").addClass("glyphicon-chevron-right").removeClass("glyphicon-chevron-left");
				$(".main").css("margin-left","45px");
				window.sessionStorage.setItem('leftnavstate', 'close');
				$(".parent_li>span").hide();
			}
			$(window).resize();
		});
		
	}
	

	
	//db_name[0] = 'PMSPDB';
	//db_name[1] = 'VWDB';
	//db_name[2] = 'TMSDB';
	
	//db_id[0] = '10';
	//db_id[1] = '11';
	//db_id[2] = '12';
	

	
	//alert(String(window.location));
	getDBlist();		
	draw();
	

	$(function(){
	    $('#tree li.parent_li > div >i').on('click', function (e) {
	        var children = $(this).parent('div').parent('li.parent_li').find(' > ul > li');
	        var fontpic=$(this).parent('div').find(".fa");
	        if (children.is(":visible")) {
	            children.hide('fast');
	            fontpic.removeClass("fa-angle-down").addClass("fa-angle-left");
	            
	        } else {
	            children.show('fast');
	            fontpic.removeClass("fa-angle-left").addClass("fa-angle-down");
	            $(".parent_li>span").show();
	        }
	    });
	    if($("#tree li.parent_li").find(">ul>li").is(":visible")){
	    	$("#tree li.parent_li").find(">div>fa").removeClass("fa-angle-left").addClass("fa-angle-down");
	    	
	    }else{
	    	$("#tree li.parent_li").find(">div>fa").removeClass("fa-angle-down").addClass("fa-angle-left");
	    }
	   
	    
	});
//	$("a.instance").click(function(){
//		window.location.href="instance.html"; 
//	});
	
	var dbid=GetParam("dbid");
	if(dbid != null){
		//alert(dbid);
		var nowNode = $("#" + dbid + "li");
		var preNode = $("#" + dbid + "li").parent('ul').parent('.parent_li').prevAll();
		var nextNode = $("#" + dbid + "li").parent('ul').parent('.parent_li').nextAll();
		
		//nowNode.addClass("active");
		preNode.css("display","");
		nextNode.css("display","");
		nowNode.css("display","");
		nowNode.parent('ul').parent('.parent_li').css("display","");
		nowNode.parent('ul').parent('.parent_li').parent().prev('div').children('.fa').removeClass("fa-angle-left").addClass("fa-angle-down");
		preNode.children('div').children('.fa').removeClass("fa-angle-down").addClass("fa-angle-left");
		nextNode.children('div').children('.fa').removeClass("fa-angle-down").addClass("fa-angle-left");
		
	}else{
		//alert("null")
	}
	
	$(document).ready(function() {
		$(".nav li a").each(function(){
			if($($(this))[0].href==String(window.location))
				$(this).parent().addClass("active");
		});
	});	
	var  selectDatas;
	try{
		selectDatas=$("#databseselect").select2({
			data:[{id:"1",text:"DB2"},
			      {id:"2",text:"ORACLE"},
			      {id:"3",text:"MYSQL"},
				  {id:"4",text:"SQLSERVER"},
				  {id:"5",text:"HANA"}],
			placeholder: "类型",
			allowClear: true
		});
	}catch(e){
		$("#databseselect").hide();
	}
//	selectData.clear();
	
//	$(".parent_li > span").hide();
	

	
	$("#databseselect").change(function(){
		window.sessionStorage.setItem("dbtypeForLeftNav",this[this.value-1].text);
		window.sessionStorage.setItem("dbtypeForLeftNavVal",this.value);
		$(".databaseul").hide();
		$("#"+this[this.value-1].text+"ul").show();
	});
	var dbtypeForLeftNav=window.sessionStorage.getItem("dbtypeForLeftNav");
	var dbtypeForLeftNavVal=window.sessionStorage.getItem("dbtypeForLeftNavVal");
	if(dbtypeForLeftNav){
		$(".databaseul").hide();
		$("#"+dbtypeForLeftNav+"ul").show();
	}
	$("#databseselect").val(dbtypeForLeftNavVal).trigger("change");
	$("#databseselect").on('select2:unselect',function(){
		$(".databaseul").show();
		window.sessionStorage.removeItem("dbtypeForLeftNav");
		window.sessionStorage.removeItem("dbtypeForLeftNavVal");
	});
/*	$("#database").hover(function() {
		$(".parent_li > span").show();
	}, function() {
		$(".parent_li > span").hide();
	});
	$(".parent_li > span").hover(function() {
		$(".parent_li > span").show();
	}, function() {
		$(".parent_li > span").hide();
	});
	$(".select2-dropdown").hover(function() {
		$(".parent_li > span").show();
	}, function() {
		$(".parent_li > span").hide();
	});*/
}

$(".main").ready(function() {
	if(window.sessionStorage.getItem('leftnavstate')=="close"){
		var width=$(".sidebar").css("width");
		$("#tree>.nav").addClass("nav-closed");
		$("#rightss").css("display","none");
		widthside=width;
		$(".sidebar").css({
			"width":"45px",
			"padding-left":"0px"
		});
		$("#tree").css("width","36px");
		$("#showminileft").addClass("glyphicon-chevron-right").removeClass("glyphicon-chevron-left");
		$(".main").css("margin-left","45px");
		$(".parent_li>span").hide();
		$(window).resize();
	}
});	




var spline_chart;
/*创建Spline图表*/
function createSpline(url, renderName, yAxisText, alertName,wait ,type ,width, ymax,data,selectId){
	var eChart;
	if(typeof(data) == "undefined"){
		$.getJSON(url,function(data2){
			if(data2.series == null || data2.series.length==0){
				$("#" + renderName).hide();
				$("#" + alertName).show();
				
				$selected = $("#"+selectId);
				if($("#" + selectId+"_time")){
					$("#" + selectId+"_time").css("right","60px");
				}
				$selected.html("");
				$selected.hide();
			}else{
				eChart = showSplineChart_f(data2,renderName,yAxisText,selectId);
				if(selectId!=undefined){
					$("#"+selectId).change(function(){
						selected = getSelectedNumber(selectId);
						changeEChart(timerList[renderName],eChart,selected);
					});
				}
			}
		})
		/*$.ajax({ 
			type:"post",
			dataType : "json", 
			url : url, 
			async : false, 
			success : function(data2){ 
				eChart = showSplineChart_f(data2,renderName,yAxisText,selectId);
				
			}
		});*/
	}else{
		if(data2.series == null || data2.series.length==0){
			$("#" + renderName).hide();
			$("#" + alertName).show();
			
			$selected = $("#"+selectId);
			if($("#" + selectId+"_time")){
				$("#" + selectId+"_time").css("right","60px");
			}
			$selected.html("");
			$selected.hide();
		}else{
			eChart = showSplineChart_f(data,renderName,yAxisText,selectId);
			if(selectId!=undefined){
				$("#"+selectId).change(function(){
					selected = getSelectedNumber(selectId);
					changeEChart(timerList[renderName],eChart,selected);
				});
			}
		}
	}
}


function createLogChart(url, renderName, alertName,selectId){
	var db2logOption = {
			tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:[]
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data:[],
		            axisLabel:{
	                formatter: function (value, index) {
	                    var date = new Date(value);
	                    var texts = [(date.getMonth() + 1), date.getDate()];
	                    if (date.getHours() !== 0  ) {
	                        texts.push(date.getHours()+":00");
	                        return value;
	                    }
	                    return texts.join('/');
	                }
	            }
		            
		        }
		    ],
		    yAxis : [
		        {
			        axisLabel:{
		                formatter:'{value} MB'
		            },
		            type : 'value',
		            
		        },
			{
	        	axisLabel: {
		            formatter: '{value} %'
		        },
			    type : 'value',

			}
		    ],
		    //color: ['#FF4600','#FCD9C4','#5BBD2B','#67BF7F','#00BFFF','#FCF54C'],
		    series: []
		};
	var eChart=echarts.init(document.getElementById(renderName),'macarons'); 
	eChart.showLoading();
	
	$.ajaxSettings.async = true;
	$.getJSON(url, function(data) {
		
		
			$("#loading").show();
			//1. 判断是否有数据
			if(jQuery.isEmptyObject(data.series)) {
				//2. 如果没有数据，则删除chart，并显示警告
				$("#" + renderName).hide();
				$("#" + alertName).show();
				$("#loading").hide();
				if(selectId!=undefined){
					$selected = $("#"+selectId);
					if($("#" + selectId+"_time")){
						$("#" + selectId+"_time").css("right","60px");
					}
					$selected.html("");
					$selected.hide();
				}
				return;
				return;
			} else {
				$("#" + renderName).show();
				db2logOption.xAxis[0].data=data.itemtimes;
			  if(selectId == undefined){
				  db2logOption.series = data.series;
				   for (var i = 0; i < db2logOption.series.length; i++) {
					   db2logOption.legend.data[i] = data.series[i].name;
				        if (db2logOption.series[i].name.indexOf( "使用比例")>-1) {
				            db2logOption.series[i].type = 'line';
				            db2logOption.series[i].yAxisIndex = 1;
				            db2logOption.series[i].symbol = 'rect';
				            db2logOption.series[i].symbolSize = 10;
				        } else {
				        	db2logOption.series[i].type = 'bar';
				        	db2logOption.series[i].stack = db2logOption.series[i].name.substr(-1);
				        }
				    }
			  }else{
				  var selected;
				  
					judgeSelectedNumber(selectId,data.series);
					selected = getSelectedNumber(selectId);
					
					if(selected != undefined){
						timerList[eChart._dom.id] = data;
						datalength = 0;
						db2logOption.legend.data = [];
						for(var i=0;i<data.series.length;i++){
							if(selected != data.series[i].member){
								continue;
							}
							db2logOption.legend.data[i] = data.series[i].name;
							db2logOption.series.push(data.series[i]);
							if (db2logOption.series[datalength].name.indexOf( "使用比例")>-1) {
					            db2logOption.series[datalength].type = 'line';
					            db2logOption.series[datalength].yAxisIndex = 1;
					            db2logOption.series[datalength].symbol = 'rect';
					            db2logOption.series[datalength].symbolSize = 10;
					        } else {
					        	db2logOption.series[datalength].type = 'bar';
					        	db2logOption.series[datalength].stack = '1';//stack写什么都可以  这里只要保证相同就好
					        }
							datalength++;
						}
						$("#"+selectId).change(function(){	
							selected = getSelectedNumber(selectId);
							changeEChart(timerList[renderName],eChart,selected);
						});
					}
			  }
		    eChart.hideLoading();
		    eChart.setOption(db2logOption, true);
		    
		    $("#" + alertName).hide();
			$("#loading").hide();
			
			$(window).resize(function(){
				eChart.resize();
			});
			
		}});

	return eChart;
}

function createDbsizeEChart(url, renderName, alertName){
	var dbsizeOption = {
			tooltip : {
		        trigger: 'axis',
		        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
		            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
		        }
		    },
		    legend: {
		        data:[]
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data:[],
		            axisLabel:{
	                formatter: function (value, index) {
	                    var date = new Date(value);
	                    var texts = [(date.getMonth() + 1), date.getDate()];
//	                    if (index ===0 && date.getDate() === 15 ) {
//	                        texts.push(date.getHours()+":00");
//	                        return (date.getMonth() + 1)+"月";
//	                    }时间大于1个月时，横轴以月为单位，这时横轴如何显示？
	                    return texts.join('/');
	                }
	            }
		            
		        }
		    ],
		    yAxis : [
		        {
			        axisLabel: {
		                formatter:function(value){
			        		if(value>=1000){
			        			value = value/1000;
			        			return value+"GB";
			        		}else{
			        			return value+"MB";    		
			        		}
						}
		            },
		            type : 'value',
		            
		        },
			{
	        	axisLabel: {
		            formatter: '{value} %'
		        },
			    type : 'value',

			}
		    ],
		    color: [ '#E63E1E', '#3236EA','#F6FC29'],
		    series: []
		};
	var eChart=echarts.init(document.getElementById(renderName)); 
	eChart.showLoading();
	$.ajaxSettings.async = true;
	$.getJSON(url, function(data) {
		$("#loading").show();
		//1. 判断是否有数据
		if(jQuery.isEmptyObject(data.itemtimes)) {
			//2. 如果没有数据，则删除chart，并显示警告
			$("#" + renderName).hide();
			$("#" + alertName).show();
			$("#loading").hide();
			return;
		} else {
			$("#" + renderName).show();
	 
	    dbsizeOption.series = data.item;
	    dbsizeOption.xAxis[0].data=data.itemtimes;
	   for (var i = 0; i < dbsizeOption.series.length; i++) {
		   dbsizeOption.legend.data[i] = data.item[i].name;
	        if (dbsizeOption.series[i].name.indexOf( "使用比例")>-1) {
	            /*for (var j = 0; j < dbsizeOption.series[i].data.length; j++) {
	            	dbsizeOption.series[i].data[j] *= 100;
	            }*/
	            dbsizeOption.series[i].type = 'line';
	            dbsizeOption.series[i].yAxisIndex = 1;
	            dbsizeOption.series[i].symbol = 'rect';
	            dbsizeOption.series[i].symbolSize = 10;
	        } else {
	        	dbsizeOption.series[i].type = 'bar';

				dbsizeOption.series[i].stack = 'dbsize';
	        }
	    }
	    eChart.hideLoading();
	    eChart.setOption(dbsizeOption, true);
	    //修改容量模块数据库容量及使用比例趋势图形
	    eChart.resize();
	    
	   	$("#" + alertName).hide();
		$("#loading").hide();
	}});

	return eChart;
}


        
function refreshSpline(url, renderName, yAxisText, alertName,wait,type,width,selectId) {
	
	$.getJSON(url, function(data) {
		$("#loading").show();
		//1. 判断是否有数据
		if(jQuery.isEmptyObject(data)) {
			//2. 如果没有数据，则删除chart，并显示警告
			$("#" + renderName).hide();
			$("#" + alertName).show();
			$("#loading").hide();
		} else {
			$("#" + renderName).show();
			//3. 否则的话则更新图标
			refreshSplineChart(url, data, renderName, yAxisText, alertName,wait,type,width,selectId);
			$("#" + alertName).hide();
			$("#loading").hide();
		}			
        });
}


function refreshLogEChart(url, renderName, alertName,selectId) {	
		createLogChart(url, renderName, alertName,selectId);		
}

function refreshDbsizeEChart(url, renderName, alertName) {
	createDbsizeEChart(url, renderName, alertName);
}
	
function refreshSplineChart(url, data, renderName, yAxisText, alertName ,wait,type,width,selectId) {
	createSpline(url, renderName, yAxisText, alertName,wait,type,width,undefined,data,selectId);

}
/*创建Spline图表*/
function createSpline3(url, renderName, yAxisText, alertName,wait ,type){
	var chart;
	$("#" + wait).show();
	//$.ajaxSettings.async = false; 
	$.getJSON(url, function(data) {
			if(jQuery.isEmptyObject(data)) {
				$("#" + alertName).show();
			} else {
				chart = showSplineChart3(data, renderName, yAxisText,type );
				$("#" + wait).hide();
				$("#" + alertName).hide();
			}
	});
	return chart;
}

/*初始化Spline图表*/
function showSplineChart3(data, renderName, yAxisText ,type){
	var eOption = echarts.init(document.getElementById(renderName),'macarons');
	var option = {
		    title: {
		        text: '',
		    },
		    legend:{
		    	data:data.legend
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
		    toolbox: {
		        show: true,
		        feature: {
		            saveAsImage: {}
		        }
		    },
		    xAxis:  {
		        type: 'time',
		        
		    },
		    yAxis: {
		    	type: 'value',
		        name:yAxisText,
		        axisLabel: {
		            formatter: '{value} '
		        }
		    },
		    series: data.series
		};
	
	eOption.setOption(option);
	return eOption;
	
	
	
	}
function refreshSpline3(url, renderName, yAxisText, alertName,wait) {
//	alert(widths);
	$.getJSON(url, function(data) {
		//1. 判断是否有数据
		if(jQuery.isEmptyObject(data)) {
			//2. 如果没有数据，则删除chart，并显示警告 
			var c = $("#"+renderName).highcharts();
			if(typeof(c) == "undefined") { 
				//do nothing
			} else {
				c.destroy();
			}
			$("#" + alertName).show();
		} else {
			//3. 否则的话则更新图标
			refreshSplineChart3(url, data, renderName, yAxisText, alertName,wait);
			$("#" + alertName).hide();
		}			
        });
}
	
function refreshSplineChart3(url, data, renderName, yAxisText, alertName ,wait) {
	var chart = $("#"+renderName).highcharts();
	if(typeof(chart) == "undefined") {
		//alert("chart is undefined!");
		createSpline3(url, renderName, yAxisText, alertName,wait);
	} else {
		for (var i = 0; i < chart.series.length; i++) {
			chart.series[i].update({
				//pointInterval: data.interval,
				//pointStart: Date.UTC(data.year, data.month, data.day, data.hour, data.minute, data.second),
				name: data.yset[i].name,
				data: data.yset[i].data
			});
			
		}
	}

//chart.addSeries({name: "TMSDB", data: [129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4, 29.9, 71.5, 106.4]});
}

	var pie_chart;

    /*返回数据*/
    function createPie(url, renderName, height,seriesText, alertName){
		var width=$("#"+renderName).width()*0.9;
    	$.getJSON(url, function(data) {
			if(jQuery.isEmptyObject(data)) {
				$("#" + alertName).show();
			} else {
				showPieChart(data, renderName, height,seriesText,width);
				$("#" + alertName).hide();
			}    		
        });
    }

	function showPieChart(data, renderName,height,seriesText,width) {
		version_chart = new Highcharts.Chart({
	        chart: {
	        	renderTo: renderName,
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            width:width
	        },
	        title: {
	            text: ''
	        },
	        legend: {
	        	width:115,
	        	symbolWidth:14,
	        	maxHeight:250,
	        	floating: false,
	        	align: 'right',
	        	verticalAlign: 'middle',
	        },
	        tooltip: {
	    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        credits: {
	        	enabled: false
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: false
	                },
	                showInLegend: true
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: seriesText,
	            data: data.data
	        }]
	    });
	}
	
	 function createPie2(url, renderName, seriesText, alertName){
    	$.getJSON(url, function(data) {
			if(jQuery.isEmptyObject(data)) {
				$("#" + alertName).show();
			} else {
				showPieChart2(data, renderName, seriesText);
				$("#" + alertName).hide();
			}    		
        });
    }

	function showPieChart2(data, renderName, seriesText) {
		version_chart = new Highcharts.Chart({
	        chart: {
	        	renderTo: renderName,
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false,
	            height:256
	        },
	        title: {
	            text: ''
	        },
	        tooltip: {
	    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
	        },
	        credits: {
	        	enabled: false
	        },
	        legend: {
	        	enabled:false,
	        	width:100,
	        	symbolWidth:14,
	        	maxHeight:450,
	        	floating: false,
	        	align: 'right',
	        	verticalAlign: 'middle',
	        	itemWidth: 70,
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true
	                },
	                showInLegend: false
	            }
	        },
	        series: [{
	            type: 'pie',
	            name: seriesText,
	            data: data.data
	        }]
	    });
	}
	
	function createColumn(url, renderName, seriesText, alertName,selectId,mem_chart){
	    	$.getJSON(url, function(data) {
	    		if(data.content.length==1){
	    			data.content[0].name="内存占用";
	    		};
				if(jQuery.isEmptyObject(data)) {
					$("#" + alertName).show();
				} else {
					showColumnChart(data, renderName, seriesText,selectId,mem_chart);
					if(selectId=="select_memorychart"){
						$("#select_memorychart").change(function(){
					   		var selected = getSelectedNumber("select_memorychart");
					   		//mem_chart.clear();
					   		var option = mem_chart.getOption();
					   		var datalength = 0;
					   		$.each(timerList["memorychart"].content,function(index,item){
					   			if(selected == item.member){
					   				option.series[datalength].data = item.data;
					   				datalength++;
					   			}
					   		});
					   		mem_chart.setOption(option,true);
					   	});
					}
					$("#" + alertName).hide();
				}
				
	        });
	    }

	function showColumnChart(data, renderName, seriesText,selectId,mem_chart) {
		//mem_chart = echarts.init(document.getElementById(renderName),'macarons');
		var content = data.content;
		if(selectId != undefined){
			judgeSelectedNumber(selectId,data.content);
			selected = getSelectedNumber(selectId);
		}
		if(selected != undefined){
			content = [];
			timerList[renderName] = data;
			$.each(data.content,function(index,item){
				if(selected == item.member){
					content.push(item);
				}
			});
		}
		option = {
			    title : {
			    },
			    tooltip : {
			        trigger: 'item',
//			        formatter:'{a} {b}:{c}KB'
			    },
			    grid: {
			        left: '3%',
			        right: '4%',
			        bottom: '10%',
			        containLabel: true
			    },
			    xAxis : [
			        {
			            type : 'category',
			            boundaryGap : ['10%','10%'],
			            data : data.categories,
			            axisLabel:{  
	                        interval:0,  
	                        rotate:15,
	                        textStyle:{  
	                        }  
	                    },
			        }
			    ],
			    yAxis : [
			        {
			            type : 'value',
			            
			            axisLabel:{
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
			        }
			    ],
			    series : content
			};
		mem_chart.setOption(option);
		
	}

	function createColumn2(url, renderName, seriesText, alertName){
    	$.getJSON(url, function(data) {
			if(jQuery.isEmptyObject(data)) {
				$("#" + alertName).show();
			} else {
				showColumnChart2(data, renderName, seriesText);
				$("#" + alertName).hide();
			}    		
        });
    }

function showColumnChart2(data, renderName, seriesText) {
	var eoption = echarts.init(document.getElementById(renderName),'macarons');
	option = {
		   // color: ['#3398DB'],
		    tooltip : {
		        trigger: 'axis',
		        axisPointer : {           
		            type : 'shadow'        
		        },
		        formatter:function(params){
		        	var res;
		        	for(var i=0;i<params.length;i++){
		        		if(params[i].data!=0){
		        			if(params[i].data>=1000000){
		        				res = Math.round(params[i].data/(1024*1024));
		            			return params[i].name + ":" + res + "GB";
		            		}else if(params[i].data>1000&&params[i].data<1000000){
		            			res = Math.round(params[i].data/1024);
		            			return params[i].name + ":" + res + "MB";
		            		}else if(params[i].data!=0){
		            			return params[i].name + ":" + params[i].data + "KB";
		            		}
		        		}
		        	}
		        }
		    },
		   legend:{
			   data:data.legend
		   },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '10%',
		        containLabel: true
		    },
		    xAxis : [
		        {
		            type : 'category',
		            data : data.categories,
		            axisTick: {
		                alignWithLabel: true
		            },
		            axisLabel: {  
	            	   interval:0,  
	            	   rotate:20  
	            	}  
		        }
		    ],
		    yAxis : [
		        {
		            type : 'value',
		            axisLabel: {
			            //formatter: '{value} KB'
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
		        }
		    ],
		    series : data.content
		};
	eoption.setOption(option);
}
	
	function refreshPie(url, renderName) {
		$.getJSON(url, function(data) {
			refreshPieChart(data, renderName);
        });
	}	

	function refreshPieChart(data, renderName) {
		var chart = $("#"+renderName).highcharts();
			chart.series[0].update({
				data: data.data
			});
	}	

	//TODO
	function refreshColumnLine(url, renderName, columnSeriesText, lineSeriesText,
		alertName, width, height) {
	    $.getJSON(url, function(data) {
		// 1. 判断是否有数据
		if (jQuery.isEmptyObject(data)) {
			// 2. 如果没有数据，则删除chart，并显示警告
			var c = $("#" + renderName).highcharts();
			if (typeof (c) == "undefined") {
				// do nothing
			} else {
				c.destroy();
			}
			$("#" + alertName).show();
		} else {
			// 3. 否则的话则更新图标
			var chart = $("#" + renderName).highcharts();
			if (typeof (chart) == "undefined") {
				createColumnLine(url, renderName, columnSeriesText,
						lineSeriesText, alertName, width, height);
			} else {
				 for (var i = 0; i < chart.series.length; i++) {
					chart.series[i].update({
						// pointInterval: data.interval,
						// pointStart: Date.UTC(data.year, data.month, data.day,
						// data.hour, data.minute, data.second),
						name : data.series[i].name,
						type : data.series[i].type,
						yAxis : data.series[i].yAxis,
						data : data.series[i].data
					});

				}
			}
		}
	});

}
	
	function createColumnLine(url, renderName, columnSeriesText, lineSeriesText, alertName, width, height){
    	$.getJSON(url, function(data) {
			//if(jQuery.isEmptyObject(data)) {
			//	$("#" + alertName).show();
			//} else {
				showColumnLineChart(data, renderName, columnSeriesText, lineSeriesText, width, height);
				$("#" + alertName).hide();
			//}    		
        });
    }

	function showColumnLineChart(data, renderName, columnSeriesText, lineSeriesText, width, height) {
		version_chart = new Highcharts.Chart({
			chart: {
				renderTo: renderName,
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				width: width,
			},
			title: {
				text: ''
			},
			tooltip: {
				shared: true
			},
			xAxis: {
	 			gridLineWidth: 1,
				type: 'datetime',
            },
			//xAxis: {
			//	categories:data.categories
			//},
	        /*xAxis: [{
	            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
	                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	            crosshair: true
	        }],*/
			yAxis: [{ // Secondary yAxis
	            min: 0,
				title: false,
				labels: {
					format: '{value}ms',
					style: {
						color: Highcharts.getOptions().colors[1]
					}
				},
				opposite: true
			}, { // Primary yAxis
	            min: 0,
				labels: {
					format: '{value}次',
					style: {
						color: Highcharts.getOptions().colors[0]
					}
				},
				title: false
			}],
			credits: {
				enabled: false
			},
			plotOptions: {
				column: {
					pointPadding: 0.2,
					borderWidth: 0
				}
			},
	        legend: {
				borderWidth:1,
				borderRadius:5
	        },
			series: data.series
		});
	}	
	
	//user login
    function setCookie(name, value, expires, path, domain, secure) {
        var curcookie = name + "=" + encodeURI(value)
                        +((expires) ? ";expires=" + expires.toGMTString() : "")
                        +((path) ? ";path=" + path : "")
                        +((domain) ? ";domain=" + domain : "")
                        +((secure) ? ";secure" : "");
        document.cookie = curcookie;
    }            
    
    function getCookie(name) {
        if(document.cookie.length > 0) {
            start = document.cookie.indexOf(name + "=");
            if( start != -1) {
                start = start + name.length + 1;
                end = document.cookie.indexOf(";",start);
                if( end == -1) {
                    end = document.cookie.length;
                }
            }
            return decodeURI(document.cookie.substring(start,end));
        }
        return "";
    }
    
    function loginCheck() {
        var name = document.frm1.username.value;
        var pass = document.frm1.password.value;

		url = "../LoginCheck?username=" + encodeURI(name) + "&password=" + encodeURI(pass);
        
		$.getJSON(url,function(data){
			if(data.result == 0) {
	            var login = true;
	            var now = new Date();
	            now.setDate( now.getDate() + 30);
	            setCookie("login",login,now);
			} else {
	            window.location.href = "login.html";
			}
		});        
    }
    function format(date){
     	var month;
     	var dateDay;
     	var hours;
     	var minute;
     	var seconds;
     	if(date.getMonth()<9){
     		month="0"+(date.getMonth()+1);
     	}else{
     		month=""+(date.getMonth()+1);
     	}
     	if(date.getDate()<10){
     		dateDay="0"+date.getDate();
     	}else{
     		dateDay=""+date.getDate();
     	}
     	if(date.getHours()<10){
     		hours="0"+date.getHours();
     	}else{
     		hours=""+date.getHours();
     	}
     	if(date.getMinutes()<10){
     		minute="0"+date.getMinutes();
     	}else{
     		minute=""+date.getMinutes();
     	}
     	if(date.getSeconds()<10){
     		seconds="0"+date.getSeconds();
     	}else{
     		seconds=""+date.getSeconds();
     	}
     	
     	return date.getFullYear()+month+dateDay+hours+minute+seconds;
     }
    
    function format2(date){
     	var month;
     	var dateDay;
     	var hours;
     	var minute;
     	var seconds;
     	if(date.getMonth()<9){
     		month="0"+(date.getMonth()+1);
     	}else{
     		month=""+(date.getMonth()+1);
     	}
     	if(date.getDate()<10){
     		dateDay="0"+date.getDate();
     	}else{
     		dateDay=""+date.getDate();
     	}
     	if(date.getHours()<10){
     		hours="0"+date.getHours();
     	}else{
     		hours=""+date.getHours();
     	}
     	if(date.getMinutes()<10){
     		minute="0"+date.getMinutes();
     	}else{
     		minute=""+date.getMinutes();
     	}
     	if(date.getSeconds()<10){
     		seconds="0"+date.getSeconds();
     	}else{
     		seconds=""+date.getSeconds();
     	}
     	
     	return date.getFullYear()+"-"+month+"-"+dateDay;
     }
    
    function format3(date){
     	var month;
     	var dateDay;
     	var hours;
     	var minute;
     	var seconds;
     	if(date.getMonth()<9){
     		month="0"+(date.getMonth()+1);
     	}else{
     		month=""+(date.getMonth()+1);
     	}
     	if(date.getDate()<10){
     		dateDay="0"+date.getDate();
     	}else{
     		dateDay=""+date.getDate();
     	}
     	if(date.getHours()<10){
     		hours="0"+date.getHours();
     	}else{
     		hours=""+date.getHours();
     	}
     	if(date.getMinutes()<10){
     		minute="0"+date.getMinutes();
     	}else{
     		minute=""+date.getMinutes();
     	}
     	if(date.getSeconds()<10){
     		seconds="0"+date.getSeconds();
     	}else{
     		seconds=""+date.getSeconds();
     	}
     	return date.getFullYear()+"-"+month+"-"+dateDay+" "+hours+":"+minute;
     }  
    function format4(date){
     	var month;
     	var dateDay;
     	var hours;
     	var minute;
     	var seconds;
     	if(date.getMonth()<9){  
     		month="0"+(date.getMonth()+1);
     	}else{
     		month=""+(date.getMonth()+1);
     	}
     	if(date.getDate()<10){
     		dateDay="0"+date.getDate();
     	}else{
     		dateDay=""+date.getDate();
     	}
     	if(date.getHours()<10){
     		hours="0"+date.getHours();
     	}else{
     		hours=""+date.getHours();
     	}
     	if(date.getMinutes()<10){
     		minute="0"+date.getMinutes();
     	}else{
     		minute=""+date.getMinutes();
     	}
     	if(date.getSeconds()<10){
     		seconds="0"+date.getSeconds();
     	}else{
     		seconds=""+date.getSeconds();
     	}
     	return date.getFullYear()+"-"+month+"-"+dateDay+" "+hours+":"+minute+":"+seconds;
     } 
    //yyyymmddhhmmss to yyyy-mm-dd hh:mm:ss
       function stringTodate(timestamp){
    	   var year = timestamp.substring(0,4);
    	   var month = timestamp.substring(4,6);
    	   var day = timestamp.substring(6,8);
    	   var hour = timestamp.substring(8,10);
    	   var minute = timestamp.substring(10,12);
    	   var seconds = timestamp.substring(12,14);
    	   
    	   return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+seconds;
       }
    
    function userlogin() {
        var login = getCookie("login");
        if ( login != null && login != "" ) {
            alert("Welcome...");
            window.location.href = "index.html";
        } else {
        	window.location.href = "login.html";
        }
    }
    
    function displayChart(){
		$(".sidebar").css("z-index","98");
		
		$(".screen").click(function(){
			var height=$(window).height();
			var width = $(window).width();
			if($(this).children().attr('class').indexOf("fa-expand")>-1){
				var tempheight= $(this).parent().parent().children().find(".chartscreen").height();
				var tempwidth= $(this).parent().parent().children().find(".chartscreen").width();
				window.sessionStorage.setItem("tempheight",tempheight);
				window.sessionStorage.setItem("tempwidth",tempwidth);
				$(this).children().removeClass("fa-expand").addClass("fa-compress");
				
				var tempclassname=$(this).parent().parent().parent()[0].className;
				window.sessionStorage.setItem("tempclassname",tempclassname);
				$(this).parent().parent().parent().removeClass().addClass("col-md-12");
				$(this).parent().parent().parent().css({
					"position":" fixed",
					"z-index":"100",
					"left":" 0px",
					"height":" "+height+"px",
					"padding-left":" -100px",
					"top": ""+($('.navbar-fixed-top').height()+5)+"px",
					"background-color": "rgba(0, 0, 0, 0.25)"
				});
				$(this).parent().parent().children().find(".chartscreen").height(height/5*4);
				$(this).parent().parent().children().find(".chartscreen").width(width-20);
				//echarts.init($(this).parent().parent().children().find(".chartscreen"),'macarons').resize();
				
			}else{
				var width=window.sessionStorage.getItem("tempwidth");
				var heigh=window.sessionStorage.getItem("tempheight");
				var tempclassname=window.sessionStorage.getItem("tempclassname");
				$(this).children().removeClass("fa-compress").addClass("fa-expand");
				$(this).parent().parent().parent().removeClass().addClass(tempclassname);
				$(this).parent().parent().parent().removeAttr("style");
				$(this).parent().parent().children().find(".chartscreen").height(heigh);
				$(this).parent().parent().children().find(".chartscreen").width(width);
				//var mychart = echarts.init($(this).parent().parent().children().find(".chartscreen"),'macarons');
				//mychart.resize = window.onresize;
			}
			$(window).resize(); 
			/*var mychart = echarts.init($(this).parent().parent().children().find(".chartscreen"),'macarons');
			window.onresize = mychart.resize();*/
			//var chart = $(this).parent().parent().children().find(".chartscreen").echart();
			//var char = echarts.init($(this).parent().parent().children().find(".chartscreen"),'macarons');
			//char.resize();
		/*     position: fixed;
		    z-index: 100;
		    left: 0px;
		    height: 600px;
		    
		    padding-left: -100px; */

		});
    }
	function createOracle_totaltimePie(url,obj){
    	$.getJSON(url, function(data) {
			if(jQuery.isEmptyObject(data)) {
				//$("#" + alertName).show();
			} else {
				showOracle_totaltimePie(data,obj);
				//$("#" + alertName).hide();
			}    		
        });
    }
	
	function showOracle_totaltimePie(data,obj){
		var chart = echarts.init(obj);
		option = {
			    title : {
			        text: '',
			        x:'center'
			    },
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    legend: {
			        orient: 'vertical',
			        top: 'top',
			        data: [],
			        orient:'horizontal',
			    },
			    series : [
			        {
			            name: '数据库总时间使用分布',
			            type: 'pie',
			            radius : '35%',
			            center: ['55%', '45%'],
			            data:data.piedata,
			            itemStyle: {
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)'
			                }
			            }
			        }
			    ]
			};
		chart.setOption(option)
	}
    
	
	
	function formatValue(str){
		if(str.length==0){
			return;
		}
		var con;
		var value="";

		var reg = new RegExp("\\.");
		if(!reg.test(str)){
			value = process(str);
			return value;
		}else{
			var arr = new Array();
			arr = str.split("\.");
			value = process(arr[0]);
			
			return value+"."+arr[1];
		}
	}


	function process(str){
		var value="";
		var con;
		var dot;
		len = str.length;
		if(len>=4){
			  if(len%3==0){
			     con = len/3-1;
			  }else{
			     con = Math.floor(len/3);
			  }

			}
			for(var i = 0;i<con;i++){
			   dot= str.substring(str.length-3,str.length);

			   value = ","+dot+value;
			   str = str.substring(0,str.length-3);

			}
			
			return str+value;
	}
	
	
//************************性能容量**************************************
	
	
	
	/**
	 */
	var widthside;

	

	/**
	 * 容量页面nav-tabs 插入html代码
	 * @param  {String} tagsid  
	 */
	function showDBSizeInnerNav(tagsid) {
	    if (GetParam('endtime')) {
	        var timeParam = '?endtime='+GetParam('endtime');
	    }else{var timeParam='';}
	    document.write("<div class=\"row\">");
	    document.write("<ul class=\"nav nav-tabs main-tabs\">");
	    document.write("<li role=\"presentation\"><a href=\"db2sizeoverview.html"+timeParam+"\">数据库系统容量总览</a></li>");
	    document.write("<li role=\"presentation\"><a href=\"db2sizetop20.html"+timeParam+"\">数据库总大小TOP20</a></li>");
	    document.write("<li role=\"presentation\"><a href=\"db2sizetopused.html"+timeParam+"\">数据库总使用大小TOP20</a></li>");
	    document.write("<li role=\"presentation\"><a href=\"db2tbsp.html"+timeParam+"\">数据库表空间</a></li>");
	    document.write("</ul>");
	    document.write("</div>");
	}

	

	

	/*$(".main").ready(function () {
	    if (window.sessionStorage.getItem('leftnavstate') == "close") {
	        var width = $(".sidebar").css("width");
	        $("#tree>.nav").addClass("nav-closed");
	        $("#rightss").css("display", "none");
	        widthside = width;
	        $(".sidebar").css({
	            "width": "45px",
	            "padding-left": "0px"
	        });
	        $("#tree").css("width", "36px");
	        $("#showminileft").addClass("glyphicon-chevron-right").removeClass(
	            "glyphicon-chevron-left");
	        $(".main").css("margin-left", "45px");
	        $(window).resize();
	    }
	});*/

	/**
	 * 获取选中的tagsid,点击提交后url参数加入tagsid，若没有选中的去掉参数
	 */
	// function selectTagsid() {
//	     var urlParams = [];
//	     $("input[name='tagids']").each(function () {
//	         if ($(this)[0].checked) {
//	             urlParams.push($(this).attr('value'));
//	         }
//	     });
//	     urlParams = urlParams.join('_');
//	     if (urlParams) {
//	         location.search = '?tagsid=' + urlParams;
//	     } else {
//	         location = location.origin + location.pathname;
//	     }
	// }

	/**
	 * [JS 操作 URL 函数]
	 * var myurl = new objURL();            初始化
	 * var myurl = new objURL(URL);         自定义URL：
	 * var val = myurl.get('a');            读取url参数值
	 * myurl.set("arg",data).set('v','v');  设置url参数,包括重命名
	 * myurl.remove("arg").remove('d');     移除url参数
	 * myurl.url();                         获取处理后的URL
	 * myurl.debug();                       调试接口：
	 */
	function objURL(url) {
	    var ourl = url || window.location.href;
	    var href = ""; //?前面部分
	    var params = {}; //url参数对象
	    var jing = ""; //#及后面部分
	    var init = function () {
	        var str = ourl;
	        var index = str.indexOf("#");
	        if (index > 0) {
	            jing = str.substr(index);
	            str = str.substring(0, index);
	        }
	        index = str.indexOf("?");
	        if (index > 0) {
	            href = str.substring(0, index);
	            str = str.substr(index + 1);
	            var parts = str.split("&");
	            for (var i = 0; i < parts.length; i++) {
	                var kv = parts[i].split("=");
	                params[kv[0]] = kv[1];
	            }
	        } else {
	            href = ourl;
	            params = {};
	        }
	    };
	    this.set = function (key, val) {
	        params[key] = encodeURIComponent(val);
	        return this;
	    };
	    this.remove = function (key) {
	        if (key in params) params[key] = undefined;
	        return this;
	    };
	    this.get = function (key) {
	        return params[key];
	    };
	    this.url = function (key) {
	        var strurl = href;
	        var objps = [];
	        for (var k in params) {
	            if (params[k]) {
	                objps.push(k + "=" + params[k]);
	            }
	        }
	        if (objps.length > 0) {
	            strurl += "?" + objps.join("&");
	        }
	        if (jing.length > 0) {
	            strurl += jing;
	        }
	        return strurl;
	    };
	    this.debug = function () {
	        // 以下调试代码自由设置
	        var objps = [];
	        for (var k in params) {
	            objps.push(k + "=" + params[k]);
	        }
	        alert(objps); //输出params的所有值
	    };
	    init();
	}

	function initEchartsOption(chartType) {
	    var option = {};
	    if (chartType == 'bar-line') {
	        option = {
	            title: {
	                x: 'center'
	            },
	            tooltip: {
	                trigger: 'axis',
	                axisPointer: { // 坐标轴指示器，坐标轴触发有效
	                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
	                },
	                feature: {
	                    saveAsImage: {}
	                }
	            },
	            legend: {
	                data: [],
	                left: 'right',
	                top: 'bottom'
	            },
	            grid: {
	                left: '3%',
	                right: '4%',
	                bottom: '10%',
	                containLabel: true
	            },
	            xAxis: [{
	                type: 'category',
	                data: []
	                // axisLabel: {
	                //     rotate: 10
	                // }
	            }],
	            yAxis: [{
	                type: 'value',
	                position: 'left'
	            }, {
	                type: 'value',
	                position: 'right',
	            }],
	            // color: [],
	            series: []
	        };
	    }
	    if (chartType == 'pie') {
	        option = {
	            title: {
	                left: '20%'
	            },
	            tooltip: {
	                trigger: 'item',
	                formatter: "{a} <br/>{b} : {c} ({d}%)"
	            },
	            legend: {
	                orient: 'vertical',
	                left: '75%',
	                top: 'middle',
	                data: []
	            },
	            series: [{
	                name: '',
	                type: 'pie',
	                radius: '60%',
	                center: ['40%', '60%'],
	                data: [],
	                itemStyle: {
	                    emphasis: {
	                        shadowBlur: 10,
	                        shadowOffsetX: 0,
	                        shadowColor: 'rgba(0, 0, 0, 0.5)'
	                    }
	                }
	            }]
	        };
	    }
	    if (chartType == 'area-stack') {
	        option = {
	            title: {
	                // text: '近七天考核指标分'
	            },
	            tooltip: {
	                trigger: 'axis'
	            },
	            legend: {
	                data: []
	            },
	            toolbox: {
	                feature: {
	                    saveAsImage: {}
	                }
	            },
	            grid: {
	                left: '1%',
	                right: '1%',
	                bottom: '3%',
	                containLabel: true
	            },
	            xAxis: [{
	                type: 'category',
	                boundaryGap: true,
	                data: []
	                // axisLabel: {
	                //     rotate: 10,
	                //     interval: 0 //全部显示
	                // }
	            }],
	            yAxis: [{
	                type: 'value'
	            }],
	            color: ['#ff3333', '#FFA500', '#EEEE00', '#00BFFF', '#00CD66'],
	            series: []
	        };
	    }
	    return option;
	}

	function creatEchartsSimplePie(id, Url, UrlParams, option, legendData, seriesName, seriesData, idAlert) {
	    if (UrlParams == null) {
	        UrlParams = {};
	    }
	    var pieChart = echarts.init($(id)[0]);
	    pieChart.showLoading();
	    // 设置异步
	    $.ajaxSettings.async = true;
	    $.getJSON(Url, UrlParams, function (data) {
	        if ($.isEmptyObject(data.totaltime)) {
	            pieChart.hideLoading();
	            $(idAlert).show();
	            return;
	        }
            $(idAlert).hide();
	        option.series[0].name = seriesName;
	        (function(){
	            option.legend.data = eval('data.' + legendData);
	            option.series[0].data = eval('data.' + seriesData);
	        }());
	        pieChart.hideLoading();
	        pieChart.setOption(option, true);
	    });
	}

	function creatEchartsSimplePie1(id, Url, UrlParams, option, legendData, seriesName, seriesData, idAlert) {
	    if (UrlParams == null) {
	        UrlParams = {};
	    }
	    var pieChart = echarts.init($(id)[0]);
	    pieChart.showLoading();
	    // 设置异步
	    $.ajaxSettings.async = true;
	    $.getJSON(Url, UrlParams, function (data) {
	        if ($.isEmptyObject(data.waittime)) {
	            pieChart.hideLoading();
	            $(idAlert).show();
	            return;
	        }
            $(idAlert).hide();
	        option.series[0].name = seriesName;
	        (function(){
	            option.legend.data = eval('data.' + legendData);
	            option.series[0].data = eval('data.' + seriesData);
	        }());
	        pieChart.hideLoading();
	        pieChart.setOption(option, true);
	    });
	}
	
	function creatEchartsSimplePie2(id, Url, UrlParams, option, legendData, seriesName, seriesData, idAlert) {
	    if (UrlParams == null) {
	        UrlParams = {};
	    }
	    var pieChart = echarts.init($(id)[0]);
	    pieChart.showLoading();
	    // 设置异步
	    $.ajaxSettings.async = true;
	    $.getJSON(Url, UrlParams, function (data) {
	        if ($.isEmptyObject(data)) {
	            pieChart.hideLoading();
	            $(idAlert).show();
	            return;
	        }
            $(idAlert).hide();
	        option.series[0].name = seriesName;
	        (function(){
	            option.legend.data = eval('data.' + legendData);
	            option.series[0].data = eval('data.' + seriesData);
	        }());
	        pieChart.hideLoading();
	        pieChart.setOption(option, true);
	    });
	}

	
	function creatEchartsBarLine(id, Url, UrlParams, option, legendData, xAxisData, seriesData, lineName, idAlert) {
	    if (UrlParams == null) {
	        UrlParams = {};
	    }
	    var barLineChart = echarts.init($(id)[0]);
	    barLineChart.showLoading();
	    // 设置异步
	    $.ajaxSettings.async = true;
	    $.getJSON(Url, UrlParams, function (data) {
	        if ($.isEmptyObject(data.itemdata)) {
	            barLineChart.hideLoading();
	            $(idAlert).show();
	            return;
	        }
	        (function(){
	            option.legend.data = eval('data.' + legendData);
	            option.xAxis[0].data = eval('data.' + xAxisData);
	            option.series = eval('data.' + seriesData);
	       }());
	        for (var i = 0; i < option.series.length; i++) {
	            if (option.series[i].name == lineName) {
	                if (lineName.search('百分比') > -1 || lineName.search('比例') > -1 || lineName.search('命中率') > -1) {
	                    for (var j = 0; j < option.series[i].data.length; j++) {
	                        option.series[i].data[j] *= 100;
	                        option.series[i].data[j] = option.series[i].data[j].toFixed(3);
	                    }
	                }
	                option.series[i].type = 'line';
	                option.series[i].yAxisIndex = 1;
	            } else {
	                option.series[i].type = 'bar';
	                option.series[i].barGap = 0;
	            }
	            for(var j = 0; j < option.series[i].data.length;j++ ){
	                if (option.series[i].data[0].constructor == String) {
	                    option.series[i].data[j] = option.series[i].data[j].replace(/,/g,'');
	                }else{break;}
	            }
	        }
	        barLineChart.hideLoading();
	        $(idAlert).hide();
	        barLineChart.setOption(option, true);
	    });
	}

	function creatEchartsAreaStack(id, Url, UrlParams, option, legendData, xAxisData, seriesData, idAlert) {
	    if (UrlParams == null) {
	        UrlParams = {};
	    }
	    var stackChart = echarts.init($(id)[0]);
	    stackChart.showLoading();
	    // 设置异步
	    $.ajaxSettings.async = true;
	    $.getJSON(Url, UrlParams, function (data) {
	        if ($.isEmptyObject(data)) {
	            stackChart.hideLoading();
	            $(idAlert).show();
	            return;
	        }
	        $(idAlert).hide();
	        (function(){
	            option.legend.data = eval('data.' + legendData);
	            option.xAxis[0].data = eval('data.' + xAxisData);
	            option.series = eval('data.' + seriesData);
	        }());
	        for (var i = 0; i < option.series.length; i++) {
	            option.series[i].type = 'line';
	            option.series[i].stack = '总量';
	            option.series[i].areaStyle = {
	                normal: {}
	            };
	        }
	        option.series[option.series.length - 1].label = {
	            normal: {
	                show: true,
	                position: 'top'
	            }
	        };
	        stackChart.hideLoading();
	        stackChart.setOption(option, true);
	    });
	    return stackChart;
	}