import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import LoginForm from "./LoginForm";
import SignupForm from "./SignUpForm";

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