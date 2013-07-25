module.exports = function(debug){

	var funcs = [], fs = require('fs');
	
	global._require = function (fn, isArray, safer){
	
		var ob = {};

		funcs.push([fn, ob]);
		var fin = function(){
			funcs.map(function(arr){
					fs.writeFileSync(arr[0], JSON.stringify(arr[1], null, 4));
			})
			// This appears to ensure we see uncaught exception errors before exit
			setTimeout(process.exit, 0);
		}
	
		if(safer) setInterval(fin, safer);
	
		process.on('exit', function(){
			fin();
		});
	
		return ob;
	}
}
