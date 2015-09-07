# css-colors


## Install

```
$ npm install --save csscolors
```


## Usage

```js
var csscolors = require('csscolors');

csscolors('css/foo.css', function(err, colors){
	//extract colors from file
});
```

```js
var csscolors = require('csscolors');

csscolors('css/', function(err, colors){
	//extract colors from directory
});
```


## API

### csscolors(filepath, callback)

#### filepath
Type: `string`


#### callback

Type: `function`  



## CLI

```
$ npm install --global csscolors
```

```
$ csscolors --help

  Usage: node cli.js [options]

  Options:
    -f, --file   select a css file to parse
```


## License

MIT © [fengzilong](https://github.com/fengzilong)
