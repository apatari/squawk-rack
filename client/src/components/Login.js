import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function Login({ onLogin }){

        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")
        const [errors, setErrors] = useState([])
        
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        }).then(r => {
            if (r.ok) {
                r.json().then(user => onLogin(user))
            } else {
                r.json.then(err => setErrors(err.errors))
            }
        })
    }


    return (
        <div>

            
            <Col lg="4" className="mx-auto">
                <h3 className="m-5">
                    Please login to view page
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
                
                    <Button className="m-3" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <h4 className="m-5">Click here to create an account</h4>
            </Col>
        </div>
        
    )
}

export default Login