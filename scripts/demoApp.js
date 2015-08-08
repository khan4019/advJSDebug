var appRoot = 'https://radiant-heat-977.firebaseio.com/';
var myDataRef = new Firebase(appRoot);


myDataRef.on("value", function(response) {
  var data = response.val();
  var chartData = formatChartData(data);
  drawChart(chartData);
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});


var formatChartData = function (data) {
  var retrievedData =[];
  for (var i in data) {
    retrievedData.push(data[i]);
  };

  var dataWithUniqueName = uniquifyNames(retrievedData);

  return [
    {
      key:'unnecessary data',
      values: dataWithUniqueName
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
  $('#addRecord').click(function addRecordHandler() {
    
    var name = $('#name').val();
    var salary = $('#salary').val();
    
    if(!name || !salary){
      showNoDataWarning(name, salary);
      return;
    }

    var newItem = {
      name: name,
      salary: salary
    };

    var pushedItem = myDataRef.push(newItem);

  });

  var lastAdded = document.getElementById("showLast");

  lastAdded.addEventListener("click", function showLastHandler (e) {
    showLastItem();
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


var deleteLast = function deleteLastHandler (items) {
  for(var lastKey in items);
  
  var itemRef = new Firebase(appRoot + '/' + lastKey);
  var item = itemRef.child(lastKey);
  // itemRef.remove(function(error) {
  //   alert(error ? "Uh oh!" : "Success!");
  // });
};

var showLastItem = function () {
  myDataRef.on("value", function(response) {
    var items = response.val();
    for(var lastKey in items);
    displayLastItemDialog(items[lastKey]);
  }, function (error) {
    console.error("Failed to remove: " + error.code);
  });
}

var displayLastItemDialog = function (lastItem) {
    var dlg = $("#dialog-last-item");
    dlg.removeClass('hide');
    $('#showName').text(lastItem.name);
    $('#showSalary').text(d3.format(",.0f")(lastItem.salary));
    dlg.dialog({
      buttons: {
          "Ok" : function () {
              $(this).dialog("close");
          }
      }
  });
}

var showNoDataWarning = function (name, salary) {
 var dlg = $("#dialog-error");
    
  dlg.removeClass('hide');

  toggleErroMessage('#newName', name, "Who the hell you are talking about!");
  toggleErroMessage('#newSalary', salary,"How much that guy make!");

  dlg.dialog({
    width:600,
    buttons: {
        "Ok" : function () {
            $(this).dialog("close");
        }
    }
  }); 
}

function toggleErroMessage(selector, value, msg){
  if(value){
    $(selector+'Line').hide();
  }
  else{
    $(selector+'Line').show();
    $(selector).text(msg);
  }
}

/*
  bad data breaks code. Broken code needs more code to fix.
  and more code means higher job security. So, smile :)
*/

/*
  how it works: 
  we keep track of names in the "names" object. 
  First time we just put in the object. 
  For a new item, if we find the name in the object this means 
  we got a duplicate. 
  we have to add a white space after the current name
  to distinguish it from the previous one

  if we hit the same name again (for the third time). 
  by adding a one more white space will not be enough
  
  Now i am tired of writing comment. 
  Need a coffee break.
*/

var uniquifyNames = function(items){
  var names = {};
  
  return items.map(function (item) {
     
    if(names[item.name]){
      names[item.name] += " ";
      item.name += names[item.name];
      console.count("inside");
    }
    else{
      names[item.name] = "";
    }
    return item;
  });
}