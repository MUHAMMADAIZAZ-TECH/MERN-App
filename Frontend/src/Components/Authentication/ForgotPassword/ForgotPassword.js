import React,{useState} from 'react';
import { TextInput,CustomButton } from '../../UI-Components/Index';
import {Typography,CssBaseline,Box,Container} from '@mui/material';
import "./ForgotPassword.css"
import axios from 'axios';
export default function ForgotPassword() {
    const [state,setState] = useState({email:""})
    const [error,seterror] = useState("")
    const [msg,setmsg] = useState("")
      const HanldeInput = (e)=>{
        setState({
          ...state,[e.target.name]:e.target.value
        })
      }
      const HandleClick = async () =>{
        try {
          const url ="http://localhost:8080/api/password-reset";
          const {data:res}= await axios.post(url,state);
          setmsg(res.Message)
          seterror("")
          // console.log("Navigate To Sign In: User Registerd Successfully")
          
        } catch (error) {
          if(error.response && 
            error.response.status>= 400 &&
            error.response.status<= 500) 
          {
            seterror(error.response.data.Message)
            setmsg("")
          }
        }
        
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
            name="email" 
            type="text" 
            value={state.email} 
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
      {error && <div>Error:{error}</div>}
      {msg && <div>Message:{msg}</div>}
      </Box>
    </Container>
  </React.Fragment>
  )
}
