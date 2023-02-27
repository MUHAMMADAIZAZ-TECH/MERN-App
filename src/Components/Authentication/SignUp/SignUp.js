import React,{useState} from 'react';
import { TextInput,CustomButton } from '../../UI-Components/Index';
import {Typography,CssBaseline,Box,Container,Grid} from '@mui/material';
import "./SignUp.css"
const SignUp = ()=> {
  const [state,setState] = useState({
    FirstName:"",
    LastName:"",
    Email:"",
    Password:"",
    ConfirmPassword:""
  })
  const HanldeInput = (e)=>{
    setState({
      ...state,[e.target.name]:e.target.value
    })
  }
  const HandleClick = () =>{
    console.log(state)
  }
  const DataValidator = () =>{

  }
  return (
    <React.Fragment>
    <CssBaseline />
    <Container maxWidth="sm">
      <Box sx={{ height: '90vh' }} >
      <div className='SignInContainer'>
      <Typography variant="h4" gutterBottom>
        Sign Up
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
        <TextInput 
            fullWidth 
            label="First Name" 
            name="FirstName" 
            type="text" 
            required
            value={state.FirstName} 
            change={HanldeInput} 
            variant="outlined" />
        </Grid>
        <Grid item xs={6}>
        <TextInput 
            fullWidth 
            required
            label="Last Name" 
            name="LastName" 
            type="text" 
            value={state.LastName} 
            change={HanldeInput} 
            variant="outlined" />
        </Grid>
        <Grid item xs={12}>
        <TextInput 
            fullWidth 
            required
            label="Email" 
            name="Email" 
            type="text" 
            value={state.Email} 
            change={HanldeInput} 
            variant="outlined" />
        </Grid>
        <Grid item xs={12}>
        <TextInput 
              fullWidth 
              required
              label="Password" 
              name="Password" 
              type="password" 
              value={state.Password}  
              change={HanldeInput}
              variant="outlined"/>
        </Grid>
        <Grid item xs={12}>
        <TextInput 
              fullWidth 
              required
              label="Confirm Password" 
              name="ConfirmPassword" 
              type="password" 
              value={state.ConfirmPassword}  
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
      <a href='#'>already have account?</a>
      </div>
      </Box>
    </Container>
  </React.Fragment>
  )
}

export default SignUp;

