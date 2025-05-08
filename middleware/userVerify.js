const userVerify = (req, res, next) => {
    if(!req.userInfo || req.userInfo.role !== 'User') {
        res.status(401).json({message : 'You need to be an User'})
    }
    next()
}

module.exports = userVerify