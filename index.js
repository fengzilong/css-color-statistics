'use strict';
var css = require('css');
var _   = require('lodash');

function extractCssColors(cssContent){
	var colors = [],
		ast;

	try {
		ast = css.parse(cssContent);
	} catch(e) {
		return [];
	}
	
	ast.stylesheet.rules.forEach(function(rule){
		rule.declarations && rule.declarations.forEach(function(d){
			if( /#[\d|a-zA-Z]{3,6}/.test(d.value) ){
				var matched = d.value.match(/(#[\d|a-zA-Z]{3,6})/);
				colors.push({
					color: matched[1],
					line: d.position.start.line
				});
			} else if( /rgba\([\d|\s|,|\.]+?\)/.test(d.value) ){
				var matched = d.value.match(/(rgba\([\d|\s|,|\.]+?\))/);
				colors.push({
					color: matched[1],
					line: d.position.start.line
				});
			}
		});
	});

	var uniqcolors = _.unique(_.pluck(colors, 'color'));
	var colordetails = {};

	_.each(uniqcolors, function(v, k){
		var lines = _.pluck(_.filter(colors, {color: v}), 'line');
		colordetails[v] = lines;
	});

	return colordetails;
}

module.exports = extractCssColors;
