
// cop - filter stream of objects

var Transform = require('stream').Transform
  , key = require('./lib/key.js')

module.exports = function () {
  var args = Array.prototype.slice.call(arguments)
    , first = args[0]
    , fun = typeof first === 'function' ? first : key

  var stream = new Transform({ objectMode:true })

  stream._transform = function write (obj, enc, cb) {
    var value = fun.apply(null, [obj].concat(args))
    if (value !== undefined && value !== null) stream.push(value)
    if (cb) cb()
  }

  // to pipe from fstream
  stream.add = function (entry) {
    if (entry.type === 'File') {
      stream._transform(entry)
    } else {
      entry.on('entry', stream.add)
    }
    return true
  }

  return stream
}
