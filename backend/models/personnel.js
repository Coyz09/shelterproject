const mongoose = require('mongoose');
const validator = require('validator');

const personnelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter personnel name'],
        trim: true,
        maxLength: [30, 'personnel name cannot exceed 30 characters']
    },
    contact: {
        type: Number,
        required: [true, 'Please enter personnel contact number'],
        maxLength: [11, 'Personnel number cannot exceed 11 characters'],
        default: 0
    },
    email: {
        type: String,
        required: [true, 'Please enter personnel email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter valid email address']
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    category: {
        type: String,
        required: [true, 'Please select the category of personnel'],
        enum: {
            values: [
                "Employee",
                "Veterinarian",
                "Volunteer"
            ],
            message: 'Please select the correct category of personnel'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Personnel', personnelSchema);