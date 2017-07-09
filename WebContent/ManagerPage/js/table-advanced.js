  function overView(){
        var table = $('#viewtable');

        /* Table tools samples: https://www.datatables.net/release-datatables/extras/TableTools/ */

        /* Set tabletools buttons and button container */
        $.extend(true, $.fn.DataTable.TableTools.classes, {
            "container": "btn-group tabletools-dropdown-on-portlet",
            "buttons": {
                "normal": "btn btn-sm default",
                "disabled": "btn btn-sm default disabled"
            },
            "collection": {
                "container": "DTTT_dropdown dropdown-menu tabletools-dropdown-menu"
            }
        });
        
        function fnFormatDetails(oTable, nTr) {
            var aData = oTable.fnGetData(nTr);
            var sOut = '<table>';
            sOut += '<tr><td>Platform(s):</td><td>' + aData[2] + '</td></tr>';
            sOut += '<tr><td>Engine version:</td><td>' + aData[3] + '</td></tr>';
            sOut += '<tr><td>CSS grade:</td><td>' + aData[4] + '</td></tr>';
            sOut += '<tr><td>Others:</td><td>Could provide a link here</td></tr>';
            sOut += '</table>';

            return sOut;
        }

        
        
        var oTable = table.dataTable({

            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "无数据",
                "info": "_START_ ~ _END_    共 _TOTAL_ 条记录",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "显示_MENU_ 条",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },

            "order": [
                [0, 'asc']
            ],
            
            "lengthMenu": [
                [5, 15, 20,30, -1],
                [5, 15, 20, 30,"All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 10,

            "ajax": {
                "url": "Home_Table_DB2Overview", // ajax source
                "dataSrc": "db2overview",
            },
        	"createdRow": function (row, data, index) {
        		
        		
        		$('td', row).eq(0).html("<span class=\"row-details row-details-close\"></span>");
        		$('td', row).eq(1).html("<a href=\"./dbmon_basicinfo.html?dbid="+data[0]+"\">"+data[1]+"</a>");
        		$('td', row).eq(2).html("<a href=\"#\"  data-toggle=\"modal\" data-target=\"#myModal\">"+data[2]+"</a>");
        		if(data[3] == "停止") {
        			$('td',row).eq(3).html("<span class=\"label label-danger\">"+"问题"+"</span>");
        		} else if (data[3] == "na") {
        			$('td',row).eq(3).html("<span class=\"label label-warning\">"+"未知"+"</span>");
        		} else if (data[3] == "运行中") {
        			$('td',row).eq(3).html("<span class=\"label label-success\">"+"运行"+"</span>");
        		}
        		if(data[4] == "Y") {
        			$('td',row).eq(4).html("<span class=\"label label-success\" >"+"开"+"</span>");
        		} else if (data[4] == "N") {
        			$('td',row).eq(4).html("<span class=\"label label-warning\">"+"关"+"</span>");					
        		} 
        		$('td', row).eq(9).html("<a href=\"./dbmon_alert.html?dbid="+data[0]+"\"><span class=\"label label-danger\">"+data[9]+"</span></a>");		
        		$('td', row).eq(10).html("<a href=\"./dbmon_alert.html?dbid="+data[0]+"\"><span class=\"label label-warning\">"+data[10]+"</span></a>");	
        		$('td', row).eq(11).html("<a href=\"./dbmon_alert.html?dbid="+data[0]+"\"><span class=\"label label-default\">"+data[11]+"</span></a>");	
        	}	
            ,
            

            "dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r><'table-scrollable't><'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>", // horizobtal scrollable datatable

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row' <'col-md-12'T>><'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "tableTools": {
                "sSwfPath": "assets/global/plugins/datatables/extensions/TableTools/swf/copy_csv_xls_pdf.swf",
                "aButtons": [{
                    "sExtends": "pdf",
                    "sButtonText": "PDF"
                }, {
                    "sExtends": "csv",
                    "sButtonText": "CSV"
                }, {
                    "sExtends": "xls",
                    "sButtonText": "Excel"
                }, {
                    "sExtends": "print",
                    "sButtonText": "Print",
                    "sInfo": 'Please press "CTR+P" to print or "ESC" to quit',
                    "sMessage": "Generated by DataTables"
                }]
            }
            
        });

        var tableWrapper = $('#sample_1_wrapper'); // datatable creates the table wrapper by adding with id {your_table_jd}_wrapper

        tableWrapper.find('.dataTables_length select').select2(); // initialize select2 dropdown
        
        table.on('click', ' tbody td .row-details', function () {
            var nTr = $(this).parents('tr')[0];
            if (oTable.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                $(this).addClass("row-details-close").removeClass("row-details-open");
                oTable.fnClose(nTr);
            } else {
                /* Open this row */
                $(this).addClass("row-details-open").removeClass("row-details-close");
                oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr), 'details');
            }
        });
        
    }