Reply
=====

Simple way of getting user input. Prompt is really awesome but it ships with too
many stuff I don't really need.

````
  var reply = require('reply');
  var opts = {
    username: {
      message: 'Please type in your username.'
    },
    password: {
      message: 'Password, please.',
      type: "password",
      regex: /(\w{6}/,
      error: "Six chars minimum. Try again."
    }
  }
  reply.get(options, function(err, answers){
    console.log(answers);
  });
````

(c) 2012 Tomás Pollak for Fork Ltd. MIT license.
