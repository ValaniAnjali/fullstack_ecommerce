const productModel = require("../../models/productModel")

const getCatagoryProduct = async(req,res)=>{
    try{
            const productCatagory = await productModel.distinct("catagory")

            console.log("catagory",productCatagory);

            // array to store one product from each catagory
            const productByCatagory =[]
            for(const catagory of productCatagory){
                const product = await productModel.findOne({catagory})

                if(product){
                    productByCatagory.push(product)
                }
            }

            res.json({
                message:"catagory product",
                data:productByCatagory,
                success:true,
                error:false
            })

    }catch(err){
        res.status(400).json({
            message:err.message||err,
            error:true,
            success:false
        })
    }
}
module.exports=getCatagoryProduct   