#!/usr/bin/env node

'use strict';
const _ = require( 'lodash' );
const isdir = require( 'is-directory' );
const glob = require( 'glob' );
const path = require( 'path' );
const fs = require( 'fs' );
const chalk = require( 'chalk' );
const csscolors = require( './' );

var csspath = process.argv[ 2 ];

if ( typeof csspath === 'undefined' ){
	throw new Error( 'css path not provided' );
}

extractCssFromPath( csspath, function ( err, colors ) {
	_.each( colors, function ( v ) {
		console.log( chalk.magenta( v.color.replace( /\s/g, '' ) ), '\n    used', chalk.green( v.times ), 'times' );
		_.each( v.where, function ( v, k ) {
			console.log( chalk.gray( '    @line' ), _.map( v, function ( v ) {
				return chalk.green.bgWhite( ' ' + v + ' ' );
			} ).join(' '), chalk.gray( '\n      @file' ), chalk.yellow( k ) );
		} );
	} );
} );

function extractCssFromPath( csspath, cb ) {
	var cwd = process.cwd();

	if ( isdir.sync( csspath ) ){
		cwd = path.resolve( cwd, csspath );
		csspath = path.resolve( cwd, '**/*.?(css)' );
	} else {
		csspath = path.resolve( cwd, csspath );
	}

	glob( csspath, function ( err, paths ) {
		var colors = {};

		paths.forEach( function ( v ) {
			if ( isdir.sync( v ) || path.extname( v ) !== '.css' ) {
				return true;
			}

			var relativepath = path.relative( cwd, v );
			var cssContent = fs.readFileSync( v, 'utf8' );
			var extracted = csscolors( cssContent );

			_.each( extracted, function( v, k ) {
				var tmp = {};
				tmp[ relativepath ] = v;
				extracted[ k ] = tmp;
			} );

			colors = _.merge( colors, extracted, function ( a, b ) {
				return _.assign( a, b );
			} );
		} );

		colors = _.map( colors, function ( v, k ) {
			return {
				color: k,
				where: v,
				times: _.size( _.flattenDeep( _.values( v ) ) ),
			};
		});

		colors = _.sortByOrder( colors, [ 'times', 'color' ], [ 'desc', 'asc' ] );

		if ( typeof cb === 'function' ) {
			cb( null, colors );
		}
	} );
}
