function tree(divid,dbid) {
	function getDate(){
		var defer = $.Deferred();
		var mem=new Array();
//		$.ajaxSettings.async = true; 
//		$.getJSON("DBMon_Chart_State?dbid="+dbid,function(data){
//	   		$.each(data,function(i,item){
//				mem="";
//	    	   	$.each(item,function(k,v){
//					mem+=v+"\n";
//	       		});
//	   		})
//	 		defer.resolve(mem);
//		});
		for(var i=0;i<4;i++){
			mem[i]="x"+i;
		}
		defer.resolve(mem);
		
		return defer.promise();
	}
	var graph = new joint.dia.Graph;
	var div = $("#" + divid);
	var widths = $("#paper").width() - 20;
	var paper = new joint.dia.Paper({
		el : $('#paper'),
		width : widths,
		height : 300,
		gridSize : 1,
		model : graph
	});
	
	var erd = joint.shapes.erd;
	var element = function(elm, x, y, label) {
		var cell = new elm({
			position : {
				x : x,
				y : y
			},
			attrs : {
				text : {
					text : label
				}
			}
		});
		graph.addCell(cell);
		return cell;
	};
	var link = function(elm1, elm2) {
		var myLink = new erd.Line({
			source : {
				id : elm1.id
			},
			target : {
				id : elm2.id
			}
		});
		graph.addCell(myLink);
		return myLink;
	};
	
	var link2 = function(elm1, elm2) {
		var myLink = new erd.Line2({
			source : {
				id : elm1.id
			},
			target : {
				id : elm2.id
			}
		});
		graph.addCell(myLink);
		return myLink;
	};
	
	var array = new Array();
	var localx = 800;
	
	
	
	$.when(getDate()).done(function(data){
		array[0] = element(erd.database, widths / 2-467 , 110, "database");
		
		array[1] = element(erd.Members, widths / 2 -260, 15, data[1]);
		array[2] = element(erd.database, widths / 2-67 , 110, "database");
		array[3] = element(erd.Members, widths / 2 +140, 15, data[2]);
		for(var i=0;i<4;i++){
		var pswins = "<div id='blk"+(i+1)+"' class=' well  well-sm panel panel-default ' style='display:none; width:250px'>"
			+ "<div class=' panel-head'><div class='row'>"
			+ "<div class='col-md-offset-11'>"
			+ "<a href='javascript:void(0)' id='close1'><span class='glyphicon glyphicon-remove'></span></a></div></div></div>"
			+ "<div class=' panel-body'>"
			+  "database"+"</div>"
			+ "<div class='foot'></div></div>";
			div.append(pswins);
		}

		for(var x=1;x<=4;x++){
			var localx=124,localy=0;
			var local= $("#j_"+x).position().left;
			var localtop=$("#j_"+x).position().top;
			if(localtop>120){
				localx=0,localy=85;
			}
			if(local>800){
				localx=-60;
				localy=+105;
			}
			new PopupLayer({trigger:"#j_"+x,popupBlk:"#blk"+x,closeBtn:"#close"+x,eventType:"mouseover",offsets:{x:localx,y:localy},popupLayerClass:"alert-success"});
		}
		
		link(array[1], array[0]);
		link(array[3], array[2]);
		link2(array[1], array[3]);
    });
	
}