var jsDude = { name: 'that js dude',
					favLib: 'herald washington library',
					favDrink: 'water'
				};

var awesomeDude = { name: 'Mr. awesome',
					favLib: 'awesome library',
					favDrink: 'beer'
				};

var regularDude = { name: 'Who cares',
					favLib: 'hates reading',
					favDrink: 'meetup beer'
				};


//1. log multiple


//2. log multiple objects


//3. add this. http://stackoverflow.com/questions/10224691/output-multi-dimensional-arrays
function getNames(developerData){
	var names =[];

	for(var i = 0; i < developerData.length; i++ ){
		names.push(developerData[i].name);
	}

	return names;
}

getNames(javaScriptDevelopersDataFromServer)

console.log('number of developers', javaScriptDevelopersDataFromServer.length);