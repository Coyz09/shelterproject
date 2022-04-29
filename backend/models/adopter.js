const mongoose = require('mongoose');
const validator = require('validator');

const adopterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter adopter name'],
        trim: true,
        maxLength: [30, 'adopter name cannot exceed 30 characters']
    },
    contact: {
        type: Number,
        required: [true, 'Please enter adopter contact number'],
        maxLength: [11, 'Adopter number cannot exceed 11 characters'],
        default: 0
    },
     address: {
        type: String,
        required: [true, 'Please enter adopter address'],
        trim: true,
        maxLength: [200, 'Adopter address cannot exceed 200 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter adopter email'],
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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
    },
     status: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Adopter', adopterSchema);