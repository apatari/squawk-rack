import React from "react";
import { Row, Col } from "react-bootstrap";
import ReviewBar from "./ReviewBar";
import ReviewCard from "./ReviewCard";

function ReviewArea({ workout }) {

    const reviewAverage = (workout.reviews.reduce((acc, val) => acc + val.rating, 0) / (workout.reviews.length + .000001)).toFixed(1)

    return (
        <div className="m-2 mt-5" >
            <h3  >Reviews</h3>
            <Row className="m-2">
                <Col>
                    <strong className="fs-4" >Average rating: </strong>
                </Col>

                <Col xs={9} className="d-flex" style={{alignItems:'center'}} >
                    <div className="w-50 my-auto"  >
                        <ReviewBar  avg={reviewAverage} ht='20px'/>
                    </div>
                    
                </Col>

            </Row>
            <Row className="vstack ms-4">
                {workout.reviews.map(review => {
                    return <ReviewCard key={review.id} review={review} />
                })}
            </Row>
            
        </div>
    )
}

export default ReviewArea