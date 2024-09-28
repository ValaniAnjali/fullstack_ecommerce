const addToCartModel = require("../../models/cartProduct")
const addToCartController = async(req,res) =>{
    try{
        const {productId} = req?.body
        const CurrentUser = req.userId

        const isProductAvailable = await addToCartModel.findOne({ productId })

        console.log(isProductAvailable);

        if(isProductAvailable){
            return res.json({
                message : "Already exists in add to cart",
                success:false,
                error:true
            })
        }
        const payLoad ={
            productId : productId,
            quantity : 1,
            userId: CurrentUser,
        }

        const newAddToCart = new addToCartModel(payLoad)
        const saveProduct = await newAddToCart.save()

       return res.json({
            data:saveProduct,
            message:"product added to cart",
            success:true,
            error:false
        })
        

    }catch(err){
        res.json({
            message:err?.message || err,
            error:true,
            success:false
        })
    }
}
module.exports = addToCartController