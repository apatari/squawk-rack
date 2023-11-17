import React from "react";
import { Row, Col } from "react-bootstrap";
import ReviewBar from "./ReviewBar";
import ReviewCard from "./ReviewCard";

function ReviewArea({ workout }) {

    const reviewAverage = (workout.reviews.reduce((acc, val) => acc + val.rating, 0) / (workout.reviews.length + .000001)).toFixed(1)

    return (
        <div className=" mt-5" >
            
            <Row className=" ">
                <Col>
                    <h3  >Average rating: </h3>
                </Col>

                <Col xs={9} className="d-flex" style={{alignItems:'center'}} >
                    <div className="w-50 my-auto"  >
                        <ReviewBar  avg={reviewAverage} ht='20px'/>
                    </div>
                    
                </Col>

            </Row>
            <h3 className=" mt-4 ms-3 " >Reviews ({workout.reviews.length})</h3>

            <Row className="vstack ms-4">
                {workout.reviews.map(review => {
                    return <ReviewCard key={review.id} review={review} />
                })}
            </Row>
            
        </div>
    )
}

export default ReviewArea