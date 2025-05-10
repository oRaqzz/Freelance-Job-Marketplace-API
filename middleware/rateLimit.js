const rateLimit = require('express-rate-limit')

const rateLimiter = (maxReq, time) => {
  return rateLimit({
    max: maxReq,
    windowMs: time,
    message: 'Too many requests, please try later.',
    standardHeaders: true,
    legacyHeaders: false
  })
}

module.exports = rateLimiter
