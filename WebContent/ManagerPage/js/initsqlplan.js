function  init( ){
	var count =0;
	$.ajaxSettings.async = true; 
	var sExplainSql = $.session.get('explainSql');
	var schema = $.session.get('schema');
	$.ajax({
		  url: "/dbmon/DBMon_SQL_TXT_SQLExplain",
		  type:"POST",
		  data: {dbid:GetParam("dbid"),explain_sql:sExplainSql,schema:schema},
		  success: function(data){
					 if(data.indexOf("explain_error")>-1){
						 $("#returnerrorinfo").html("查询计划不能生成。当前用户下没有创建EXPLAIN表，请点击上方按钮生成EXPLAIN表。</br>(注:Windows环境下的DB2数据库不支持此功能!)");
						 $("#explanfalse").css("display","block");
						
						 $("#plan").css("display","none");
					 }else if(data.indexOf("ssh_error")>-1){
						 $("#returnerrorinfo").css("font-size","15px")
						 $("#returnerrorinfo").html("连接用户环境变量存在问题，请参照《新云监控安装配置帮助文档》进行相应的用户环境变量配置。</br>(注:Windows环境下的DB2数据库不支持此功能!)");
						 $("#explanfalse").css("display","block");
						$("#createEx").css("display","none");
						 $("#plan").css("display","none");
					 }else if(data.indexOf("schemaerror")>-1){
						 $("#returnerrorinfo").css("font-size","15px")
						 $("#returnerrorinfo").html("schema 选择不正确请重新选择！</br>(注:Windows环境下的DB2数据库不支持此功能!)");
						 $("#explanfalse").css("display","block");
						$("#createEx").css("display","none");
						 $("#plan").css("display","none");
					 }else { var i=0;
					 		var dataj=$.parseJSON(data);
					 
					 
						$.each(dataj,function(i,item){
							 	$.each(item,function(k,v){
							 		$("#"+i).html(v);
							 	});
							 })
						$.session.remove('schema');
						$.session.remove('explainSql');
				 }
				 $("#loading").hide();
		  },
		  failure:function (result) { 
			  alert(result);
		  }
		  
	});
}