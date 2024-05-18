import React, { useState } from 'react' 
import Joi from 'joi'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  let navigate = useNavigate();
  let[inputs,setInputs]=useState({
    email:'',
    name:'',
    password:'',
   cPassword:""
  })
  let[errors,setErrors]=useState({ 
  email:'',
  name:'',
  password:'',
  cPassword:''})
  const schema=Joi.object({
    name:Joi.string().min(3).max(10).required(),
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        ,age:Joi.number().min(2)
        , password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
          "string.empty":"Please enter password",
          "string.pattern.base":"Please enter valid password"
        }),
        cPassword: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
          "string.empty":"Please enter password",
          "string.pattern.base":"Please enter valid password"
        })//Joi.valid(joi.ref("password").required()) //anthore way
  })
  function onchange(e){
    let{name,value}=e.target;
  
    let validation=schema.extract(name).validate(value);
    if(validation.error){
      setErrors({...errors, [name]: validation.error.details[0].message })
    }
    else{
      let err={...errors}
      delete err[name]
      setErrors({...err})
    }
    setInputs({...inputs,[name]:value})

  }
 async function onsubmit(e){
    e.preventDefault();
   
   if(Object.keys(errors).length===0){
    
      let{data}=await axios.post('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup ',inputs)
      
    navigate('/login');
   }
  

  }
  
  return (
    <div>
      <div className="container text-center my-5">
  <div className="user my-3">
    <i className="fas fa-user-secret user-icon" />
    <h4 className="login">Registration</h4>
  </div>
  <div className="card p-5 w-50 m-auto">
    
    <form method="POST"  onSubmit={onsubmit} >
    <input className="form-control my-4" placeholder="Enter your email" type="email" name="email"  onChange={onchange}/>
    {errors.email&&<div className='alert alert-danger'>{errors.email}</div>}
      <input className="form-control my-4" placeholder="Enter your name" type="text" name="name"  onChange={onchange}/>
      {errors.name &&<div className='alert alert-danger'>{errors.name}</div>}
      <input className="form-control my-4 " placeholder="Enter your Password" type="password" name="password" onChange={onchange}/> 
      {errors.password &&<div className='alert alert-danger'>{errors.password}</div>}
     
       <input className="form-control my-4 " placeholder="confirm your password" type="password" name="cPassword"onChange={onchange} />
       {errors.cPassword &&<div className='alert alert-danger'>{errors.cPassword}</div>}


      <button className="btn btn-default-outline my-4 w-100 rounded" >Register</button>
    
    </form>
  </div>
</div>

    </div>
  )
}

export default Register