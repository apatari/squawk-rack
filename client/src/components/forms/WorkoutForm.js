import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import ExerciseForm from "./ExerciseForm";
import ExerciseList from "../cards/ExerciseList";
import { useFormik } from "formik"
import * as yup from "yup"


function WorkoutForm({ user }) {

    const history = useHistory()

    const [exercises, setExercises] = useState([])

    const formSchema = yup.object().shape({
        name: yup.string()
            .required("Must name workout")
            .max(40, "Name must be 40 characters or fewer"),
        details:  yup.string()
            .required("Please provide details/description")
            .max(1000, "Description must be 1000 characters or fewer"),
        
    })

    const formik = useFormik({
        initialValues: {
            name: "",
            details: ""
        },
        validationSchema: formSchema,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: (values) => { 

            fetch("/api/workouts", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({...values, "user_id":user.id, "exercises": exercises}),
            }).then((res) => {
              if (res.status === 201) {
                    return res.json()
                    .then(workout => {history.push(`/workouts/${workout.id}`)})
                  ;
              }
            });
          }
    })

    return (
        <div>
            <Col lg="6" className="mx-auto">
                
                     
                <Form className="mt-5" onSubmit={formik.handleSubmit} >
                    <Col md="7">
                        <Form.Group className="mb-4 " >
                            <Form.Label className="fs-4" >Workout Name</Form.Label>
                            <Form.Control 
                                id="name" 
                                name="name" 
                                placeholder="Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}  
                            />
                        </Form.Group>
                    </Col>
                    <Form.Group className="mb-3" >
                        <Form.Label>Details / description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={4} 
                            placeholder="Rest intervals, superset suggestions, and general advice" 
                            value={formik.values.details} 
                            onChange={formik.handleChange}
                            id="details"
                            name="details"
                        />
                    </Form.Group>
                    <p style={{ color: "red" }}> {formik.errors.name}</p>
                    <p style={{ color: "red" }}> {formik.errors.details}</p>
                    {(exercises.length > 0)
                    ? <Button className="my-3 btn btn-outline-success "  type="submit">
                        Submit
                    </Button>
                    : <Button className="btn btn-secondary disabled" disabled >Submit</Button>}

                </Form>

                <ExerciseList exercises={exercises} editMode={true} setExercises={setExercises}/>

                <ExerciseForm user={user} exercises={exercises} setExercises={setExercises} />

                
                
            </Col>
        </div>
    )
}

export default WorkoutForm