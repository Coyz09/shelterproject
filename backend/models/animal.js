const mongoose = require('mongoose')

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter animal name'],
        
        maxLength: [40, 'Product name cannot exceed 40 characters']
    },
    breed: {
        type: String,
        required: [true, 'Please enter breed of animal '],
      
        maxLength: [30, 'Animal Breed cannot exceed 30 characters']
    },

    age: {
        type: Number,
        required: [true, 'Please enter animal age'],
        maxLength: [5, 'Animal age cannot exceed 5 characters'],
        default: 0
    },
 
    images: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            },
        }
    ],

     gender: {
        type: String,
        required: [true, 'Please select gender for this animal'],
        enum: {
            values: [
                'Male',
                'Female'       
            ],
            message: 'Please select correct gender for animal'
        }
    },
  

    type: {
        type: String,
        required: [true, 'Please select type for this animal'],
        enum: {
            values: [
                'Dog',
                'Cat'       
            ],
            message: 'Please select correct category for animal'
        }
    },
    ratings: {
        type: Number,
        default: 0
    },
  
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    
    injury: {
        type: mongoose.Schema.ObjectId,
        ref: 'Injury',
        
    },

    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        // required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Animal', animalSchema);