Reply
=====

Simple way of getting user input in Node.js. Prompt is really awesome but it ships 
with too much stuff I don't really need.

Features
--------

 - Verifies type of response (string, number, boolean), and returns native value.
 - Can check response against regex or array of options.
 - Custom error message for each field, or fallback to 'Invalid value'.
 - Masks password fields with '*', with support for backspace keystrokes.
 - Fields can hold a default value, be marked as required or allow an empty response. 

Install
-------

``` sh
 $ npm install reply
```

Usage
-----

``` js
var reply = require('reply');

var opts = {
  username: {
    message: 'Please type in your username.'
  },
  password: {
    message: 'Password, please.',
    type: "password",
    regex: /(\w{6})/,
    error: "Six chars minimum. Try again."
  }
}

reply.get(opts, function(err, answers){
  console.log(answers);
});
```

Confirm (yes/no)
----------------

``` js
reply.confirm('Are you up for it?', function(err, yes){
  var answer = (!err && yes) ? "That's crack-a-lackin!" : 'Bummer.';
  console.log(answer);
});
```

Credits
-------
Written by Tomás Pollak.

Copyright
-------
(c) 2012 Fork Ltd. MIT license.
