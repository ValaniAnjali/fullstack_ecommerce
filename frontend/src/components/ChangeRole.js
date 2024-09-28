import React, { useState } from "react";
import ROLE from "../common/role";
import { IoCloseSharp } from "react-icons/io5";
import SummartApi from "../common";
import { toast } from "react-toastify";

const ChangeRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc
}) => {
    const [userRole,setUserRole] = useState("")

    const handleOnChangeSelect=(e)=>{
        setUserRole(e.target.value)
        console.log(e.target.value);
    }

    const updateUserRole = async()=>{
        const fetchResponse = await fetch(SummartApi.updateUser.url,{
            method:SummartApi.updateUser.method,
            credentials:'include',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify({
                userId:userId,
                role:userRole
            })
        })

        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            callFunc()

        }
        console.log('role updated' , responseData);
    }


  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-between items-center bg-slate-200 bg-opacity-50">
        <div className="w-full mx-auto bg-white shadow-md p-4 max-w-sm">

            <button className="block ml-auto" onClick={onClose}>
                <IoCloseSharp/>
            </button>


        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>email:{email}</p>
        <div className="flex items-center justify-between my-4">
        <p>Role :{role} </p>
        <select className="border px-4 py-1" value={role} onChange={handleOnChangeSelect}>

                {
                    Object.values(ROLE).map(e1=>{
                        return(
                            <option value={e1} key={e1}>{e1}</option>
                        )
                    })
                }
            
        </select>
        </div>

        <button className="w-fit mx-auto block  py-1 px-3 bg-red-600 text-white rounded-full hover:bg-red-700 " onClick={updateUserRole}>Change Role</button>

        </div>
    </div>
  );
};

export default ChangeRole;
