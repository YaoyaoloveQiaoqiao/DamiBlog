var imageNameDate = new Date();
var imageName = "";
var initOption =function(data,titleText,seriesName,seriesType,xAxistype,columnDate,ysetName,imageName){
	if(seriesType==null){
		seriesType='line';
	}
	if(!xAxistype){
		xAxistype='time';
	}
	if(!ysetName){
		ysetName="";
	}
	var nomalOption = {
		    title: {
		        text: titleText,
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
		    tooltip:{
		    	trigger: 'axis',		    	 
			    formatter: function(params) {
			    	var str="";
			    	
			    	str="时间:"+format4( new Date(params[0].data[0]))+"";
		    		
			    	
			    	var returnStr="";
			    	for(var i=0;i<params.length;i++){
			    		/*returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] ;*/
			    		if(params[i].seriesName.indexOf("平均时间")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 毫秒";
			    		}else if(params[i].seriesName.indexOf("连接数")>=0||params[0].seriesName.indexOf("key_blocks_used")>=0||params[0].seriesName.indexOf("io_capicity")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 个";
			    		}else if(params[0].seriesName.indexOf("CPU")>=0||params[0].seriesName.indexOf("key_reads_rate")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" %";
			    		}else if(params[0].seriesName.indexOf("空闲内存")>=0||params[0].seriesName.indexOf("已用内存")>=0||params[0].seriesName.indexOf("SWAP")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" MB";
			    		}else if(params[0].seriesName.indexOf("磁盘读时间")>=0||params[0].seriesName.indexOf("磁盘写时间")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" ms";
			    		}else if(params[0].seriesName.indexOf("eth0")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" Byte/s";
			    		}else if(params[0].seriesName.indexOf("key_buffer_size")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" KB";
			    		}else if(params[0].seriesName.indexOf("rows_read")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 行";
			    		}else {
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 次"
			    		}
			    	}
		            return str+returnStr;
		        },
		    },
		    color:['#FFDF4A','#F87559','#4290EA','#5AB35A','#E0E4CC','#949FB1','#D4CCC5','#E2EAE9','#69D2E7'],
		    toolbox: {
		    	show: true,
		    	orient: 'horizontal',
		    	itemSize: 15,
		    	itemGap: 10,
		    	showTitle: true,
		    	feature: {
		    	saveAsImage: {show:true},
		    	restore: {show:true},
		    	dataView: {show:true},
		    	dataZoom: {show:true},
		    	},
		    	
		    },

		    toolbox: {
		        feature: {
		            saveAsImage: {name : imageName+imageNameDate},
		        },
		        right: '30'
		    },
		    xAxis: {
		        type: xAxistype,
		        data:columnDate,
		        boundaryGap: ['20%', '20%']
		    },
		    yAxis: {
		        type: 'value',
		        name:ysetName,
		    },
		    series: [
		        {
		            name:seriesName,
		            type:seriesType,
		            data:data, 
	                itemStyle:{
	              		normal:{
	              			borderWidth :8	
	              		}
	              	},
		        	markPoint: {
		        		data: [
		                   /* {type: 'max', name: '最大值',symbol:'pin',symbolSize:60},
		                    {type: 'min', name: '最小值',symbol:'pin',symbolSize:48,symbolRotate :180}*/
	                    ]
		        	},
		        }
		    ],
		    animation:true,
		};

	return nomalOption;
}

var initOption2 =function(data,titleText,seriesName,seriesType,xAxistype,columnDate,ysetName,imageName,selectId){
	if(seriesType==null){
		seriesType='line';
	}
	if(!xAxistype){
		xAxistype='time';
	}
	if(!ysetName){
		ysetName="";
	}
	var nomalOption = {
		    title: {
		        text: titleText,
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
		    tooltip:{
		    	trigger: 'axis',		    	 
			    formatter: function(params) {
			    	var str="";
			    	var returnStr="";
			    	if(selectId != undefined){
			    		str="时间:"+params[0].name;
			    		
			    		for(var i=0;i<params.length;i++){
				    		if(params[i].seriesName.indexOf("平均时间")>=0){
				    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].data +" ms";
				    		}else if(params[i].seriesName.indexOf("次数")>=0){
				    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].data +" 次";
				    		}else{
				    			
				    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].data + " 次/s"
				    		}
				    	}
			    	}else{
				    	str="时间:"+format4( new Date(params[0].data[0]))+"";
				    	
				    	for(var i=0;i<params.length;i++){
				    		if(params[i].seriesName.indexOf("平均时间")>=0){
				    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" ms";
				    		}else if(params[i].seriesName.indexOf("次数")>=0){
				    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 次";
				    		}else{
				    			
				    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] + " 次/s"
				    		}
				    	}
			    	}
			    	
		            return str+returnStr;
		        },
		    }
		    ,toolbox: {
		    	show: true,
		    	orient: 'horizontal',
		    	itemSize: 15,
		    	itemGap: 10,
		    	showTitle: true,
		    	feature: {
			    	saveAsImage: {show:true},
			    	restore: {show:false},
			    	dataView: {show:true},
			    	dataZoom: {show:true},
		    	},
		    	
		    },

		    toolbox: {
		    	
		        //做仪表盘 测试 添加        此处功能：取消右上角下载图片      阴惠瑶
		    	show: false,
		    
		        feature: {
		            saveAsImage: {name : imageName+imageNameDate},
		        },
		    	right: '20'
		    },
		    xAxis: {
		        type: xAxistype,
		        data:columnDate,
		        boundaryGap: ['20%', '20%']
		    },
		    yAxis: {
		        type: 'value',
		        name:ysetName,
		    },
		    series: [
		        {
		            name:seriesName,
		            type:seriesType,
		            data:data, 
	                itemStyle:{
	              		normal:{
	              			borderWidth :8	
	              		}
	              	},
		        	markPoint: {
		        		data: [
		                    /*{type: 'max', name: '最大值',symbol:'pin',symbolSize:60},
		                    {type: 'min', name: '最小值',symbol:'pin',symbolSize:48,symbolRotate :180}*/
	                    ]
		        	},
		        }
		    ],
		    animation:true,
		};
	
	return nomalOption;
}

