import React, { useEffect } from 'react';
import Auth from './Authentication/Auth';
import UserDashboard from './User/UserDashboard';
import { Route,Routes,Navigate } from 'react-router-dom';
import EmailVerified from './Authentication/EmailVerified/EmailVerified';
export const System = () => {
const token = localStorage.getItem("token")
console.log(token)
useEffect(()=>{

},[token])
  return (
    <Routes>
      <Route path='*' element={<Auth/>}/>
       {token && <Route path='/' element={<UserDashboard/>}/>}
       <Route path="/" element={<Navigate replace to="/SignIn" />} />
      <Route path='/users/:id/verify/:token' element={<EmailVerified/>}/>
    </Routes>
  )
}
