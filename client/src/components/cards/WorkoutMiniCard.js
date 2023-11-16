import React, { useState } from "react";
import { Card, Badge, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";

function WorkoutMiniCard({ workout, user, setWorkouts, workouts, onUpdateWorkout }) {

    const [isFav, setIsFav] = useState(false)
    const [favCount, setFavCount] = useState(workout.favorite_count)

    const handleFavClick = () => {
        if (isFav) {
            setFavCount(current => current - 1)
        } else {
            setFavCount(current => current + 1)
        }

        fetch('/api/favorites', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"user_id": user.id, "workout_id": workout.id})
        }).then(r => r.json())
        .then(data => onUpdateWorkout(data))
        .then(setIsFav((currentFav) => !currentFav))
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
                            <Card.Link onClick={handleFavClick} style={{cursor: 'pointer'}}  >
                                {isFav? 'Unfav': 'Favorite'}
                            </Card.Link>
                            <Card.Link onClick={handleReviewClick} style={{cursor: 'pointer'}}  >Review</Card.Link>
                        </Card.Text>
                    </Col>

                    <Col style={{alignItems: 'center'}} className="d-flex justify-content-end" >
                    {(favCount)? <Badge pill bg='primary'>{favCount}</Badge> : ""}
                    </Col>
                    
                </Row>
                
                
            </Card.Body>
        </Card>
    )
}

export default WorkoutMiniCard