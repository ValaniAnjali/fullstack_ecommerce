const express=require('express')
const userSignUpController = require('../controller/users/userSignUp')
const userSignInController = require('../controller/users/userSignIn')
const userDetailsController = require('../controller/users/userDetails')
const userLogout = require('../controller/users/userLogout')
const updateUser = require('../controller/users/updateUser')
const allUser = require('../controller/users/allUsers')
const getProductController = require('../controller/product/getProduct')
const uploadProductController = require('../controller/product/uploadProduct')
const updateProductController = require('../controller/product/updateProduct')
const authToken = require('../middleware/authToken')
const getCatagoryProduct = require('../controller/product/getCatagoryProductOne')
const getCatagoryWiseProduct = require('../controller/product/getCatagoryWiseProduct')
const getProductDetails = require('../controller/product/getProductDetails')
const addToCartController = require('../controller/users/addToCartController')
const countAddToCartProduct = require('../controller/users/countAddtoCartProduct')
const addToCartViewProduct = require('../controller/users/addToCartViewProduct')
const updateAddToCartProduct = require('../controller/users/updateAddToCartProduct')
const deleteAddToCartProduct = require('../controller/users/deleteAddToCartProduct')
const searchProduct = require('../controller/product/searchProduct')
const filterProductController = require('../controller/product/filterProduct')

const router = express.Router()


router.post('/signup',userSignUpController)
router.post('/signin',userSignInController)
router.get('/user-details',authToken,userDetailsController)
router.get('/userLogout',userLogout)

//admin pannel 
router.get('/all-user',authToken,allUser)
router.post('/update-user',authToken,updateUser)

//product 
router.post("/upload-product",authToken,uploadProductController)
router.get("/get-product",getProductController)
router.post("/update-product",authToken,updateProductController)

router.get("/get-categoryproduct",getCatagoryProduct)

router.post("/catagory-product",getCatagoryWiseProduct)

router.post("/product-details",getProductDetails)

router.get("/search",searchProduct)
router.post("/filter-product",filterProductController)

//user add to cart
router.post('/addtocart',authToken,addToCartController)
router.get('/countAddToCartProduct', authToken, countAddToCartProduct)

router.get("/view-card-product",authToken,addToCartViewProduct)
router.post("/update-cart-product",authToken,updateAddToCartProduct)

router.post("/delete-cart-product",authToken,deleteAddToCartProduct)

module.exports=router

