'use strict';
var path        = require('path');
var fs          = require('fs');
var arrayUnique = require('array-unique');
var nomnom      = require('nomnom');
var isdir       = require('is-directory');
var isfile      = require('is-file');
var glob        = require('glob');
var css         = require('css');

module.exports = function(csspath, cb){
	if( isdir.sync( csspath ) ){
		csspath = path.resolve(process.cwd(), csspath);

		csspath = csspath + path.sep + '**' + path.sep + '*.css';
		
		glob(csspath, function(err, paths){
			var colors = [];
			
			paths.forEach(function(path){
				var cssContent = fs.readFileSync(path, 'utf8');
				var ast = css.parse(cssContent, { source: 'source.css' });
				ast.stylesheet.rules.forEach(function(rule){
					rule.declarations && rule.declarations.forEach(function(d){
						if( /#[\d|a-zA-Z]{3,6}/.test(d.value) ){
							var matched = d.value.match(/(#[\d|a-zA-Z]{3,6})/);
							colors.push(matched[1]);
						} else if( /rgba\([\d|\s|,|\.]+?\)/.test(d.value) ){
							var matched = d.value.match(/(rgba\([\d|\s|,|\.]+?\))/);
							colors.push(matched[1]);
						}
					});
				});
			});

			colors = arrayUnique(colors);

			if( typeof cb === 'function' ){
				cb(null, colors);
			}
		});
	} else if( isfile.sync( csspath ) ) {
		csspath = path.resolve(process.cwd(), csspath);

		var cssContent = fs.readFileSync(csspath, 'utf8');
		var ast = css.parse(cssContent, { source: 'source.css' });

		var colors = [];
		ast.stylesheet.rules.forEach(function(rule){
			rule.declarations && rule.declarations.forEach(function(d){
				if( /#[\d|a-zA-Z]{3,6}/.test(d.value) ){
					var matched = d.value.match(/(#[\d|a-zA-Z]{3,6})/);
					colors.push(matched[1])
				} else if( /rgba\([\d|\s|,|\.]+?\)/.test(d.value) ){
					var matched = d.value.match(/(rgba\([\d|\s|,|\.]+?\))/);
					colors.push(matched[1]);
				}
			});
		});

		colors = arrayUnique(colors);
		if( typeof cb === 'function' ){
			cb(null, colors);
		}
	}
}






//var result = css.stringify(ast, { sourcemap: true });
//result.code // string with CSS
//result.map // source map object


//module.exports = function (str, opts) {
//	if (typeof str !== 'string') {
//		throw new TypeError('Expected a string');
//	}

//	opts = opts || {};

//	return str + ' & ' + (opts.postfix || 'rainbows');
//};
