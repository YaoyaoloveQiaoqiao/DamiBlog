var memCount=0;
var dbid=GetParam("dbid");
$.ajaxSettings.async = true; 
var members=new Array();
var str="<option value='content'>主机选择</option>";
$.getJSON("../DBMon_Hostname_Count?dbid="+dbid,function(result){
	$.each(result.member,function(k,v){
		members[k]=v;
		str+="<option value='"+k+"_"+v+"' title='"+v+"'>主机名-"+v+"</option>";
		memCount++;
	});
	str=str.replace("content", "0_"+members[0]);
	if(memCount>1){
		
		$("#members").css("display","");
	$("#members").html(str);
	var cpuurl=new Array();
	var cpuchartid=new Array();
	var cpualertid=new Array();
	var memurl=new Array();
	var memchartid=new Array();
	var memalertid=new Array();
	var diskurl=new Array();
	var diskchartid=new Array();
	var diskalertid=new Array();
	var neturl=new Array();
	var netchartid=new Array();
	var netalertid=new Array();
	var cpuIntervalId=new Array();
	var memIntervalId=new Array();
	var diskIntervalId=new Array();
	var netIntervalId=new Array();
	var cpumem=members.length;
	$('#members').change(function(){ 
		var str=this.value.split("_");
		var v=parseInt(str[0]);
		var host=str[1];
//		clearInterval(bufferIntervalId);
		for(var x=0;x<memCount;x++){
			if(cpuIntervalId[x]!=null){
				clearInterval(cpuIntervalId[x]);
				clearInterval($.session.get('cpu_chart'+x));
			}
			if(memIntervalId[x]!=null){
				clearInterval(memIntervalId[x]);
				clearInterval($.session.get('mem_chart'+x));
			}
			if(diskIntervalId[x]!=null){
				clearInterval(diskIntervalId[x]);
				clearInterval($.session.get('disk_chart'+x));
			}
			if(netIntervalId[x]!=null){
				clearInterval(netIntervalId[x]);
				clearInterval($.session.get('net_chart'+x));
			}
			
		}
		var html="<div class='row'>" +
				"		<div class='col-md-6'> " +
				"			<div class='panel panel-default'>" +
				"				<div class='panel-heading'>  " +
				"					<span class='glyphicon glyphicon-stats'>&nbsp;</span>CPU 主机-" +host+
				"<div class='refreshI time btn screen' style='right: 16px;left: inherit;'>	<i class='fa fa-expand'></i></div>"+
				"					<div  id='cputime"+v+"' class='timepicker2 pull-right tooltips btn time btn-default '  	data-container='body' data-placement='bottom'  	data-original-title='Change dashboard date range'>  	" +
				"					<i class='icon-calendar'></i>&nbsp; " +
				"					<span class='thin uppercase visible-lg-inline-block'></span>&nbsp;" +
				"					<i class='fa fa-angle-down'></i>  </div></div>" +
				"				<div class='panel-body'>" +
				"					<div class='row'>&nbsp;</div>" +
				"					<div id='alert_cpu_chart"+v+"' class='alert form-message alert-danger' style='opacity: 1; display: none;'>警告：没有当前CPU相关数据，请确认监控已开启，或等待一段时间。</div>  " +
				"					<div id='cpu_chart"+v+"' style='height:300px' class='chartscreen'></div></div></div></div>" +
				"	<div class='col-md-6'>" +
				"		<div class='panel panel-default'> 			" +
				"			<div class='panel-heading'>  	" +
				"			<span class='glyphicon glyphicon-stats'>&nbsp;</span>内存  主机-" +host+
				"<div class='refreshI time btn screen' style='right: 16px;left: inherit;'>	<i class='fa fa-expand'></i></div>"+
				"			<div  id='memtime"+v+"'    class='timepicker2 pull-right tooltips btn time btn-default '    data-container='body' data-placement='bottom'    data-original-title='Change dashboard date range'>    " +
				"			<i class='icon-calendar'></i>&nbsp; <span class='thin uppercase visible-lg-inline-block'></span>&nbsp;    <i class='fa fa-angle-down'></i></div></div>" +
				"			<div class='panel-body'><div class='row'>&nbsp;</div>" +
				"				<div id='alert_mem_chart"+v+"' class='alert form-message alert-danger' style='opacity: 1; display: none;'>警告：没有当前内存相关数据，请确认监控已开启，或等待一段时间。</div>" +
				"				<div id='mem_chart"+v+"' style='height:300px' class='chartscreen'></div></div></div></div></div>"+
				"<div class='row'>" +
				"	<div class='col-md-6'>       " +
				"		<div class='panel panel-default'>        " +
				"			<div class='panel-heading'>    " +
				"     			<span class='glyphicon glyphicon-stats'>&nbsp;</span>磁盘 主机-" +host+
				"<div class='refreshI time btn screen' style='right: 16px;left: inherit;'>	<i class='fa fa-expand'></i></div>"+
				"				<div  id='disktime"+v+"' class='timepicker2 pull-right tooltips btn time btn-default '     " +
				"            			data-container='body' data-placement='bottom'           " +
				"      					data-original-title='Change dashboard date range'>             " +
				"    			<i class='icon-calendar'></i>&nbsp; " +
				"				<span class='thin uppercase visible-lg-inline-block'></span>&nbsp;   " +
				"        		<i class='fa fa-angle-down'></i>  </div></div>" +
				"  			<div class='panel-body'>" +
				"				<div class='row'>" +
				"					<div class='col-md-6'>        " +
				"            		</div>          " +
				"					<div class='col-md-2 col-md-offset-4'>" +
				"					</div></div>" +
				"				<div class='row'>&nbsp;</div> " +
				"  				<div id='alert_disk_chart"+v+"' class='alert form-message alert-danger' style='opacity: 1; display: none;'>警告：没有当前磁盘相关数据，请确认监控已开启，或等待一段时间。</div>     " +
				"    			<div id='disk_chart"+v+"' style='height:300px' class='chartscreen'></div></div></div></div>" +
				"   <div class='col-md-6'>  " +
				"		<div class='panel panel-default'>" +
				"			<div class='panel-heading'>" +
				" 				<span class='glyphicon glyphicon-stats'>&nbsp;</span>网络 主机-" +host+
				"<div class='refreshI time btn screen' style='right: 16px;left: inherit;'>	<i class='fa fa-expand'></i></div>"+
				"				 <div  id='nettime"+v+"' class='timepicker2 pull-right tooltips btn time btn-default ' data-container='body' data-placement='bottom'         " +
				"    					   data-original-title='Change dashboard date range'>                 " +
				"					<i class='icon-calendar'></i>&nbsp; <span class='thin uppercase visible-lg-inline-block'></span>&nbsp;                 " +
				"					<i class='fa fa-angle-down'></i>         " +
				"				</div> </div>        " +
				"			<div class='panel-body'><div class='row'>&nbsp;</div>         " +
				" 			 	<div id='alert_net_chart"+v+"' class='alert form-message alert-danger' style='opacity: 1; display: none;'>警告：没有当前网络相关数据，请确认监控已开启，或等待一段时间。</div> " +
				"				<div id='net_chart"+v+"' style='height:300px' class='chartscreen'></div></div></div></div></div>";
		$("#content").html(html);
		var cpuinterval=1000*300;
		var meminterval=1000*300;
		var diskinterval=1000*300;
		var netinterval=1000*300;
		var cpu_chart = initNomalEChart([[0,0]],"cpu_chart"+v,"",null,null,null,"单位：%","CPU");
		refreshNomalEChart("../DBMon_HW_Chart_CPU?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+host,cpu_chart,"","alert_cpu_chart"+v,"cpu_chart"+v);
		cpuIntervalId[v] = intervalRefreshEchart("../DBMon_HW_Chart_CPU?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+host,cpu_chart,"","alert_cpu_chart"+v,"cpu_chart"+v);
		
		var mem_chart = initNomalEChart([[0,0]],"mem_chart"+v,"",null,null,null,"单位：MB","内存");
		refreshNomalEChart("../DBMon_HW_Chart_Mem?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+host,mem_chart,"","alert_mem_chart"+v,"mem_chart"+v);
		memIntervalId[v] = intervalRefreshEchart("../DBMon_HW_Chart_Mem?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+host,mem_chart,"","alert_mem_chart"+v,"mem_chart"+v);

		var disk_chart = initNomalEChart([[0,0]],"disk_chart"+v,"",null,null,null,"单位：ms","磁盘");
		refreshNomalEChart("../DBMon_HW_Chart_Disk?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+host ,disk_chart,"","alert_disk_chart"+v,"disk_chart"+v);
		diskIntervalId[v]= intervalRefreshEchart("../DBMon_HW_Chart_Disk?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+host,disk_chart,"","alert_disk_chart"+v,"disk_chart"+v);

		var net_chart = initNomalEChart([[0,0]],"net_chart"+v,"",null,null,null,"单位：Byte/s","网络");
		refreshNomalEChart("../DBMon_HW_Chart_Net?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+host,net_chart,"","alert_net_chart"+v,"net_chart"+v);
		netIntervalId[v] = intervalRefreshEchart("../DBMon_HW_Chart_Net?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+host,net_chart,"","alert_net_chart"+v,"net_chart"+v);

		
		
		
		Index.initMemInterDaterange("#memtime"+v,"../DBMon_HW_Chart_Mem",mem_chart,"alert_mem_chart"+v,host,memIntervalId[v],"mem_chart"+v);
		Index.initMemInterDaterange("#cputime"+v,"../DBMon_HW_Chart_CPU",cpu_chart,"alert_cpu_chart"+v,host,cpuIntervalId[v],"cpu_chart"+v);
		Index.initMemInterDaterange("#disktime"+v,"../DBMon_HW_Chart_Disk",disk_chart,"alert_disk_chart"+v,host,diskIntervalId[v],"disk_chart"+v);
		Index.initMemInterDaterange("#nettime"+v,"../DBMon_HW_Chart_Net",net_chart,"alert_net_chart"+v,host,netIntervalId[v],"net_chart"+v);
		displayChart();
	});	
	//displayChart();
	$( "#members" ).change();
	}else{
		var cpuurl;
		var cpuchartid;
		var cpualertid;
		var memurl;
		var memchartid;
		var memalertid;
		var diskurl;
		var diskchartid;
		var diskalertid;
		var neturl;
		var netchartid;
		var netalertid;
		var cpuIntervalId;
		var memIntervalId;
		var diskIntervalId;
		var netIntervalId;
			$("#members").css("display","none");
			var html="<div class='row'>" +
			"<div class='row'>&nbsp;</div>" +
			"		<div class='col-md-6'> " +
			"			<div class='panel panel-default'>" +
			"				<div class='panel-heading'>  " +
			"					<span class='glyphicon glyphicon-stats'>&nbsp;</span>CPU " +
			"<div class='refreshI time btn screen' style='right: 16px;left: inherit;'>	<i class='fa fa-expand'></i></div>"+
			"					<div  id='cputime' class='timepicker2 pull-right tooltips btn time btn-default '  	data-container='body' data-placement='bottom'  	data-original-title='Change dashboard date range'>  	" +
			"					<i class='icon-calendar'></i>&nbsp; " +
			"					<span class='thin uppercase visible-lg-inline-block'></span>&nbsp;" +
			"					<i class='fa fa-angle-down'></i>  </div></div>" +
			"				<div class='panel-body'>" +
			"					<div class='row'>&nbsp;</div>" +
			"					<div id='alert_cpu_chart' class='alert form-message alert-danger' style='opacity: 1; display: none;'>警告：没有当前CPU相关数据，请确认监控已开启，或等待一段时间。</div>  " +
			"					<div id='cpu_chart' class='chartscreen' style='height:300px'></div></div></div></div>" +
			"	<div class='col-md-6'>" +
			"		<div class='panel panel-default'> 			" +
			"			<div class='panel-heading'>  	" +
			"			<span class='glyphicon glyphicon-stats'>&nbsp;</span>内存" +
			"<div class='refreshI time btn screen' style='right: 16px;left: inherit;'>	<i class='fa fa-expand'></i></div>"+
			"			<div  id='memtime'    class='timepicker2 pull-right tooltips btn time btn-default '    data-container='body' data-placement='bottom'    data-original-title='Change dashboard date range'>    " +
			"			<i class='icon-calendar'></i>&nbsp; <span class='thin uppercase visible-lg-inline-block'></span>&nbsp;    <i class='fa fa-angle-down'></i></div></div>" +
			"			<div class='panel-body'><div class='row'>&nbsp;</div>" +
			"				<div id='alert_mem_chart' class='alert form-message alert-danger' style='opacity: 1; display: none;'>警告：没有当前内存相关数据，请确认监控已开启，或等待一段时间。</div>" +
			"				<div id='mem_chart' class='chartscreen' style='height:300px'></div></div></div></div></div>"+
			"<div class='row'>" +
			"	<div class='col-md-6'>       " +
			"		<div class='panel panel-default'>        " +
			"			<div class='panel-heading'>    " +
			"     			<span class='glyphicon glyphicon-stats'>&nbsp;</span>磁盘" +
			"<div class='refreshI time btn screen' style='right: 16px;left: inherit;'>	<i class='fa fa-expand'></i></div>"+
			"				<div  id='disktime' class='timepicker2 pull-right tooltips btn time btn-default '     " +
			"            			data-container='body' data-placement='bottom'           " +
			"      					data-original-title='Change dashboard date range'>             " +
			"    			<i class='icon-calendar'></i>&nbsp; " +
			"				<span class='thin uppercase visible-lg-inline-block'></span>&nbsp;   " +
			"        		<i class='fa fa-angle-down'></i>  </div></div>" +
			"  			<div class='panel-body'>" +
			"				<div class='row'>" +
			"					<div class='col-md-6'>        " +
			"            		</div>          " +
			"					<div class='col-md-2 col-md-offset-4'>" +
			"					</div></div>" +
			"				<div class='row'>&nbsp;</div> " +
			"  				<div id='alert_disk_chart' class='alert form-message alert-danger' style='opacity: 1; display: none;'>警告：没有当前磁盘相关数据，请确认监控已开启，或等待一段时间。</div>     " +
			"    			<div id='disk_chart' class='chartscreen' style='height:300px'></div></div></div></div>" +
			"   <div class='col-md-6'>  " +
			"		<div class='panel panel-default'>" +
			"			<div class='panel-heading'>" +
			" 				<span class='glyphicon glyphicon-stats'>&nbsp;</span>网络" +
			"<div class='refreshI time btn screen' style='right: 16px;left: inherit;'>	<i class='fa fa-expand'></i></div>"+
			"				 <div  id='nettime' class='timepicker2 pull-right tooltips btn time btn-default ' data-container='body' data-placement='bottom'         " +
			"    					   data-original-title='Change dashboard date range'>                 " +
			"					<i class='icon-calendar'></i>&nbsp; <span class='thin uppercase visible-lg-inline-block'></span>&nbsp;                 " +
			"					<i class='fa fa-angle-down'></i>         " +
			"				</div> </div>        " +
			"			<div class='panel-body'><div class='row'>&nbsp;</div>         " +
			" 			 	<div id='alert_net_chart' class='alert form-message alert-danger' style='opacity: 1; display: none;'>警告：没有当前网络相关数据，请确认监控已开启，或等待一段时间。</div> " +
			"				<div id='net_chart' class='chartscreen' style='height:300px'></div></div></div></div></div>";
			$("#content").html(html);
			var cpuinterval=1000*300;
			var meminterval=1000*300;
			var diskinterval=1000*300;
			var netinterval=1000*300;
			var cpu_chart = initNomalEChart([[0,0]],"cpu_chart","",null,null,null,"单位：%","CPU");
			refreshNomalEChart("../DBMon_HW_Chart_CPU?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0],cpu_chart,"","alert_cpu_chart","cpu_chart");
			cpuIntervalId = intervalRefreshEchart("../DBMon_HW_Chart_CPU?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0],cpu_chart,"","alert_cpu_chart","cpu_chart");
			
			var mem_chart = initNomalEChart([[0,0]],"mem_chart","",null,null,null,"单位：MB","内存");
			refreshNomalEChart("../DBMon_HW_Chart_Mem?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0],mem_chart,"","alert_mem_chart","mem_chart");
			memIntervalId = intervalRefreshEchart("../DBMon_HW_Chart_Mem?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0],mem_chart,"","alert_mem_chart","mem_chart");

			var disk_chart = initNomalEChart([[0,0]],"disk_chart","",null,null,null,"单位：ms","磁盘");
			refreshNomalEChart("../DBMon_HW_Chart_Disk?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0] ,disk_chart,"","alert_disk_chart","disk_chart");
			diskIntervalId = intervalRefreshEchart("../DBMon_HW_Chart_Disk?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0],disk_chart,"","alert_disk_chart","disk_chart");

			var net_chart = initNomalEChart([[0,0]],"net_chart","",null,null,null,"单位：Byte/s","网络");
			refreshNomalEChart("../DBMon_HW_Chart_Net?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0],net_chart,"","alert_net_chart","net_chart");
			netIntervalId = intervalRefreshEchart("../DBMon_HW_Chart_Net?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0],net_chart,"","alert_net_chart","net_chart");

			
			/*
			createSpline("../DBMon_HW_Chart_CPU?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0], 
					"cpu_chart", 
					"单位：%", 
					"alert_cpu_chart",	
					"",
					"area",
					null,
					100);
			createSpline("../DBMon_HW_Chart_Mem?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0], 
					"mem_chart", 
					"单位：MB", 
					"alert_mem_chart",
					"",
					"area");
			createSpline("../DBMon_HW_Chart_Disk?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0] , "disk_chart", "单位：ms", "alert_disk_chart");
			createSpline("../DBMon_HW_Chart_Net?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0], "net_chart", "单位：Byte/s", "alert_net_chart");
			
			cpuurl="../DBMon_HW_Chart_CPU?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0];
			cpuchartid="cpu_chart";
			cpualertid= "alert_cpu_chart";
			cpuIntervalId=setInterval(function(){
				var time_end =  new Date().getTime();
				refreshSpline(cpuurl+"&time="+time_end, cpuchartid, "单位：%", cpualertid, "", "area");
			}, 5*1000);
			
			memurl="../DBMon_HW_Chart_Mem?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0];
			memchartid="mem_chart";
			memalertid= "alert_mem_chart";
			memIntervalId=setInterval(function(){
				var time_end =  new Date().getTime();
				refreshSpline(memurl+"&time="+time_end, memchartid, "单位：MB", memalertid, "", "area");
			}, 5*1000);
			diskurl="../DBMon_HW_Chart_Disk?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0];
			diskchartid="disk_chart";
			diskalertid= "alert_disk_chart";
			
			diskIntervalId=setInterval(function(){
				var time_end =  new Date().getTime();
					refreshSpline(diskurl+"&time="+time_end, diskchartid, "单位：MB", diskalertid);
				}, 5*1000);
			neturl="../DBMon_HW_Chart_Net?dbid="+GetParam("dbid") + "&period=real&interval=5&hostname="+members[0];
			netchartid="net_chart";
			netalertid= "alert_net_chart";
			
			netIntervalId=setInterval(function(){
				var time_end =  new Date().getTime();
				refreshSpline(neturl+"&time="+time_end, netchartid, "单位：MB", netalertid);
			}, 5*1000);*/
			
			Index.initMemInterDaterange("#memtime","../DBMon_HW_Chart_Mem",mem_chart,"alert_mem_chart",members[0],memIntervalId,"mem_chart");
			Index.initMemInterDaterange("#cputime","../DBMon_HW_Chart_CPU",cpu_chart,"alert_cpu_chart",members[0],cpuIntervalId,"cpu_chart");
			Index.initMemInterDaterange("#disktime","../DBMon_HW_Chart_Disk",disk_chart,"alert_disk_chart",members[0],diskIntervalId,"disk_chart");
			Index.initMemInterDaterange("#nettime","../DBMon_HW_Chart_Net",net_chart,"alert_net_chart",members[0],netIntervalId,"net_chart");
			displayChart();
	}
	$("#loading").hide();
	
});
