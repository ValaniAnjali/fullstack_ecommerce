import React, { useContext, useEffect, useState } from 'react'
import SummartApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";

const Cart = () => {
    const [data,setData]=useState([])
    const [loading,setLoading]=useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.cartProductCount).fill(null)

    const fetchData=async()=>{
        setLoading(true)
        const response = await fetch(SummartApi.addToCartProductView.url,{
            method : SummartApi.addToCartProductView.method,
            credentials : 'include',
            headers :{
                "content-type":"application/json"
            }
        })
        setLoading(false)

        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }

    }

    useEffect(()=>{
        fetchData( )
    },[])


    const increaseQty = async(id,qty)=>{
        const response = await fetch(SummartApi.updateCartProduct.url,{
            method:SummartApi.updateCartProduct.method,
            credentials:'include',
            headers:{
                "content-type":'application/json'
            },
            body:JSON.stringify(
                {
                    _id:id,
                    quantity:qty+1
                }
            )
        })
        const responseData = await response.json()

        if(responseData.success){
            fetchData()
        }
    }

    const decreaseQty = async(id,qty)=>{
        if(qty >=2){
            const response = await fetch(SummartApi.updateCartProduct.url,{
                method:SummartApi.updateCartProduct.method,
                credentials:'include',
                headers:{
                    "content-type":'application/json'
                },
                body:JSON.stringify(
                    {
                        _id:id,
                        quantity:qty-1
                    }
                )
            })
            const responseData = await response.json()
    
            if(responseData.success){
                fetchData()
            }
        }
    }


    const deleteCartProduct = async(id)=>{
        const response = await fetch(SummartApi.deleteCartProduct.url,{
            method:SummartApi.deleteCartProduct.method,
            credentials:'include',
            headers:{
                "content-type":'application/json'
            },
            body:JSON.stringify(
                {
                    _id:id
                }
            )
        })
        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }


    // console.log("cart data",data);

    const totalQty = data.reduce((previousValue,currentValue)=>previousValue+currentValue.quantity,0)
    const toatalPrice = data.reduceRight((preve,curr)=>preve+(curr.quantity*curr?.productId?.sellingPrice),0)

  return (
    
    <div className='container mx-auto'>

       <div className='text-center text-lg my-3'>
                    {
                        data.length ==0 && !loading &&(
                            <p className='bg-white py-5'>No Data</p>
                        ) 
                    }
       </div>

       <div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
            {/* View product */}
                    <div className='w-full max-w-3xl'>
                        {
                            loading ? (
                                loadingCart.map(e1=>{
                                    return(
                                        <div key={e1+"Add To Crt Loading"} className='w-full bg-slate-200 h-32  border border-slate-300 animate-pulse rounded my-2'>
                                        </div>
                                    )
                                })
                                
                            ):(
                                data.map((product,index)=>{
                                    return(
                                        <div key={product?._id+"Add To Crt Loading"} className='w-full bg-white h-32  border border-slate-300 rounded my-2 grid grid-cols-[128px,1fr]'>
                                            <div className='w-32 h-32 bg-slate-200'>
                                                <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                                            </div>
                                            <div className='px-4 py-2 relative'>

                                                {/* delete product */}
                                                <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>{deleteCartProduct(product?._id)}}>

                                                <MdDelete />

                                                        
                                                </div>
                                                <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                                                <p className='capitalize text-slate-500'>{product?.productId?.catagory}</p>
                                                <div className='flex items-center justify-between'>
                                                <p className='text-red-600 font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                                <p className='text-slate-600 font-semibold text-lg'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                                </div>
                                                <div className='flex items-center gap-3 mt-2'>
                                                    <button className=' border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                                    <span>{product?.quantity}</span>
                                                    <button className=' border border-red-600 text-red-600 w-6 h-6 justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>

                    {/* summary / Total product */}
                   <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                               {
                                    loading?(
                                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                                        
                                            </div>
                                    ):(
                                        <div className='h-36 bg-white '>
                                                        <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                                                        <div className='flex items-center justify-between gap-2 px-4 font-medium text-lg text-slate-600'>
                                                            <p>Quantity</p>
                                                            <p>{totalQty}</p>

                                                        </div>

                                                        <div className='flex items-center justify-between gap-2 px-4 font-medium text-lg text-slate-600'>
                                                            <p>Total price</p>
                                                            <p>{displayINRCurrency(toatalPrice)}</p>
                                                        </div>

                                                        <button className='bg-blue-600 p-2 text-white w-full'>Payment</button>
                                            </div>

                                    )
                                }
                    </div>
                    


        </div>
        </div>

    </div>
  )
}

export default Cart