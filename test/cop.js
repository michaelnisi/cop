var test = require('tap').test
  , cop = require('../')
  , fstream = require('fstream')
  , join = require('path').join
  , Readable = require('stream').Readable
  , Writable = require('stream').Writable

test('filter', function (t) {
  var objs = [
    { name: 'Moe' }
  , { name: 'Larry' }
  , { name: 'Curly' }
  ]

  var expected = ['Moe', 'Larry', 'Curly']
    , actual = []
    , reader = new Readable({ objectMode:true })
    , writer = new Writable({ objectMode:true })

  reader._read = function () {
    reader.push(objs.shift())
  }

  writer._write = function (chunk, enc, callback) {
    actual.push(chunk)
    callback()
  }

  reader
    .pipe(cop('name'))
    .pipe(writer)
    .on('finish', function (err, lines) {
      t.equals(3, actual.length)
      t.deepEquals(actual, expected, 'should be array of names')
      t.end()
    })
})

test('types', function (t) {
  t.end()
  var objs = [
    { thing: 'Moe' }
  , { thing: 1 }
  , { thing: -1 }
  , { thing: true }
  , { thing: false }
  , { thing: null }
  , { thing: undefined }
  , { thing: {} }
  , { thing: [] }
  , null
  , undefined
  ]

  var expected = ['Moe', 1, -1, true, false, {}, []]
    , actual = []
    , reader = new Readable({ objectMode:true })
    , writer = new Writable({ objectMode:true })
    , i = 0

  reader._read = function () {
    reader.push(i < objs.length ? objs[i++] : null)
  }

  writer._write = function (chunk, enc, cb) {
    actual.push(chunk)
    cb()
  }

  reader
    .pipe(cop('thing'))
    .pipe(writer)
    .on('finish', function (err, lines) {
      t.equals(7, actual.length)
      t.deepEquals(actual, expected, 'should be expected values')
      t.end()
    })
})

test('transform', function (t) {
  var objs = [
    { name:'moe' }
  , { name:'larry' }
  , { name:'curly' }]

  var expected = ['MOE', 'LARRY', 'CURLY']
    , actual = []
    , reader = new Readable({ objectMode:true })
    , writer = new Writable({ objectMode:true })
    , i = 0

  reader._read = function () {
    reader.push(i < objs.length ? objs[i++] : null)
  }

  writer._write = function (obj, enc, cb) {
    actual.push(obj)
    cb()
  }

  var filter = function (obj) {
    return obj ? obj.name.toUpperCase() : undefined
  }

  reader
    .pipe(cop(filter))
    .pipe(writer)
    .on('finish', function () {
      t.equals(3, actual.length)
      t.deepEquals(actual, expected, 'should be array of uppercase names')
      t.end()
    })
})

test('fstream', function (t) {
  var path = process.cwd()
    , paths = [join(path, 'cop.js'), join(path, 'key.js')]
    , actual = []
    , reader = fstream.Reader({ path:path })
    , writer = new Writable({ objectMode:true })

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
