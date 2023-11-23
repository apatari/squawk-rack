import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik"
import * as yup from "yup"

function ExerciseForm({ user, exercises, setExercises }) {


    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Must name each exercise")
            .max(30, "Name must be 30 characters or fewer"),
        sets:  yup.number("Sets must be a number")
            .positive("Sets cannot be negative or zero")
            .integer()
            .required("Must enter number of sets").max(20, "Max sets: 20"),
        reps:  yup.number("Reps must be a number")
            .positive("Reps cannot be positive or zero")
            .integer()
            .required("Must enter number of reps").max(100, "Max reps: 100")
        
    })  

    const formik = useFormik({
        initialValues: {
            name: "",
            sets: 0,
            reps: 0,
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values,  { resetForm }) => {
            setExercises((current) => [...current, {...values, "sets": parseInt(values.sets), "reps": parseInt(values.reps)}])
            // console.log(JSON.stringify({...values, "order_number": orderNumber, "sets": parseInt(values.sets), "reps": parseInt(values.reps)}))
            
            resetForm()
            
        }
    })
    
    return (
        <div>
            {/* <h4 className="mt-5" >Add exercises to your workout</h4> */}
            <Form className="mt-5" onSubmit={formik.handleSubmit}  >
                <Col md="6">
                    <Form.Group className="mb-4 " >
                        <Form.Label className="fs-4" >Exercise</Form.Label>
                        <Form.Control 
                            id="name"
                            name="name"
                             
                            placeholder="Exercise"
                            value={formik.values.name}
                            onChange={formik.handleChange}  
                        />
                    </Form.Group>
                </Col>
                <Col >
                    <Row>
                        <Col>
                            <Form.Group className="mb-4 " >
                                <Form.Label className="fs-4" >Sets</Form.Label>
                                <Col md="4">
                                    <Form.Control 
                                        name="sets" 
                                        id="sets" 
                                        placeholder="Sets"
                                        value={formik.values.sets}
                                        onChange={formik.handleChange}  
                                    />
                                </Col>     
                            </Form.Group>
                        </Col> 
                        <Col>
                            <Form.Group className="mb-4 " >
                                <Form.Label className="fs-4" >Reps</Form.Label>
                                <Col md="4">
                                    <Form.Control 
                                        id="reps" 
                                        name="reps" 
                                        placeholder="Reps"
                                        value={formik.values.reps}
                                        onChange={formik.handleChange}  
                                    />
                                </Col>     
                            </Form.Group>
                        </Col>
                    </Row>
                </Col>
                <p style={{ color: "red" }}> {formik.errors.exerciseName} </p>
                <p style={{ color: "red" }}> {formik.errors.sets} </p>
                <p style={{ color: "red" }}> {formik.errors.reps} </p>

                

                <Button className="my-3 btn btn-outline-primary " variant="primary" type="submit">
                    Add Exercise
                </Button>

            </Form>
        </div>
    )
}

export default ExerciseForm