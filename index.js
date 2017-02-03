'use strict';
const css = require( 'css' );
const _ = require( 'lodash' );

function extractCssColors( cssContent ) {
	var colors = [];
	var ast;

	try {
		ast = css.parse( cssContent );
	} catch ( e ) {
		return [];
	}

	ast.stylesheet.rules.forEach( function ( rule ) {
		if ( rule.declarations ) {
			rule.declarations.forEach( function ( d ) {
				var matched;
				if ( /#[\d|a-zA-Z]{3,6}/.test( d.value ) ) {
					matched = d.value.match( /(#[\d|a-zA-Z]{3,6})/ );
					colors.push( {
						color: matched[ 1 ],
						line: d.position.start.line
					} );
				/*eslint-disable*/
				} else if ( /rgba\([\d|\s|,|\.]+?\)/.test( d.value ) ) {
					matched = d.value.match( /(rgba\([\d|\s|,|\.]+?\))/ );
					/*eslint-enable*/
					colors.push( {
						color: matched[ 1 ],
						line: d.position.start.line
					} );
				}
			} );
		}
	} );

	var uniqcolors = _.unique( _.pluck( colors, 'color' ) );
	var colordetails = {};

	_.each( uniqcolors, function ( v ) {
		var lines = _.pluck( _.filter( colors, { color: v } ), 'line' );
		colordetails[ v ] = lines;
	} );

	return colordetails;
}

module.exports = extractCssColors;
