require('dotenv').config()
const express = require('express')
const app = express()

// Middleware to parse JSON
app.use(express.json()) 

// Database connection
const connectToDatabase = require('./database/mongoose')
connectToDatabase()

// Routes
const authRoutes = require('./routes/route')
app.use('/auth', authRoutes)

// Port
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`)
})
