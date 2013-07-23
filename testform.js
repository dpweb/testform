#!/usr/bin/env node

// Reference code for the testform protocol in Javascript
// usage: $ node testform <script_file_name>

// Require some stuff
require('colors'); var fs = require('fs');

// cnx.js is a frontend to query several types of dbs, run shell, commands, etc..
var q = require('./cnx.js').query;

// anti-db provides a _require command, simply to file save our alias file when the program closes
require('anti-db')();
var aliases = _require('aliases.json');

// read each line in the script
fs.readFile(process.argv[2], function(e, s){
        tn = 0;
	var lines = s.toString().split(/\r?\n/);
	lines.forEach(function(line){
		docommand(line);
	})
})

// see if an alias exists
function checkAlias(s){
	return aliases[s] || s;
}

// execute a line in the script
function docommand(s){
	
	// blank line or comments
	if(!s || s.match(/^\/\//)) return;

	// evaluate each word on the line
	var cmds = s.split(' ');
	cmds[0] = checkAlias(cmds[0]); cmds[1] = checkAlias(cmds[1]); cmds[2] = checkAlias(cmds[2]);

	if(cmds[0].match(/^alias/)){
		// create an alias
		cmds.shift();
		aliases[cmds.shift()] = cmds.join(' ');
	} else {
		// run a command
		var display = ('test' + ++tn);
		q(cmds.shift(), cmds.shift(), function(e, r){
			if(e) throw e;
			var fns = cmds.join('');
			// create evaluator
			var fn = new Function('var r = arguments[0];'+fns);
			var test_result = fn(r);
			// show result on console
			display += ': ' + (test_result.isSuccess ? 'Success'.green : "Failed".red);
			console.log(display)
			if('undefined' !== typeof(test_result.Comment)) console.log(test_result.Comment);
		})
	}
}

