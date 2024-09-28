import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import productCatagory from '../helpers/productCatagory';
import VerticalCard from '../components/VerticalCard';
import SummartApi from '../common';

const CatagoryProduct = () => {
    const [data,setData]=useState([])
    const navigate = useNavigate()
    const [loading,setLoading]=useState(false)

    const location = useLocation()
    const uRLSearch = new URLSearchParams(location.search)
    const urlCatagoryListinarray = uRLSearch.getAll("catagory")

    const uRLCatagoryListObject = {}

    urlCatagoryListinarray.forEach(e1=>{
      uRLCatagoryListObject[e1]=true
    })

    // console.log('uRLCatagoryListObject',uRLCatagoryListObject);
    // console.log('urlcatagorylisttt',urlCatagoryListinarray);

    const [selectCatagory,setSelectCatagory] = useState(uRLCatagoryListObject)
    const[filterCatagoryList,setFilterCatagoryList]=useState({})

    const[sortBy,setSortBy] = useState("")

    console.log("sortby",sortBy); 


    const fetchData = async()=>{
      const response = await fetch(SummartApi.filterProduct.url,{
        method:SummartApi.filterProduct.method,
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({
          catagory:filterCatagoryList
        })
      })

      const dataResponse = await response.json()

      setData(dataResponse?.data || [])
      // console.log(dataResponse);
    }

    const handleselectCatagory = (e)=>{
      const {name, value, checked} = e.target

      setSelectCatagory((preve)=>{
        return{
          ...preve,
          [value] : checked
      }

      
      })

     ;

      // console.log("selected catagory",name,value,checked);
    }


    // console.log("selected catagort",selectCatagory)

    useEffect(()=>{
      fetchData()
    },[filterCatagoryList])


    useEffect(()=>{
      const arrayOfCatagory = Object.keys(selectCatagory).map(catagoryKeyName=>{
        if(selectCatagory[catagoryKeyName]){
          return catagoryKeyName
        }
        return null
      }).filter(e1 =>e1)

      // format for url change when change on the chekbox
      const urlFormat = arrayOfCatagory.map((e1,index) =>{
        if((arrayOfCatagory.length -1)===index){
          return `catagory=${e1}`
        }

        return `catagory=${e1}&&`
      })

      // console.log("urlformatt",urlFormat.join(""));
      setFilterCatagoryList(arrayOfCatagory)

      navigate("/product-catagory?"+urlFormat.join(""))

      // console.log("selected c ",arrayOfCatagory);
    },[selectCatagory])

    // console.log("catagory",params.catagoryName);
      // {params?.catagoryName}


      const handleOnChangeSortBy = (e)=>{
        const {value}=e.target

        setSortBy(value)

        if(value === 'asc'){
          setData(preve =>preve.sort((a,b)=>a.sellingPrice-b.sellingPrice))
        }
        if(value === 'desc'){
          setData(preve =>preve.sort((a,b)=>b.sellingPrice-a.sellingPrice))
        }

      }

      useEffect(()=>{

      },[sortBy])

  
  return (
    <div className='container mx-auto p-4'>

      {/* desktop version */}
      <div className='hidden lg:grid grid-cols-[200px,1fr]'>

        {/* left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>

          {/* sort by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort By :</h3>

            <form className='text-sm flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' onChange={handleOnChangeSortBy} value={"asc"} checked={sortBy==="asc"} />
                <label>Price - Low To High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' onChange={handleOnChangeSortBy} value={"desc"} checked={sortBy==="desc"}  />
                <label>Price - High To Low</label>
              </div>

            </form>
          </div>

          {/* filter by */}
          <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Catagory :</h3>

            <form className='text-sm flex-col gap-2 py-2'>
              {
                productCatagory.map((catagoryName,index)=>{
                  return(
                    <div className='flex items-center gap-3'>
                    <input type='checkbox' name={'catagory'} checked={selectCatagory[catagoryName?.value]} value={catagoryName?.value} id={catagoryName?.value} onChange={handleselectCatagory}/>
                    <label htmlFor={catagoryName?.value}>{catagoryName?.label}</label>
                    </div> 
                  )
                })
              }

            </form>
          </div>

        </div>

        {/* right side  {product}*/}


        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data?.length}</p>
          {/* {
            params?.catagoryName &&(
              <CatagoryWiseProductDisplay catagory={params?.catagoryName } heading={"recommended"}/>
            )
          } */}

           <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)] '>
           {
              data.length!==0 &&(
                <VerticalCard data={data} loading={loading}/>
              )
            }
      
           </div>

        </div>

      </div>
        
    </div>
  )
}

export default CatagoryProduct