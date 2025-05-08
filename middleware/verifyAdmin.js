const verifyAdmin = (req, res, next) => {
    if(!req.userInfo || req.userInfo.role !== 'Admin') {
        res.status(401).json({message : 'You need to be an admin to access this'})
    }
    next()
}

module.exports = verifyAdmin