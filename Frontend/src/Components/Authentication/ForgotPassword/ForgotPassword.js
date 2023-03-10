import React,{useState} from 'react';
import { TextInput,CustomButton } from '../../UI-Components/Index';
import {Typography,CssBaseline,Box,Container} from '@mui/material';
import "./ForgotPassword.css"
export default function ForgotPassword() {
    const [state,setState] = useState({Email:""})
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
      <Box sx={{ height: '50vh' }} >
      <div className='ForgotPasswordContainer'>
      <Typography variant="h4" gutterBottom>
        Forgot Password
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
          <CustomButton 
              variant="contained" 
              text="Sign In" 
              size="large"
              fullWidth
              onClick={HandleClick}/>
      </div>
      </Box>
    </Container>
  </React.Fragment>
  )
}
