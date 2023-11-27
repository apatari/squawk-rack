import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Form, Button, Row, Col } from "react-bootstrap";

function SignupForm( { signupMode, setSignupMode, onLogin }) {

    const [errors, setErrors] = useState([])
    const history = useHistory()

    const handleReturnClick = () => {
        setSignupMode(!signupMode)
    }

    const formSchema = yup.object().shape({
        username: yup.string().required("Please enter a username").max(20, "Username must be 20 characters or fewer"),
        password: yup.string().required("Please enter a password").min(4, "Passwords need to be 4 characters or more"),
        confirmPassword: yup.string().required("Please confirm password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            setErrors([])
            if (formik.values.password === formik.values.confirmPassword){
            
                fetch('/api/signup', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }).then(r => {
                    if (r.ok) {
                        r.json().then(user =>onLogin(user)) 
                        history.push('/')    
                    } else {
                        r.json().then(err => setErrors((currentErrors) => [...currentErrors, err.errors]))
                    }
                })
            } else {
                setErrors((currentErrors) => [...currentErrors, "Password confirmation did not match"])
            }
        }
    })


    return (
        <div>
            <Button className="m-3" onClick={handleReturnClick}>return to login</Button>
            <Col lg="4" className="mx-auto">
                <h3 className="m-5 text-success">
                    Enter a username and password to sign up
                </h3>    
                <Form className="m-4"onSubmit={formik.handleSubmit} >
                    <Form.Group className="m-3" >
                        <Form.Label>Username - will be visible to other users</Form.Label>
                        <Form.Control 
                            type="username" 
                            name="username" 
                            id="username" 
                            placeholder="Enter username"
                            value={formik.values.username}
                            onChange={formik.handleChange}  
                        />
                    </Form.Group>
                
                    <Form.Group className="m-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password" 
                            id="password" 
                            placeholder="Password"
                            value={formik.values.password}
                            onChange={formik.handleChange} 
                        />
                    </Form.Group>

                    <Form.Group className="m-3" >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange} 
                        />
                    </Form.Group>
                    {errors.map((err) => (
                        <p className="text-danger m-3" key={err}>{err}</p>
                    ))}


                    <p className="text-danger m-3"> {formik.errors.username}</p>
                    <p className="text-danger m-3"> {formik.errors.password}</p>
                    <p className="text-danger m-3"> {formik.errors.confirmPassword}</p>

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