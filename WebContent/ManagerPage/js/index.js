var avgsqltime_starttime1;
var avgsqltime_endtime1;
var avgsqltime_starttime2;
var avgsqltime_endtime2;

var catcache_starttime1;
var catcache_endtime1;
var catcache_starttime2;
var catcache_endtime2;

var Index = function () {
	var mysqlstarttime;
	var mysqlendtime;
	var topnum = 30;
    return {
        initDashboardDaterange: function (id,url,tableid,alertid) {
            if (!jQuery().daterangepicker) {
                return;
            }
            $(id).daterangepicker({
                    opens: 'left',
                    startDate: moment().subtract('hour', 1),
                    endDate: moment(),
                    minDate: '01/01/2012',
                    maxDate: '12/31/2099',
                    dateLimit: {
                        days: 800
                    },
                    showDropdowns: false,
                    showWeekNumbers: true,
                    timePicker: true,
                    timePickerIncrement: 1,
                    timePicker24Hour: true,
                    ranges: {
                    	'过去1小时': [moment().subtract('hour',1), moment()],
                        '过去1天': [moment().subtract('days',1), moment()],
                        '过去7天': [moment().subtract('days', 7), moment()],
                        '过去1月': [moment().subtract('month',1), moment()],
                        '过去1年': [moment().subtract('year', 1), moment()]
                    },
                    buttonClasses: ['btn btn-sm'],
                    applyClass: ' blue',
                    cancelClass: 'default',
                    format: 'MM/DD/YYYY',
                    separator: ' to ',
                    locale: {
                        applyLabel: '确定',
                        cancelLabel:'取消',
                        fromLabel: 'From',
                        toLabel: 'To',
                        customRangeLabel: '自选时间',
                        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        firstDay: 1
                    }
                },
                function (start, end) {
                	var startDate2= format2(new Date(start));
                	var endDate2= format2(new Date(end));
                	var startDate3 = format2(new Date());
                	var str="过去";
                	var sub=0;
                	if(endDate2==startDate3){
                		sub =end-start;
                		sub=sub/1000/60;
                		if(sub<60){
                			str+=sub+"分钟";
                		}else if((sub/60)<24){
                			str+=Math.floor(sub/60)+"小时";
                		}else if((sub/60/24)<30){
                			str+=Math.floor(sub/60/24)+"天";
                		}else if((sub/60/24/30)<12){
                			str+=Math.floor(sub/60/24/30)+"月";
                		}else{
                			str+=Math.floor(sub/60/24/30/12)+"年";
                		}
                		 $(id+' span').html(str);
                	}else{
                		 $(id+' span').html(startDate2+"~"+endDate2);
                	}
                	
                	var startDate = format(new Date(start));
                	var endDate= format(new Date(end));
                	refreshSpline(url+"dbid=" + GetParam("dbid")
        					+ "&period=-1" + "&starttime=" + startDate + "&endtime=" + endDate,
        					tableid, "单位：KB", alertid);
                }
            );
            $(id+' span').html('时间选择');
            $(id).show();
        }, 
        
        
        initLockTime: function (id,url,tableid,alertid,selectId) {
            if (!jQuery().daterangepicker) {
                return;
            }
            $(id).daterangepicker({
                    opens: 'left',
                    startDate: moment().subtract('hour', 1),
                    endDate: moment(),
                    minDate: '01/01/2012',
                    maxDate: '12/31/2099',
                    dateLimit: {
                        days: 800
                    },
                    showDropdowns: false,
                    showWeekNumbers: true,
                    timePicker: true,
                    timePickerIncrement: 1,
                    timePicker24Hour: true,
                    ranges: {
                    	'过去1小时': [moment().subtract('hour',1), moment()],
                        '过去1天': [moment().subtract('days',1), moment()],
                        '过去7天': [moment().subtract('days', 7), moment()],
                        '过去1月': [moment().subtract('month',1), moment()],
                        '过去1年': [moment().subtract('year', 1), moment()]
                    },
                    buttonClasses: ['btn btn-sm'],
                    applyClass: ' blue',
                    cancelClass: 'default',
                    format: 'MM/DD/YYYY',
                    separator: ' to ',
                    locale: {
                        applyLabel: '确定',
                        cancelLabel:'取消',
                        fromLabel: 'From',
                        toLabel: 'To',
                        customRangeLabel: '自选时间',
                        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        firstDay: 1
                    }
                },
                function (start, end) {
                	var startDate2= format2(new Date(start));
                	var endDate2= format2(new Date(end));
                	var startDate3 = format2(new Date());
                	var str="过去";
                	var sub=0;
                	if(endDate2==startDate3){
                		sub =end-start;
                		sub=sub/1000/60;
                		if(sub<60){
                			str+=sub+"分钟";
                		}else if((sub/60)<24){
                			str+=Math.floor(sub/60)+"小时";
                		}else if((sub/60/24)<30){
                			str+=Math.floor(sub/60/24)+"天";
                		}else if((sub/60/24/30)<12){
                			str+=Math.floor(sub/60/24/30)+"月";
                		}else{
                			str+=Math.floor(sub/60/24/30/12)+"年";
                		}
                		 $(id+' span').html(str);
                	}else{
                		 $(id+' span').html(startDate2+"~"+endDate2);
                	}
                	
                	var startDate = format(new Date(start));
                	var endDate= format(new Date(end));
                	refreshSpline(url+"dbid=" + GetParam("dbid")
        					+ "&period=-1" + "&starttime=" + startDate + "&endtime=" + endDate,
        					tableid, "单位：个数", alertid,selectId);
                }
            );
            $(id+' span').html('过去一小时');
            $(id).show();
        }, 
        
        
        
        initSort: function (id,url,tableid,alertid) {
            if (!jQuery().daterangepicker) {
                return;
            }
            $(id).daterangepicker({
                    opens: 'left',
                    startDate: moment().subtract('hour', 1),
                    endDate: moment(),
                    minDate: '01/01/2012',
                    maxDate: '12/31/2099',
                    dateLimit: {
                        days: 800
                    },
                    showDropdowns: false,
                    showWeekNumbers: true,
                    timePicker: true,
                    timePickerIncrement: 1,
                    timePicker24Hour: true,
                    ranges: {
                    	'过去1小时': [moment().subtract('hour',1), moment()],
                        '过去1天': [moment().subtract('days',1), moment()],
                        '过去7天': [moment().subtract('days', 7), moment()],
                        '过去1月': [moment().subtract('month',1), moment()],
                        '过去1年': [moment().subtract('year', 1), moment()]
                    },
                    buttonClasses: ['btn btn-sm'],
                    applyClass: ' blue',
                    cancelClass: 'default',
                    format: 'MM/DD/YYYY',
                    separator: ' to ',
                    locale: {
                        applyLabel: '确定',
                        cancelLabel:'取消',
                        fromLabel: 'From',
                        toLabel: 'To',
                        customRangeLabel: '自选时间',
                        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        firstDay: 1
                    }
                },
                function (start, end) {
                	var startDate2= format2(new Date(start));
                	var endDate2= format2(new Date(end));
                	var startDate3 = format2(new Date());
                	var str="过去";
                	var sub=0;
                	if(endDate2==startDate3){
                		sub =end-start;
                		sub=sub/1000/60;
                		if(sub<60){
                			str+=sub+"分钟";
                		}else if((sub/60)<24){
                			str+=Math.floor(sub/60)+"小时";
                		}else if((sub/60/24)<30){
                			str+=Math.floor(sub/60/24)+"天";
                		}else if((sub/60/24/30)<12){
                			str+=Math.floor(sub/60/24/30)+"月";
                		}else{
                			str+=Math.floor(sub/60/24/30/12)+"年";
                		}
                		 $(id+' span').html(str);
                	}else{
                		 $(id+' span').html(startDate2+"~"+endDate2);
                	}
                	
                	var startDate = format(new Date(start));
                	var endDate= format(new Date(end));
                	refreshSpline(url+"dbid=" + GetParam("dbid")
        					+ "&period=-1" + "&starttime=" + startDate + "&endtime=" + endDate,
        					tableid, "单位：次数", alertid);
                }
            );
            $(id+' span').html('过去一小时');
            $(id).show();
        }, 
        
        
        
        initLogTime: function (id,url,yAxisText,alertid,tableid) {
            if (!jQuery().daterangepicker) {
                return;
            }
            $(id).daterangepicker({
                    opens: 'left',
                    startDate: moment().subtract('hour', 1),
                    endDate: moment(),
                    minDate: '01/01/2012',
                    maxDate: '12/31/2099',
                    dateLimit: {
                        days: 800
                    },
                    showDropdowns: false,
                    showWeekNumbers: true,
                    timePicker: true,
                    timePickerIncrement: 1,
                    timePicker24Hour: true,
                    ranges: {
                    	'过去1小时': [moment().subtract('hour',1), moment()],
                        '过去1天': [moment().subtract('days',1), moment()],
                        '过去7天': [moment().subtract('days', 7), moment()],
                        '过去1月': [moment().subtract('month',1), moment()],
                        '过去1年': [moment().subtract('year', 1), moment()]
                    },
                    buttonClasses: ['btn btn-sm'],
                    applyClass: ' blue',
                    cancelClass: 'default',
                    format: 'MM/DD/YYYY',
                    separator: ' to ',
                    locale: {
                        applyLabel: '确定',
                        cancelLabel:'取消',
                        fromLabel: 'From',
                        toLabel: 'To',
                        customRangeLabel: '自选时间',
                        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        firstDay: 1
                    }
                },
                function (start, end) {
                	var startDate2= format2(new Date(start));
                	var endDate2= format2(new Date(end));
                	var startDate3 = format2(new Date());
                	var str="过去";
                	var sub=0;
                	if(endDate2==startDate3){
                		sub =end-start;
                		sub=sub/1000/60;
                		if(sub<60){
                			str+=sub+"分钟";
                		}else if((sub/60)<24){
                			str+=Math.floor(sub/60)+"小时";
                		}else if((sub/60/24)<30){
                			str+=Math.floor(sub/60/24)+"天";
                		}else if((sub/60/24/30)<12){
                			str+=Math.floor(sub/60/24/30)+"月";
                		}else{
                			str+=Math.floor(sub/60/24/30/12)+"年";
                		}
                		 $(id+' span').html(str);
                	}else{
                		 $(id+' span').html(startDate2+"~"+endDate2);
                	}
                	
                	var startDate = format(new Date(start));
                	var endDate= format(new Date(end));
                	refreshLogEChart(url+"dbid=" + GetParam("dbid")
        					+ "&period=-1" + "&starttime=" + startDate + "&endtime=" + endDate,
        					yAxisText,alertid,tableid);
                }
            );
            $(id+' span').html('过去一小时');
            $(id).show();
        },        
        
        initLogChartTime: function (id,url,eChart,tableid,alertid,chartid) {
            if (!jQuery().daterangepicker) {
                return;
            }
            $(id).daterangepicker({
                    opens: 'left',
                    startDate: moment().subtract('hour', 1),
                    endDate: moment(),
                    minDate: '01/01/2012',
                    maxDate: '12/31/2099',
                    dateLimit: {
                        days: 800
                    },
                    showDropdowns: false,
                    showWeekNumbers: true,
                    timePicker: true,
                    timePickerIncrement: 1,
                    timePicker24Hour: true,
                    ranges: {
                    	'过去1小时': [moment().subtract('hour',1), moment()],
                        '过去1天': [moment().subtract('days',1), moment()],
                        '过去7天': [moment().subtract('days', 7), moment()],
                        '过去1月': [moment().subtract('month',1), moment()],
                        '过去1年': [moment().subtract('year', 1), moment()]
                    },
                    buttonClasses: ['btn btn-sm'],
                    applyClass: ' blue',
                    cancelClass: 'default',
                    format: 'MM/DD/YYYY',
                    separator: ' to ',
                    locale: {
                        applyLabel: '确定',
                        cancelLabel:'取消',
                        fromLabel: 'From',
                        toLabel: 'To',
                        customRangeLabel: '自选时间',
                        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        firstDay: 1
                    }
                },
                function (start, end) {
                	var startDate2= format2(new Date(start));
                	var endDate2= format2(new Date(end));
                	var startDate3 = format2(new Date());
                	var str="过去";
                	var sub=0;
                	if(endDate2==startDate3){
                		sub =end-start;
                		sub=sub/1000/60;
                		if(sub<60){
                			str+=sub+"分钟";
                		}else if((sub/60)<24){
                			str+=Math.floor(sub/60)+"小时";
                		}else if((sub/60/24)<30){
                			str+=Math.floor(sub/60/24)+"天";
                		}else if((sub/60/24/30)<12){
                			str+=Math.floor(sub/60/24/30)+"月";
                		}else{
                			str+=Math.floor(sub/60/24/30/12)+"年";
                		}
                		 $(id+' span').html(str);
                	}else{
                		 $(id+' span').html(startDate2+"~"+endDate2);
                	}
                	
                	var startDate = format(new Date(start));
                	var endDate= format(new Date(end));
                	refreshNomalEChart(url+"dbid=" + GetParam("dbid")
        					+ "&period=-1" + "&starttime=" + startDate + "&endtime=" + endDate,eChart,"",
        					tableid, alertid,chartid);
                }
            );
            $(id+' span').html('过去一小时');
            $(id).show();
        },        
        
        initDbsizeTime: function (id,url,tableid,alertid) {
            if (!jQuery().daterangepicker) {
                return;
            }
            $(id).daterangepicker({
                    opens: 'left',
                    startDate: moment().subtract('month',1),
                    endDate: moment(),
                    minDate: '01/01/2012',
                    maxDate: '12/31/2099',
                    dateLimit: {
                        days: 800
                    },
                    showDropdowns: false,
                    showWeekNumbers: true,
                    timePicker: true,
                    timePickerIncrement: 1,
                    timePicker24Hour: true,
                    ranges: {
//                    	'过去1小时': [moment().subtract('hour',1), moment()],
//                        '过去1天': [moment().subtract('days',1), moment()],
                        '过去7天': [moment().subtract('days', 7), moment()],
                        '过去1月': [moment().subtract('month',1), moment()],
                        '过去1年': [moment().subtract('year', 1), moment()]
                    },
                    buttonClasses: ['btn btn-sm'],
                    applyClass: ' blue',
                    cancelClass: 'default',
                    format: 'MM/DD/YYYY',
                    separator: ' to ',
                    locale: {
                        applyLabel: '确定',
                        cancelLabel:'取消',
                        fromLabel: 'From',
                        toLabel: 'To',
                        customRangeLabel: '自选时间',
                        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        firstDay: 1
                    }
                },
                function (start, end) {
                	var startDate2= format2(new Date(start));
                	var endDate2= format2(new Date(end));
                	var startDate3 = format2(new Date());
                	var str="过去";
                	var sub=0;
                	if(endDate2==startDate3){
                		sub =end-start;
                		sub=sub/1000/60;
                		if(sub<60){
                			str+=sub+"分钟";
                		}else if((sub/60)<24){
                			str+=Math.floor(sub/60)+"小时";
                		}else if((sub/60/24)<30){
                			str+=Math.floor(sub/60/24)+"天";
                		}else if((sub/60/24/30)<12){
                			str+=Math.floor(sub/60/24/30)+"月";
                		}else{
                			str+=Math.floor(sub/60/24/30/12)+"年";
                		}
                		 $(id+' span').html(str);
                	}else{
                		 $(id+' span').html(startDate2+"~"+endDate2);
                	}
                	
                	var startDate = format(new Date(start));
                	var endDate= format(new Date(end));
                	refreshDbsizeEChart(url+"dbid=" + GetParam("dbid")
        					+ "&period=-1" + "&starttime=" + startDate + "&endtime=" + endDate,
        					tableid, alertid);
                }
            );
            $(id+' span').html('过去1月');
            $(id).show();
        },    
        
        
        initOra_AWRSnapshot: function(id){
            if (!jQuery().daterangepicker) {
                return;
            }
            $(id).daterangepicker({
            	 opens: 'right',
            	 drops:'up',
                 startDate: moment().subtract('hour', 1),
                 endDate: moment(),
                 minDate: '01/01/2012',
                 maxDate: '12/31/2099',
                 dateLimit: {
                     days: 800
                 },
                 showDropdowns: false,
                 showWeekNumbers: true,
                 timePicker: true,
                 timePickerIncrement: 1,
                 timePicker24Hour: true,
                 ranges: {
                 	'过去1小时': [moment().subtract('hour',1), moment()],
                     '过去1天': [moment().subtract('days',1), moment()],
                     '过去7天': [moment().subtract('days', 7), moment()],
                     '过去1月': [moment().subtract('month',1), moment()],
                     '过去1年': [moment().subtract('year', 1), moment()]
                 },
                 buttonClasses: ['btn btn-sm'],
                 applyClass: ' blue',
                 cancelClass: 'default',
                 format: 'MM/DD/YYYY',
                 separator: ' to ',
                 locale: {
                     applyLabel: '确定',
                     cancelLabel:'取消',
                     fromLabel: 'From',
                     toLabel: 'To',
                     customRangeLabel: '自选时间',
                     daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                     monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                     firstDay: 1
                 }
             },
            function (start, end) {
            	var startDate2= format(new Date(start));
            	var endDate2= format(new Date(end));
            	window.open("Ora_SQL_AWR_INFO?dbid="+GetParam("dbid")+"&startID="+startDate2+"&endID="+endDate2);
            }
            );
        },
        
        
        initMemDaterange: function (id,url,tableid,alertid,memid) {
            if (!jQuery().daterangepicker) {
                return;
            }
            var time=0;
            $(id).daterangepicker({
                    opens: 'left',
                    startDate: moment().subtract('hour', 1),
                    endDate: moment(),
                    minDate: '01/01/2012',
                    maxDate: '12/31/2099',
                    dateLimit: {
                        days: 800
                    },
                    showDropdowns: false,
                    showWeekNumbers: true,
                    timePicker: true,
                    timePickerIncrement: 1,
                    timePicker24Hour: true,
                    ranges: {
                    	'过去1小时': [moment().subtract('hour',1), moment()],
                        '过去1天': [moment().subtract('days',1), moment()],
                        '过去7天': [moment().subtract('days', 7), moment()],
                        '过去1月': [moment().subtract('month',1), moment()],
                        '过去1年': [moment().subtract('year', 1), moment()]
                    },
                    buttonClasses: ['btn btn-sm'],
                    applyClass: ' blue',
                    cancelClass: 'default',
                    format: 'MM/DD/YYYY',
                    separator: ' to ',
                    locale: {
                        applyLabel: '确定',
                        cancelLabel:'取消',
                        fromLabel: 'From',
                        toLabel: 'To',
                        customRangeLabel: '自选时间',
                        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                        firstDay: 1
                    }
                },
                function (start, end) {
                	var startDate = format(new Date(start));
                	var endDate= format(new Date(end));
                	var startDate2 = format2(new Date(start));
                	var endDate2= format2(new Date(end));
                	var startDate3 = format2(new Date());
                	var str="过去";
                	var sub=0;
                	if(endDate2==startDate3){
                		time=sub =end-start;
                		sub=sub/1000/60;
                		if(sub<60){
                			str+=sub+"分钟";
                		}else if((sub/60)<24){
                			str+=Math.floor(sub/60)+"小时";
                		}else if((sub/60/24)<30){
                			str+=Math.floor(sub/60/24)+"天";
                		}else if((sub/60/24/30)<12){
                			str+=Math.floor(sub/60/24/30)+"月";
                		}else{
                			str+=Math.floor(sub/60/24/30/12)+"年";
                		}
                		 $(id+' span').html(str);
                	}else{
                		 $(id+' span').html(startDate2+"~"+endDate2);
                	}
                	
                	refreshSpline(url+"?dbid=" + GetParam("dbid")
        					+ "&period=-1&memberid="+memid + "&starttime=" + startDate + "&endtime=" + endDate,
        					tableid, "单位：%", alertid);
                }
            );
            $(id+' span').html('时间选择');
            $(id).show();
            return time;
        }
    ,
    initTableDaterange: function (id,url,tableid,url2,tableid2) {
        if (!jQuery().daterangepicker) {
            return;
        }
        $(id).daterangepicker({
                opens: 'left',
                startDate:moment().subtract('hour',1),
                endDate: moment(),
                minDate: '01/01/2012',
                maxDate: '12/31/2099',
                dateLimit: {
                    days: 800
                },
                showDropdowns: false,
                showWeekNumbers: true,
                timePicker: true,
                timePickerIncrement: 2,
                timePicker24Hour: true,
                ranges: {
                	'过去1小时': [moment().subtract('hour',1), moment()],
                    '过去1天': [moment().subtract('days',1), moment()],
                    '过去7天': [moment().subtract('days', 7), moment()],
                    '过去1月': [moment().subtract('month',1), moment()],
                    '过去1年': [moment().subtract('year', 1), moment()]
                },
                buttonClasses: ['btn btn-sm'],
                applyClass: ' blue',
                cancelClass: 'default',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                locale: {
                    applyLabel: '确定',
                    cancelLabel:'取消',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: '自选时间',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    firstDay: 1
                }
            },
            function (start, end) {

            	var startDate = format(new Date(start));
            	var endDate= format(new Date(end));
            	var startDate2= format2(new Date(start));
            	var endDate2= format2(new Date(end));
            	var startDate3 = format2(new Date());
            	var str="过去";
            	var sub=0;
            	if(endDate2==startDate3){
            		sub =end-start;
            		sub=sub/1000/60;
            		if(sub<60){
            			str+=sub+"分钟";
            		}else if((sub/60)<24){
            			str+=Math.floor(sub/60)+"小时";
            		}else if((sub/60/24)<30){
            			str+=Math.floor(sub/60/24)+"天";
            		}else if((sub/60/24/30)<12){
            			str+=Math.floor(sub/60/24/30)+"月";
            		}else{
            			str+=Math.floor(sub/60/24/30/12)+"年";
            		}
            		 $(id+' span').html(str);
            	}else{
            		 $(id+' span').html(startDate2+"~"+endDate2);
            	}
            	tableid.api().ajax.url(url+"?dbid=" + GetParam("dbid") + "&period=-1" + "&starttime=" + startDate + "&endtime=" + endDate).load();
            	if(tableid2){
            	tableid2.api().ajax.url(url2+"?dbid=" + GetParam("dbid") + "&period=-1" + "&starttime=" + startDate + "&endtime=" + endDate).load();
            	}
            }
        );
        $(id+' span').html('时间选择');
        $(id).show();
     

    }
    ,
    initTableBasicHTML: function (id,url,tableid) {
        if (!jQuery().daterangepicker) {
            return;
        }
        $(id).daterangepicker({
                opens: 'left',
                startDate:moment().subtract('month',3),
                endDate: moment(),
                minDate: '01/01/2012',
                maxDate: '12/31/2099',
                dateLimit: {
                    days: 800
                },
                showDropdowns: true,
                showWeekNumbers: true,
                timePicker: true,
                timePickerIncrement: 2,
                timePicker24Hour: true,
                ranges: {
                	'过去1小时': [moment().subtract('hour',1), moment()],
                    '过去1天': [moment().subtract('days',1), moment()],
                    '过去7天': [moment().subtract('days', 7), moment()],
                    '过去1月': [moment().subtract('month',1), moment()],
                    '过去3个月': [moment().subtract('month',3),moment()],
                    '过去1年': [moment().subtract('year', 1), moment()]
                },
                buttonClasses: ['btn btn-sm'],
                applyClass: ' blue',
                cancelClass: 'default',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                locale: {
                    applyLabel: '确定',
                    cancelLabel:'取消',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: '自选时间',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    firstDay: 1
                }
            },
            function (start, end) {
            	var startDate = format(new Date(start));
            	var endDate= format(new Date(end));
            	var startDate2= format2(new Date(start));
            	var endDate2= format2(new Date(end));
            	var startDate3 = format2(new Date());
            	var str="过去";
            	var sub=0;
            	if(endDate2==startDate3){
            		sub =end-start;
            		sub=sub/1000/60;
            		if(sub<60){
            			str+=sub+"分钟";
            		}else if((sub/60)<24){
            			str+=Math.floor(sub/60)+"小时";
            		}else if((sub/60/24)<30){
            			str+=Math.floor(sub/60/24)+"天";
            		}else if((sub/60/24/30)<12){
            			str+=Math.floor(sub/60/24/30)+"月";
            		}else{
            			str+=Math.floor(sub/60/24/30/12)+"年";
            		}
            		 $(id+' span').html(str);
            	}else{
            		 $(id+' span').html(startDate2+"~"+endDate2);
            	}
            	
            	tableid.api().ajax.url(url+"?dbid=" + GetParam("dbid") + "&period=-1" + "&starttime=" + startDate + "&endtime=" + endDate).load();
            }
        );
        $(id+' span').html('过去3个月');
        $(id).show();
     

    },
    initTableBasicHTMLAlert: function (id,url,tableid) {
        if (!jQuery().daterangepicker) {
            return;
        }
        $(id).daterangepicker({
                opens: 'left',
                startDate:moment().subtract('hour',1),
                endDate: moment(),
                minDate: '01/01/2012',
                maxDate: '12/31/2099',
                dateLimit: {
                    days: 800
                },
                showDropdowns: true,
                showWeekNumbers: true,
                timePicker: true,
                timePickerIncrement: 2,
                timePicker24Hour: true,
                ranges: {
                	'过去1小时': [moment().subtract('hour',1), moment()],
                    '过去1天': [moment().subtract('days',1), moment()],
                    '过去7天': [moment().subtract('days', 7), moment()],
                    '过去1月': [moment().subtract('month',1), moment()],
                    '过去1年': [moment().subtract('year', 1), moment()]
                },
                buttonClasses: ['btn btn-sm'],
                applyClass: ' blue',
                cancelClass: 'default',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                locale: {
                    applyLabel: '确定',
                    cancelLabel:'取消',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: '自选时间',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    firstDay: 1
                }
            },
            function (start, end) {
            	var startDate = format(new Date(start));
            	var endDate= format(new Date(end));
            	var startDate2= format2(new Date(start));
            	var endDate2= format2(new Date(end));
            	var startDate3 = format2(new Date());
            	var str="过去";
            	var sub=0;
            	if(endDate2==startDate3){
            		sub =end-start;
            		sub=sub/1000/60;
            		if(sub<60){
            			str+=sub+"分钟";
            		}else if((sub/60)<24){
            			str+=Math.floor(sub/60)+"小时";
            		}else if((sub/60/24)<30){
            			str+=Math.floor(sub/60/24)+"天";
            		}else if((sub/60/24/30)<12){
            			str+=Math.floor(sub/60/24/30)+"月";
            		}else{
            			str+=Math.floor(sub/60/24/30/12)+"年";
            		}
            		 $(id+' span').html(str);
            	}else{
            		 $(id+' span').html(startDate2+"~"+endDate2);
            	}
            	
            	tableid.api().ajax.url(url+"?dbid=" + GetParam("dbid") + "&period=-1" + "&starttime=" + startDate + "&endtime=" + endDate).load();
            }
        );
        $(id+' span').html('过去1小时');
        $(id).show();
     

    },
    
    initBigTable: function (id,url,tableid) {
        if (!jQuery().daterangepicker) {
            return;
        }
        $(id).daterangepicker({
                opens: 'left',
                startDate:moment().subtract('hour',1),
                endDate: moment(),
                minDate: '01/01/2012',
                maxDate: '12/31/2099',
                dateLimit: {
                    days: 800
                },
                showDropdowns: true,
                showWeekNumbers: true,
                timePicker: true,
                timePickerIncrement: 2,
                timePicker24Hour: true,
                ranges: {
                	'过去1小时': [moment().subtract('hour',1), moment()],
                    '过去1天': [moment().subtract('days',1), moment()],
                    '过去7天': [moment().subtract('days', 7), moment()],
                    '过去1月': [moment().subtract('month',1), moment()],
                    '过去1年': [moment().subtract('year', 1), moment()]
                },
                buttonClasses: ['btn btn-sm'],
                applyClass: ' blue',
                cancelClass: 'default',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                locale: {
                    applyLabel: '确定',
                    cancelLabel:'取消',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: '自选时间',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    firstDay: 1
                }
            },
            function (start, end) {
            	var startDate = format(new Date(start));
            	var endDate= format(new Date(end));
            	var startDate2= format2(new Date(start));
            	var endDate2= format2(new Date(end));
            	var startDate3 = format2(new Date());
            	var str="过去";
            	var sub=0;
            	if(endDate2==startDate3){
            		sub =end-start;
            		sub=sub/1000/60;
            		if(sub<60){
            			str+=sub+"分钟";
            		}else if((sub/60)<24){
            			str+=Math.floor(sub/60)+"小时";
            		}else if((sub/60/24)<30){
            			str+=Math.floor(sub/60/24)+"天";
            		}else if((sub/60/24/30)<12){
            			str+=Math.floor(sub/60/24/30)+"月";
            		}else{
            			str+=Math.floor(sub/60/24/30/12)+"年";
            		}
            		 $(id+' span').html(str);
            	}else{
            		 $(id+' span').html(startDate2+"~"+endDate2);
            	}
            	
            	tableid.api().ajax.url(url+"?dbid=" + GetParam("dbid") + "&period=-1" + "&starttime=" + startDate + "&endtime=" + endDate).load();
            }
        );
        $(id+' span').html('过去1小时');
        $(id).show();
     

    },
    
    
    initTableHTML: function (id,url,tableid,num) {
        if (!jQuery().daterangepicker) {
            return;
        }
        $(id).daterangepicker({
                opens: 'left',
                startDate:moment().subtract('hour',1),
                endDate: moment(),
                minDate: '01/01/2012',
                maxDate: '12/31/2099',
                dateLimit: {
                    days: 800
                },
                showDropdowns: true,
                showWeekNumbers: true,
                timePicker: true,
                timePickerIncrement: 2,
                timePicker24Hour: true,
                ranges: {
                	'过去1小时': [moment().subtract('hour',1), moment()],
                    '过去1天': [moment().subtract('days',1), moment()],
                    '过去7天': [moment().subtract('days', 7), moment()],
                    '过去1月': [moment().subtract('month',1), moment()],
                    '过去1年': [moment().subtract('year', 1), moment()]
                },
                buttonClasses: ['btn btn-sm'],
                applyClass: ' blue',
                cancelClass: 'default',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                locale: {
                    applyLabel: '确定',
                    cancelLabel:'取消',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: '自选时间',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    firstDay: 1
                }
            },
            function (start, end) {
            	var startDate = format(new Date(start));
            	var endDate= format(new Date(end));
            	var startDate2= format2(new Date(start));
            	var endDate2= format2(new Date(end));
            	var startDate3 = format2(new Date());
            	var str="过去";
            	var sub=0;
            	if(endDate2==startDate3){
            		sub =end-start;
            		sub=sub/1000/60;
            		if(sub<60){
            			str+=sub+"分钟";
            		}else if((sub/60)<24){
            			str+=Math.floor(sub/60)+"小时";
            		}else if((sub/60/24)<30){
            			str+=Math.floor(sub/60/24)+"天";
            		}else if((sub/60/24/30)<12){
            			str+=Math.floor(sub/60/24/30)+"月";
            		}else{
            			str+=Math.floor(sub/60/24/30/12)+"年";
            		}
            		 $(id+' span').html(str);
            	}else{
            		 $(id+' span').html(startDate2+"~"+endDate2);
            	}

            		tableid.api().ajax.url(url+"?dbid=" + GetParam("dbid") + "&period=-1" + "&starttime=" + startDate + "&endtime=" + endDate+"&topnum="+topnum).load();

            	
            	mysqlstarttime = startDate;
            	mysqlendtime = endDate;
            }
        );
        $(id+' span').html('过去1小时');
        $(id).show();
     

    },

    changeTableBasicHTML: function (id,url,tableid,num) {
       
            
            	tableid.api().ajax.url(url+"?dbid=" + GetParam("dbid") + "&period=-1" + "&starttime=" + mysqlstarttime + "&endtime=" + mysqlendtime+"&topnum=" +num).load();
            	topnum=num;

    },
    
    initDialogTable: function (id,url,tableid ) {
        if (!jQuery().daterangepicker) {
            return;
        }
        $(id).daterangepicker({
                opens: 'left',
                startDate: moment().subtract('hour',1),
                endDate: moment(),
                minDate: '01/01/2012',
                maxDate: '12/31/2099',
                dateLimit: {
                    days: 600
                },
                showDropdowns: false,
                showWeekNumbers: true,
                timePicker: true,
                timePickerIncrement: 1,
                timePicker24Hour: true,
                ranges: {
                	'过去1小时': [moment().subtract('hour',1), moment()],
                    '过去1天': [moment().subtract('days',1), moment()],
                    '过去7天': [moment().subtract('days', 7), moment()],
                    '过去1月': [moment().subtract('month',1), moment()],
                    '过去1年': [moment().subtract('year', 1), moment()]
                },
                buttonClasses: ['btn btn-sm'],
                applyClass: ' blue',
                cancelClass: 'default',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                locale: {
                    applyLabel: '确定',
                    cancelLabel:'取消',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: '自选时间',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    firstDay: 1
                }
            },
            function (start, end) {
            	var impact=$("#impact").val();
            	var level=$("#level").val();
            	var startDate = format(new Date(start));
            	var endDate= format(new Date(end));
            	var endDate2= format2(new Date(end));
            	var startDate2= format2(new Date(start));
            	var startDate3 = format2(new Date());
            	var str="过去";
            	var sub=0;
            	if(endDate2==startDate3){
            		sub =end-start;
            		sub=sub/1000/60;
            		if(sub<60){
            			str+=sub+"分钟";
            		}else if((sub/60)<24){
            			str+=Math.floor(sub/60)+"小时";
            		}else if((sub/60/24)<30){
            			str+=Math.floor(sub/60/24)+"天";
            		}else if((sub/60/24/30)<12){
            			str+=Math.floor(sub/60/24/30)+"月";
            		}else{
            			str+=Math.floor(sub/60/24/30/12)+"年";
            		}
            		 $(id+' span').html(str);
            	}else{
            		 $(id+' span').html(startDate2+"~"+endDate2);
            	}
            	if(impact.indexOf("影响")!=-1){
            		impact="All";
            	}
            	if(level.indexOf("等级")!=-1){
            		level="All";
            	}
            	tableid.api().ajax.url(url+"?dbid=" + GetParam("dbid") + "&impact="+impact+ "&level="+level  + "&starttime=" + startDate + "&endtime=" + endDate).load();
            }
        );
        $(id+' span').html('过去一小时');
        $(id).show();
      },
      initConDaterange: function (id,url,tableid,alertid,chartid,intelvalid,interval,selectId) {
          if (!jQuery().daterangepicker) {
              return;
          }
          var time=0;
          $(id).daterangepicker({
                  opens: 'right',
                  startDate: moment().subtract('second', 1),
                  endDate: moment().subtract('second', 3),
                  minDate: '01/01/2012',
                  maxDate: '12/31/2099',
                  dateLimit: {
                      days: 800
                  },
                  showDropdowns: false,
                  showWeekNumbers: true,
                  timePicker: true,
                  timePickerIncrement: 1,
                  timePicker24Hour: true,
                  ranges: {
                	  '实时': [moment().subtract('second', 1), moment().subtract('second', 3)],
                  	  '过去1小时': [moment().subtract('hour',1), moment()],
                      '过去1天': [moment().subtract('days',1), moment()],
                      '过去7天': [moment().subtract('days', 7), moment()],
                      '过去1月': [moment().subtract('month',1), moment()],
                      '过去1年': [moment().subtract('year', 1), moment()]
                  },
                  buttonClasses: ['btn btn-sm'],
                  applyClass: ' blue',
                  cancelClass: 'default',
                  format: 'MM/DD/YYYY',
                  separator: ' to ',
                  locale: {
                      applyLabel: '确定',
                      cancelLabel:'取消',
                      fromLabel: 'From',
                      toLabel: 'To',
                      customRangeLabel: '自选时间',
                      daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                      firstDay: 1
                  }
              },
              function (start, end) {
            	var period="-1";
              	var startDate2= format2(new Date(start));
              	var endDate2= format2(new Date(end));
              	var startDate3 = format2(new Date());
              	var str="过去";
              	var sub=0;
              
              	if(endDate2==startDate3){
              		time=sub =end-start;
              		sub=sub/1000/60;
              		if(sub<60){
              			str+=sub+"分钟";
              		}else if((sub/60)<24){
              			str+=Math.floor(sub/60)+"小时";
              		}else if((sub/60/24)<30){
              			str+=Math.floor(sub/60/24)+"天";
              		}else if((sub/60/24/30)<12){
              			str+=Math.floor(sub/60/24/30)+"月";
              		}else{
              			str+=Math.floor(sub/60/24/30/12)+"年";
              		}
              		 $(id+' span').html(str);
              	}else{
              		 $(id+' span').html(startDate2+"~"+endDate2);
              	}
              	if((end-start)<0){
              		$(id+' span').html("实时");
              		period="real";
              		clearInterval(intelvalid);
          			refreshSplineEchart(url+"?dbid=" + GetParam("dbid")
  					+ "&period=real&interval="+interval ,
  					tableid, "单位：连接数", alertid,chartid,selectId);
      		
		      		intelvalid=	setInterval(function(){
		      			var time_int =  new Date().getTime();
		      			refreshSplineEchart(url+"?dbid=" + GetParam("dbid")+"&period=real&interval="+interval+"&time="+time_int , tableid, "单位：连接数", alertid,chartid,selectId);
		    	 	}, 5*1000); 
              		if($.session!=null){
              			$.session.set(""+tableid, intelvalid);
              		}
              	}else{
                  	clearInterval(intelvalid);
                  	/*  intelvalid=setInterval(function(){
            			refreshSplineEchart(url+"?dbid=" + GetParam("dbid")+"&period="+period , tableid, "单位：连接数", alertid);
          	 		}, 5*60*1000);*/
            		var startDate = format(new Date(start));
                	var endDate= format(new Date(end));
                	refreshSplineEchart(url+"?dbid=" + GetParam("dbid")
        					+ "&period="+period + "&starttime=" + startDate + "&endtime=" + endDate,
        					tableid, "单位：连接数", alertid,chartid,selectId);
              	}
              }
          );
          $(id+' span').html('实时');
          $(id).show();
          return time;
      },
      
      initBaseline: function (id,url,tableid,alertid,chartid,intelvalid,interval) {
          if (!jQuery().daterangepicker) {
              return;
          }
          var time=0;
          $(id).daterangepicker({
                  opens: 'right',
                  startDate: moment().subtract('second', 1),
                  endDate: moment(),
                  minDate: '01/01/2012',
                  maxDate: moment(),
                  dateLimit: {
                      days: 800
                  },
                  showDropdowns: false,
                  showWeekNumbers: false,
                  timePicker: false,
                  timePickerIncrement: 1,
                  timePicker24Hour: true,
                  ranges: {
                	  
                  },
                  buttonClasses: ['btn btn-sm'],
                  applyClass: ' blue',
                  cancelClass: 'default',
                  format: 'MM/DD/YYYY',
                  separator: ' to ',
                  locale: {
                      applyLabel: '确定',
                      cancelLabel:'取消',
                      fromLabel: 'From',
                      toLabel: 'To',
                      customRangeLabel: '自选时间',
                      daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                      firstDay: 1
                  }
              },
              function (start, end) {
            	var period="-1";
              	var startDate2= format2(new Date(start));
              	var endDate2= format2(new Date(end));
              	var startDate3 = format2(new Date());
              	var str="过去";
              	var sub=0;
              
              	if(endDate2==startDate3){
              		time=sub =end-start;
              		sub=sub/1000/60;
              		if(sub<60){
              			str+=sub+"分钟";
              		}else if((sub/60)<24){
              			str+=Math.floor(sub/60)+"小时";
              		}else if((sub/60/24)<30){
              			str+=Math.floor(sub/60/24)+"天";
              		}else if((sub/60/24/30)<12){
              			str+=Math.floor(sub/60/24/30)+"月";
              		}else{
              			str+=Math.floor(sub/60/24/30/12)+"年";
              		}
              		 $(id+' span').html(str);
              	}else{
              		 $(id+' span').html(startDate2+"~"+endDate2);
              	}
              	if((end-start)<0){
              		$(id+' span').html("实时");
              		period="real";
              		clearInterval(intelvalid);
              		refreshSplineEchart(url+"?dbid=" + GetParam("dbid")
          					+ "&period=real&interval="+interval ,
          					tableid, "单位：秒", alertid,chartid);
              		
              		intelvalid=	setInterval(function(){
              			var time_int =  new Date().getTime();
              			refreshSplineEchart(url+"?dbid=" + GetParam("dbid")+"&period=real&interval="+interval+"&time="+time_int , tableid, "单位：连接数", alertid,chartid);
            	 	}, 5*1000); 
              		if($.session!=null){
              			$.session.set(""+tableid, intelvalid);
              		}
              	}else{
              		clearInterval(intelvalid);
              		
              		var startDate = format(new Date(start));
              		if(chartid == 'avgsqltime'){
              			avgsqltime_starttime1 = startDate;
              		}else if(chartid == 'catcache'){
              			catcache_starttime1 = startDate;
              		}
              		
                  	var endDate= format(new Date(end));
                  	if(chartid == 'avgsqltime'){
                  		avgsqltime_endtime1 = endDate;
              		}else if(chartid == 'catcache'){
              			catcache_endtime1 = endDate;
              		}
                  	
                  	
                  	if(chartid == 'avgsqltime'){
                  		var baseline = initNomalEChart([[0,0]],chartid,"","","line","category","单位/秒","SQL平均响应时间");
              			refreshNomalEChart(url+"?dbid=" + GetParam("dbid")
              					+ "&item=" + chartid
              					+ "&starttime1=" + avgsqltime_starttime1 + "&endtime1=" + avgsqltime_endtime1
              					+ "&starttime2=" + avgsqltime_starttime2 + "&endtime2=" + avgsqltime_endtime2,baseline);
                  	}
                  	
                  	if(chartid == 'catcache'){
                  		var baseline = initNomalEChart([[0,0]],chartid,"","","line","category","单位/秒","编目缓冲命中率");
                  		refreshNomalEChart(url+"?dbid=" + GetParam("dbid")
              					+ "&item=" + chartid
              					+ "&starttime1=" + catcache_starttime1 + "&endtime1=" + catcache_endtime1
              					+ "&starttime2=" + catcache_starttime2 + "&endtime2=" + catcache_endtime2,baseline);
                  	}
                  	
              	}
              }
          );
          $(id+' span').html('自选时间段1');
          $(id).show();
          return time;
      },
      
      initBaseline2: function (id,url,tableid,alertid,chartid,intelvalid,interval) {
          if (!jQuery().daterangepicker) {
              return;
          }
          var time=0;
          $(id).daterangepicker({
                  opens: 'right',
                  startDate: moment().subtract('second', 1),
                  endDate: moment(),
                  minDate: '01/01/2012',
                  maxDate: moment(),
                  dateLimit: {
                      days: 800
                  },
                  showDropdowns: false,
                  showWeekNumbers: false,
                  timePicker: false,
                  timePickerIncrement: 1,
                  timePicker24Hour: true,
                  ranges: {
                	  
                  },
                  buttonClasses: ['btn btn-sm'],
                  applyClass: ' blue',
                  cancelClass: 'default',
                  format: 'MM/DD/YYYY',
                  separator: ' to ',
                  locale: {
                      applyLabel: '确定',
                      cancelLabel:'取消',
                      fromLabel: 'From',
                      toLabel: 'To',
                      customRangeLabel: '自选时间',
                      daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                      firstDay: 1
                  }
              },
              function (start, end) {
            	var period="-1";
              	var startDate2= format2(new Date(start));
              	var endDate2= format2(new Date(end));
              	var startDate3 = format2(new Date());
              	var str="过去";
              	var sub=0;
              
              	if(endDate2==startDate3){
              		time=sub =end-start;
              		sub=sub/1000/60;
              		if(sub<60){
              			str+=sub+"分钟";
              		}else if((sub/60)<24){
              			str+=Math.floor(sub/60)+"小时";
              		}else if((sub/60/24)<30){
              			str+=Math.floor(sub/60/24)+"天";
              		}else if((sub/60/24/30)<12){
              			str+=Math.floor(sub/60/24/30)+"月";
              		}else{
              			str+=Math.floor(sub/60/24/30/12)+"年";
              		}
              		 $(id+' span').html(str);
              	}else{
              		 $(id+' span').html(startDate2+"~"+endDate2);
              	}
              	if((end-start)<0){
              		$(id+' span').html("实时");
              		period="real";
              		clearInterval(intelvalid);
              		refreshSplineEchart(url+"?dbid=" + GetParam("dbid")
          					+ "&period=real&interval="+interval ,
          					tableid, "单位：秒", alertid,chartid);
              		
              		intelvalid=	setInterval(function(){
              			var time_int =  new Date().getTime();
              			refreshSplineEchart(url+"?dbid=" + GetParam("dbid")+"&period=real&interval="+interval+"&time="+time_int , tableid, "单位：连接数", alertid,chartid);
            	 	}, 5*1000); 
              		if($.session!=null){
              			$.session.set(""+tableid, intelvalid);
              		}
              	}else{
              		clearInterval(intelvalid);
                  	
                  	var startDate = format(new Date(start));
              		if(chartid == 'avgsqltime'){
              			avgsqltime_starttime2 = startDate;
              		}else if(chartid == 'catcache'){
              			catcache_starttime2 = startDate;
              		}
              		
                  	var endDate= format(new Date(end));
                  	if(chartid == 'avgsqltime'){
                  		avgsqltime_endtime2= endDate;
              		}else if(chartid == 'catcache'){
              			catcache_endtime2 = endDate;
              		}
                  	
                  	
                  	if(chartid == 'avgsqltime'){
                  		var baseline = initNomalEChart([[0,0]],chartid,"","","line","category","单位/秒","SQL平均响应时间");
              			refreshNomalEChart(url+"?dbid=" + GetParam("dbid")
              					+ "&item=" + chartid
              					+ "&starttime1=" + avgsqltime_starttime1 + "&endtime1=" + avgsqltime_endtime1
              					+ "&starttime2=" + avgsqltime_starttime2 + "&endtime2=" + avgsqltime_endtime2,baseline);
                  	}
                  	
                  	if(chartid == 'catcache'){
                  		var baseline = initNomalEChart([[0,0]],chartid,"","","line","category","单位/秒","编目缓冲命中率");
                  		refreshNomalEChart(url+"?dbid=" + GetParam("dbid")
              					+ "&item=" + chartid
              					+ "&starttime1=" + catcache_starttime1 + "&endtime1=" + catcache_endtime1
              					+ "&starttime2=" + catcache_starttime2 + "&endtime2=" + catcache_endtime2,baseline);
                  	}
              	}
              }
          );
          $(id+' span').html('自选时间段2');
          $(id).show();
          return time;
      },
      
      
      initSQLChartDaterange: function (id,url,tableid,alertid,chartid,intelvalid,interval,selectId) {
          if (!jQuery().daterangepicker) {
              return;
          }
          var time=0;
          $(id).daterangepicker({
                  opens: 'right',
                  startDate: moment().subtract('second', 1),
                  endDate: moment().subtract('second', 3),
                  minDate: '01/01/2012',
                  maxDate: '12/31/2099',
                  dateLimit: {
                      days: 800
                  },
                  showDropdowns: false,
                  showWeekNumbers: true,
                  timePicker: true,
                  timePickerIncrement: 1,
                  timePicker24Hour: true,
                  ranges: {
                	  '实时': [moment().subtract('second', 1), moment().subtract('second', 3)],
                  	  '过去1小时': [moment().subtract('hour',1), moment()],
                      '过去1天': [moment().subtract('days',1), moment()],
                      '过去7天': [moment().subtract('days', 7), moment()],
                      '过去1月': [moment().subtract('month',1), moment()],
                      '过去1年': [moment().subtract('year', 1), moment()]
                  },
                  buttonClasses: ['btn btn-sm'],
                  applyClass: ' blue',
                  cancelClass: 'default',
                  format: 'MM/DD/YYYY',
                  separator: ' to ',
                  locale: {
                      applyLabel: '确定',
                      cancelLabel:'取消',
                      fromLabel: 'From',
                      toLabel: 'To',
                      customRangeLabel: '自选时间',
                      daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                      firstDay: 1
                  }
              },
              function (start, end) {
            	var period="-1";
              	var startDate2= format2(new Date(start));
              	var endDate2= format2(new Date(end));
              	var startDate3 = format2(new Date());
              	var str="过去";
              	var sub=0;
              
              	if(endDate2==startDate3){
              		time=sub =end-start;
              		sub=sub/1000/60;
              		if(sub<60){
              			str+=sub+"分钟";
              		}else if((sub/60)<24){
              			str+=Math.floor(sub/60)+"小时";
              		}else if((sub/60/24)<30){
              			str+=Math.floor(sub/60/24)+"天";
              		}else if((sub/60/24/30)<12){
              			str+=Math.floor(sub/60/24/30)+"月";
              		}else{
              			str+=Math.floor(sub/60/24/30/12)+"年";
              		}
              		 $(id+' span').html(str);
              	}else{
              		 $(id+' span').html(startDate2+"~"+endDate2);
              	}
              	if((end-start)<0){
              		$(id+' span').html("实时");
              		clearInterval(intelvalid);
              		refreshNomalEChart(url+"?dbid="+GetParam("dbid")+"&period=real&interval=5",tableid,"", alertid,chartid,selectId);
              		intelvalid = intervalRefreshEchart(url + "?dbid="+GetParam("dbid")+"&period=real&interval=5",tableid,"", alertid,chartid,selectId);
              	}else{
              		clearInterval(intelvalid);
              		var startDate = format(new Date(start));
                  	var endDate= format(new Date(end));
                  	refreshNomalEChart(url+"?dbid="+GetParam("dbid")+"&period="+period + "&starttime=" + startDate + "&endtime=" + endDate,tableid,"", alertid,chartid,selectId);
              	}
              }
          );
          $(id+' span').html('实时');
          $(id).show();
          return time;
      },
      
      
      initLogChartDaterange: function (id,url,tableid,alertid,chartid,intelvalid,interval,selectId) {
          if (!jQuery().daterangepicker) {
              return;
          }
          var time=0;
          $(id).daterangepicker({
                  opens: 'right',
                  startDate: moment().subtract('second', 1),
                  endDate: moment().subtract('second', 3),
                  minDate: '01/01/2012',
                  maxDate: '12/31/2099',
                  dateLimit: {
                      days: 800
                  },
                  showDropdowns: false,
                  showWeekNumbers: true,
                  timePicker: true,
                  timePickerIncrement: 1,
                  timePicker24Hour: true,
                  ranges: {
                	  '实时': [moment().subtract('second', 1), moment().subtract('second', 3)],
                  	  '过去1小时': [moment().subtract('hour',1), moment()],
                      '过去1天': [moment().subtract('days',1), moment()],
                      '过去7天': [moment().subtract('days', 7), moment()],
                      '过去1月': [moment().subtract('month',1), moment()],
                      '过去1年': [moment().subtract('year', 1), moment()]
                  },
                  buttonClasses: ['btn btn-sm'],
                  applyClass: ' blue',
                  cancelClass: 'default',
                  format: 'MM/DD/YYYY',
                  separator: ' to ',
                  locale: {
                      applyLabel: '确定',
                      cancelLabel:'取消',
                      fromLabel: 'From',
                      toLabel: 'To',
                      customRangeLabel: '自选时间',
                      daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                      firstDay: 1
                  }
              },
              function (start, end) {
            	var period="-1";
              	var startDate2= format2(new Date(start));
              	var endDate2= format2(new Date(end));
              	var startDate3 = format2(new Date());
              	var str="过去";
              	var sub=0;
              
              	if(endDate2==startDate3){
              		time=sub =end-start;
              		sub=sub/1000/60;
              		if(sub<60){
              			str+=sub+"分钟";
              		}else if((sub/60)<24){
              			str+=Math.floor(sub/60)+"小时";
              		}else if((sub/60/24)<30){
              			str+=Math.floor(sub/60/24)+"天";
              		}else if((sub/60/24/30)<12){
              			str+=Math.floor(sub/60/24/30)+"月";
              		}else{
              			str+=Math.floor(sub/60/24/30/12)+"年";
              		}
              		 $(id+' span').html(str);
              	}else{
              		 $(id+' span').html(startDate2+"~"+endDate2);
              	}
              	if((end-start)<0){
              		$(id+' span').html("实时");
              		clearInterval(intelvalid);
              		refreshNomalEChart(url+"?dbid="+GetParam("dbid")+"&period=real&interval=5",tableid,"", alertid,chartid,selectId);
              		intelvalid = intervalRefreshEchart(url + "?dbid="+GetParam("dbid")+"&period=real&interval=5",tableid,"", alertid,chartid,selectId);
              	}else{
              		clearInterval(intelvalid);
              		var startDate = format(new Date(start));
                  	var endDate= format(new Date(end));
                  	refreshNomalEChart(url+"?dbid="+GetParam("dbid")+"&period="+period + "&starttime=" + startDate + "&endtime=" + endDate,tableid,"", alertid,chartid,selectId);
              	}
              }
          );
          $(id+' span').html('实时');
          $(id).show();
          return time;
      },
      
      
      initMemInterDaterange: function (id,url,tableid,alertid,hostname,intervalId,chartid) {
          if (!jQuery().daterangepicker) {
              return;
          }
          var time=0;
          $(id).daterangepicker({
                  opens: 'left',
                  startDate: moment().subtract('second', 1),
                  endDate: moment().subtract('second', 3),
                  minDate: '01/01/2012',
                  maxDate: '12/31/2099',
                  dateLimit: {
                      days: 800
                  },
                  showDropdowns: false,
                  showWeekNumbers: true,
                  timePicker: true,
                  timePickerIncrement: 1,
                  timePicker24Hour: true,
                  ranges: {
                	  '实时': [moment().subtract('second', 1), moment().subtract('second', 3)],
                	  '过去1小时': [moment().subtract('hour',1), moment()],
                      '过去1天': [moment().subtract('days',1), moment()],
                      '过去7天': [moment().subtract('days', 7), moment()],
                      '过去1月': [moment().subtract('month',1), moment()],
                      '过去1年': [moment().subtract('year', 1), moment()]
                     
                  },
                  buttonClasses: ['btn btn-sm'],
                  applyClass: ' blue',
                  cancelClass: 'default',
                  format: 'MM/DD/YYYY',
                  separator: ' to ',
                  locale: {
                      applyLabel: '确定',
                      cancelLabel:'取消',
                      fromLabel: 'From',
                      toLabel: 'To',
                      customRangeLabel: '自选时间',
                      daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                      firstDay: 1
                  }
              },
              function (start, end) {
            	  
              	var startDate = format(new Date(start));
              	var endDate= format(new Date(end));
              	var startDate2 = format2(new Date(start));
              	var endDate2= format2(new Date(end));
              	var startDate3 = format2(new Date());
              	var str="过去";
              	var sub=0;
              	if(endDate2==startDate3){
              		time=sub =end-start;
              		sub=sub/1000/60;
              		if(sub<60){
              			str+=sub+"分钟";
              		}else if((sub/60)<24){
              			str+=Math.floor(sub/60)+"小时";
              		}else if((sub/60/24)<30){
              			str+=Math.floor(sub/60/24)+"天";
              		}else if((sub/60/24/30)<12){
              			str+=Math.floor(sub/60/24/30)+"月";
              		}else{
              			str+=Math.floor(sub/60/24/30/12)+"年";
              		}
              		 $(id+' span').html(str);
              	}else{
              		 $(id+' span').html(startDate2+"~"+endDate2);
              	}
            	if((end-start)<0){
              		$(id+' span').html("实时");
              		period="real";
              		clearInterval(intervalId);
              		refreshNomalEChart(url+"?dbid=" + GetParam("dbid")+"&period=real&interval=5"+"&hostname="+hostname ,tableid,"",alertid,chartid);
              		intervalId = intervalRefreshEchart(url+"?dbid=" + GetParam("dbid")+"&period=real&interval=5"+"&hostname="+hostname,tableid,"",alertid,chartid);
              	}else{
              		clearInterval(intervalId);
              /*		intervalId=setInterval(function(){
            	 		refreshSpline(url+"?dbid=" + GetParam("dbid")+"&period="+period , tableid, "单位：%", alertid);
            	 	}, 5*60*1000);*/
              		var startDate = format(new Date(start));
                  	var endDate= format(new Date(end));
        /*          	refreshSpline(url+"?dbid=" + GetParam("dbid")
          					+ "&period=-1&hostname="+hostname + "&starttime=" + startDate + "&endtime=" + endDate,
          					tableid, "单位：%", alertid);*/
              		refreshNomalEChart(url+"?dbid=" + GetParam("dbid") + "&period=-1&hostname="+hostname + "&starttime=" + startDate + "&endtime=" + endDate,tableid,"",alertid,chartid);

              	}
              }
          );
          $(id+' span').html('实时');
          $(id).show();
          return time;
      },
      
      initHanaMemInterDaterange: function (id,url,tableid,alertid,hostname,intervalId,chartid) {
          if (!jQuery().daterangepicker) {
              return;
          }
          var time=0;
          $(id).daterangepicker({
                  opens: 'left',
                  startDate: moment().subtract('second', 1),
                  endDate: moment().subtract('second', 3),
                  minDate: '01/01/2012',
                  maxDate: '12/31/2099',
                  dateLimit: {
                      days: 800
                  },
                  showDropdowns: false,
                  showWeekNumbers: true,
                  timePicker: true,
                  timePickerIncrement: 1,
                  timePicker24Hour: true,
                  ranges: {
                	  '实时': [moment().subtract('second', 1), moment().subtract('second', 3)],
                	  /*'过去1小时': [moment().subtract('hour',1), moment()],
                      '过去1天': [moment().subtract('days',1), moment()],
                      '过去7天': [moment().subtract('days', 7), moment()],
                      '过去1月': [moment().subtract('month',1), moment()],
                      '过去1年': [moment().subtract('year', 1), moment()]*/
                     
                  },
                  buttonClasses: ['btn btn-sm'],
                  applyClass: ' blue',
                  cancelClass: 'default',
                  format: 'MM/DD/YYYY',
                  separator: ' to ',
                  locale: {
                      applyLabel: '确定',
                      cancelLabel:'取消',
                      fromLabel: 'From',
                      toLabel: 'To',
                      customRangeLabel: '自选时间',
                      daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                      monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                      firstDay: 1
                  }
              },
              function (start, end) {
            	  
              	var startDate = format(new Date(start));
              	var endDate= format(new Date(end));
              	var startDate2 = format2(new Date(start));
              	var endDate2= format2(new Date(end));
              	var startDate3 = format2(new Date());
              	var str="过去";
              	var sub=0;
              	if(endDate2==startDate3){
              		time=sub =end-start;
              		sub=sub/1000/60;
              		if(sub<60){
              			str+=sub+"分钟";
              		}else if((sub/60)<24){
              			str+=Math.floor(sub/60)+"小时";
              		}else if((sub/60/24)<30){
              			str+=Math.floor(sub/60/24)+"天";
              		}else if((sub/60/24/30)<12){
              			str+=Math.floor(sub/60/24/30)+"月";
              		}else{
              			str+=Math.floor(sub/60/24/30/12)+"年";
              		}
              		 $(id+' span').html(str);
              	}else{
              		 $(id+' span').html(startDate2+"~"+endDate2);
              	}
            	if((end-start)<0){
              		$(id+' span').html("实时");
              		period="real";
              		clearInterval(intervalId);
              		refreshNomalEChart(url+"?dbid=" + GetParam("dbid")+"&period=real&interval=5"+"&hostname="+hostname ,tableid,"",alertid,chartid);
              		intervalId = intervalRefreshEchart(url+"?dbid=" + GetParam("dbid")+"&period=real&interval=5"+"&hostname="+hostname,tableid,"",alertid,chartid);
              	}else{
              		clearInterval(intervalId);
              /*		intervalId=setInterval(function(){
            	 		refreshSpline(url+"?dbid=" + GetParam("dbid")+"&period="+period , tableid, "单位：%", alertid);
            	 	}, 5*60*1000);*/
              		var startDate = format(new Date(start));
                  	var endDate= format(new Date(end));
        /*          	refreshSpline(url+"?dbid=" + GetParam("dbid")
          					+ "&period=-1&hostname="+hostname + "&starttime=" + startDate + "&endtime=" + endDate,
          					tableid, "单位：%", alertid);*/
              		refreshNomalEChart(url+"?dbid=" + GetParam("dbid") + "&period=-1&hostname="+hostname + "&starttime=" + startDate + "&endtime=" + endDate,tableid,"",alertid,chartid);

              	}
              }
          );
          $(id+' span').html('实时');
          $(id).show();
          return time;
      },
      
      initReportSelection: function (id) {
          if (!jQuery().daterangepicker) {
              return;
          }
          $("#"+id).daterangepicker({
        	  singleDatePicker: true,
              startDate:moment().subtract('days',1),
              showDropdowns: true,
              showWeekNumbers: true,
              timePicker: false,
              maxDate: moment().format('MM/DD/YYYY'),
              buttonClasses: ['btn btn-sm'],
              applyClass: ' blue',
              cancelClass: 'default',
              format: 'MM/DD/YYYY',
              separator: ' to ',
              locale: {
                  applyLabel: '确定',
                  cancelLabel:'取消',
                  fromLabel: 'From',
                  toLabel: 'To',
                  customRangeLabel: '自选时间',
                  daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                  firstDay: 1
              }
          },
          function (start) {
        	  start.second(59);
        	  var startDate2= format2(new Date(start));
        	  var startDate = format(new Date(start));
        	  $("#"+id).data("timeval",startDate);
        	  $("#"+id+' span').html(format2(new Date(start)));
          }
          
          
      );
          var content = format(new Date(moment().subtract('days',1).hour(23).minute(59).second(59)));
          $("#"+id+' span').css("font-size","15px");
          $("#"+id+' span').html(format2(new Date(moment().subtract('days',1))));
          $("#"+id).data("timeval",content);
      },
    
      initHistoryList: function (id) {
          if (!jQuery().daterangepicker) {
              return;
          }
          $("#"+id).daterangepicker({
        	  singleDatePicker: true,
              startDate:moment().subtract('days',1),
              showDropdowns: true,
              showWeekNumbers: true,
              timePicker: false,
              //maxDate: moment().format('MM/DD/YYYY'),
              buttonClasses: ['btn btn-sm'],
              applyClass: ' blue',
              cancelClass: 'default',
              format: 'MM/DD/YYYY',
              separator: ' to ',
              locale: {
                  applyLabel: '确定',
                  cancelLabel:'取消',
                  fromLabel: 'From',
                  toLabel: 'To',
                  customRangeLabel: '自选时间',
                  daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                  monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                  firstDay: 1
              }
          },
          function (start) {
        	  start.second(59);
        	  var startDate2= format2(new Date(start));
        	  var startDate = format(new Date(start));
        	  $("#"+id).data("timeval",startDate);
        	  $("#"+id+' span').html(format2(new Date(start)));
          }
          
          
      );
          var content = format(new Date(moment().subtract('days',1).hour(23).minute(59).second(59)));
          $("#"+id+' span').css("font-size","15px");
          $("#"+id+' span').html(format2(new Date(moment().subtract('days',1))));
          $("#"+id).data("timeval",content);
      },
      
      
    initSQLHistory: function(id,dbid, member, sqlid ,url2, chartid, startDate, endDate){
        if (!jQuery().daterangepicker) {
            return;
        }
        var startDate2 = new Date(startDate.substr(0,4)+"/"+startDate.substr(4,2)+"/"+startDate.substr(6,2)+" "+startDate.substr(8,2)+":"+startDate.substr(10,2)+":"+startDate.substr(12,2));
        var endDate2 = new Date(endDate.substr(0,4)+"/"+endDate.substr(4,2)+"/"+endDate.substr(6,2)+" "+endDate.substr(8,2)+":"+endDate.substr(10,2)+":"+endDate.substr(12,2));
        $(id).daterangepicker({
                opens: 'left',
                startDate:startDate2,
                endDate: endDate2,
                minDate: '01/01/2012',
                maxDate: '12/31/2099',
                dateLimit: {
                    days: 800
                },
                showDropdowns: false,
                showWeekNumbers: true,
                timePicker: true,
                timePickerIncrement: 2,
                timePicker24Hour: true,
                ranges: {
                	'过去1小时': [moment().subtract('hour',1), moment()],
                    '过去1天': [moment().subtract('days',1), moment()],
                    '过去7天': [moment().subtract('days', 7), moment()],
                    '过去1月': [moment().subtract('month',1), moment()],
                    '过去1年': [moment().subtract('year', 1), moment()]
                },
                buttonClasses: ['btn btn-sm'],
                applyClass: ' blue',
                cancelClass: 'default',
                format: 'MM/DD/YYYY',
                separator: ' to ',
                locale: {
                    applyLabel: '确定',
                    cancelLabel:'取消',
                    fromLabel: 'From',
                    toLabel: 'To',
                    customRangeLabel: '自选时间',
                    daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                    firstDay: 1
                }
            },
            function (start, end) {
            	var startDate = format(new Date(start));
            	var endDate= format(new Date(end));
            	var startDate2= format3(new Date(start));
            	var endDate2= format3(new Date(end));
            	var startDate3 = format3(new Date());
            	var timepic="时间区段选择:&nbsp;&nbsp;&nbsp;&nbsp;";
            	var str="过去";
            	var sub=0;
            	if(endDate2==startDate3){
            		sub =end-start;
            		sub=sub/1000/60;
            		if(sub<60){
            			str+=Math.floor(sub)+"分钟";
            		}else if((sub/60)<24){
            			str+=Math.floor(sub/60)+"小时";
            		}else if((sub/60/24)<30){
            			str+=Math.floor(sub/60/24)+"天";
            		}else if((sub/60/24/30)<12){
            			str+=Math.floor(sub/60/24/30)+"月";
            		}else{
            			str+=Math.floor(sub/60/24/30/12)+"年";
            		}
            		 $(id+' span').html(timepic+str);
            	}else{
            		 $(id+' span').html(timepic+startDate2+"~~"+endDate2);
            	}

            	
            	
            	init(dbid, member, sqlid, startDate, endDate);
            }
        );
        if(startDate != null){
        	var timepic="时间区段选择:&nbsp;&nbsp;&nbsp;&nbsp;";
        	var str="过去";
        	var sub=0;
        	startDate = format3(startDate2);
        	endDate = format3(endDate2);
        	$(id+' span').html(timepic+startDate+"~~"+endDate);

        }else{
        	$(id+' span').html('时间区段选择');
        }
        
        $(id).show();
    } 
    }
}();


