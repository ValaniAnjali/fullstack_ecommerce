import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCatagoryWiseProduct from '../helpers/fetchCatagoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const VerticalCardProduct = ({catagory,heading}) => {
    const[data,setData]=useState([])
    const[loading,setLoading]=useState(true)
    const loadingList=new Array(13).fill(null)
    const[scroll,setScroll]=useState(0)

    const { fetchUserAddToCart} = useContext(Context)
    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart() 
    }

    const scrollElement = useRef()

    const fetchData=async()=>{
        setLoading(true)
        const catagoryProduct = await fetchCatagoryWiseProduct(catagory)
        setLoading(false)

        setData(catagoryProduct?.data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const scrollRight = ()=>{
        scrollElement.current.scrollLeft +=300
    }
    const scrollLeft = ()=>{
        scrollElement.current.scrollLeft -=300
    }

  return (
    <div className='container mx-auto px-4 my-6 relative'>

        <h2 className='text-2xl font- py-4'>{heading}</h2>

       <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>

       <button className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleLeft /></button>
       <button className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleRight /></button>

       {

                loading?(   
                    loadingList.map((product,index)=>{
                        return(
                            <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px]  md:max-w-[280px]  bg-white rounded-sm shadow '>
                
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                               
                            </div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 animate-pulse rounded-full bg-slate-200'></h2>
                                <p className='capitalize text-slate-500 animate-pulse rounded-full bg-slate-200'></p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium animate-pulse rounded-full bg-slate-200 w-full'></p>
                                    <p className='text-slate-500 line-through animate-pulse rounded-full bg-slate-200 w-full'></p>
                                </div>
                                <button className='text-white text-sm px-3 py-0.5  animate-pulse rounded-full bg-slate-200'></button>
                            </div>
        
                        </div>
                        )
                    })

                ):(
                    data.map((product,index)=>{
                        return(
                            <Link to={"product/"+product?._id} key={product._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px]  md:max-w-[280px]  bg-white rounded-sm shadow '>
                
                            <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                                <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all mix-blend-multiply'/>
                            </div>
                            <div className='p-4 grid gap-3'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                                <p className='capitalize text-slate-500'>{product?.catagory}</p>
                                <div className='flex gap-3'>
                                    <p className='text-red-600 font-medium'>{ displayINRCurrency(product?.sellingPrice )}</p>
                                    <p className='text-slate-500 line-through'>{ displayINRCurrency(product?.price )}</p>
                                </div>
                                <button className='bg-red-600 hover:bg-red-700 text-white text-sm px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart</button>
                            </div>
        
                        </Link>
                        )
                    })
                )

            
        }
       </div>

       
    </div>
  )
}

export default VerticalCardProduct