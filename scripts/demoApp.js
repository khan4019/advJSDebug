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
  var chartItems = getChartItems(data);

  var dataWithUniqueName = uniquifyNames(chartItems);

  return [
    {
      key:'unnecessary data',
      values: dataWithUniqueName
    }
  ];
}

var getChartItems = function (data) {
  var chartItems =[];
  for (var i in data) {
    chartItems.push(data[i]);
  };

  return chartItems;
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

  loadData(initialCountLisetner);

  $('#addRecord').click(addRecordHandler);

  var lastAdded = document.getElementById("showLast");
  lastAdded.addEventListener("click", function showLastHandler (e) {
    showLastItem();
  });


  document.getElementById("recordCount")
          .addEventListener("click", function recordCountHandler (e) {
            loadData(showRecordCountListener);
          });



});
  

var showRecordCountListener = function () {
  var itemsObj = JSON.parse(this.responseText);
  var chartItems = getChartItems(itemsObj); 
  showRecordCount(chartItems);      
}  

var initialCountLisetner = function () {
  var itemsObj = JSON.parse(this.responseText);
  var chartItems = getChartItems(itemsObj); 
  $('#initial-count').text(chartItems.length); 
}


function addRecordHandler() {
    
    var name = $('#name').val();
    var salary = $('#salary').val();
    
    if(!name || !salary){
      showDataError(name, salary);
      return;
    }

    var newItem = {
      name: name,
      salary: salary
    };

    var pushedItem = myDataRef.push(newItem);

  }

var loadData = function loadData (reqListener) {
  
  var url = "http://khan4019.github.io/advJSDebug/scripts/demoData.json";

  var oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener);
  oReq.open("get", url, true);
  oReq.send();
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

var showDataError = function (name, salary) {
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

var showRecordCount = function (data) {
 var dlg = $("#dialog-record-count");
    
  dlg.removeClass('hide');

  $('#numberOfRecords').text(data.length);

  dlg.dialog({
    buttons: {
        "Ok" : function () {
            $(this).dialog("close");
        }
    }
  }); 
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