var initOption3 =function(data,titleText,seriesName,seriesType,xAxistype,columnDate,ysetName,imageName,selectId){
	if(seriesType==null){
		seriesType='line';
	}
	if(!xAxistype){
		xAxistype='time';
	}
	if(!ysetName){
		ysetName="";
	}
	var nomalOption = {
		    title: {
		        text: titleText,
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
		    tooltip:{
		    	trigger: 'axis',		    	 
			    formatter: function(params) {
			    	var str="";
			    	var returnStr="";
			    	/*if(selectId != undefined){
			    		str="时间:"+params[0].name;
			    		
			    		for(var i=0;i<params.length;i++){
				    		if(params[i].data == '0'){
				    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].data;
				    		}else{
				    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].data + "%";
				    		}
				    	}
			    	}else{*/
			    		str="时间:"+format4( new Date(params[0].data[0]))+"";
				    	for(var i=0;i<params.length;i++){
				    		if(params[i].value[1] == '0'){
				    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1];
				    		}else{
				    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] + "%";
				    		}
				    	//}
			    	}
			    	
		            return str+returnStr;
		        },
		    }
		    ,toolbox: {
		    	show: true,
		    	orient: 'horizontal',
		    	itemSize: 15,
		    	itemGap: 10,
		    	showTitle: true,
		    	feature: {
		    	saveAsImage: {show:true},
		    	restore: {show:true},
		    	dataView: {show:true},
		    	dataZoom: {show:true},
		    	},
		    	
		    },

		    toolbox: {
		        feature: {
		            saveAsImage: {name : imageName+imageNameDate},
		        }
		    },
		    xAxis: {
		        type: xAxistype,
		        data:columnDate,
		        //boundaryGap: ['20%', '20%']
		    },
		    yAxis: {
		        type: 'value',
		        name:ysetName,
		        axisLabel:{
		        	formatter:'{value}%'
		        }
		    },
		    series: [
		        {
		            name:seriesName,
		            type:seriesType,
		            data:data, 
	                itemStyle:{
	              		normal:{
	              			borderWidth :8	
	              		}
	              	},
		        	markPoint: {
		        		data: [
		                    /*{type: 'max', name: '最大值',symbol:'pin',symbolSize:60},
		                    {type: 'min', name: '最小值',symbol:'pin',symbolSize:48,symbolRotate :180}*/
	                    ]
		        	},
		        }
		    ],
		    animation:true,
		};
//	if(selectId!=undefined){
//		nomalOption.xAxis.boundaryGap = undefined;
//	}
	return nomalOption;
}

var initOption4 =function(data,titleText,seriesName,seriesType,xAxistype,columnDate,ysetName,imageName){
	if(seriesType==null){
		seriesType='line';
	}
	if(!xAxistype){
		xAxistype='time';
	}
	if(!ysetName){
		ysetName="";
	}
	var nomalOption = {
		    title: {
		        text: titleText,
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
		    tooltip:{
		    	trigger: 'axis',		    	 
			    formatter: function(params) {
			    	var str="";
			    	
			    	str="时间:"+format4( new Date(params[0].data[0]))+"";
		    		
			    	
			    	var returnStr="";
			    	for(var i=0;i<params.length;i++){
			    		returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] + " MB" ;
			    	}
			    	
		            return str+returnStr;
		        },
		    }
		    ,toolbox: {
		    	show: true,
		    	orient: 'horizontal',
		    	itemSize: 15,
		    	itemGap: 10,
		    	showTitle: true,
		    	feature: {
		    	saveAsImage: {show:true},
		    	restore: {show:true},
		    	dataView: {show:true},
		    	dataZoom: {show:true},
		    	},
		    	
		    },

		    toolbox: {
		        feature: {
		            saveAsImage: {name : imageName+imageNameDate},
		        }
		    },
		    xAxis: {
		        type: xAxistype,
		        data:columnDate,
		        boundaryGap: ['20%', '20%']
		    },
		    yAxis: {
		        type: 'value',
		        //name:'单位：MB',
				axisLabel: {
					formatter:function(value){
		        		if(value>=1000){
		        			value = value/1000;
		        			return value+"GB";
		        		}else{
		        			return value+"MB";    		
		        		}
					}
				}
		    },
		    series: [
		        {
		            name:seriesName,
		            type:seriesType,
		            data:data, 
	                itemStyle:{
	              		normal:{
	              			borderWidth :8	
	              		}
	              	},
		        	markPoint: {
		        		data: [
		                    /*{type: 'max', name: '最大值',symbol:'pin',symbolSize:60},
		                    {type: 'min', name: '最小值',symbol:'pin',symbolSize:48,symbolRotate :180}*/
	                    ]
		        	},
		        }
		    ],
		    animation:true,
		};

	return nomalOption;
}


