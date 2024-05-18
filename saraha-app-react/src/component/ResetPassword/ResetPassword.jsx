import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';

export default function ResetPassword() {
    let navigate=useNavigate()
    let {email} = useParams();
    let [inputs,setInputs]=useState({
        newPassword:'',
        code:''

    });
   
    const onChange=(e) => {
    let{name,value}=e.target
    setInputs({...inputs,[name]:value})

    }
    const Onsubmit=async(e) => {
        e.preventDefault();
        let{data}=await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword',
        {...inputs,email})
       
        if(data.message==="success"){
        toast.success("Password reseted successfully")
        navigate("/login")
        }
        else if(data.message==="fail"){
        toast.error("Enter valid code")}



    }
  return (
    <div className="container text-center my-5">

 
  <div className="user my-3">
    <i className="fas fa-user-secret user-icon" />
    <h4 className="login">Reser Password</h4>
  </div>
  <div className="card p-5 w-50 m-auto">
    <form method="POST" onSubmit={Onsubmit} >
  
      <input className="form-control" placeholder="Enter your email" type="text" name="email" value={email}  onChange={onChange}/>
      <input className="form-control my-4 " placeholder="Enter the code" type="code" name="code"  value={inputs.code} onChange={onChange}/>

      <input className="form-control my-4 " placeholder="Enter new Password" type="password" value={inputs.newPassword} name="newPassword"  onChange={onChange}/>
      <button className="btn btn-default-outline my-4 w-100 rounded" >Reset</button>
    </form>
  </div>
</div>
  )
}
