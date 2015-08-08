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

  lastAdded.addEventListener("click", function showLastAdded (e) {
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


var deleteLast = function deleteLast (items) {
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