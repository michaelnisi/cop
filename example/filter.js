
// filter - cop properties by name

var cop = require('../')
var stream = require('stream')

var objs = [
  { thing: 'My hovercraft ' },
  { thing: 'is full ' },
  { thing: 'of eels.\n' }
]

var reader = new stream.Readable({ objectMode: true })

reader._read = function () {
  reader.push(objs.shift() || null)
}

reader
  .pipe(cop('thing'))
  .pipe(process.stdout)
