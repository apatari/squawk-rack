import React from "react";
import { Row, Col } from "react-bootstrap";

function WorkoutInfoCard({ workout }) {
    return (
        <div>
            <h1><strong>{workout.name}</strong></h1>
            <Row  >
                <Col lg={8}>
                    <div className="fs-5 alert-info d-md-flex m-1 p-2 text-dark rounded-2">
                        <div className="  flex-column align-items-start active">
                            <p className="mb-1">{workout.details}</p>
                        </div>
                    
                    </div>
                </Col>
                <Col></Col>
                <Col></Col>
            </Row>
            <Row className="m-2">
                <Col>By <strong>{workout.user.username}</strong></Col>
                <Col>Created <strong>{workout.created_at}</strong></Col>
                
            </Row>
            <Row>
                <Col></Col>
                {Boolean(workout.updated_at)? <Col>Updated <strong>{workout.updated_at}</strong></Col> : ""}
                
            </Row>

            
            
        </div>
    )
}

export default WorkoutInfoCard