import React from "react";
import { Card, Badge, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";

function WorkoutMiniCard({ workout }) {

    const handleFavClick = () => {
        console.log(`Add workout ${workout.id} to favorites`)
    }

    const handleReviewClick = () => {
        console.log(`Make a review of workout ${workout.id}`)
    }

    return (
        <Card style={{width: '18rem'}} className="m-2 bg-light "  >
            <Card.Body className="d-flex flex-column" >
                

                <Link to= {`/workouts/${workout.id}`} style={{textDecoration: 'none'}} >
                    <Card.Title   className="fw-bold fs-4 text-primary" >{workout.name}</Card.Title>
                </Link>

                <Card.Subtitle className="mb-2 text-muted">{workout.summary}</Card.Subtitle>

                <Card.Text className="text-dark" >
                    {workout.short_details}
                </Card.Text>
                
                <Row className="d-flex mt-auto" >
                    
                    <Col className="flex-shrink-*" >
                        <Card.Text className="fs-6" >
                            <Card.Link onClick={handleFavClick} style={{cursor: 'pointer'}}  >Favorite</Card.Link>
                            <Card.Link onClick={handleReviewClick} style={{cursor: 'pointer'}}  >Review</Card.Link>
                        </Card.Text>
                    </Col>

                    <Col style={{alignItems: 'center'}} className="d-flex justify-content-end" >
                    {(workout.favorite_count)? <Badge pill bg='primary'>{workout.favorite_count}</Badge> : ""}
                    </Col>
                    
                </Row>
                
                
            </Card.Body>
        </Card>
    )
}

export default WorkoutMiniCard