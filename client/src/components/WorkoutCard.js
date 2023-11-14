import React from "react";
import { Card } from 'react-bootstrap'

function WorkoutCard({ workout }) {

    function handleFavClick(e) {
        console.log("Add to favorites")
    }

    return (
        <Card style={{width: '18rem'}} className="m-2 bg-light "  >
            <Card.Body className="d-flex flex-column" >
                <Card.Title className="fw-bold fs-4 text-primary" >{workout.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{workout.summary}</Card.Subtitle>
                <Card.Text className="text-dark" >
                    {workout.short_details}
                </Card.Text>
                <Card.Text className="mt-auto" >
                    <Card.Link onClick={handleFavClick} style={{cursor: 'pointer'}}  >Add to favorites</Card.Link>
                <Card.Link href="#">Review</Card.Link>
                </Card.Text>
                
            </Card.Body>
        </Card>
    )
}

export default WorkoutCard