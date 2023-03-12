import axios from 'axios';
import React ,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { TextInput,CustomButton } from '../../UI-Components/Index';
import {Typography,CssBaseline,Box,Container} from '@mui/material';
export default function PasswordReset() {
    const [state,setState] = useState({password:""})
    const [validUrl,setValidUrl] = useState(false);
    const [error,seterror] = useState("")
    const [msg,setmsg] = useState("")
    const params = useParams();
    const url = `http://localhost:8080/api/password-reset/${params.id}/${params.token}`
    const HanldeInput = (e)=>{
        setState({
          ...state,[e.target.name]:e.target.value
        })
      }
      const HandleClick = async () =>{
        try {
          const {data:res}= await axios.post(url,state);
          setmsg(res.Message)
          seterror("")
          window.location = "/SignIn"
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
    useEffect(()=>{
        const verifyUrl = async () =>{
            try {
                await axios.get(url)
                setValidUrl(true)
            } catch (error) {
                setValidUrl(false)
            }
        }
        verifyUrl()
    },[params.id,params.token])
  return (
    <React.Fragment>{validUrl?(
      <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Box sx={{ height: '50vh' }} >
        <div className='PasswordResetContainer'>
        <Typography variant="h4" gutterBottom>
          Enter New Password
        </Typography>
          <TextInput 
              fullWidth 
              label="Password" 
              name="password" 
              type="password" 
              value={state.password} 
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
  ):(
      <div>
          <h1>404 Not Found</h1>
      </div>
  )}
     </React.Fragment>
  )
}