var initOption5 =function(data,titleText,seriesName,seriesType,xAxistype,columnDate,ysetName,imageName){
	if(seriesType==null){
		seriesType='line';
	}
	if(!xAxistype){
		xAxistype='time';
	}
	if(!ysetName){
		ysetName="";
	}
	var nomalOption = {
		    title: {
		        text: titleText,
		    },
		    legend: {
		    	data:[]
		    },
		    grid: {
		        left: '1%',
		        right: '1%',
		        bottom: '1%',
		        containLabel: true
		    },
		    tooltip:{
		    	trigger: 'axis',		    	 
			    formatter: function(params) {
			    	var str="";
			    	
			    	str="时间:"+format4( new Date(params[0].data[0]))+"";
		    		
			    	
			    	var returnStr="";
			    	for(var i=0;i<params.length;i++){
			    		
//			    		if(params[i].seriesName.indexOf("平均时间")>=0){
//			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 毫秒";
//			    		}
//			    		else if(params[i].seriesName.indexOf("连接数")>=0||params[0].seriesName.indexOf("key_blocks_used")>=0||params[0].seriesName.indexOf("io_capicity")>=0){
//			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 个";
//			    		}
			    		 if(params[0].seriesName.indexOf("CPU")>=0||params[0].seriesName.indexOf("key_reads_rate")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" %";
			    		}else{
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] ;
			    		}
			    		 
			    		 
//			    		else if(params[0].seriesName.indexOf("空闲内存")>=0||params[0].seriesName.indexOf("已用内存")>=0||params[0].seriesName.indexOf("SWAP")>=0){
//			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" MB";
//			    		}
//			    		else if(params[0].seriesName.indexOf("磁盘读时间")>=0||params[0].seriesName.indexOf("磁盘写时间")>=0){
//			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" ms";
//			    		}
//			    		else if(params[0].seriesName.indexOf("eth0")>=0){
//			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" Byte/s";
//			    		}
//			    		else if(params[0].seriesName.indexOf("key_buffer_size")>=0){
//			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" KB";
//			    		}
//			    		else if(params[0].seriesName.indexOf("rows_read")>=0){
//			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 行";
//			    		}
//			    		else {
//			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 次"
//			    		}
			    	}
		            return str+returnStr;
		        },
		    },
		    color:['#FFDF4A','#F87559','#4290EA','#5AB35A','#E0E4CC','#949FB1','#D4CCC5','#E2EAE9','#69D2E7'],
		    

		    toolbox: {
		        feature: {
		            saveAsImage: {name : imageName+imageNameDate},
		        },
		        right: '30'
		    },
		    xAxis: {
		        type: xAxistype,
		        data:columnDate,
		        boundaryGap: ['20%', '20%']
		    },
		    yAxis: {
		        type: 'value',
		        max: '100',//固定住cpu 图表的纵轴为100%
		        name:ysetName,
		    },
		    series: [
		             
		             
		    ],
		    animation:true,
		};

	return nomalOption;
}

