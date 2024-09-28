const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    productName:String,
    brandName:String,
    catagory:String,
    productImage:[],
    description:String,
    price:Number,
    sellingPrice:Number,

},{
    timeStamps : true
})

const productModel = mongoose.model("product",productSchema)

module.exports=productModel