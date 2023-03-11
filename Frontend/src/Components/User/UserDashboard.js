import React from 'react'
import { Outlet ,useNavigate} from 'react-router-dom';
export default function UserDashboard() {
  const navigate = useNavigate()
  const UserData = JSON.parse(localStorage.getItem("UserData"))
  const handleLogout = () =>{
    localStorage.removeItem("token");
    localStorage.removeItem("UserData");
    navigate("/SignIn")
  }
  return (
    <div>
      first Name:  {UserData?.firstName}
      <br/>
      Last Name: {UserData?.lastName}
      <br/>
      Email: {UserData?.email}
      <button onClick={handleLogout}> Log Out</button>
      <Outlet />
    </div>
  )
}
