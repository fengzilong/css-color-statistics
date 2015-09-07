#!/usr/bin/env node
'use strict';
var nomnom      = require('nomnom');
var csscolors   = require('./')

var opts = nomnom.option('file', {
		abbr: 'f',
		help: 'select a css file to parse'
	})
	.parse();

var csspath = '';

if( typeof opts[0] !== 'undefined' ){
	csspath = opts[0];
} else if( opts.file ){
	csspath = opts.file;
}

if( typeof csspath === 'undefined' ){
	return;
}

csscolors(csspath, function(err, colors){
	if(err){
		return;
	}

	console.log(colors.join(' '));
});