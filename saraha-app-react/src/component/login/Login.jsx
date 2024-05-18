import React, { useState } from 'react'
import Joi from 'joi';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import cookie from 'react-cookies';

function Login({setLogUser}) {
  
  let navigate = useNavigate();
let[user,setUser]=useState({
  email:"",
  password:""

});
let [errorList,setErrorList]=useState([]);
  let onChange=(e)=>{
  
    setUser({...user,[e.target.name]:e.target.value});
   
   
  }
  function Validation(){
    const schema = Joi.object({
      email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()

    })
     return schema.validate(user,{abortEarly:false });

  } 
 
async function Onsubmit(e){
  e.preventDefault();
  let validate=Validation();

  if(validate.error){
    setErrorList(validate.error.details);
    
  }
  else{
    setErrorList([]);
 let{data}= await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin',user); 
 
   if(data.message==="success"){
    let expires=new Date();
    let Fday=expires.getDate()+1;
    expires.setDate(Fday);
    cookie.save('token',data.token);
    setLogUser(data.token)
    navigate("/messages");

   }
   else{
    setErrorList(data.message);
   }
  }
}
  return (
    
   
<div className="container text-center my-5">

 
  <div className="user my-3">
    <i className="fas fa-user-secret user-icon" />
    <h4 className="login">Login</h4>
  </div>
  <div className="card p-5 w-50 m-auto">
    <form method="POST" onSubmit={Onsubmit} >
    {errorList.map((error,index)=>
    <div  key={index} className="alert alert-danger">{error.message}</div>
)}
      <input className="form-control" placeholder="Enter your email" type="text" name="email"  onChange={onChange}/>
      <input className="form-control my-4 " placeholder="Enter your Password" type="password" name="password"  onChange={onChange}/>
      <button className="btn btn-default-outline my-4 w-100 rounded" >Login</button>
      <p><Link className="text-muted forgot btn" to="/forgerPassword">I Forgot My Password</Link></p>
      <Link className="btn btn-default-outline" to="register">Register</Link>
    </form>
  </div>
</div>

  )
}

export default Login