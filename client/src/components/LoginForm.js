import React, { useState,  } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginForm({ onLogin, setSignupMode, signupMode }){

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState([])
    const history = useHistory()
        
    const handleSubmit = (e) => {
        e.preventDefault()

        if (password && username) {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({username, password}),
        }).then(r => {
            if (r.ok) {
                r.json().then(user =>onLogin(user)) 
                history.push('/')    
            } else {
                r.json().then(err => setErrors(err.errors))
            }
        })
        } else {
            setErrors(["Please enter a username and password"])
        }

        
    }

    const handleSignupClick = () => {
        setSignupMode(!signupMode)
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
                    {errors.map((err) => (
                        <p className="text-danger m-3" key={err}>{err}</p>
                    ))}
                    <Button className="m-3" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row>
                    <Button className="m-3 text-primary w-45" onClick={handleSignupClick} >Click here to create an account</Button>
                </Row>
                
            </Col>
        </div>
        
    )
}

export default LoginForm