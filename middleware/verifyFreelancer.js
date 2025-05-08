const verifyFreelancer = (req, res, next) => {
    console.log('verifyUser middleware hit')
    if(!req.userInfo || req.userInfo.role !== 'Freelancer') {
        res.status(401).json({message : 'You need to be a freelancer to access this'})
    }
    next()
}

module.exports = verifyFreelancer