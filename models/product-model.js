const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: "Category"
    },
    brand: {
        type: String,
        enum: ["Apple", "Samsung", "Lenovo"],
    },
    sold: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 0,
        required: true,
    },
    images: {
        type: Array,
    },
    color: {
        type: String,
        enum: ["Blue", "Brown", "Red"],
    },
    ratings: [
        {
            start: Number,
            postedBy: {
                type: mongoose.Types.ObjectId,
                ref: "User"
            }
        }
    ],

}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Product', productSchema);