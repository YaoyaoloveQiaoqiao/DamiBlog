var tpschart = initNomalEChart([[0,0]],'tpschart',"","","line","category","单位/个","事务吞吐量和响应时间",true);
function tpschartInit(){
	refreshNomalEChart("../DBMon_Conn_Chart_TPSThroughput?dbid="+GetParam("dbid")+"&period=real&interval=5",tpschart,undefined,undefined,undefined,"selectedNumber");
	intervalId3 = intervalRefreshEchart("../DBMon_Conn_Chart_TPSThroughput?dbid="+GetParam("dbid")+"&period=real&interval=5",tpschart,undefined,undefined,undefined,"selectedNumber");
}
