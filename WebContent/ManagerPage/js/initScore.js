function initScore(ora) {
	var dbid = GetParam("dbid");
	var murl = "../DBMon_Score_Main?dbid=" + dbid;
	var surl = "../DBMon_Score_Sub?dbid=" + dbid;

	if ("Ora" == ora) {
		murl = "../Ora_Mon_Score_Main?dbid=" + dbid;
		surl = "../Ora_Mon_Score_Sub?dbid=" + dbid;
	} else if ("hana" == ora) {
		murl = "../webapi/HanaBasicInfo/getScoreMain?dbid=" + dbid;
		surl = "../webapi/HanaBasicInfo/getScoreSub?dbid=" + dbid;
	}

	var domoe = new Array(61, 72, 63, 47, 87);
	$(function() {
		var $topLoader = $("#topLoader").percentageLoader({
			width : 206,
			height : 206,
			controllable : true,
			progress : 0.0

		});

		var topLoaderRunning = false;
		if (topLoaderRunning) {
			return;
		}
		topLoaderRunning = true;
		$topLoader.setProgress(0);

		var kb = 0;
		var totalKb = 100;
		var value = domoe[0];
		$.ajaxSettings.async = true;
		$.ajax({
			type : 'POST',
			url : murl,
			dataType : "json",
			success : function(data) {
				value = data.score;
				$topLoader.setValue("最近监控时间:" + data.lasttime);
			}
		});
		var animateFunc = function() {
			kb++;
			$topLoader.setProgress(kb / totalKb);
			if (kb < value) {
				setTimeout(animateFunc, 10);
			} else {
				topLoaderRunning = true;
			}
		}
		var data;
		var serity;
		$.getJSON(surl, function(result) {
			var str = "";
			data = result.data;
			seriry = result.serity;
			$.each(data, function(k, v) {
				$.each(v, function(x, y) {
					if (y) {

						var table = $("#" + x).dataTable({
							"searching" : false,
							"ordering" : false,
							"info" : false,
							"paging" : false,
							"bAutoWidth" : false,
							/*"aoColumns" : [ {
								"sWidth" : "50%"
							}, {
								"sWidth" : "50%"
							} ],*/
							"aaData" : y,
							"language" : {
								"zeroRecords" : "本类各监控项目状态良好",
							},
							//"autoWidth" : true,

							"aoColumns" : [ {
								"sTitle" : "告警项",
								"sWidth" : "20%"
							}, {
								"sTitle" : "描述",
								"sClass" : "center",
								"sWidth" : "80%"
							}, ]
						});
						$("#blk" + x).css('width', '600px');

						if(y.length == 0){
							$("#"+x+" th").hide()
						}
					}
				});
			});
			var alertC = function() {
				var $topLoader = $("#status").percentageLoaders({
					width : 100,
					height : 100,
					controllable : true,
				});
				var topLoaderRunning = false;
				if (topLoaderRunning) {
					return;
				}
				topLoaderRunning = true;
				$topLoader.setProgress("状态", seriry[0]);
			}
			var perFC = function() {
				var $topLoader = $("#performance").percentageLoaders({
					width : 100,
					height : 100,
					controllable : true,
				});
				$topLoader.setProgress('性能', seriry[1]);
			}
			var storageC = function() {
				var $topLoader = $("#security").percentageLoaders({
					width : 100,
					height : 100,
					controllable : true,
				});
				$topLoader.setProgress('安全', seriry[2]);
			}
			var hardwareC = function() {
				var $topLoader = $("#resource").percentageLoaders({
					width : 100,
					height : 100,
					controllable : true,
				});
				$topLoader.setProgress('资源', seriry[3]);
			}

			// *
			setTimeout(alertC, 300);
			setTimeout(perFC, 450);
			setTimeout(storageC, 600);
			setTimeout(hardwareC, 750);
			setTimeout(animateFunc, 900);
			/*
			 * / versionC(); alertC(); perFC(); storageC(); hardwareC();
			 * animateFunc(); //
			 */
			
			if($("#blkSECURITY").height()>350){
				$("#SECURITYC").css("height",300);
			}
			if($("#blkPERFORMANCE").height()>350){
				$("#PERFORMANCEC").css("height",300);
			}
			if($("#blkRESOURCE").height()>350){
				$("#RESOURCEC").css("height",300);
			}
			if($("#blkSTATUS").height()>350){
				$("#STATUSC").css("height",300);
			}

			new PopupLayer({
				trigger : "#security",
				popupBlk : "#blkSECURITY",
				closeBtn : "#close",
				eventType : "mouseover",
				offsets : {
					x : 0,
					y : -15
				}
			});
			new PopupLayer({
				trigger : "#performance",
				popupBlk : "#blkPERFORMANCE",
				closeBtn : "#close",
				eventType : "mouseover",
				offsets : {
					x : 0,
					y : -15
				}
			});
			new PopupLayer({
				trigger : "#resource",
				popupBlk : "#blkRESOURCE",
				closeBtn : "#close",
				eventType : "mouseover",
				offsets : {
					x : 0,
					y : -15
				}
			});
			new PopupLayer({
				trigger : "#status",
				popupBlk : "#blkSTATUS",
				closeBtn : "#close",
				eventType : "mouseover",
				offsets : {
					x : 0,
					y : -15
				}
			});

		});
	});

}