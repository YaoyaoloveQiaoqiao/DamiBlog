var db2conn = initNomalEChart([[0,0]],'db2conn',"","","line","time","单位/个","连接数");
function db2connInit(){
	refreshNomalEChart("/dbmon/DBMon_Conn_Chart_DbConnInfo?dbid="+GetParam("dbid")+"&period=real&interval=5",db2conn,undefined,undefined,undefined,"selectedNumber");
	intervalId1 = intervalRefreshEchart("/dbmon/DBMon_Conn_Chart_DbConnInfo?dbid="+GetParam("dbid")+"&period=real&interval=5",db2conn,undefined,undefined,undefined,"selectedNumber");
}
