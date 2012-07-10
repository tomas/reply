var reply = require('./../');

reply.confirm('Are you sure you want to do this?', function(yes){

  if (yes)
    console.log("Then let's get on with it!");
  else
    console.log("Boo. Maybe next time.");

});
