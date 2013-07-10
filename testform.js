#!/usr/bin/env node

// Reference code for the testform protocol

require('colors'); var q = require('./cnx.js').query, fs = require('fs'); require('anti-db')();

var aliases = _require('aliases.json');

fs.readFile(process.argv[2], function(e, s){
  tn = 0;
	var lines = s.toString().split(/\r?\n/);
	lines.forEach(function(line){
		docommand(line);
	})
})

function checkAlias(s){
	return aliases[s] || s;
}

function docommand(s){
	if(!s) return;

	var cmds = s.split(' ');
	cmds[0] = checkAlias(cmds[0]); cmds[1] = checkAlias(cmds[1]); cmds[2] = checkAlias(cmds[2]);

	if(cmds[0].match(/^alias/)){
		cmds.shift();
		aliases[cmds.shift()] = cmds.join(' ');
	} else {
		var display = ('test' + ++tn);
		q(cmds.shift(), cmds.shift(), function(e, r){
			if(e) throw e;
			var fns = cmds.join('');
			var fn = new Function('var ret = arguments[0];'+fns);
			var test_result = fn(r);
			display += ': ' + (test_result.isSuccess ? 'Success'.green : "Failed".red);
			console.log(display)
			if('undefined' !== typeof(test_result.Comment)) console.log(test_result.Comment);
		})
	}
}

