require('dotenv').config()
const express = require('express')
const app = express()

// Middleware to parse JSON
app.use(express.json()) 

//cors
const corsConfig = require('./config/corsConfig')
app.use(corsConfig())

//request loggers
const { requestLogger, addTimeStamps} = require('./middleware/requestLogger')
app.use(requestLogger)
app.use(addTimeStamps)

//rate limit
const rateLimiter = require('./middleware/rateLimit')
app.use(rateLimiter(100, 15*60*100))

// Database connection
const connectToDatabase = require('./database/mongoose')
connectToDatabase()

/* api v1
const apiV1 = require('./middleware/apiVersion') 
app.use(apiV1('v1')) */

// Routes
const authRoutes = require('./routes/route')
app.use('/auth', authRoutes)

// Port
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
