import React, { useState } from "react";
import UserViewWorkoutCard from "../cards/UserViewWorkoutCard";
import { Form, Button, Row, Col } from "react-bootstrap";
import ReviewBar from "../cards/ReviewBar";

function ReviewForm({ user, workout}) {


    const [rating, setRating] = useState(0)

    function handleRatingChange(e) {
        setRating(e.target.value)
    }


    return (
        <div>
            <Col lg="5" className="mx-auto">
                <h3 className="mt-5 mb-3 ">
                    Reviewing:
                </h3>
                <UserViewWorkoutCard workout={workout} isReview={true} />

                <Form className="mt-5"  >

                    <Form.Group>
                        <ReviewBar avg={rating} ht='16px' />
                        <Row  className="my-3">
                            <Col  >
                            <strong>Rating:</strong> 
                            </Col>
                         
                        <Col xs={8}>

                            {[0,1,2,3,4,5].map((num) => {
                                return (
                                <Form.Check
                                    
                                    inline
                                    value={num}
                                    label={num}
                                    name="group1"
                                    type='radio'
                                    id={`inline-radio-${num}`}
                                    checked={rating == num}
                                    onChange={handleRatingChange}
                                    
                                />
                                )
                            })
                            }
                            </Col>
                        </Row> 


                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Label>Leave a comment</Form.Label>
                        <Form.Control as="textarea" rows={4} placeholder="Comment" />
                    </Form.Group>

                    <Button className="my-3" variant="primary" type="submit">
                        Submit
                    </Button>

                </Form>
                
                
            </Col>
        </div>
    )
}

export default ReviewForm