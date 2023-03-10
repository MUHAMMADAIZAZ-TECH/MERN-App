import React from 'react';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import ForgotPassword from './ForgotPassword/ForgotPassword';

import { Route,Routes } from 'react-router-dom';
function Auth() {
    return (
        <Routes>
            <Route path='/SignIn' element={<SignIn/>}/>
            <Route path='/SignUp' element={<SignUp/>}/>
            <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        </Routes>
    );
}

export default Auth;