# cop - filter stream

[![Build Status](https://secure.travis-ci.org/michaelnisi/cop.png)](http://travis-ci.org/michaelnisi/cop)

## Description

A [through](https://github.com/dominictarr/through) `Stream`, configurable to emit specific properties of objects written to it. Furthermore, if provided with a filter function, `cop` can be used to modulate data. 

## Usage

### Property key

    var cop = require('cop')
      , es = require('event-stream')
      , fstream = require('fstream')
      , reader = fstream.Reader({ path:process.cwd() })

    reader.pipe(cop('path')).pipe(es.writeArray(function (err, paths) {
      console.log(paths)
    }))

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
