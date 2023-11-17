import React from "react";
import UserViewWorkoutCard from "../cards/UserViewWorkoutCard";
import { Form, Button, Row, Col } from "react-bootstrap";

function ReviewForm({ user, workout}) {
    return (
        <div>
            <Col lg="4" className="mx-auto">
                <h3 className="mt-5">
                    Reviewing:
                </h3>
                <UserViewWorkoutCard workout={workout} isReview={true} />    
                <Form className="m-4"  >
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                    <Button className="m-3" variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                
                
            </Col>
        </div>
    )
}

export default ReviewForm