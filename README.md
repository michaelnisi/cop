# cop - emit value for particular key

[![Build Status](https://secure.travis-ci.org/michaelnisi/cop.png)](http://travis-ci.org/michaelnisi/cop)

## Description

The node module cop is a Stream that emits specific properties of objects written to it. With filter function, it is utilizable to filter streams. 

## Usage

### Property key (default)

    var cop = require('cop')
      , es = require('event-stream')
      , fstream = require('fstream')
      , reader = fstream.Reader({ path:process.cwd() })

    reader.pipe(cop('path')).pipe(es.writeArray(function (err, lines) {
      console.log(lines)
    }))

### Filter function

    var cop = require('cop')
      , fstream = require('fstream')
      , reader = fstream.Reader({ path:process.cwd() })

    reader.pipe(cop(filter)).pipe(process.stdout)

    function filter (obj) {
      return obj ? obj['path'] + '\n' : undefined
    }

The `cop` function returns a readable [Stream](http://nodejs.org/api/stream.html) that emits following events:

### Event:'error'

    function (err) {}

Emitted if an error occured.

### Event:'end'

    function () {}

Emitted when the stream ended.

### Event:'data'

    function (data) {}

The 'data' event emits the value of the property matching the key passed to `cop` or the value returned by the filter function. 

## Installation

Install with [npm](http://npmjs.org/):

    npm install cop

## License

[MIT License](https://raw.github.com/michaelnisi/cop/master/LICENSE)
