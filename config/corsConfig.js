const cors = require('cors')

const configCors = () => {
    return cors({
        origin : (origin, cb) => {
            const allowedHost = [
                'http://localhost:4500',
                'https://freelance-job-marketplace-api.onrender.com'
            ]

            if(!origin || allowedHost.indexOf(origin) !== -1) {
                cb(null, true)
            } else {
                cb(new Error('Not allowed host'))
            }
        },
        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        credentials : true
    })
}

module.exports = configCors
