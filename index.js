
// cop - filter stream of objects

var Transform = require('stream').Transform

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
  // fstream adapter
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

function key (obj, key) {
  return (obj && obj.hasOwnProperty(key)) ? obj[key] : undefined
}
