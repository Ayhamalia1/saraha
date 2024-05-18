import axios from 'axios';
import React, { useState } from 'react'
import copy from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



export default function UserProfile({users}) {
 
    let [input,setInput]=useState();
    let {id}=useParams();
    let [user,setUsers]=useState(users.find(user=>user._id===id));
    
    let onchange=(e)=>{
        let{value}  = e.target;
        setInput(value);

    }
    let onsubmit=async(e)=>{
        e.preventDefault();
        let{data}= await axios.post(`https://lazy-blue-sockeye-gear.cyclic.app/api/v1/message/${id}`,{message:input});
       if(data.message=="success"){
        toast.success("message sent successfully!");
       
       

       }
    }
    let shareProfile=(e,url)=>{
      e.preventDefault();
    copy(url)
    
    
     }
  return (
   <div> <div className="container text-center py-5 my-5 text-center">
    <div className="card py-5 mb-5">
      <a href data-toggle="modal" data-target="#profile">
        <img src='/assets/images/avatar.png' className="avatar " alt />
      </a>
      <h3 className="py-2">{user.userName}</h3>
      <div className="container w-50 m-auto">
        <form action method="post" onSubmit={onsubmit}>
          <textarea className="form-control" onChange={onchange} name id="area" cols={10} rows={9} placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)" defaultValue={""} />
          <button className="btn btn-outline-info mt-3"><i className="far fa-paper-plane" /> Send</button>
        </form>
      </div>
    </div>
    <button  onClick={(e)=>{shareProfile(e,window.location)}} data-toggle="modal" data-target="#share" className="btn btn-default-outline share "><i className="fas fa-share-alt" />  Share Profile</button>
  </div></div>

  )
}
