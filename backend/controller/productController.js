    

const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAysncErrors = require("../middleware/catchAysncErrors");
const ApiFeatures = require("../utils/apiFeatures");


// Handling Uncaught Exception

process.on("uncaughtException", (err)=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught Exception`);
    process.exit(1);
})
    
    //create product --ADMIN

    exports.createProduct = catchAysncErrors(async(req, res, next) =>{
        const product = await Product.create(req.body);

        res.status(201).json({
            success:true,
            product
        })
    })
    
    //get all products
    exports.getAllProducts = catchAysncErrors (async(req, res) => {
        const apiFeature = new ApiFeatures(product.find(), req.query).search();

        const products = await Product.find();
        res.status(200).json({
            success:true,
            products
        })
    })

    //get product details

    exports.getProductDetails = catchAysncErrors (async(req, res, next) =>{
        const product = await Product.findById(req.params.id);

        if(!product){
            return next(new ErrorHandler ("product not found", 404));
        }
        res.status(200).json({
            success: true,
            product
        })
    })

    //Update products --ADMIN

    exports.updateProduct = catchAysncErrors (async(req, res, next) =>{
        let product = await Product.findById(req.params.id);

        if(!product){
            return next(new ErrorHandler ("product not found", 404));
        }

        product = await Product.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success:true,
            product
        })
    })

    //Delete product
    exports.deleteProduct = catchAysncErrors(async(req, res, next) => {
        const product = await Product.findById(req.params.id);

        if(!product){
            return next(new ErrorHandler ("product not found", 404));
        }
        await product.remove();

        res.status(200).json({
            success: true,
            message: "product deleted successfully"
        })
    })