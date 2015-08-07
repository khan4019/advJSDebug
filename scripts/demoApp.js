var appRoot = 'https://radiant-heat-977.firebaseio.com/';
var myDataRef = new Firebase(appRoot);


myDataRef.on("value", function(response) {
  drawChart(formatData(response.val()));
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
      values: uniquifyNames(retrievedData)
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
    var newItem = {
      name:$('#name').val(),
      salary:$('#salary').val()
    };

    var pushedItem = myDataRef.push(newItem);

    console.log('pushed', pushedItem);
  });


  $('#deleteLast').on('click', function () {
    myDataRef.on("value", function(response) {
      var items = response.val();
      deleteLast(items);
    }, function (error) {
      console.error("Failed to remove: " + error.code);
    });
  });

});


var deleteLast = function deleteLast (items) {
  for(var lastKey in items);
  
  var itemRef = new Firebase(appRoot + '/' + lastKey);
  var item = itemRef.child(lastKey);
  // itemRef.remove(function(error) {
  //   alert(error ? "Uh oh!" : "Success!");
  // });
};


var uniquifyNames = function(items){
  var names = {};
  
  return items.map(function (item) {
       
    if(names[item.name]){
      item.name += names[item.name];
      names[item.name] += " "; //swap to work
    }
    else{
      names[item.name] = " ";
    }
    return item;
  });
}