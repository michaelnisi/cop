# fish - emit value for particular key

[![Build Status](https://secure.travis-ci.org/michaelnisi/fish.png)](http://travis-ci.org/michaelnisi/fish)

## Description

The fish node module emits the value of particular key if its defined on the object written to the stream.

## Usage

    var fish = require('fish')
      , es = require('event-stream')
      , fstream = require('fstream')
      , reader = fstream.Reader({ path:process.cwd() })

    reader.pipe(fish('path')).pipe(es.writeArray(function (err, lines) {
      console.log(lines)
    }))

`fish` returns a readable `Stream` that emits following events:

### Event:'error'

    function (err) {}

Emitted if an error occured.

### Event:'end'

    function () {}

Emitted when the stream ended.

### Event:'data'

    function (data) {}

The 'data' event emits the value of the passed to `fish`. 

## Installation

Install with [npm](http://npmjs.org/):

    npm install fish

## License

[MIT License](https://raw.github.com/michaelnisi/fish/master/LICENSE)
