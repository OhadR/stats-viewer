//var intervalObj = setInterval(callBackend, (1 * 1000));
var intervalOb;

// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
//google.charts.setOnLoadCallback(drawChart);



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

//the expected json from backend:
//  {"com.cellebrite.index.indexer.DumpIndexer": 99,"com.cellebrite.index.indexer.HashClassifier": 99}
function drawBarChart(input) {

	// Create the data table.
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Date');
	data.addColumn('number', '-->');

	for (var key in input){
		var attrName = key;
		var attrValue = input[key];
		data.addRow( [attrName, attrValue] );
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
		
//		callBackend()
		intervalObj = setInterval(callBackend, (1 * 1000));
	});
});

function callBackend()
{
	var items = {};
	
	var requestData = {
		numSamples: 30
	};
	
	$.ajax({
		url: "http://localhost:8080/rest-api/status/getProgress",
		data: requestData,
		type: 'GET',
		dataType: 'text',
		contentType: 'application/json',
		success: function(response, textStatus, jqXHR){
			var marsStats = JSON.parse(response);
//			drawChart( marsStats );
			drawBarChart( marsStats );
		},
		error: function(jqXHR, textStatus, errorThrown){
			alert('error: ' + jqXHR + '; status: ' + status + '; errorThrown: ' + errorThrown);
		}
	});
}

function stopInterval()
{
	window.clearInterval( intervalObj );
}