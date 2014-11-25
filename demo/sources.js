//1. open a file ctrl


//2. Find something


//3. replace something


//4. filter function

//5. break point


//5.1 add breakpoint

//5.2 conditional break point

//5.3 short cuts
//disable breakpoints, pause on error

function square(x){

	if(!isValidNumber(x))
		return NaN;

	var sqr = x * x;
	return sqr;
}

function cube(x){

	if(!isValidNumber(x))
		return NaN;


	var sqr = 0;
	sqr = square(x);
	var cub = x * sqr;

	return cub;
}




function isValidNumber(x){
	if(typeof x == 'number'){
		return true;
	}
	else{
		console.error('please insert a number');
		return false;
	}
}


//6. Live Edit and execute

//7. local modification

//8.watch expression

//9. call stack

//10. scope variables

//need to explore

//11. DOM breakpoints


//12. XHR BreakPooints

//13. Event Listener Breakpoints


/************SNIPPET**************/

//1. what is the use of snippet


//2. create, edit and save

// execute

//execute a selected snippet


function counter(){

	var i = 0; 

	return function(){
		return i++;
	}
}

var firstCounter = counter();

function unIntendedGlobal(){
	var a = 5;
		b = 20;

	var sum = a + b;

	return sum;
}



//dom breakpoints
function appendChildButtonClicked() {
  var parentElement = document.getElementById("parent");
  var childElement = document.createElement("h3");
  childElement.className = "text-success";
  childElement.textContent = "Child Element";
  parentElement.appendChild(childElement);
}


function changeAttributeButtonClicked(){
	var parentElement = document.getElementById("parent");
	parentElement.style.borderColor = '#' + Math.random().toString(16).substring(2, 8);
}

function removeChildButtonClicked(){
	var parentElement = document.getElementById("parent");

	var numberOfChildren = parentElement.childNodes.length;

	if(numberOfChildren > 2){
		var lastChild = parentElement.childNodes[numberOfChildren - 1];
		parentElement.removeChild(lastChild);
	}
}