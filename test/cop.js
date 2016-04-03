var cop = require('../')
var fstream = require('fstream')
var path = require('path')
var stream = require('readable-stream')
var test = require('tap').test

test('filter', function (t) {
  var objs = [
    { name: 'Moe' },
    { name: 'Larry' },
    { name: 'Curly' }
  ]

  var reader = new stream.Readable({ objectMode: true })
  var writer = new stream.Writable({ objectMode: true })

  reader._read = function () {
    reader.push(objs.shift() || null)
  }

  var wanted = ['Moe', 'Larry', 'Curly']
  var found = []

  writer._write = function (chunk, enc, cb) {
    found.push(chunk)
    cb()
  }

  reader
    .pipe(cop('name'))
    .pipe(writer)
    .on('finish', function () {
      t.deepEquals(found, wanted, 'should be names')
      t.end()
    })
})

test('types', { skip: false }, function (t) {
  var objs = [
    { thing: 'Moe' },
    { thing: 1 },
    { thing: -1 },
    { thing: true },
    { thing: false },
    { thing: null },
    { thing: undefined },
    { thing: {} },
    { thing: [] }
  ]

  var wanted = ['Moe', 1, -1, true, false, {}, []]
  var found = []
  var reader = new stream.Readable({ objectMode: true })
  var writer = new stream.Writable({ objectMode: true })

  reader._read = function () {
    reader.push(objs.shift() || null)
  }

  writer._write = function (chunk, enc, cb) {
    found.push(chunk)
    cb()
  }

  reader
    .pipe(cop('thing'))
    .pipe(writer)
    .on('finish', function () {
      t.deepEquals(found, wanted, 'should be things')
      t.end()
    })
})

test('transform', { skip: false }, function (t) {
  var objs = [
    { name: 'moe' },
    { name: 'larry' },
    { name: 'curly' }
  ]

  var reader = new stream.Readable({ objectMode: true })
  var writer = new stream.Writable({ objectMode: true })

  reader._read = function () {
    reader.push(objs.shift() || null)
  }

  var wanted = ['MOE', 'LARRY', 'CURLY']
  var found = []

  writer._write = function (obj, enc, cb) {
    found.push(obj)
    cb()
  }

  var filter = function (obj) {
    return obj ? obj.name.toUpperCase() : undefined
  }

  reader
    .pipe(cop(filter))
    .pipe(writer)
    .on('finish', function () {
      t.deepEquals(found, wanted, 'should be uppercase names')
      t.end()
    })
})

test('fstream', { skip: false }, function (t) {
  var paths = [path.join(__dirname, 'cop.js')]
  var actual = []
  var reader = fstream.Reader({ path: __dirname })
  var writer = new stream.Writable({ objectMode: true })

  writer._write = function (obj, enc, cb) {
    actual.push(obj)
    cb()
  }

  function alphabetically (a, b) {
    return a.localeCompare(b)
  }

  reader
    .pipe(cop('path'))
    .pipe(writer)
    .on('finish', function () {
      paths.sort(alphabetically)
      actual.sort(alphabetically)
      t.deepEquals(actual, paths, 'should be paths')
      t.end()
    })
})
