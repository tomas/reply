Reply
=====

Simple way of getting user input. Prompt is really awesome but it ships with too
many stuff I don't really need.

Install
-------

``` sh
 npm install reply
```

``` js
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
reply.get(opts, function(err, answers){
  console.log(answers);
});
```

Credits
-------
Written by Tomás Pollak.

Copyright
-------
(c) 2012 Fork Ltd. MIT license.
