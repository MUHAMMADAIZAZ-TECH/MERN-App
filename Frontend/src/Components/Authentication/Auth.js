import React from 'react';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import { Route,Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EmailVerified from './EmailVerified/EmailVerified';
function Auth() {
    return (
        <Routes>
            <Route path='/SignIn' element={<SignIn/>}/>
            <Route path='/SignUp' element={<SignUp/>}/>
            <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
            <Route path="/users/:id/verify/:token" element={<EmailVerified/>}/>
        </Routes>
    );
}

export default Auth;