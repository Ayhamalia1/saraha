import React, { useEffect, useState } from 'react'
import Navbar from './component/Navbar/Navbar'
import Home from './component/Home/Home'
import Login from './component/login/Login'
import Register from './component/register/Register'
import NotFound from './component/NotFound/NotFound'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Loader from './component/Loader/Loader'
import UsersPage from './component/UsersPage/UsersPage'
import UserProfile from './component/UserProfile'
import MyProfile from './component/MyProfile'
import cookie from 'react-cookies';
import { ToastContainer, toast } from 'react-toastify';
import ForgetMessage from './component/ForgetMessage'
import ResetPassword from './component/ResetPassword/ResetPassword'






function App() {

let navigate=useNavigate()
  let [users, setUsers] = useState([]);
  let [logUser, setLogUser] = useState(cookie.load("token"));
  let [Loding, setLoding] = useState(true);
  async function getUsers() {
    let { data } = await axios.get('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers');
    setLoding(false);
    setUsers(data);

  }
  const logout = () => {
    setLogUser(null);
    cookie.remove("token");
    navigate('/login')
  }

  useEffect(() => {
    getUsers();
  }, [])
  return (
    <div>

      <Navbar logUser={logUser} logout={logout} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {Loding ? <Loader /> :
        <Routes>
          {logUser ? <>
            <Route path="/messages" element={<MyProfile users={users} logUser={logUser} />} />
          </> :

            <>
              <Route path='/' element={<Home />} ></Route>
              <Route path='/login' element={<Login setLogUser={setLogUser} />} ></Route>
              <Route path='/register' element={<Register />} ></Route>
              <Route path='/forgerPassword' element={<ForgetMessage />} ></Route>
              <Route path='/resetpassword/:email' element={<ResetPassword />} ></Route>


            </>}

          <Route path='/user/:id' element={<UserProfile users={users} />} ></Route>
          <Route path='/list' element={<UsersPage users={users} />} ></Route>
          <Route path='*' element={<NotFound />} ></Route>
        </Routes>}



    </div>
  )
}

export default App