var reply = require('./../');

reply.confirm('Are you sure you want to do this?', function(err, yes){

  if (!err && yes)
    console.log("Then let's get on with it!");
  else
    console.log("Boo. Maybe next time.");

});
