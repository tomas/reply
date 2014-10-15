var reply = require('./../');

var bye = function(){
  console.log("Ok, maybe next time.");
}

function get_timezone() {
  var date = new Date();
  return date.getTimezoneOffset();
}

var opts = {
  country: {
    message: 'Tell me your country name'
  },
  timezone: {
    message: 'What timezone are you in?',
    default: get_timezone
  }
}

reply.get(opts, function(err, result){
  if (err) return bye();

  console.log(result);
})
