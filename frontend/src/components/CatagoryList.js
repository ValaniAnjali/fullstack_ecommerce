import React, { useEffect, useState } from 'react'
import SummartApi from '../common'
import { Link } from 'react-router-dom'

const CatagoryList = () => {

    const [catagoryProduct,setCatagoryProduct]=useState([])
    const [loading,setLoading]=useState(false)
    const catagoryLoading = new Array(13).fill(null)

    const fetchCatagoryProduct = async()=>{
        setLoading(true)
        const response = await fetch(SummartApi.catagoryProduct.url)
        const dataResponse = await response.json()
        setLoading(false)
        setCatagoryProduct(dataResponse.data)
    }
    useEffect(()=>{
        fetchCatagoryProduct()
    },[])
  return (
    <div className='container mx-auto p-4'>
        <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
        {
            loading?(
                
                    catagoryLoading.map((e1,index)=>{
                        <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse'key={"CatagoryLoading"+index}>
                        </div>
                    })   
            ):
            (
                catagoryProduct.map((product,index)=>{
                    return(
                        <Link to={'/product-catagory?catagory='+product?.catagory} className='cursor-pointer' key={product?.catagory+index}>
                            <div className=' w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-200 flex items-center justify-center'>
                                <img src={product?.productImage[0]} alt={product?.catagory} className='h-full object-scale-down mix-blend-multiply hover:scale-150 transition-all'/>
                            </div>
                            <div>
                                <p className='text-center text-sm md:text-base capitalize '>{product?.catagory}</p>
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

export default CatagoryList