var initOption6 =function(data,titleText,seriesName,seriesType,xAxistype,columnDate,ysetName,imageName){
	if(seriesType==null){
		seriesType='line';
	}
	if(!xAxistype){
		xAxistype='category';
	}
	if(!ysetName){
		ysetName="";
	}
	var nomalOption = {
		    title: {
		        text: titleText,
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
		    tooltip:{
		    	trigger: 'axis',
		    },
		    color:['#FFDF4A','#F87559','#4290EA','#5AB35A','#E0E4CC','#949FB1','#D4CCC5','#E2EAE9','#69D2E7'],
		    toolbox: {
		    	show: true,
		    	orient: 'horizontal',
		    	itemSize: 15,
		    	itemGap: 10,
		    	showTitle: true,
		    	feature: {
		    	saveAsImage: {show:true},
		    	restore: {show:true},
		    	dataView: {show:true},
		    	dataZoom: {show:true},
		    	},
		    	
		    },
		    //为毛写两遍，上边那个还不能用，为毛？
		    toolbox: {
		        feature: {
		            saveAsImage: {name : imageName+imageNameDate},
		        },
		        right: '30'
		    },
		    xAxis: {
		        type: xAxistype,
		        data:['00:00:00','01:00:00','02:00:00','03:00:00','04:00:00','05:00:00','06:00:00','07:00:00','08:00:00',
		              '09:00:00','10:00:00','11:00:00','12:00:00','13:00:00','14:00:00','15:00:00','16:00:00','17:00:00',
		              '18:00:00','19:00:00','20:00:00','21:00:00','22:00:00','23:00:00'],
		        boundaryGap: ['20%', '20%']
		    },
		    yAxis: {
		        type: 'value',
		        name:ysetName,
		    },
		    series: [
		        {
		            name:seriesName,
		            type:seriesType,
		            data:data, 
	                itemStyle:{
	              		normal:{
	              			borderWidth :8	
	              		}
	              	},
		        	markPoint: {
		        		data: [
		                   /* {type: 'max', name: '最大值',symbol:'pin',symbolSize:60},
		                    {type: 'min', name: '最小值',symbol:'pin',symbolSize:48,symbolRotate :180}*/
	                    ]
		        	},
		        },
		    ],
		    animation:true,
		};

	return nomalOption;
}

var initOption =function(data,titleText,seriesName,seriesType,xAxistype,columnDate,ysetName,imageName){
	if(seriesType==null){
		seriesType='line';
	}
	if(!xAxistype){
		xAxistype='time';
	}
	if(!ysetName){
		ysetName="";
	}
	var nomalOption = {
		    title: {
		        text: titleText,
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
		    tooltip:{
		    	trigger: 'axis',		    	 
			    formatter: function(params) {
			    	var str="";
			    	
			    	str="时间:"+format4( new Date(params[0].data[0]))+"";
		    		
			    	
			    	var returnStr="";
			    	for(var i=0;i<params.length;i++){
			    		/*returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] ;*/
			    		if(params[i].seriesName.indexOf("平均时间")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 毫秒";
			    		}else if(params[i].seriesName.indexOf("连接数")>=0||params[0].seriesName.indexOf("key_blocks_used")>=0||params[0].seriesName.indexOf("io_capicity")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 个";
			    		}else if(params[0].seriesName.indexOf("CPU")>=0||params[0].seriesName.indexOf("key_reads_rate")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" %";
			    		}else if(params[0].seriesName.indexOf("空闲内存")>=0||params[0].seriesName.indexOf("已用内存")>=0
			    				||params[0].seriesName.indexOf("SWAP")>=0 ){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" MB";
			    		}else if( params[0].seriesName.indexOf("接收")>=0 || params[0].seriesName.indexOf("发送")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" MB/s";
			    		}else if(params[0].seriesName.indexOf("已使用内存")>=0||params[0].seriesName.indexOf("内存高水位")>=0||params[0].seriesName.indexOf("最大可用内存")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" GB";
			    		}else if(params[0].seriesName.indexOf("已用磁盘大小")>=0||params[0].seriesName.indexOf("磁盘总大小")>=0
			    				||params[0].seriesName.indexOf("数据大小")>=0||params[0].seriesName.indexOf("日志大小")>=0
			    				||params[0].seriesName.indexOf("追踪记录大小")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" GB";
			    		}else if(params[0].seriesName.indexOf("磁盘读时间")>=0||params[0].seriesName.indexOf("磁盘写时间")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" ms";
			    		}else if(params[0].seriesName.indexOf("eth0")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" Byte/s";
			    		}else if(params[0].seriesName.indexOf("key_buffer_size")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" KB";
			    		}else if(params[0].seriesName.indexOf("rows_read")>=0){
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 行";
			    		}else {
			    			returnStr+="<br/>"+params[i].seriesName + ' : ' + params[i].value[1] +" 次"
			    		}
			    	}
		            return str+returnStr;
		        },
		    },
		    color:['#FFDF4A','#F87559','#4290EA','#5AB35A','#E0E4CC','#949FB1','#D4CCC5','#E2EAE9','#69D2E7'],
		    toolbox: {
		    	show: true,
		    	orient: 'horizontal',
		    	itemSize: 15,
		    	itemGap: 10,
		    	showTitle: true,
		    	feature: {
		    	saveAsImage: {show:true},
		    	restore: {show:true},
		    	dataView: {show:true},
		    	dataZoom: {show:true},
		    	},
		    	
		    },

		    toolbox: {
		        feature: {
		            saveAsImage: {name : imageName+imageNameDate},
		        },
		        right: '30'
		    },
		    xAxis: {
		        type: xAxistype,
		        data:columnDate,
		        boundaryGap: ['20%', '20%']
		    },
		    yAxis: {
		        type: 'value',
		        name:ysetName,
		    },
		    series: [
		        {
		            name:seriesName,
		            type:seriesType,
		            data:data, 
	                itemStyle:{
	              		normal:{
	              			borderWidth :8	
	              		}
	              	},
		        	markPoint: {
		        		data: [
		                   /* {type: 'max', name: '最大值',symbol:'pin',symbolSize:60},
		                    {type: 'min', name: '最小值',symbol:'pin',symbolSize:48,symbolRotate :180}*/
	                    ]
		        	},
		        }
		    ],
		    animation:true,
		};

	return nomalOption;
}

var initOptionNormal =function(data,titleText,seriesName,seriesType,xAxistype,columnDate,yShow){
	if(seriesType==null){
		seriesType='line';
	}
	if(!xAxistype){
		xAxistype='time';
	}
	if(!yShow){
		yShow=true;
	}
	var nomalOption = {
		    title: {
		        text: titleText,
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    tooltip:{
		    	trigger: 'axis',
		    	formatter:'{b}:{c}'
		    }
		    ,
		    toolbox: {
		        feature: {
		            saveAsImage: {name : titleText+imageNameDate},
		        }
		    },
		    xAxis: {
		        type: 'category',
		        data:columnDate,
		        boundaryGap:['10%','10%'],
		        axisLabel: {
		        	show: true,
		        	interval: 0,
		        	inside: false,
		        	rotate: 15,
		        	textStyle: {
		        	
		        	},
		        }
		    },
		    yAxis: {
		    	show:yShow,
		        type: 'value',
		        name:"大小(MB)",
		    },
		    series: [
		        {
		            name:seriesName,
		            type:seriesType,
		            data:data, 
		            barMaxWidth :30,
		            axisLabel: {
			        	show: true,
			        	interval: 0,
			        	inside: false,
			        	rotate: 10,
			        	textStyle: {
			        	
			        	},
			        }
		        }
		    ],
		    animation:true,
		};
	return nomalOption;
}





var optionAdd =function(option,data){
	option.push(data);
	return option;
}

//selectId是多节点添加的，但是和多节点关系不大  以后考虑更换名称  逻辑也需要再整理一下
var initNomalEChart =function(data,chartDomId,titleText,seriesName,seriesType,xAxistype,ysetName,imageName,selectId){
	if(chartDomId == 'sqlchart' || chartDomId == 'tpschart' 
		|| chartDomId == 'db2io' || chartDomId == 'async_io_chart' || chartDomId == 'logchart'){
		/*if(!columnDate){
			columnDate = [];
		}*/
		var nomalOption=initOption2(data,titleText,seriesName,seriesType,xAxistype,[],ysetName,imageName,selectId);
	}else if(chartDomId == 'db2bufferhitratio'||chartDomId == 'orabufferhitratio'){
		var nomalOption=initOption3(data,titleText,seriesName,seriesType,xAxistype,[],ysetName,imageName,selectId);
		console.log(nomalOption);
	}else if(chartDomId == 'trend_chart'){
		var nomalOption=initOption4(data,titleText,seriesName,seriesType,xAxistype,[],ysetName,imageName);
	}else if(chartDomId == 'cpu_chart'){
		var nomalOption=initOption5(data,titleText,seriesName,seriesType,xAxistype,[],ysetName,imageName);
	}else if(chartDomId == 'avgsqltime' || chartDomId == 'catcache'){
		var nomalOption=initOption6(data,titleText,seriesName,seriesType,xAxistype,[],ysetName,imageName);
	}else{
		var nomalOption=initOption(data,titleText,seriesName,seriesType,xAxistype,[],ysetName,imageName);
	}
	var eChart=echarts.init(document.getElementById(chartDomId),'macarons');
	eChart.setOption(nomalOption);
	$(window).resize(function(){
		eChart.resize();
	});
	return eChart;
}

var initNomalEChartWithUrl =function(url,chartDomId,titleText,seriesName,seriesType,yShow){
	var eChart;
	$.getJSON(url,function(data){
		var nomalOption;
		
		if(data.categories){
			nomalOption=initOptionNormal(data.data,titleText,seriesName,seriesType,'category',data.categories,yShow);
		}else{
			nomalOption=initOption(data.data,titleText,seriesName,seriesType,null,null,null,imageName);
		}
		eChart=echarts.init(document.getElementById(chartDomId),'macarons'); 
		eChart.setOption(nomalOption);
		$(window).resize(function(){
			eChart.resize();
		});
	});
	return eChart;
}

function getSelectedNumber(selectId){
	var $selected = $("#" + selectId);
	if($selected == undefined || $selected.css("display") == "none")
		return undefined;
	return $selected.val();
}

function judgeSelectedNumber(selectId,memberList){
	var $selected = $("#" + selectId);
	var list = [];
	$.each(memberList,function(index,item){
		if(item.member!=undefined && $.inArray(item.member, list)<0){
			list.push(item.member);
		}
	})
	//console.log(list.length + "aa" + $selected[0].length);
	if(list.length != $selected[0].length){
		//console.log(list.length + "a" + $selected[0].length);
		if(list.length < 2){
			clearSelectedContent(selectId);
			return;
		}
		//考虑节点个数随时间段变化情况
		if($("#" + selectId+"_time")){
			$("#" + selectId+"_time").css("right","145px");
		}
		var str = "";
		list=list.sort(function(a,b){  
			return a-b;  
			});  
		$.each(list,function(index,item){
			str += "<option value='"+item+"'>节点"+item+"</option>";
		})
		$selected.html(str);
		$selected.show();
	}
	
}

function clearSelectedContent(selectId){
	var $selected = $("#" + selectId);
	if($("#" + selectId+"_time")){
		$("#" + selectId+"_time").css("right","60px");
	}
	$selected.html("");
	$selected.hide();
}

var refreshNomalEChart =function(url,eChart,yAxisText, alertName, chartid,selectId){
	if(url.indexOf("real") == -1){
		eChart.showLoading();
	}
	
	$.getJSON(url,function(data){
		
		if(data.series == null || data.series.length == 0){
			//$("#" + alertName).show();
			//eChart.clear();
			//$("#" + eChart).hide();
			
			if(url.indexOf("DBMon_Stor_Chart_DbTrend") > -1 || url.indexOf("Ora_Stor_Chart_DbTrend") > -1 ){
				if(typeof(alertName) == "undefined"){
					alertName = "alert_trend_chart";
				}
				if(typeof(chartid) == "undefined"){
					chartid = "trend_chart";
				}
			}
			
			$("#" + chartid).hide();
			$("#" + alertName).show();
			if(selectId!=undefined){
				$selected = $("#"+selectId);
				if($("#" + selectId+"_time")){
					$("#" + selectId+"_time").css("right","60px");
				}
				$selected.html("");
				$selected.hide();
				return;
			}
			
		}else{
			$("#" + alertName).hide();
			$("#" + chartid).show();
			var option=eChart.getOption();
			eChart.clear();
			option.animation=false;

			var selected;
			
			if(selectId != undefined){
				judgeSelectedNumber(selectId,data.series);
				selected = getSelectedNumber(selectId);
				//selected = getSelectedNumber("selectedNumber");
			}
			if(selected != undefined){
				timerList[eChart._dom.id] = data;
				datalength = 0;
				legend = option.legend;
				legend[0].data = [];
			}
			
			for(var i=0;i<data.series.length;i++){
					if (url.indexOf('MySQL_KeyBlock_Chart') >= 0
						|| url.indexOf('DBMon_Conn_Chart_DbConnInfo') >= 0
						|| url.indexOf('DBMon_Stor_Chart_DbTrend') >= 0
						|| url.indexOf('DBMon_Perf_Chart_Hitratio') >= 0) {
					option.series[i] = {
						name : '',
						type : 'line',
						data : [ [ 0, 0 ] ],
						itemStyle : {
							normal : {
								borderWidth : 8
							}
						},
						markPoint : {
							data : [
							/*
							 * {type: 'max', name:
							 * '最大值',symbol:'pin',symbolSize:60}
							 */
							]
						}
					}
					if(url.indexOf('DBMon_Conn_Chart_DbConnInfo') >= 0){
						option.yAxis[0].name = '个';
					}
//					if(url.indexOf('DBMon_Perf_Chart_Hitratio') >= 0){
//						/*if(selectId == undefined){
//							option.series[i].showSymbol = false;
//						}*/
//						if(i==0){
//							option.xAxis[0].data = data.category;
//						}
//					}
				}else if(url.indexOf('MySQL_BufferSize_Chart') >= 0){
					option.series[i] = {
							name : '',
							type : 'line',
							data : [ [ 0, 0 ] ],
							itemStyle : {
								normal : {
									borderWidth : 8
								}
							},
							markPoint : {
								data : []
							}
						}
				}else if(url.indexOf('DBMon_HW_Chart_CPU') >= 0 || url.indexOf('DBMon_HW_Chart_Mem') >= 0 ){
					option.yAxis.max=100;
					option.series[i]={
							name:'', type:'line',data:[[0,0]],	stack:"总览", 
							areaStyle: {normal: {}},
							itemStyle:{
								normal:{
									borderWidth :8
								}
							},
							markPoint:{
								data:[]
							}
					}
					
				}else if(url.indexOf('getHanaCPUChart') >= 0 ){
					option.yAxis.max=100;
					option.series[i]={
							name:'', type:'line',data:[[0,0]],	stack:'', 
							areaStyle: {normal: {}},
							itemStyle:{
								normal:{
									borderWidth :8
								}
							},
							markPoint:{
								data:[]
							}
					}
					
				}else if(url.indexOf('DBMon_Conn_Chart_SQLThroughput') >= 0){
					option.series[i] = {
							name : '',
							//type : 'line',
							type : data.series[i].type,
							data : [ [ 0, 0 ] ],
							showSymbol : false,
							itemStyle : {
								normal : {
									borderWidth : 8
								}
							},
							yAxisIndex:data.series[i].yAxisIndex,
						}
					if(i == 0){
						option.xAxis[0].data = data.category;
						option.yAxis = [{name:'次数/s',type:'value'},{name:'ms',type:'value'}];
						option.xAxis[0].axisLine.lineStyle.color = '#000';
					}
					
				}else if(url.indexOf('DBMon_Conn_Chart_TPSThroughput') >= 0){
					option.series[i] = {
							name : '',
							//type : 'line',
							type : data.series[i].type,
							showSymbol : false,
							data : [ [ 0, 0 ] ],
							itemStyle : {
								normal : {
									borderWidth : 8
								}
							},
							yAxisIndex:data.series[i].yAxisIndex,
						}
					if(i == 0){
						option.xAxis[0].data = data.category;
						option.yAxis = [{name:'次数/s',type:'value'},{name:'ms',type:'value'}];
						option.xAxis[0].axisLine.lineStyle.color = '#000';
//						if(selected != undefined){
//							legend[0].textStyle.fontSize = 20;
//						}else{
//							option.legend[0].textStyle.fontSize = 20;
//						}
					}
				}else if(url.indexOf('DBMon_Perf_Chart_IO') >= 0 || url.indexOf('DBMon_Perf_Chart_ASYNC_IO') >= 0 || url.indexOf('DBMon_Perf_Chart_LOG_WRITES') >= 0){
					option.series[i] = {
							name : '',
							type : 'line',
							data : [ [ 0, 0 ] ],
							itemStyle : {
								normal : {
									borderWidth : 8
								}
							},
							yAxisIndex:data.series[i].yAxisIndex,
						}
					option.yAxis = [{name:'单位:次数',type:'value'},{name:'单位:ms',type:'value'}];
				}else if(url.indexOf('Ora_Conn_Chart') >= 0){
					option.series[i] = {
							name:'', 
							type:'line',
							data:[[0,0]],
							itemStyle:{normal:{borderWidth :4}},
					        label: {
					        	normal: {
					        	position: 'inside',
					        		textStyle: {
					        			fontSize: 7,
					        		},
					        	}
							 },
							 yAxisIndex:0 
						}
					option.yAxis = {
				            name: '单位/个',
				            type: 'value',
					        }
				}else{
					option.series[i]={name:'',type:'line',data:[[0,0]],itemStyle:{normal:{borderWidth :8}},markPoint: {data:[
		                      /*{type: 'max', name: '最大值',symbol:'pin',symbolSize:60},
		                      {type: 'min', name: '最小值',symbol:'pin',symbolSize:48,symbolRotate :180}*/
	                      ]
					}}
				}
					
				if(selected != undefined){
					if(selected != data.series[i].member){
						option.series.splice(i,1);
						/*option.legend[0].data.splice(datalength,1);*/
						continue;
					}
					series = option.series[i];
					option.series.splice(i,1);
					option.series[datalength] = series;
					option.series[datalength].stack = data.series[i].stack;
					/*judgeName = data.series[i].name;
					if(judgeName.indexOf("SQL平均时间")!=-1 || judgeName.indexOf("事务平均时间")!=-1){
						option.series[datalength].type= 'bar';
					}*/
					legend[0].data[datalength] = data.series[i].name;
					option.series[datalength].name = data.series[i].name;
					option.series[datalength].data = data.series[i].data;
					datalength++;
				}else{
					option.series[i].stack = data.series[i].stack;
					option.series[i].name = data.series[i].name;
					option.legend[0].data[i] = data.series[i].name;
					option.series[i].data = data.series[i].data;
				}
			}
			if(selected != undefined){
				option.legend = legend;
				option.series.length = datalength;
			}
			if(url.indexOf("real") == -1){
				eChart.hideLoading();
			}
			eChart.setOption(option);
			$(window).resize();
		}
		
	});
}



var createPieChart=function(url,chartDomId){
	var option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c}(MB) ({d}%)"
		    },
		    legend: {
		        show:false,
		    },
		    series: [
		        {
		            name:'',
		            type:'pie',
		            radius: ['0%', '60%'],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: true,
		                    position: 'left'
		                },
		                emphasis: {
		                    show: true,
		                    position: 'bottom',
		                    textStyle: {
		                        fontSize: '20',
		                        /*fontWeight: 'bold'*/
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: true
		                },
			            smooth: 0.2,
	                    length: 10,
	                    length2: 20
		            },
		            data:[
		            ]
		        }
		    ]
		};
	$.getJSON(url,function(data){
		option.legend.data=data.categories;
		option.series[0].data=data.data;
		eChart=echarts.init(document.getElementById(chartDomId),'macarons'); 
		eChart.setOption(option);
		$(window).resize(function(){
			eChart.resize();
		});
	});
	
}

