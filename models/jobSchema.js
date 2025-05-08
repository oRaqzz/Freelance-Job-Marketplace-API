const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    client : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status : {
        type: String,
        enum: ['pending', 'approved', 'closed'],
        default: 'pending'
    },
    createdAt : {
        type: Number,
        default: Date.now()
    }
})

module.exports = mongoose.model('Job', jobSchema)