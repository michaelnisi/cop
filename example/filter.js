
// filter - cop properties by name

var cop = require('../')
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
