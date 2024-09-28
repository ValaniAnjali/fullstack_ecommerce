const productModel = require("../../models/productModel")

const filterProductController = async(req,res)=>{
    try{

        const catagoryList = req?.body?.catagory || []

        const product = await productModel.find({
           catagory : {
            "$in" : catagoryList
           }
        })

        res.json({
            data:product,
            message:"product",
            error:false,
            success:true
        })

    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }

}

module.exports = filterProductController