var createPieChart3=function(url,chartDomId){
	var option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c}(MB) ({d}%)"
		    },
		    legend: {
		    	data:["数据库表空间大小"],
		    	bottom:"2%",
		    	show:false,
		    },
		    series: [
		        {
		            name:'数据库表空间大小',
		            type:'pie',
		            radius: ['0%', '60%'],
		            avoidLabelOverlap: true,
		            label: {
		                normal: {
		                    show: true,
		                    position:'left'
		                },
		                emphasis: {
		                    show: true,
		                    position: 'bottom',
		                    textStyle: {
		                        fontSize: '20',
		                        /*fontWeight: 'bold'*/
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: true,
		                    length: 40,
		                    length2: 10
		                },
		            },
		            data:[
		            ]
		        }
		    ]
		};
	$.getJSON(url,function(data){
//		option.legend.data=data.categories;
		//option.legend.data="['已用大小']";
		option.series[0].data=data.data;
		eChart=echarts.init(document.getElementById(chartDomId),'macarons'); 
		eChart.setOption(option);
		$(window).resize(function(){
			eChart.resize();
		});
	});
	
}

var createPieChart4=function(url,chartDomId){
	var option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    legend: {
		        show:true,
		    },

		    series: [
		        {
		            name:'',
		            type:'pie',
		            radius: ['0%', '50%'],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'bottom'
		                },
		                emphasis: {
		                    show: true,
		                    position: 'bottom',
		                    textStyle: {
		                        fontSize: '10',
		                        fontWeight: 'bold'
		                    }
		                }
		            },
		            //color:['#69D2E7','#FF6666','#99CCFF','#99CCCC','#E0E4CC','#949FB1','#D4CCC5','#E2EAE9','#69D2E7'],
		            label: {
		                normal: {
		                	show:false,
		                	position:'inner',
		                }
		            },
		            labelLine: {
		                normal: {
		                   show:false,
		                }
		            },
		            itemStyle: {
		                normal: {
		                    shadowBlur: 200,
		                }
		            },
		            
		            center:['50%','50%'],
		            
		            data:[
		            ]
		        }
		    ]
		};
	
	var option2 = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}:{d}%"
		    },
		    legend: {
		        show:true,
		    },

		    series: [
		        {
		            name:'',
		            type:'pie',
		            radius: ['0%', '55%'],
		            avoidLabelOverlap: true,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'bottom'
		                },
		                emphasis: {
		                    show: true,
		                    position: 'bottom',
		                    textStyle: {
		                        fontSize: '10',
		                        fontWeight: 'bold'
		                    }
		                }
		            },
		            //color:['#69D2E7','#FF6666','#99CCFF','#99CCCC','#E0E4CC','#949FB1','#D4CCC5','#E2EAE9','#69D2E7'],
		            label: {
		                normal: {
		                	show:true,
		                	//position:'inner',
		                }
		            },
		            labelLine: {
		                normal: {
		                   show:true,
		                }
		            },
		            itemStyle: {

		                normal: {
		                	
		                	label:{ 
		                		position : 'inner',
//		                        show: true, 
		                        formatter: '{c} ({d}%)' 
		                      }, 
//		                      labelLine :{show:true}, 
		                    //shadowBlur: 200,
		                    borderColor: "#fff",
		                    borderWidth: 0.2
		                 }
		            },
		            
		            center:['50%','50%'],
		            
		            data:[
		            ]
		        }
		    ]
		};
	
	
	$.getJSON(url,function(data){
		
		if(chartDomId == 'mysql_cache' || chartDomId == 'mysql_file'){
			option2.legend.data=data.categories;
			option2.series[0].data=data.data;
			eChart=echarts.init(document.getElementById(chartDomId),'macarons'); 
			eChart.setOption(option2);
		}else{
			option.legend.data=data.categories;
			option.series[0].data=data.data;
			eChart=echarts.init(document.getElementById(chartDomId),'macarons'); 
			eChart.setOption(option);
		}
		
		
		
		$(window).resize(function(){
			eChart.resize();
		});
	});
	
}

