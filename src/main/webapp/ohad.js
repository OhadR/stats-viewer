//setInterval(getMarsRealtimeStats, (3 * 1000));

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



      
$(document).ready(function() {
				
	$("#submit").click(function(){
		
		var items = {};
		
		var requestData = {
			numSamples: 30
		};
		
		$.ajax({
			url: "/MARS/Rest/System/data/ohads",
			data: requestData,
			type: 'GET',
			dataType: 'text',
			contentType: 'application/json',
			success: function(response, textStatus, jqXHR){
				var marsStats = JSON.parse(response);
				drawChart( marsStats );
			},
			error: function(jqXHR, textStatus, errorThrown){
				alert('error: ' + jqXHR + '; status: ' + status + '; errorThrown: ' + errorThrown);
			}
		});
	});

});