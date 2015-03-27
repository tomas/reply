var reply = require('./../');

var bye = function(){
  console.log("Ok, maybe next time.");
}

function get_timezone() {
  var date = new Date();
  return date.getTimezoneOffset();
}

var opts = {
  planet: {
    message: 'What planet are you on?',
    options: ['Earth', 'Mars', 'Jupiter', 'Venus', 'Saturn']
  },
  not_earth_question: {
    message: 'REALLY? How are you connected to the Internet?',
    depends_on: {
      planet: { not: 'Earth' }
    }
  },
  first_question: {
    message: 'Guess the right number. Five options.',
    options: [1,2,3,4,5]
  },
  second_question: {
    message: 'Well done! Now give me the value of pi up to the 8th digit.',
    // regex: /3.14159265/,
    depends_on: {
      first_question: 4,
    }
  },
  you_win: {
    message: 'Impressive. Type your name to enter the Hall of Fame.',
    depends_on: {
      second_question: 3.14159265,
    }
  },
  try_again: {
    message: 'Game over mister. Do you want to start again?',
    type: 'boolean',
    default: true
  }
}

function start() {
  reply.get(opts, function(err, result){
    if (err || !result.try_again)
      bye();
    else
      start();
  })
}

start();
