const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:[true,"Please Enter your Name"],
        maxlength:[30, "Name cannot exceed 30 charcters"],
        minlength:[4, "Name should have more than 4 charcters"],
    },
    email:{
        type: String,
        required: [true, "Please enetr your email"],
        unique: true,
        validate:[validator.isEmail, "Please Enter a valid email"],
    },
    password:{
        type:String,
        required:[true, "Please enter your password"],
        minlength:[8,"password should be greator than 8 caharcters"],
        select: false,
    },
    avatar:{
        
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        
    },
    role:{
        type: String,
        default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

module.exports = mongoose.model("User",userSchema);