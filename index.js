
// cop - filter stream

var Transform = require('stream').Transform
  , key = require('./lib/key.js')

module.exports = function () {
  var args = Array.prototype.slice.call(arguments)
    , first = args[0]
    , isFunction = typeof first === 'function'
    , fun = isFunction ? args.shift() : key

  var stream = new Transform({ objectMode:true })

  stream._transform = function (obj, encoding, callback) {
    var value = fun.apply(null, [obj].concat(args))
    if (value) stream.push(value)
    callback()
  }

  // to use with fstream
  stream.add = function (entry) {
    if (entry.type === 'File') {
      return stream._transform(entry)
    } else {
      entry.on('entry', stream.add)
      return true
    }
  }

  return stream
}
