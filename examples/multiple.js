var reply = require('./../');

var bye = function(){
	console.log("Ok, maybe next time.");
}

var get_input = function(){

	reply.confirm('Do you want to do this now?', function(err, yes){

	  if (!err && yes)
	    console.log("Then let's get on with it!");
	  else
	    return console.log("Boo. Maybe next time.");

		reply.get({ email: 'email@mailbox.com', password: { type: 'password'} }, function(err, result){

			if (err) return bye();
			console.log(result);

			reply.confirm('Is this information OK?', function(err, yes){

					if (err || !yes)
						get_input();
					else
						console.log("Great, thanks.")

			})

		})

	});
	
}

get_input();