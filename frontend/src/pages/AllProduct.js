import React, { useEffect, useState } from 'react'
import UploadProduct from './UploadProduct'
import SummartApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProduct = () => {
  const[openUploadProduct,setOpenUploadProduct] = useState(false)
  const [allProduct,setAllProduct]=useState([])

  const fetchAllProduct=async()=>{
    const response = await fetch(SummartApi.allProduct.url)
    const dataResponse = await response.json()

    console.log("product data",dataResponse);

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <div>

    <div className='bg-white py-1 px-3 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-2 px-4 rounded-full'
        onClick={()=>{setOpenUploadProduct(true)}}>Upload Product</button>
    </div>


    {/* all product */}

    <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
      {
        allProduct.map((product,index)=>{
          return(
            <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
            
          )
        })
      }
    </div>



    {/* upload product component */}

    {
      openUploadProduct&&(
        <UploadProduct onClose={()=>{setOpenUploadProduct(false)}} fetchData={fetchAllProduct}/>
      )
    }
    
    </div>
    
  )
}

export default AllProduct