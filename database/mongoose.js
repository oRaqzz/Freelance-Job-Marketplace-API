require('dotenv').config()
const mongoose = require('mongoose')

const connectToDatabase = async () => {
    try{
        const url = process.env.MONGO
        await mongoose.connect(url)
        console.log('Connected to database')
    }catch(e) {
        console.log('Failed to connect to database error: ' + e)
    }
}

module.exports = connectToDatabase