import React from "react";
import { Card } from "react-bootstrap";

function ReviewCard({ review }) {
    return (
        <div className=" m-3 " style={{width: '38rem'}} >
            <Card>
                <Card.Header> <strong className="text-primary" >{review.user.username}</strong> </Card.Header>
                <Card.Body>
                    <Card.Title>Rating: {review.rating}</Card.Title>
                    <Card.Text>
                        {review.comment}
                    </Card.Text>
                    
                </Card.Body>
            </Card>

        </div>
    )
}

export default ReviewCard