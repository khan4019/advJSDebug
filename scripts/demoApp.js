
var myDataRef = new Firebase('https://radiant-heat-977.firebaseio.com/');


myDataRef.on("value", function(snapshot) {
  drawChart(formatData(snapshot.val()));
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


var formatData = function (data) {
  var retrievedData =[];
  for (var i in data) {
    retrievedData.push(data[i]);
  };

  return [
    {
      key:'unnecessary data',
      values: retrievedData
    }
  ];
}



var drawChart = function drawChart (data) {
  nv.addGraph(function() {
    var chart = nv.models.discreteBarChart()
        .x(function(d) { return d.name })   
        .y(function(d) { return parseFloat(d.salary) })
        .staggerLabels(true)
        ;

    d3.select('#chart svg')
        .datum(data)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
  });
}



//save new item
$(document).ready(function(){
  $('#addRecord').click(function () {
    myDataRef.push({
      name:$('#name').val(),
      salary:$('#salary').val()
    }, function (error) {
      console.log(error);
    });
  });
});