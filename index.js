var readline = require('readline');

var confirm = exports.confirm = function(message, callback){

	var question = {
		'reply': {
			type: 'confirm',
			message: message,
			default: 'yes'
		}
	}

	get(question, function(err, answer){
		if(err || (answer.reply !== true && answer.reply !== 'yes')) callback(false);
		else callback(true);
	});

};

var get = exports.get = function(options, callback){

	if(!callback) return; // no point in continuing

	if (typeof options != 'object')
		return callback(new Error("Please pass a valid options object."))

	var answers = {};
	var stdin = process.stdin, stdout = process.stdout;
	var fields = Object.keys(options);

	var close_prompt = function(){
		stdin.pause();
		rl.close();
	}

	var get_default = function(key){
		return typeof options[key] == 'object' ? options[key].default : options[key];
	}

	var guess_type = function(reply){

		if (reply.trim() == '')
			return;
		else if (reply.match(/^(true|y(es)?)$/))
			return true;
		else if (reply.match(/^(false|n(o)?)$/))
			return false;
		else if ((reply*1).toString() === reply)
			return reply*1;

		return reply;
	}

	var validate = function(key, answer){

		if (typeof answer == 'undefined')
			return options[key].allow_empty || typeof get_default(key) != 'undefined';
		else if(regex = options[key].regex)
			return regex.test(answer);
		else if(options[key].options)
			return options[key].options.indexOf(answer) != -1;
		else if(options[key].type == 'confirm')
			return typeof(answer) == 'boolean'; // answer was given so it should be
		else if(options[key].type && options[key].type != 'password')
			return typeof(answer) == options[key].type;

		return true;

	}

	var show_error = function(key){
		var msg = options[key].error ? options[key].error : "Invalid value.\n";
		stdout.write(msg + "\n");
	}

	var show_message = function(key){

		var msg = '';

		if (text = options[key].message)
			msg += text.trim() + ' ';

		if (options[key].options)
			msg += '(options are ' + options[key].options.join(', ') + ')';

		if(msg != '') stdout.write(msg + "\n");
	}

	// taken from commander lib
	var wait_for_password = function(callback){

		var buf = '', mask = '*';

		stdin.on('keypress', function(c, key){

			if (key && key.name == 'enter') {
				console.log();
				stdin.removeAllListeners('keypress');
				stdin.setRawMode(false);
				return callback(buf);
			}

			if (key && key.ctrl && key.name == 'c')
				close_prompt();

			stdout.write(mask);
			buf += c;

		});

	}

	var check_reply = function(index, curr_key, fallback, reply){
		var answer = guess_type(reply);
		var return_answer = (typeof answer != 'undefined') ? answer : fallback;

		if (validate(curr_key, answer))
			next_question(++index, curr_key, return_answer);
		else
			show_error(curr_key) || next_question(index); // repeats current
	}

	var next_question = function(index, prev_key, answer){
		if (prev_key) answers[prev_key] = answer;

		var curr_key = fields[index];
		if (!curr_key) return close_prompt();

		var prompt = (options[curr_key].type == 'confirm') ?
			' - yes/no: ' : " - " + curr_key + ": ";

		var fallback = get_default(curr_key);
		if (typeof(fallback) != 'undefined' && fallback !== '')
			prompt += "[" + fallback + "] ";

		show_message(curr_key);

		if(options[curr_key].type == 'password'){

			var listener = stdin._events.keypress; // to reassign down later
			stdin.removeAllListeners('keypress');

			stdin.setRawMode(true);
			stdout.write(prompt);

			wait_for_password(function(reply){
				stdin._events.keypress = listener; // reassign
				check_reply(index, curr_key, fallback, reply)
			});

		} else {

			rl.question(prompt, function(reply){
				check_reply(index, curr_key, fallback, reply);
			});

		}

	}

	rl = readline.createInterface(stdin, stdout);
	next_question(0);

	rl.on('close', function(){
		close_prompt(); // just in case

		var err, given_answers = Object.keys(answers).length;
		if (fields.length > given_answers)
			err = new Error("Cancelled after giving " + given_answers + " answers.");

			callback(err, answers);
	});

}
