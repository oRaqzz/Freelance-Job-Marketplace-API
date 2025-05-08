const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    job : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
    },
    freelancer  : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    coverletter : {
        type: String,
        required: true
    },
    status : {
        type: String,
        enum: ['pending', 'approved', 'closed'],
        default: 'pending'
    },
    appliedAt : {
        type: Number,
        default: Date.now()
    }
})

module.exports = mongoose.model('Application', applicationSchema)   