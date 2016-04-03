
// cop - map stream of objects

var stream = require('readable-stream')
var util = require('util')

module.exports = Cop

function map (obj, key) {
  return (obj && obj.hasOwnProperty(key)) ? obj[key] : ''
}

function Cop (opts) {
  if (!(this instanceof Cop)) return new Cop(opts)
  stream.Transform.call(this, { objectMode: true })
  if (typeof opts === 'function') {
    this.map = opts
  } else {
    this.map = map
    this.key = opts
  }
}

util.inherits(Cop, stream.Transform)

Cop.prototype._transform = function (obj, enc, cb) {
  var value = this.map.apply(null, [obj].concat(this.key))
  if (value !== undefined && value !== null) this.push(value)
  if (typeof cb === 'function') cb()
}

// Internal method to stream fstream entries.
Cop.prototype.add = function add (entry) {
  if (entry.type === 'File') {
    var ok = this.write(entry)
    if (!ok) {
      this.once('drain', function () {
        entry.resume()
      })
    }
    return ok
  }
  var me = this
  function onentry (e) {
    me.add(e)
  }
  function onend () {
    entry.removeListener('end', onend)
    entry.removeListener('entry', onentry)
    entry.removeListener('error', onerror)
    me = null
  }
  function onerror (er) {
    me.emit(new Error('cop: ' + er.message))
    onend()
  }
  entry.on('end', onend)
  entry.on('entry', onentry)
  entry.on('error', onerror)
  return true
}
