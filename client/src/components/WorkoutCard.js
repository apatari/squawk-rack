import React from "react";
import { Card } from 'react-bootstrap'

function WorkoutCard({ workout }) {
    return (
        <Card style={{width: '18rem'}} className="m-2 bg-light "  >
            <Card.Body>
                <Card.Title className="fw-bold fs-4 text-primary" >{workout.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                <Card.Text>
                    {workout.details}
                </Card.Text>
                <Card.Link href="#">Add to favorites</Card.Link>
                <Card.Link href="#">Review</Card.Link>
            </Card.Body>
        </Card>
    )
}

export default WorkoutCard