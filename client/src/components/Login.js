import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

function Login(){
    return (
        <div>

            
            <Col lg="5" className="mx-auto">
                <h1 className="m-5">
                Login
                </h1>    
                <Form className="m-5">
                    <Form.Group className="m-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" />
                    {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text> */}
                    </Form.Group>
                
                    <Form.Group className="m-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                    
                    </Form.Group>
                    <Button className="m-3" variant="primary" type="submit">
                    Submit
                    </Button>
                </Form>
            </Col>
        </div>
        
    )
}

export default Login