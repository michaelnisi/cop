// cop - emit value for particular key

module.exports = cop

var Stream = require('stream').Stream

function cop (key) {
  var stream = new Stream()

  stream.readable = true
  stream.writable = true

  stream.write = function (obj) {
    if (!obj) return
    var value = obj[key]
    if (value) stream.emit('data', value)
  }
  
  // fstream
  stream.add = stream.write

  stream.end = function () {
    stream.emit('end')
  }

  return stream
}
