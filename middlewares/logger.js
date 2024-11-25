const HTTPLog = (req, res, next) => {
  console.log(
    `HTTP method: ${req.method}\nURL: ${req.hostname}${req.originalUrl}`
  )
  next()
}

module.exports = HTTPLog