var createPieChart2=function(url,chartDomId,imageName){
	var option = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    legend: {
		        show:true,
		    },
		    series: [
		        {
		            name:'',
		            type:'pie',
		            radius: ['0%', '45%'],
		            avoidLabelOverlap: true,
		            label: {
		                normal: {
		                    show: true,
		                    position: 'bottom'
		                },
		                emphasis: {
		                    show: true,
		                    position: 'bottom',
		                    textStyle: {
		                        fontSize: '10',
		                        fontWeight: 'bold'
		                    }
		                }
		            },
		            //color:['#69D2E7','#FF6666','#99CCFF','#99CCCC','#E0E4CC','#949FB1','#D4CCC5','#E2EAE9','#69D2E7'],
		            labelLine: {
		                normal: {
		                   show:true,
		                }
		            },
		            itemStyle: {
		                normal: {
		                    shadowBlur: 200,
		                    length: 40,
		                    length2: 10
		                }
		            },
		            
		            center:['50%','50%'],
		            
		            data:[
		            ]
		        }
		    ]
		};
	
	var option2 = {
		    tooltip: {
		        trigger: 'item',
		        formatter: "{b}:{d}%"
		    },
		    legend: {
		        show:false,
		    },
		    toolbox: {
		    	show: true,
		    	orient: 'horizontal',
		    	itemSize: 15,
		    	itemGap: 10,
		    	showTitle: true,
		    	feature: {
		    		saveAsImage: {show:true,name:imageName+imageNameDate},
		    	},
		    	right: '1%'
		    },
		    series: [
		        {
		            name:'',
		            type:'pie',
		            radius: ['0%', '45%'],
		            avoidLabelOverlap: true,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'bottom'
		                },
		                emphasis: {
		                    show: true,
		                    position: 'bottom',
		                    textStyle: {
		                        fontSize: '10',
		                        fontWeight: 'bold'
		                    }
		                }
		            },
		            //color:['#69D2E7','#FF6666','#99CCFF','#99CCCC','#E0E4CC','#949FB1','#D4CCC5','#E2EAE9','#69D2E7'],
		            label: {
		                normal: {
		                	show:true,
		                	//position:'inner',
		                }
		            },
		            labelLine: {
		                normal: {
		                   show:true,
		                }
		            },
		            itemStyle: {

		                normal: {
		                    //shadowBlur: 200,
		                    borderColor: "#fff",
		                    borderWidth: 0.2
		                 }
		            },
		            
		            center:['50%','50%'],
		            
		            data:[
		            ]
		        }
		    ]
		};
	
	
	$.getJSON(url,function(data){
		
		if(chartDomId == 'waitpie' || chartDomId == 'totalpie'){
			option2.legend.data=data.categories;
			option2.series[0].data=data.data;
			var eChart=echarts.init(document.getElementById(chartDomId),'macarons'); 
			eChart.setOption(option2);
		}else{
			option.legend.data=data.categories;
			option.series[0].data=data.data;
			var eChart=echarts.init(document.getElementById(chartDomId),'macarons'); 
			eChart.setOption(option);
		}
		
		
		
		$(window).resize(function(){
			eChart.resize();
		});
	});
	
}

