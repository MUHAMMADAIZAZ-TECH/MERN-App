import React,{useState} from 'react';
import axios from 'axios';
import { TextInput,CustomButton } from '../../UI-Components/Index';
import {Typography,CssBaseline,Box,Container} from '@mui/material';
import "./SignIn.css"
import { Link,useNavigate } from 'react-router-dom';
const SignIn = ()=> {
  const [state,setState] = useState({
    email:"",
    password:""
  })
  const [error,seterror] = useState("")

  const navigate = useNavigate();
  const HanldeInput = (e)=>{
    setState({
      ...state,[e.target.name]:e.target.value
    })
  }
  const HandleClick = async () =>{
    try {
      const url ="http://localhost:8080/api/auth";
      const {data:res}= await axios.post(url,state);
      localStorage.setItem("token",res.data)
      localStorage.setItem("UserData",JSON.stringify(res.userData))
      navigate("/Dashboard")
    } catch (error) {
      if(error.response && 
        error.response.status>= 400 &&
        error.response.status<= 500) 
      {
        seterror(error.response.data.Message)
      }
    }
    
  }
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
      <Box sx={{ height: '90vh' }} >
      <div className='SignInContainer'>
      <Typography variant="h4" gutterBottom>
        Sign In
      </Typography>
        <TextInput 
            fullWidth 
            label="Email" 
            name="email" 
            type="text" 
            value={state.email} 
            change={HanldeInput} 
            variant="outlined" />
        <br/>
          <TextInput 
              fullWidth 
              label="Password" 
              name="password" 
              type="password" 
              value={state.password}  
              change={HanldeInput}
              variant="outlined"/>
          <br/>
          {error && <div>Error:{error}</div>}
          <Link to='/ForgotPassword'>Forgot Password?</Link>
          <br/>
          <CustomButton 
              variant="contained" 
              text="Sign In" 
              size="large"
              fullWidth
              onClick={HandleClick}/>
          <br/>
          <Link to="/SignUp">Sign Up</Link>
      </div>
      </Box>
    </Container>
  </React.Fragment>
  )
}

export default SignIn

