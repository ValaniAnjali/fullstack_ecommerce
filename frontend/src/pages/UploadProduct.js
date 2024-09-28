import React, { useState } from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { FaCloudUploadAlt } from "react-icons/fa";
import productCatagory from '../helpers/productCatagory';
import uploadImage from '../helpers/uploadImage';
import DisplayImage from '../components/DisplayImage';
import { MdDelete } from "react-icons/md";
import SummartApi from '../common';
// import { json } from 'react-router-dom';
import {toast} from 'react-toastify'

const UploadProduct = ({
  
  onClose,fetchData
}) => {
  const[data,setData] = useState({
    productName:"",
    brandName:"",
    catagory:"",
    productImage:[],
    description:"",
    price:"",
    sellingPrice:"",

  })

  const [openFullScreenImage,setOpenFullScreenImage]=useState(false);
  const [fullScreenImage,setFullScreenImage]=useState("")

  // const [uploadProductImageInput,setUploadProductImageInput] = useState("")
  const handleOnChange = (e)=>{
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleDeleteProductImage=async(index)=>{
    console.log('img index',index);

    const newProductImage = [...data.productImage]
    newProductImage.splice(index,1)

    setData((prev) => ({
      ...prev,
      productImage: [...newProductImage],
    }));
}




  const handleUploadProduct = async(e)=>{
    const file = e.target.files[0]
    // setUploadProductImageInput(file.name)
    // console.log("file",file);

    const uploadImageCloudinary = await uploadImage(file)
    setData((preve)=>{
      return{
        ...preve,
        productImage:[ ...preve.productImage,uploadImageCloudinary.url]
      }

    })
    // console.log("upload image",uploadImageCloudinary.url);
  }


       // upload product
       const handleSubmit=async(e)=>{
        e.preventDefault();

        const response = await fetch(SummartApi.uploadProduct.url,{
          method:SummartApi.uploadProduct.method,
          credentials:'include',
          headers:{
            "content-type" :"application/json"
          },
          body:JSON.stringify(data)

        })

        const responseData = await response.json()

        if(responseData.success){
          toast.success(responseData?.message)
          onClose()
          fetchData()
        }
        if(responseData.error){
          toast.success(responseData?.message)
        }


        // console.log(data);
      }


  
  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 right-0 left-0 bottom-0 flex justify-center items-center '>
        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            <div className='flex justify-between items-center pb-3'>
            <h2 className='font-bold text-lg'>UploadProduct</h2>
            <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer 'onClick={onClose}>
            <IoCloseOutline/>
            </div>
        </div>

          <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                <label htmlFor='productName' className='mt-3'>Product Name: </label>
                <input type='text' id='productName'
                placeholder='enter Product name'
                name='productName'
                value={data.productName} 
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required/>

                <label htmlFor='brandName' className='mt-3'>Brand Name: </label>
                <input type='text' id='brandName'
                placeholder='enter Brand name'
                name='brandName'
                value={data.brandName} 
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required/>

                <label htmlFor='catagory' className='mt-3 '>Catagory: </label>
                <select  required
                name='catagory'
                className='p-2 bg-slate-100 border rounded' 
                value={data.catagory}
                onChange={handleOnChange}
                >

                  <option value={""} name='catagory' onChange={handleOnChange}>select catagory</option>
                  {
                    productCatagory.map((e1,index)=>{
                      return(
                        <option value={e1.value} key={e1.value+index}>{e1.label}</option>
                      )
                    })
                  }
                </select>

                <label htmlFor='productImage' className='mt-3 '>Product Image: </label>
                <label htmlFor='uploadImageInput'>
                <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                    <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                        <span className='text-4xl'><FaCloudUploadAlt /></span>
                        <p className='text-sm'>Upload Product Image</p>
                        <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct}/>
                    </div>
                </div>
                </label>
                <div>
                  {
                    data?.productImage[0]?(
                        <div className='flex items-center gap-2'>
                          {
                            data.productImage.map((e1,index)=>{
                              return(
                                <div className='relative group'>
                                  <img src={e1} alt={e1} width={80}  height={80} 
                                  className='bg-slate-100 border cursor-pointer'
                                  onClick={()=>{
                                  setOpenFullScreenImage(true)
                                  setFullScreenImage(e1)
                                }} />
                                <div className='absolute bottom-0 right-0 p-3 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                <MdDelete />
                                </div>
                                </div>
                              )
                            })
                          }
                        </div>
                    ):(
                      <p className='text-red-600 text-xs'>* Please Upload Product Image</p>
                    )
                  }
                 
                </div>

                <label htmlFor='price' className='mt-3 '>Price: </label>
                <input type='number' id='price'
                placeholder='enter price'
                name='price'
                value={data.price} 
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded' required/>

                <label htmlFor='sellingPrice' className='mt-3 '> Selling Price: </label>
                <input type='number' id='sellingPrice'
                placeholder='enter sellingPrice'
                name='sellingPrice'
                value={data.sellingPrice} 
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded' required/>

               <label htmlFor='description'> Description: </label>
               <textarea className='bg-slate-100 h-28 border resize-none'
                  placeholder='enter product description' 
                  onChange={handleOnChange}
                  name='description'
                  value={data.description} 
                  rows={3}
                 >

                 </textarea>


                <button className='px-3 py-2 mb-10 bg-red-600 text-white hover:bg-red-700 p-1 ' placeholder='Enter Product Description'>Upload Product</button>

          </form>
            

            
        
             
        </div>

        {/* display image full screen */}
        {
          openFullScreenImage && (
            <DisplayImage onClose={()=>{setOpenFullScreenImage(false)}} imgUrl={fullScreenImage}/>
          )
        }
       

       
    </div>
  )
}

export default UploadProduct