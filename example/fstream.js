
// fstream - pipe recursive paths

var cop = require('../')
var fstream = require('fstream')

var reader = fstream.Reader({ path: __dirname })

function filter (obj) {
  return obj ? obj['path'] + '\n' : undefined
}

reader.pipe(cop(filter)).pipe(process.stdout)
