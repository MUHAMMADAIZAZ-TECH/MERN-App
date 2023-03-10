import React,{useState} from 'react';
import { TextInput,CustomButton } from '../../UI-Components/Index';
import {Typography,CssBaseline,Box,Container} from '@mui/material';
import "./SignIn.css"
import { Link } from 'react-router-dom';
const SignIn = ()=> {
  const [state,setState] = useState({
    Email:"",
    Password:""
  })
  const HanldeInput = (e)=>{
    setState({
      ...state,[e.target.name]:e.target.value
    })
  }
  const HandleClick = () =>{
    console.log(state)
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
            name="Email" 
            type="text" 
            value={state.Email} 
            change={HanldeInput} 
            variant="outlined" />
        <br/>
          <TextInput 
              fullWidth 
              label="Password" 
              name="Password" 
              type="password" 
              value={state.Password}  
              change={HanldeInput}
              variant="outlined"/>
          <br/>
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

