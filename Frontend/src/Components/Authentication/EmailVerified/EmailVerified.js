import axios from 'axios';
import React,{useEffect, useState,} from 'react'
import { Link, useParams } from 'react-router-dom';
import { CustomButton } from '../../UI-Components/Index';

export default function EmailVerified() {
    const params = useParams();
    const [validUrl,setvalidUrl] = useState(false);
    useEffect(()=>{
        const verifyEmailUrl = async()=>{
            try {
            const url = `http://localhost:8080/api/users/${params.id}/verify/${params.token}`;
            const {data} = await axios.get(url);
            setvalidUrl(true)
            } catch (error) {
                setvalidUrl(false)
            }
        }
        verifyEmailUrl()
    },[params])
  return (
    <div>{validUrl?(
        <div>
            <h2>Email Verified Successfully</h2>
            <Link to="/SignIn">
            <CustomButton text={"SignIn"}>
                </CustomButton>
                </Link>
        </div>
    ):<h2>404 Not Found</h2>}</div>
  )
}
