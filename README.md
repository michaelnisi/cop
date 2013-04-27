# cop - filter stream of objects

[![Build Status](https://secure.travis-ci.org/michaelnisi/cop.png)](http://travis-ci.org/michaelnisi/cop)

## Description

A [Transform](http://nodejs.org/docs/latest/api/stream.html#stream_class_stream_transform) `Stream` configurable to emit specific properties of objects written to it. Furthermore, if provided with a filter function, `cop` can be used to modulate data. 

## Usage

### Property value by name
    
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

### Filter function
    
    var cop = require('cop')
      , fstream = require('fstream')
      , reader = fstream.Reader({ path:process.cwd() })

    reader.pipe(cop(filter)).pipe(process.stdout)

    function filter (obj) {
      return obj ? obj['path'] + '\n' : undefined
    }

## Signature

### cop(key)

Provided a key, `cop` will emit the matching property of an object written to it. If the object has no matching property nothing is emitted.

### cop(filter)

Alternatively a filter function can be provided, which is executed before data is emitted, hence, provides an opportunity to massage the data. 

## Events

See [Stream](http://nodejs.org/api/stream.html)

## Installation

Install with [npm](http://npmjs.org/):

    npm install cop

## License

[MIT License](https://raw.github.com/michaelnisi/cop/master/LICENSE)
