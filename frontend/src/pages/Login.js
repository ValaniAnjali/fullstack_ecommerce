import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import SummartApi from '../common';
import Context from '../context';
const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const {fetchUserDetails, fetchUserAddToCart} = useContext(Context)
    // console.log("gcontext");

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData((preve) => {
            return {
                ...preve,
                [name]: value
            }
        })
    }
    // console.log("data login", data)

    const handleSubmit = async(e) => {
        e.preventDefault()

        const dataResponse = await fetch(SummartApi.signIn.url,{
            method:SummartApi.signIn.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data),


        })

        const dataApi = await dataResponse.json()
        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
            fetchUserAddToCart()
        }
        if(dataApi.error){
            toast.error(dataApi.message)
        }


    }

    return (
        <section id="login">
            <div className='mx-auto container p-4'>
                <div className='bg-white p-5 w-full max-w-sm mx-auto rounded py-5'>
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcon} alt="login img"></img>
                    </div>

                    <form className='pt-6  flex-col gap-2' onSubmit={handleSubmit}>
                        <div className='grid'>
                            <label>Email:</label>
                            <div className='bg-slate-100 p-2'>
                                <input type='email'
                                    placeholder='Enter email'
                                    className='w-full h-full bg-transparent outline-none'
                                    name='email'
                                    value={data.email}
                                    onChange={handleOnChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label>Password::</label>
                            <div className='bg-slate-100 p-2 flex'>
                                <input type={showPassword ? "text" : "password"}
                                    placeholder='Enter password'
                                    className='w-full h-full bg-transparent outline-none'
                                    name='password'
                                    value={data.password}
                                    onChange={handleOnChange}
                                />
                                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((preve) => !preve)}>
                                    <span  >
                                        {
                                            showPassword ?
                                                (<FaEyeSlash />) :
                                                (<FaEye />)


                                        }


                                    </span>
                                </div>
                            </div>

                            <Link to={'/forgot-password'} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                                Forgot password ?
                            </Link>

                        </div>
                        <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'>Login</button>
                    </form>

                    <p className='my-5'>Don't have Account?<Link to={'/sign-up'} className='text-red-500 hover:text-red-700 hover:underline'>Sign up</Link></p>
                </div>
            </div>
        </section>
    )
}

export default Login