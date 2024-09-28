import React, { useState } from "react";
import loginIcon from "../assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageToBase64";
import SummartApi from "../common";
import { toast } from "react-toastify";
const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    Confirmpassword: "",
    profilePic: "",
  });

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleUploadPic=async(e)=>{
    const file=e.target.files[0]
    const imagePic = await imageTobase64(file)
    // console.log("imagePic",imagePic)
    setData((preve)=>{
      return{
        ...preve,
        profilePic:imagePic
      }
    })
  
    // console.log("file",file)
  }
  // console.log("data login", data);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if(data.password===data.Confirmpassword){
      const dataResponse=await fetch(SummartApi.signUp.url,{
        method:SummartApi.signUp.method,
        headers:{
          "content-type":"application/json"
        },
        body: JSON.stringify(data)
      })
      const dataApi=await dataResponse.json()

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate("/login")
      }
      if(dataApi.error){
        toast.error(dataApi.message)
      }
      console.log("data",dataApi)
    }else{
      toast.error("Please check password and confirm password")
      console.log("Please check password and confirm password")
    }

    
  };
  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 w-full max-w-sm mx-auto rounded py-5">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={data.profilePic || loginIcon} alt="login img" className="rounded-full"></img>
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input type="file" className="hidden" onChange={handleUploadPic} />
              </label>
            </form>
          </div>

          <form className="pt-6 flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full h-full bg-transparent outline-none"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            <div className="grid">
              <label>Email:</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full h-full bg-transparent outline-none"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            <div>
              <label>Password::</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full h-full bg-transparent outline-none"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>

            <div>
              <label>Confirm Password::</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full h-full bg-transparent outline-none"
                  name="Confirmpassword"
                  value={data.ConfirmPassword}
                  onChange={handleOnChange}
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>

            <button className="bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700">
              SignUp
            </button>
          </form>

          <p className="my-5">
            Already have Account?
            <Link
              to={"/login"}
              className="text-red-500 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
