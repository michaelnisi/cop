
module.exports = function (obj, key) {
  var value = undefined
  if (obj && obj.hasOwnProperty(key)) {
    value = obj[key]
  }
  return value
}
