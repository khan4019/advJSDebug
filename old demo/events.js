




var el = document.getElementById('myInput');

el.addEventListener('click', function (e) {
	console.log('clicked: ', new Date(e.timeStamp));
})

el.addEventListener('focus', function (e) {
	console.log('foused at:', new Date(e.timeStamp));
});

el.addEventListener('keyup', function (e) {
	console.log('key up at:', new Date(e.timeStamp));
});


// $('#myInput').on('mouseover', function(){
// 	console.log('jquery mouseover');
// });

$('#myButton').on('click', function(){
	console.log('button clicked');
});