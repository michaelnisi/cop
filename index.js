// cop - filter stream

var through = require('through')
  , key = require('./lib/key.js')
  
module.exports = function () {
  var args = Array.prototype.slice.call(arguments)
    , first = args[0]
    , isFunction = typeof first === 'function'
    , fun = isFunction ? args.shift() : key

  var stream = through(function write (data) {
    var value = fun.apply(null, [data].concat(args))
    if (value) stream.emit('data', value)
    return true
  })

  
  // to use with fstream
  stream.add = function (entry) {
    if (entry.type === 'File') {
      return stream.write(entry)
    } else {
      entry.on('entry', stream.add)
      return true
    }
  }

  return stream
}
