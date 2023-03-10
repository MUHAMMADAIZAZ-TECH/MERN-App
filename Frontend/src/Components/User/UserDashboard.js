import React from 'react'
import { Outlet } from 'react-router-dom';
export default function UserDashboard() {
  const handleLogout = () =>{
    localStorage.removeItem("token");
    window.location.reload();
  }
  return (
    <div>
      <button onClick={handleLogout}> Log Out</button>
      <Outlet />
    </div>
  )
}
