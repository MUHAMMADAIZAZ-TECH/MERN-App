import React from 'react';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import ForgotPassword from './ForgotPassword/ForgotPassword';
import { Route,Routes } from 'react-router-dom';
import EmailVerified from './EmailVerified/EmailVerified';
import PasswordReset from './PasswordReset/PasswordReset';
function Auth() {
    return (
        <Routes>
            <Route path='/SignIn' element={<SignIn/>}/>
            <Route path='/SignUp' element={<SignUp/>}/>
            <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
            <Route path="/users/:id/verify/:token" element={<EmailVerified/>}/>
            <Route path="/password-reset/:id/:token" element={<PasswordReset/>}/>
        </Routes>
    );
}

export default Auth;