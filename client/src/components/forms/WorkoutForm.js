import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import ExerciseForm from "./ExerciseForm";


function WorkoutForm() {
    return (
        <div>
            <Col lg="6" className="mx-auto">
                {/* <h3 className="mt-5 mb-3 ">
                    Reviewing:
                </h3> */}
                
                     
                <Form className="mt-5"  >
                    <Col md="7">
                        <Form.Group className="mb-4 " >
                            <Form.Label className="fs-4" >Workout Name</Form.Label>
                            <Form.Control 
                                type="username" 
                                placeholder="Name"
                                // value={username}
                                // onChange={e => setUsername(e.target.value)}  
                            />
                        </Form.Group>
                    </Col>
                    <Form.Group className="mb-3" >
                        <Form.Label>Details / description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={4} 
                            placeholder="Rest intervals, superset suggestions, and general advice" 
                            // value={formik.values.comment} 
                            // onChange={formik.handleChange}
                            id="details"
                            name="details"
                        />
                    </Form.Group>
                    {/* <p style={{ color: "red" }}> {formik.errors.comment}</p> */}

                    <ExerciseForm/>

                    <Button className="my-3" variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
                
                
            </Col>
        </div>
    )
}

export default WorkoutForm