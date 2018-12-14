//var intervalObj = setInterval(callBackendGetJobProgress, (1 * 1000));
var intervalObj;

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
//google.charts.setOnLoadCallback(drawChart);

google.charts.load('current', {'packages':['table']});

var counter = 0;
var mongoClusterData;
var mongoClusterTable;

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart(input) {

  // Create the data table.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Date');
  data.addColumn('number', 'Bonus(USD)');
  for(i=0; i<input.length; ++i)
  {
	data.addRow( [input[i].key, input[i].value] );
  }
	  
/*  // Set chart options
  var options = {'title':'How Much Pizza I Ate Last Night',
                 'width':400,
                 'height':300};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
*/
  var options = {
          title: 'Bonuses Paid (USD)',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

  var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
  chart.draw(data, options);
}


//OLD: the expected json from backend:
//  {"com.cellebrite.index.indexer.DumpIndexer": 99,"com.cellebrite.index.indexer.HashClassifier": 99}
//the expected json from backend:
//
function drawBarChart(input) {

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Date');
	data.addColumn('number', '-->');
    data.addColumn({type: 'string', role:'style'});

	for (var key in input){
		var attrName = input[key].taskName + ' ' + ' ' + key;
		var attrValue = input[key].progressPercentage;
		var status = input[key].jobDao.status;
		if(status === 'Finished')
			data.addRow( [attrName, attrValue, 'color: #fc0000'] );//red
		else
			data.addRow( [attrName, attrValue, 'color: #0ac900'] );//green
	}


	var options = {
			title: 'Progress',
			bar: {groupWidth: "10%"},
			legend: { position: 'none' },
			hAxis: {
				minValue: 0,	
				maxValue: 100	
			}
	};

	var chart = new google.visualization.BarChart(document.getElementById('barchart_values'));
	chart.draw(data, options);
}



      
$(document).ready(function() {
	$("#submit").click(function(){
		
//		callBackendGetJobProgress()
		intervalObj = setInterval(callBackend, (1 * 1000));
		initMongoClusterStatusTable();
	});
});

function getServerAddress()
{
	var serverAddress;
	var isSecured = $('#server_secured').is(":checked");		//is https (o/w http)
	if(isSecured)
		serverAddress = "https://";
	else
		serverAddress = "http://";
	
	var serverName = $('#server_name').val();
	var serverPort = $('#server_port').val();
	serverAddress += serverName;
//	if(!serverPort)		//checks null, undefuned and empty string (tnx @Slava!)
	serverAddress += ':' + serverPort;		//if 'port' is empty it does not harm (http://host:/rest.. is OK
	return serverAddress;
}

function callBackend()
{
	callBackendGetJobProgress();
	callBackendGetMongoClusterStatus();
}

function callBackendGetJobProgress()
{
	var requestData = {
		numSamples: 30
	};
	
	var serverAddress = getServerAddress();
	
	$.ajax({
		url: serverAddress + "/rest-api/status/getProgress",
		data: requestData,
		type: 'GET',
		dataType: 'text',
		contentType: 'application/json',
		success: function(response, textStatus, jqXHR){
			var marsStats = JSON.parse(response);
//			drawChart( marsStats );
			drawBarChart( marsStats );
			counter = 0;
		},
		error: function(jqXHR, textStatus, errorThrown){
			++counter;
			if(counter % 15 == 0)
				alert('error attempting to reach ' + serverAddress + ', counter=' + counter);
		}
	});
}

function callBackendGetMongoClusterStatus()
{
	var serverAddress = getServerAddress();
	
	$.ajax({
		url: serverAddress + "/rest-api/systemCheck/getMongoHealth",
		type: 'GET',
		dataType: 'text',
		contentType: 'application/json',
		success: function(response, textStatus, jqXHR){
			var clusterStatus = JSON.parse(response);
			updateMongoClusterStatus( clusterStatus );
			counter = 0;
		},
		error: function(jqXHR, textStatus, errorThrown){
			//do something...
		}
	});
}

function stopInterval()
{
	window.clearInterval( intervalObj );
}

function initMongoClusterStatusTable() 
{
    mongoClusterData = new google.visualization.DataTable();
    mongoClusterData.addColumn('string', 'Name');
    mongoClusterData.addColumn('string', 'Status');
    mongoClusterData.addColumn('boolean', 'Primary');

    mongoClusterTable = new google.visualization.Table(document.getElementById('cluster_status_table_div'));
    mongoClusterTable.draw(mongoClusterData, {showRowNumber: true, width: '100%', height: '100%'});
}

function drawTable() 
{
    mongoClusterData = new google.visualization.DataTable();
    mongoClusterData.addColumn('string', 'Name');
    mongoClusterData.addColumn('string', 'Status');
    mongoClusterData.addColumn('boolean', 'Primary');
    mongoClusterData.addRows([
      ['uae-dev-moshe1', 'connected', false],
      ['uae-dev-moshe2', 'connected',  false],
      ['uae-dev-moshe3', 'connected', true],
      ['uae-dev-moshe4', 'connected',  false]
    ]);

    mongoClusterTable = new google.visualization.Table(document.getElementById('cluster_status_table_div'));

    mongoClusterTable.draw(mongoClusterData, {showRowNumber: true, width: '100%', height: '100%'});
}

function updateMongoClusterStatus(clusterStatus) {
	for (var server in clusterStatus){
		var x = mongoClusterData.getFilteredRows([{column: 0, value: 'uae-dev-moshe1'}]);
		var rowIndex = x[0];	//expect a single row with this server name;
		mongoClusterData.setCell(rowIndex, 1, ++counter + '');
	    mongoClusterTable.draw(mongoClusterData, {showRowNumber: true});

	}
}

