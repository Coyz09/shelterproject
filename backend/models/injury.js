const mongoose = require('mongoose')

const injurySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter injury name'],
        unique: true,
        maxLength: [50, 'Injury name cannot exceed 50 characters']
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Injury', injurySchema);