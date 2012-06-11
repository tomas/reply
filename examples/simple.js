var options = {
	computer_type: 'laptop',
	operating_system: 'linux'
}

var reply = require('./..');

reply.get(options, function(err, answers){
	console.log("\nResults:");
	console.log(answers);
});
