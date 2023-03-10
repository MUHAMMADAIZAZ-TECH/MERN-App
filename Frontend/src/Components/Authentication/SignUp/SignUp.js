import React,{useState} from 'react';
import axios from "axios";
import { TextInput,CustomButton } from '../../UI-Components/Index';
import {Typography,CssBaseline,Box,Container,Grid} from '@mui/material';
import "./SignUp.css"
import { Link,useNavigate } from 'react-router-dom';
const SignUp = ()=> {
  const [state,setState] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
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
      const url ="http://localhost:8080/api/users";
      const {data:res}= await axios.post(url,state);
      console.log("Navigate To Sign In: User Registerd Successfully")
       navigate("/SignIn")
      console.log(res.Message)
    } catch (error) {
      if(error.response && 
        error.response.status>= 400 &&
        error.response.status<= 500) 
      {
        seterror(error.response.data.Message)
      }
    }
    
  }
  // const DataValidator = () =>{

  // }
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
      <Box sx={{ height: '80vh' }} >
      <div className='SignInContainer'>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        <TextInput 
            fullWidth 
            label="First Name" 
            name="firstName" 
            type="text" 
            required
            value={state.firstName} 
            change={HanldeInput} 
            variant="outlined" />
        </Grid>
        <Grid item xs={6}>
        <TextInput 
            fullWidth 
            required
            label="Last Name" 
            name="lastName" 
            type="text" 
            value={state.lastName} 
            change={HanldeInput} 
            variant="outlined" />
        </Grid>
        <Grid item xs={12}>
        <TextInput 
            fullWidth 
            required
            label="Email" 
            name="email" 
            type="text" 
            value={state.email} 
            change={HanldeInput} 
            variant="outlined" />
        </Grid>
        <Grid item xs={12}>
        <TextInput 
              fullWidth 
              required
              label="Password" 
              name="password" 
              type="password" 
              value={state.password}  
              change={HanldeInput}
              variant="outlined"/>
        </Grid>
        <Grid item xs={12}>
        <CustomButton 
              variant="contained" 
              text="Sign Up" 
              size="large"
              fullWidth
              onClick={HandleClick}/>
        </Grid>
      </Grid>
      {error && <div>Error:{error}</div>}
      <br/>
      <Link to="/">already have account?</Link>
      </div>
      </Box>
    </Container>
  </React.Fragment>
  )
}

export default SignUp;

