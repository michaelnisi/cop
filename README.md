# cop - modify object stream

The **cop** [Node.js](http://nodejs.org/) package offers a `Transform` stream to conventiently cop data from object streams.

[![Build Status](https://secure.travis-ci.org/michaelnisi/cop.svg)](http://travis-ci.org/michaelnisi/cop)

## Creating a Cop Object

Use `require('cop')` to get a `function` that returns a `Transform` stream, configured in object mode, to which you can write arbitrary data. This constructor function takes either a `String` or a `function` as its sole argument.

## Emitting Named Properties

Specify a `String` to select a property, and the **cop** stream will emit the values of matching properties for all objects written to it. If an object doesn't have a property with this name, or the property's value is `null`, **the stream doesn't end**, but just skips the object and moves on the next.

### cop (key)

- `key` The name of the property of which to emit the value.

```js
var cop = require('cop')
var stream = require('stream')

var objs = [
  { name: 'Moe' },
  { name: 'Larry' },
  { name: 'Curly' }
]

var stooges = new stream.Readable({ objectMode: true })
stooges._read = function () {
  stooges.push(objs.shift() || null)
}

stooges
  .pipe(cop('name'))
  .pipe(process.stdout)
```

## Transforming Objects

To apply custom transformations to each object, you can supply your own synchronous map `function`, which is applied with each object and is expected to return an arbitrary object to be emitted by the **cop** stream. If you want to skip the current object, you can return `null` or `undefined`—**the stream won't stop**. For asynchronous work, of course, you should write your own stream.

### cop (map)

- `map` A `function` which is applied to each object written to the stream.

The following use case, streaming file entries with [fstream](https://github.com/npm/fstream) and emitting just the filenames, filtering out directories; is the origin of this module. The filtering happens internally btw, sorry about that. But you get the point, you can do anything you want in the map `function`.

```js
var cop = require('cop')
var fstream = require('fstream')

function map (obj) {
  return obj ? obj['path'] + '\n' : undefined
}

fstream.Reader({ path: __dirname })
  .pipe(cop(map))
  .pipe(process.stdout)
```

## Installing Cop

With [npm](https://npmjs.org/package/cop) do:

```
$ npm install cop
```

## License

[MIT License](https://raw.github.com/michaelnisi/cop/master/LICENSE)
