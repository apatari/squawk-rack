import React, { useState } from "react";

import LoginForm from "./forms/LoginForm";
import SignupForm from "./forms/SignUpForm";

function Login({ onLogin }){

    const [signupMode, setSignupMode] = useState(false)


    return (
        signupMode? 
            <SignupForm signupMode={signupMode} setSignupMode={setSignupMode} onLogin={onLogin} /> : 
            <LoginForm 
                onLogin={onLogin} 
                setSignupMode={setSignupMode} 
                signupMode={signupMode} 
            />
    )
}

  

export default Login