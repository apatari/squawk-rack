import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import UserViewWorkoutCard from "../cards/UserViewWorkoutCard";
import { Form, Button, Row, Col } from "react-bootstrap";
import ReviewBar from "../cards/ReviewBar";
import { useFormik } from "formik";
import * as yup from "yup"

function ReviewForm({ user, workout}) {

    const history = useHistory()

    const formSchema = yup.object().shape({
        comment: yup.string().max(1000, "Must be fewer than 1000 characters"),
        rating: yup 
          .number()
          .integer()
          .required("Must enter a rating")
          .typeError("Please enter an Integer")
          .max(5)
          .min(0)
      });
    
      const formik = useFormik({
        initialValues: {
          comment: "",
          rating: 0,
        },
        validationSchema: formSchema,
        onSubmit: (values) => { 

          fetch("/api/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({...values, "user_id":user.id, "workout_id": workout.id, rating: parseInt(values.rating)}),
          }).then((res) => {
            if (res.status == 201) {
                history.push(`/workouts/${workout.id}`);
            }
          });
        },
      });


    return (
        <div>
            <Col lg="5" className="mx-auto">
                <h3 className="mt-5 mb-3 ">
                    Reviewing:
                </h3>
                <UserViewWorkoutCard workout={workout} isReview={true} />

                <Form className="mt-5" onSubmit={formik.handleSubmit} >

                    <Form.Group>
                        <ReviewBar avg={formik.values.rating} ht='16px' />
                        <Row  className="my-3">
                            <Col  >
                            <strong>Rating:</strong> 
                            </Col>
                         
                        <Col xs={8}>

                            {[0,1,2,3,4,5].map((num) => {
                                return (
                                <Form.Check
                                    key={num}
                                    inline
                                    value={num}
                                    label={num}
                                    name="rating"
                                    type='radio'
                                    id={`inline-radio-${num}`}
                                    checked={formik.values.rating == num}
                                    onChange={formik.handleChange}
                                    
                                />
                                )
                            })
                            }
                            </Col>
                        </Row> 


                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Leave a comment (optional)</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={4} 
                            placeholder="Comment" 
                            value={formik.values.comment} 
                            onChange={formik.handleChange}
                            id="comment"
                            name="comment"
                        />
                    </Form.Group>
                    <p style={{ color: "red" }}> {formik.errors.comment}</p>
                    <Button className="my-3" variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
                
                
            </Col>
        </div>
    )
}

export default ReviewForm