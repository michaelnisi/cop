# cop - filter stream

[![Build Status](https://secure.travis-ci.org/michaelnisi/cop.png)](http://travis-ci.org/michaelnisi/cop)

## Description

The cop module is a [through](https://github.com/dominictarr/through) stream that can be configured to emit specific properties of objects written to it. Furthermore, if provided with a filter function, it can be used to modulate data. 

## Usage

### Property key (default)

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

Provided a key, cop will emit the value of this key an object written to it. If the object has no matching property nothing will be emitted.

### cop(filter)

Alternatively a filter function can be provided, which is executed before data is emitted, hence, provides an opportunity to massage the data. 

## Events

See [Stream](http://nodejs.org/api/stream.html)

## Installation

Install with [npm](http://npmjs.org/):

    npm install cop

## License

[MIT License](https://raw.github.com/michaelnisi/cop/master/LICENSE)
