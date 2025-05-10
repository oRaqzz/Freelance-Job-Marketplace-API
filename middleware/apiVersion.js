/* const apiVersion = (version) => (req, res, next) => {
  if (req.originalUrl.includes(`/api/${version}`)) {
    console.log('Request path:', req.path)
    next()
  } else {
    res.status(404).json({ error: 'API version not supported' })
  }
  next() 
}

module.exports = apiVersion */