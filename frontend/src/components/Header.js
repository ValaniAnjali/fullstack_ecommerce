import React, { useContext, useState } from 'react';
import logo from '../components/logo.jpg';
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import SummartApi from '../common';
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';
const Header = () => {
  const user = useSelector(state=>state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay]=useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const uRLSearch= new URLSearchParams(searchInput?.search)
  const searchQuery = uRLSearch.getAll("q")
  const[search,setSearch] = useState(searchQuery)

  // console.log("search input",searchInput?.search.split("=")[1]);


  // console.log("user header",user);


  const handleLogout=async()=>{
      const fetchData = await fetch(SummartApi.logout_user.url,{
        method:SummartApi.logout_user.method,
        credentials:'include'
      })

      const data = await fetchData.json()

      if(data.success){
        toast.success(data.message)
        dispatch(setUserDetails(null))
      }
      if(data.error){
        toast.error(data.message)
      }

      

      // console.log("Header",context)
  }
  // console.log("header add to cart count",context);

  const handlesearch = (e)=>{
    const { value }=e.target
    setSearch(value)

    if(value){
        navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }

  }

  return (
    <header className='h-16 shadow-md bg-white fixed z-40 w-full'>
      <div className='h-full container mx-auto flex items-center px-4 justify-between'>
        <div className=''>
          <Link to='/'><img src={logo} width={55} height={1} className='rounded-full' /></Link>
        </div>

        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2 '>
          <input type='text' placeholder='search products here...' className='w-full outline-none' onChange={handlesearch} value={search} />
          <div className='text-lg min-w-[50px] w-13 h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <FaSearch />
          </div>

        </div>

        <div className='flex items-center gap-7'>

        <div className='relative flex justify-center'>

          {
            user?._id &&(
              <div className='text-3xl cursor-pointer relative flex justify-center 'onClick={()=>setMenuDisplay(preve => !preve)}>
            
              {
                user?.profilePic ?(
                  <img src = {user.profilePic} alt={user?.name} className='w-10 h-10 rounded-full'/>
                ):(
                  <FaRegCircleUser />
                )
              }
              </div>
  
            )
          }

          
            {
              menuDisplay &&(
                <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
              <nav>
                {
                  user?.role ===ROLE.ADMIN&&(
                    <Link to={'/admin-panel/all-products'} className='whitespace-nowrap hover:bg-slate-50 p-2 hidden md:block' onClick={()=>setMenuDisplay(preve => !preve)}>Admin Pannel</Link>
                  )
                }
                
              </nav>
                </div>
              )
            }
          </div>

        

          <Link to = '/cart' className='text-2xl relative' >
          {
            user?._id &&(
              <div>
                  <span><FaCartShopping /></span>

                <div className=' bg-red-600 text-white w-5  h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProductCount}</p>
                </div>
              </div>
            )
          }

          </Link>

          <div>

            {
              user?._id ?(
                <button onClick={handleLogout} className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Logout</button>
              ):(
                <Link to={"/login"}><button className='px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700'>Login  </button></Link>
              )
            }
           
          </div>

        </div>

      </div>


    </header>
  )
}

export default Header