const data = require('./database')

let getalltasks = () => {
  return data.data
}

exports.getalltasks = getalltasks
