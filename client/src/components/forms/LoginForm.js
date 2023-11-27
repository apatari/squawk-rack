import React, { useState,  } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function LoginForm({ onLogin, setSignupMode, signupMode }){

    const [errors, setErrors] = useState([])
    const history = useHistory()
        
    const formSchema = yup.object().shape({
        username: yup.string().required("Please enter a username").max(20, "Username must be 20 characters or fewer"),
        password: yup.string().required("Please enter a password")
    })

    const formik = useFormik({
        initialValues: {
            username: "",
            password: ""
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => {
            fetch("/api/login", {
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
                    r.json().then(err => setErrors(err.errors))
                }
            })
        }
    })


    const handleSignupClick = () => {
        setSignupMode(!signupMode)
    }


    return (
        <div>

            
            <Col lg="4" className="mx-auto">
                <h3 className="m-5">
                    Please login to view page
                </h3>    
                <Form className="m-4"onSubmit={formik.handleSubmit} >
                    <Form.Group className="m-3" >
                        <Form.Label>Username</Form.Label>
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
                    {errors.map((err) => (
                        <p className="text-danger m-3" key={err}>{err}</p>
                    ))}

                    <p style={{ color: "red" }}> {formik.errors.username}</p>
                    <p style={{ color: "red" }}> {formik.errors.password}</p>

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

export default LoginForm