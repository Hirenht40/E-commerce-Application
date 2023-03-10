const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please eter product name"]
    },
    description:{
        type: String,
        required: [true, "Please eter product description"]
    },
    price:{
        type: Number,
        required:[true, "Please enter product price"],
        maxlength: [8, "Price cannot exceed 8 characters"]
    },
    rating:{
        type: Number,
        default: 0
    },
    images:[
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required: [true, "Please enter category"]
    },
    stock:{
        type:Number,
        required: [true, "Please enter product stock"],
        maxlength: [4, "Stock cannot exceed 4 characters"],
        default: 1
        },

        numofReviews:{
            type: Number,
            default:0
        },
        review:[
            {
                name:{
                        type: String,
                        required: true
                },
                rating:{
                    type: Number,
                    required: true
                },
                comment:{
                    type: String,
                    required: true
                }
            }

        ],
        createdAt:{
            type: Date,
            default: Date.now
        }
    
})

module.exports = mongoose.model("product", productSchema)