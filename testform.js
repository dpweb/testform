#!/usr/bin/env node

// Reference code for the testform protocol in Javascript
// usage: $ node testform <script_file_name>

// Require some stuff
require('colors'); var fs = require('fs');

// cnx.js is a frontend to query several types of dbs, run shell, commands, etc..
var q = require('./cnx.js').query, lines = [], tn = 0;

// anti-db provides a _require command, simply to file save our alias file when the program closes
require('anti-db')();
var aliases = _require('aliases.json');

// read each line in the script
fs.readFile(process.argv[2] || 'script.txt', function(e, s){
    lines = s.toString().split(/\r?\n/);
	docommand(lines.shift());
})

// execute a line in the script
function docommand(s){
	// blank line or comments
	if(!s || s.match(/^\/\//)){
		if(lines.length){
			var x = lines.shift();
			docommand(x);
			return;
		}
		return;
	}
	// evaluate each word on the line
	var cmds = s.match(/(.*?)\s(.*?)\s(.*)$/); cmds.shift(); c=0;
	cmds.forEach(function(cmd){
		cmds[c++] = aliases[cmd] || cmd;
	})

	if(cmds[0].match(/^alias/)){
		// create an alias
		aliases[cmds[1]] = cmds[2];
	} else {
		// run a command
		var display = ('test' + ++tn);
		q(cmds[0], cmds[1], function(e, r){
			if(e) throw e;
			var fns = cmds[2];
			// create evaluator
			if(fns){
				var fn = new Function('var r = arguments[0];'+fns);
				var test_result = fn(r);
				// show result on console
				display += ': ' + (test_result.success ? 'Success'.green : "Failed".red);
				console.log(display);
				if('undefined' !== typeof(test_result.comment)) console.log(test_result.comment);
			}
		})
	}
	if(lines.length) return docommand(lines.shift());
}

