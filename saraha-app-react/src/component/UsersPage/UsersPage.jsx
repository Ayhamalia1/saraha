import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import pagination from '../../Utilites/pagination';
import Pagination from '../Pagination';

export default function UsersPage(props) {
  let [PageInfo,setPageInfo] = useState({
    pageNumber:0,
    pageSize:15

  })

  let [result,setResult]=useState(props.users)
  
  let navigate = useNavigate();
  const Search=(e)=>{
    let {value}=e.target;
    let arr=[];
    props.users.map((user)=>{
      if(user.userName.toLowerCase().includes(value.toLowerCase())){
        arr.push(user);
      }
      
    });
    setResult(arr);
    setPageInfo({...PageInfo,pageNumber:0})


  }
   const changePage=(page)=>{
    setPageInfo({...PageInfo,pageNumber:page})

   }
    return (
    <div className='container'>
<div className="input-group mb-3 mt-4">
  <span className="input-group-text" id="basic-addon1"></span>
  <input onChange={Search}  type="sreach" className="form-control" placeholder="search" aria-label="Username" aria-describedby="basic-addon1" />
</div>

  <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col"></th>
     
    </tr>
  </thead>
  <tbody>
    {pagination(result,PageInfo.pageNumber,PageInfo.pageSize).map((user, index) => 
       <tr key={user._id}>
       <th scope="row">{index+1}</th>
       <td>{user.userName}</td>
       <td><button onClick={()=>{navigate(`/user/${user._id}`)}} className='btn '>Send message  <i class="fa-regular fa-paper-plane"></i></button></td>
      
     </tr>

    
    )}
    
   
    
  </tbody>
</table>
<Pagination users={result} changePage={changePage}  {...PageInfo} />

    </div>
  )
}
