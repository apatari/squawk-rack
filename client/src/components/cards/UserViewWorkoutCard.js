import React from "react";
import { Card, Badge, Row, Col } from 'react-bootstrap'
import { Link } from "react-router-dom";
import ReviewBar from "./ReviewBar";

function UserViewWorkoutCard({ workout, isReview }) {
// Add a prop to show when this card is used as part of the create review page
//  that will let you conditionally render things like the review button and the bar
 
    const favCount = workout.favorite_count


    const handleReviewClick = () => {
        console.log(`Make a review of workout ${workout.id}`)
    }
    
    const reviewAverage = (workout.reviews.reduce((acc, val) => acc + val.rating, 0) / (workout.reviews.length + .000001)).toFixed(1)
   

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
                {isReview? "":
                <Row className="d-flex mt-auto" >

                    <div className="mb-3" >
                            {(workout.reviews.length > 0)?<ReviewBar avg={reviewAverage} ht='11px' />:""}
                    </div>

                    <Col className="flex-shrink-* d-flex justify-content-end " >
                    
                        <Card.Text className="fs-6" >
                            
                            <Card.Link href={`/reviewfor/${workout.id}`} style={{cursor: 'pointer'}} className=""  >Review</Card.Link>
                        </Card.Text>
                    </Col>

                    <Col style={{alignItems: 'center'}} className="d-flex justify-content-end" >
                    {(favCount)? <Badge pill bg='primary'>{favCount}</Badge> : ""}
                    </Col>
                    
                </Row>}
                
                
            </Card.Body>
        </Card>
    )
}

export default UserViewWorkoutCard