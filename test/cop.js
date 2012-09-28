var test = require('tap').test
  , es = require('event-stream')
  , cop = require('../index.js')
  , fstream = require('fstream')
  , join = require('path').join

test('objects', function (t) {
  var objs = [
    { name: 'Moe' }
  , { name: 'Larry' }
  , { name: 'Curly' }
  , { id: '123' } 
  , null
  , undefined
  ]

  var expected = ['Moe', 'Larry', 'Curly']

  es.readArray(objs)
    .pipe(cop('name'))
    .pipe(es.writeArray(function (err, lines) {
      t.equals(3, lines.length)
      t.deepEquals(lines, expected, 'should be array of names')      
      t.end()
    }))
})

test('fstream', function (t) {
  var path = process.cwd()
    , reader = fstream.Reader({ path:path })
    , paths = [join(path, 'cop.js')]

  reader
    .pipe(cop('path'))
    .pipe(es.writeArray(function (err, lines) {
      t.deepEquals(lines, paths, 'should be paths')   
      t.end()
    }))
})
