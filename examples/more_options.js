var fs = require('fs');
var reply = require('./..');
var options = JSON.parse(fs.readFileSync(__dirname + '/options.json').toString());

reply.get(options, function(err, answers){
  console.log('\n ==== Replies:\n');
  if (err) console.log(err);
  console.log(answers);
});
