import React, { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Form, Button, Row, Col } from "react-bootstrap";

function SignupForm( { signupMode, setSignupMode }) {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()

    const handleReturnClick = () => {
        setSignupMode(!signupMode)
    }

    const handleSubmit = () => {

    }

    return (
        <div>
            <Button className="m-3" onClick={handleReturnClick}>return to login</Button>
            <Col lg="4" className="mx-auto">
                <h3 className="m-5 text-success">
                    Enter a username and password to sign up
                </h3>    
                <Form className="m-4"onSubmit={handleSubmit} >
                    <Form.Group className="m-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="username" 
                            placeholder="Enter username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}  
                        />
                    </Form.Group>
                
                    <Form.Group className="m-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group className="m-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)} 
                        />
                    </Form.Group>
                    <Row className="ms-auto">
                        <Button className="m-3 btn btn-outline-success w-25 ms-auto" variant="primary" type="submit">
                        Sign Up
                    </Button>
                    </Row>
                    
                </Form>
                
                
            </Col>
        </div>
        
    )
}

export default SignupForm