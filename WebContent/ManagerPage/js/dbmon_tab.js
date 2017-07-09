/**
 * 
 */


var dbid=GetParam("dbid");
document.write("<ul class=\"nav nav-tabs main-tabs\">");
document.write("<li role=\"presentation\" class=\"active\"><a href=\"./dbmon_basicinfo.html?dbid="+ dbid + "\">基本信息</a></li>");
document.write("<li role=\"presentation\"><a href=\"./dbmon_alert.html?dbid=" + dbid + "\">告警</a></li>");
document.write("<li role=\"presentation\"><a href=\"./dbmon_conn.html?dbid=" + dbid + "\">连接</a></li>");
document.write("<li role=\"presentation\"><a href=\"./dbmon_perf.html?dbid=" + dbid + "\">性能</a></li>");
document.write("<li role=\"presentation\"><a href=\"./dbmon_hardware.html?dbid=" + dbid + "\">主机</a></li>");
document.write("<li role=\"presentation\"><a href=\"./dbmon_logging.html?dbid=" + dbid + "\">日志</a></li>");
document.write("<li role=\"presentation\"><a href=\"./dbmon_storage.html?dbid=" + dbid + "\">存储</a></li>");
document.write("<li role=\"presentation\"><a href=\"./dbmon_topsql.html?dbid=" + dbid + "\">TOP SQL</a></li>");
document.write("<li role=\"presentation\"><a href=\"./dbmon_bigtable.html?dbid=" + dbid + "\">大表</a></li>");
document.write("</ul>");