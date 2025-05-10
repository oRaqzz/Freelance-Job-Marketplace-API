require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('../models/userSchema')

const verifyUser = (req, res, next) => {
    console.log('verifyUser middleware hit')
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1] 

    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }    

    try {
        const decode = jwt.verify(token, process.env.JWT_KEY)
        req.userInfo = decode
        console.log(req.userInfo)
        next()
    } catch (e) {
        console.log(e)
        res.status(403).json({ message: 'Invalid or expired token' })
    }
}

module.exports = verifyUser