var id1;
var intervalRefreshEchart_Hitratio=function(url,eChart,yAxisText, alertName,chartid,selectId){
	 clearInterval(id1);
	 id1=setInterval(function(){
			refreshNomalEChart(url,eChart,yAxisText, alertName, chartid,selectId);
		}, 1000*5);
	
	return id1;
}
var intervalRefreshEchart=function(url,eChart,yAxisText, alertName,chartid,selectId){
	 //clearInterval(id);
	 id=setInterval(function(){
			refreshNomalEChart(url,eChart,yAxisText, alertName, chartid,selectId);
		}, 1000*5);
	
	return id;
}

function  seriesForms(){ 
		
	var x={
		name:'', 
		type:'line',
		data:[[0,0]],
		itemStyle:{normal:{borderWidth :4}},
        label: {
        	normal: {
        	position: 'inside',
        		textStyle: {
        			fontSize: 7,
        		},
        	}
		 },
		 yAxisIndex:0
        
	}
return x;
}

function  yAsixDouble(){
	
	var x=  [ {
            name: '单位/次数',
            type: 'value',
	        },
	        {
				name:'单位/ms',
	            type: 'value',
	        }
		]
	return x;
}
function  yAsixDouble1(){
	
	var x=  [ 
	        {
				name:'单位/次数',
	            type: 'value',
	        },
	        {
	            name: '单位/ms',
	            type: 'value',
		        },
		]
	return x;
}
//function refreshSplineEchart(url, echartInstance, yAxisText, alertName, chartid,wait,
//type, width) {   感觉后面参数都没用    所以注释了
function refreshSplineEchart(url, echartInstance, yAxisText, alertName, chartid,selectId) { 
	echartInstance.showLoading();
	$.getJSON(url, function(data) {
		if (jQuery.isEmptyObject(data)) {
			$("#" + alertName).show();
			$("#" + chartid).hide();
			if(selectId != undefined){
				clearSelectedContent(selectId);
			}
			/*$selected = ("#" + selectId);
			if($("#" + selectId+"_time")){
				$("#" + selectId+"_time").css("right","60px");
			}
			$selected.html("");
			$selected.hide();*/
			echartInstance.hideLoading();
		} else {
			$("#" + chartid).show();
			$("#" + alertName).hide();
			var option = echartInstance.getOption();
			/*if(option.series.length < data.series.length){
				option.series.push(data.series)
			}*/
			/*console.log("there");
			
			var series = option.series;
			option.series = [];
			var legend = {data:[]};
			selected = getSelectedNumber();
			if(selected == undefined){
				for (var i = 0; i < data.series.length; i++) {
					var obj = {};
					obj.name = data.series[i].name;
					obj.data = data.series[i].data;
					option.series.push(obj);
				}
			}else{
				selected = "-节点"+selected;
				for (var i = 0; i < data.series.length; i++) {
					if(data.series[i].name.indexOf(selected)<0){
						continue;
					}
					var obj = {};
					legend.data.push(data.series[i].name);
					obj.name = data.series[i].name;
					obj.data = data.series[i].data;
					option.series.push(obj);
				}
				option.legend = legend;
			}*/
			//echartInstance.clear();
			var selected;
			if(selectId != undefined){
				judgeSelectedNumber(selectId,data.series);
				selected = getSelectedNumber(selectId);
				//selected = getSelectedNumber("selectedNumber");
			}
			if(selected != undefined){
				timerList[echartInstance._dom.id] = data;
				datalength = 0;
				legend = option.legend;
				legend[0].data = [];
			}
			for (var i = 0; i < data.series.length; i++) {
				if(selectId != undefined && i == 0){
					option.xAxis[0].data = data.category;
				}
				if(selected != undefined){
					if(selected != data.series[i].member){
						//option.series.splice(i,1);
						continue;
					}
					//series = option.series[i];
					//option.series.splice(i,1);
					//option.series[datalength] = series;
					legend[0].data[datalength] = data.series[i].name;
					option.series[datalength].name = data.series[i].name;
					option.series[datalength].data = data.series[i].data;
					datalength++;
				}else{
					option.series[i].name = data.series[i].name;
					option.series[i].data = data.series[i].data;
				}
			}
			if(selected != undefined){
				option.legend = legend;
				option.series.length = datalength;
			}
			echartInstance.hideLoading();
			echartInstance.setOption(option);
		}
	});
}

