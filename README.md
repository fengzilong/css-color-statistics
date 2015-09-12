# css-colors


## Install

```
$ npm install --save csscolors
```


## Usage

```js
var csscolors = require('csscolors');

csscolors('body {background-color: #F2F2F2;}', function(colors){
	/*colors will be an array like
		[
			{
				color: '#F2F2F2',
				line: '1'
			}
		]
	*/
});
```


## API

### csscolors(cssContent, callback)

* `cssContent` {String}
* `callback` {Function}
  * `colors` {Array} contains color and its line number


### CLI

```
$ npm install --global csscolors
```

```
$ csscolors ./
$ csscolors path/to/css/file.css
```


### CLI Example
```
$ csscolors ./
```
![](snapshot.png)


## License

MIT © [fengzilong](https://github.com/fengzilong)
