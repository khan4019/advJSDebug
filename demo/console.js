

function getNames(developerData){
	var names =[];

	for(var i = 0; i < developerData.length; i++ ){
		names.push(developerData[i].name);
	}

	return names;
}

getNames(javaScriptDevelopersDataFromServer)

console.log('number of developers', javaScriptDevelopersDataFromServer.length);