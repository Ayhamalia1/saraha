import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode'
import findUser from '../../Utilites/FindUser'
import axios from 'axios'
import style from './style.module.css'
import { ToastContainer, toast } from 'react-toastify';
import copy from 'react-copy-to-clipboard';

export default function MyProfile({users,logUser}) {


    let [user,setUser]=useState([])
    let [message,setMessage]=useState([])
    const getData = ()=>{
        let decoded=jwtDecode(logUser)
        
        setUser(findUser(users,decoded.id))
    }
    let tokenApi=`tariq__${logUser}`
    const getMessaes=async()=>{
      
      
        let{data}=await axios.get('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/messages',
        {headers:{token:tokenApi}})
      
     if(data.message == "success"){ 
        
      
        setMessage(data.messages)
        
     }

    }
    const deleteMess=async (id)=>{
      let {data}=await axios.delete(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`,{headers:{token:tokenApi}})
    
      getMessaes();
      toast.success("message deleted successfully!")

    }
    let shareProfile=(e,url)=>{
      e.preventDefault();
    copy(url)
    
    
     }
    useEffect(()=>{
        getData();
        getMessaes();
       },[])
       
  
  return (
    <div>
<div>
  <div className="container text-center py-5 my-5 text-center">
    <div className="card pt-5">
      <a href data-toggle="modal" data-target="#profile">
        <img src="/assets/images/avatar.png" className="avatar " alt />
      </a>
      <h3 className="py-2">{user.userName}</h3>
      <button  onClick={(e)=>{shareProfile(e,window.location)}} data-toggle="modal" data-target="#share" className="btn btn-default-outline share "><i className="fas fa-share-alt" />  Share Profile</button>
    </div>
  </div>
  <div className="container text-center my-5 text-center">
    <div className="row">
{
    message.length==0 ?   (  
     <div className="col-md-12">
    <div className="card py-5">
      <p>no messages yet</p>
    </div>
  </div>
    ): 
 ( message.map((message,index)=>(
    <div className="col-md-12 my-1 ">
    <div className="card py-2">
      <p>{message.text} <button onClick={()=>deleteMess(message._id)} className={style.del}><i class="fa-solid fa-trash"></i></button></p>
    </div>
  </div>
 )
  
  ))

}

  
    </div>
  </div>
</div>

    </div>
  )
}
