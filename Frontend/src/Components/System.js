import React from 'react';
import Auth from './Authentication/Auth';
import UserDashboard from './User/UserDashboard';
import { Route,Routes,Navigate } from 'react-router-dom';
import EmailVerified from './Authentication/EmailVerified/EmailVerified';
export const System = () => {
const token = localStorage.getItem("token")
  return (
    <Routes>
      <Route path='*' exact element={<Auth/>}/>
       {token && <Route path='/' exact element={<UserDashboard/>}/>}
       <Route path="/" exact element={<Navigate replace to="/SignIn" />} />
      <Route path='/users/:id/verify/:token' exact element={<EmailVerified/>}/>
    </Routes>
  )
}
