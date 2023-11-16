import React from "react";
import { Card, Placeholder } from "react-bootstrap";

function PHWorkoutCard() {
    return (
        <div>
            <Card style={{ width: '18rem' }}>
                
                <Card.Body>
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={6} />
                </Placeholder>
                <Placeholder as={Card.Text} animation="glow">
                    <Placeholder xs={7} /> <Placeholder xs={4} /> <Placeholder xs={4} />{' '}
                    <Placeholder xs={6} /> <Placeholder xs={8} />
                </Placeholder>
                <div className="d-flex justify-content-end" >
                    <Placeholder.Button variant="primary" xs={3} />
                </div>
                
                </Card.Body>
            </Card>
        </div>
    )
}

export default PHWorkoutCard