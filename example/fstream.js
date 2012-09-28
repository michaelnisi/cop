var fish = require('fish')
  , es = require('event-stream')
  , fstream = require('fstream')
  , reader = fstream.Reader({ path:process.cwd() })

reader.pipe(fish('path')).pipe(es.writeArray(function (err, lines) {
  console.log(lines)
}))
