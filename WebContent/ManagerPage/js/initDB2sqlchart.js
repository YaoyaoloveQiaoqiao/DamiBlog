var sqlchart = initNomalEChart([[0,0]],'sqlchart',"","","line","category","单位/个","SQL吞吐量和响应时间",true);
function sqlchartInit(){
	refreshNomalEChart("../DBMon_Conn_Chart_SQLThroughput?dbid="+GetParam("dbid")+"&period=real&interval=5",sqlchart,undefined,undefined,undefined,"selectedNumber");
	intervalId2 = intervalRefreshEchart("../DBMon_Conn_Chart_SQLThroughput?dbid="+GetParam("dbid")+"&period=real&interval=5",sqlchart,undefined,undefined,undefined,"selectedNumber");
}
