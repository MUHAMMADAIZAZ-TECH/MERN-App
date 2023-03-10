import React from 'react';
import Auth from './Authentication/Auth';
import UserDashboard from './User/UserDashboard';
import { Route,Routes } from 'react-router-dom';
export const MovieSystem = () => {
  const user = localStorage.getItem("token");

  return (
    <>
    <Auth/>
    </>
    // <Routes>
    //   <Route path='/' element={<Auth/>}/>
    //   <Route path='/Dashboard' element={<UserDashboard/>}/>
    // </Routes>
  )
}
