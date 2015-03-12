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

    npm install reply

Usage
-----

``` js
var reply = require('reply');

var opts = {
  username: {
    message : 'Please type in your username.'
  },
  password: {
    message : 'Password, please.',
    type    : 'password',
    regex   : /(\w{6})/,
    error   : 'Six chars minimum. Try again.'
  },
  country: {
    message : 'Where are you now?',
    default : get_country // fills default with return value
  },
  zip_code: {
    message : 'Please enter your ZIP code.',
    depends_on: {
      country: 'US'
    }
  }
}

function get_country(answers) {
  // answers contains the values given up to this point.
  if (answers.username == 'billgates')
    return 'US';
  else // we'll simply guess it from the LANG variable
    return process.env.LANG.split(/_|\./)[1]; 
}

reply.get(opts, function(err, answers) {
  console.log(answers); 
  /* { username: 'billgates',
       password: '123456',
       country: 'US',
       zip_code: 0 } */
});
```

Confirm (yes/no)
----------------

``` js
reply.confirm('Are you up for it?', function(err, yes) {
  var answer = (!err && yes) ? "That's crack-a-lackin!" : 'Bummer.';
  console.log(answer);
});
```

Options
-------

 - message : What's displayed when requesting the user's input.
 - default : Default value in case user just presses the enter key. Can be a value or a function that returns a value.
 - depends_on: Key/val object containing the previous answers from which a specific entry depends on. Check the depends-on.js example for a use case.

 - type    : Determines the type of response that is expected to the valid. Possible values are: string, password, number, or boolean.
 - options : Array of elements from which the user is expected to give a valid answer from.
 - regex   : Validates response against the given regex.

You can find a few more use cases in the examples directory.

Credits
-------
Written by Tomás Pollak.

Copyright
-------
(c) Fork Ltd. MIT license.
