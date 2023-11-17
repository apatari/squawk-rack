import React from "react";
import UserViewWorkoutCard from "../cards/UserViewWorkoutCard";

function ReviewForm() {
    return (
        <div>
            <Col lg="4" className="mx-auto">
                <h3 className="m-5">
                    Reviewing:
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
                        Log In
                    </Button>
                </Form>
                <Row>
                    <Button className="m-3 text-primary w-45" onClick={handleSignupClick} >Click here to create an account</Button>
                </Row>
                
            </Col>
        </div>
    )
}

export default ReviewForm