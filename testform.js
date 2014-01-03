#!/usr/bin/env node

// Reference code for the testform protocol in Javascript
// usage: $ node testform <script_file_name>

// Require some stuff
require('colors'); var fs = require('fs');

// cnx.js is a frontend to query several types of dbs, run shell, commands, etc..
var q = require('./cnx.js').query, lines = [], tn = 0;

var adb = require('anti-db')();
var aliases = adb.obj('./aliases.json');

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

		if(cmds[0].match(/^alias/)){
			cmds.shift();
			aliases[cmds.shift()] = cmds.splice(0, 1).join(' ');
			if(lines.length) return docommand(lines.shift());
			return;
		}

		// run a command
		var display = ('test' + ++tn);
		q(aliases[cmds[0]] || cmds[0], aliases[cmds[1]] || cmds[1], function(r){
			var fns = aliases[cmds[2]] || cmds[2];
			if(fns){
				var fn = new Function('var r = arguments[0];'+fns);
				var test_result = fn(r);
				// show result on console
				display += ': ' + (test_result.success ? 'Success'.green : "Failed".red);
				console.log(display);
				if('undefined' !== typeof(test_result.comment)) console.log(test_result.comment);
			}
		})

	if(lines.length) return docommand(lines.shift());
}