function createSplineEchart(url, renderName, yAxisText, alertName ,type ){
var chart;
$.ajaxSettings.async = false; 
	$.getJSON(url, function(data) {
		
			if(jQuery.isEmptyObject(data)) {
				$("#" + alertName).show();
			} else {
				chart=	showSplineChart(data,renderName, yAxisText,type );
				$("#" + alertName).hide();
			}
			
	});
return chart;
}

/*初始化Spline图表*/
function showSplineChart(data, renderName, yAxisText ,type){
	var nomalOption = {
		   /* title: {
		        text: yAxisText,
		    },*/
			//为了hadr展现  添加formatter参数
		    tooltip: {
		        trigger: 'axis',
		        formatter: function(params) {
			    	var str="";
			    	
			    	str="时间："+format4( new Date(params[0].data[0]))+"";
		    		
			    	str += "<br/>"+params[0].seriesName + ' : ' + params[0].data[1]+" byte";
			   
		            return str;
		        }
		    },
		    legend: {
		    	data:data.legend
		    },
		    xAxis:  {
		        type: 'time',
		    },
		    yAxis: {
		        type: 'value',
		        name:yAxisText,
		    },
		  //  animation:false,
		    series:  data.series
	}
	var eChart=echarts.init(document.getElementById(renderName),'macarons'); 
	eChart.setOption(nomalOption);
	return eChart;
}


function showSplineChart_f(data,renderName,yAxisText,selectId){
	var eChart=echarts.init(document.getElementById(renderName)); 
	var nomalOption = {
		    title: {
		      //  text: yAxisText,
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
		    	data:data.legend
		    },
		    xAxis:  {
		        type: 'time',
		    },
		    yAxis: {
		        type: 'value',
		        name:yAxisText,
		    },
		  //  animation:false,
		    series:  data.series
	}
	//为多节点添加计算
	if(selectId != undefined){
		var selected;
		if(selectId != undefined){
			judgeSelectedNumber(selectId,data.series);
			selected = getSelectedNumber(selectId);
		}
		if(selected != undefined){
			timerList[eChart._dom.id] = data;
			datalength = 0;
			nomalOption.series = [];
			
			for(var i=0;i<data.series.length;i++){
				if(selected != data.series[i].member){
					continue;
				}
				nomalOption.series.push(data.series[i]);
			}
		}
		
	}
	
	eChart.setOption(nomalOption);
	$(window).resize(function(){
		eChart.resize();
	});
	return eChart;
}













