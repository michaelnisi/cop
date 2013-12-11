# cop - filter stream of objects

[![Build Status](https://secure.travis-ci.org/michaelnisi/cop.png)](http://travis-ci.org/michaelnisi/cop) [![David DM](https://david-dm.org/michaelnisi/cop.png)](http://david-dm.org/michaelnisi/cop)

## Description

The cop [Node.js](http://nodejs.org/) module is a [Transform](http://nodejs.org/api/stream.html#stream_class_stream_transform) stream (in object mode) which is configurable to emit specific properties of objects written to it. Furthermore, if provided with a filter function, `cop` can be used to massage data. 

## Usage

### Property value by name
```js    
var cop = require('cop')
  , Readable = require('stream').Readable

var objs = [
  { thing: 'My hovercraft ' }
, { thing: 'is full ' }
, { thing: 'of eels.\n' }
]

var reader = new Readable({ objectMode:true })
  , length = objs.length
  , i = 0

reader._read = function () {
  reader.push(i < length ? objs[i++] : null)
}

reader
  .pipe(cop('thing'))
  .pipe(process.stdout)
```
### Filter function
```js  
var cop = require('cop')
  , fstream = require('fstream')
  , reader = fstream.Reader({ path:process.cwd() })

reader
  .pipe(cop(filter))
  .pipe(process.stdout)

function filter (obj) {
  return obj ? obj['path'] + '\n' : undefined
}
```
## cop(key)

- `key` Name of the property of which to emit the value

Provided a key, `cop` will emit the matching property of an object written to it. If the object has no matching property nothing is emitted.

## cop(filter)

- `filter` Filter function which is applied to each object written to the stream 

Alternatively a filter function can be provided, which is executed before data is emitted, hence, provides an opportunity to massage the data. 

## Installation

[![NPM](https://nodei.co/npm/cop.png)](https://npmjs.org/package/cop)

## License

[MIT License](https://raw.github.com/michaelnisi/cop/master/LICENSE)
