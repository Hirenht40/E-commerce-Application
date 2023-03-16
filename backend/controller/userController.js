const ErrorHandler = require("../utils/errorhandler");
const catchAysncErrors = require("../middleware/catchAysncErrors");
const User = require("../models/userModels");

// Register user

exports.registerUser = catchAysncErrors(async(req,res,next)=>{
    const{name, email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"This is sample id",
            url:"profilepictureUrl",
        },
    });

    res.status(201).json({
        success: true,
        user,
    });
});