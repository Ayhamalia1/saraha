import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgetMessage() {
    let [email,setEmail]=useState(null);
    let navigate=useNavigate()
    const onChange=(e)=>{
        let{value}=e.target;
       setEmail(value);
    }
    const onsubmit=async(e)=>{
        e.preventDefault();
        if(!email || email.length<8){
            toast.warning("Enter a valid email address")
        }
        else{
        let{data}=await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode',{email});
        if(data.message=="success"){
         toast.success("please check your email");
         navigate(`/resetpassword/${email}`)


        }

        }

    }
  return (   
    <div className="container text-center my-5">
  <div className="user my-3">
    <i className="fas fa-user-secret user-icon" />
    <h4 className="login">Forget Password</h4>
  </div>
  <div className="card p-5 w-50 m-auto">
    <form method="POST" onSubmit={onsubmit} >

      <input className="form-control" placeholder="Enter your email" type="text" name="email" value={email}  onChange={onChange}/>
      <button className="btn btn-default-outline my-4 w-100 rounded" >Reset Password</button>
    </form>
  </div>
</div>
  )
}
