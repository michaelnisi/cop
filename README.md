# cop - emit value for particular key

[![Build Status](https://secure.travis-ci.org/michaelnisi/cop.png)](http://travis-ci.org/michaelnisi/cop)

## Description

The cop node module emits the values for particular key if its defined on the object written to the stream.

## Usage

    var cop = require('cop')
      , es = require('event-stream')
      , fstream = require('fstream')
      , reader = fstream.Reader({ path:process.cwd() })

    reader.pipe(cop('path')).pipe(es.writeArray(function (err, lines) {
      console.log(lines)
    }))

`cop` returns a readable `Stream` that emits following events:

### Event:'error'

    function (err) {}

Emitted if an error occured.

### Event:'end'

    function () {}

Emitted when the stream ended.

### Event:'data'

    function (data) {}

The 'data' event emits the value of the property matching the key passed to `cop`. 

## Installation

Install with [npm](http://npmjs.org/):

    npm install cop

## License

[MIT License](https://raw.github.com/michaelnisi/cop/master/LICENSE)
