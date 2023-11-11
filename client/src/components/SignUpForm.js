import React from "react";
import { Button } from "react-bootstrap";

function SignupForm( { signupMode, setSignupMode }) {

    const handleReturnClick = () => {
        setSignupMode(!signupMode)
    }

    return (
        <div>
            <Button className="m-3" onClick={handleReturnClick}>return to login</Button>
            <h2>Signup form goes here</h2>
        </div>
        
    )
}

export default SignupForm