import React from "react";
import { Row, Col } from "react-bootstrap";

function WorkoutInfoCard({ workout }) {
    return (
        <div>
            <h1>{workout.name}</h1>
            <Row  >
                <Col lg={8}>
                    <div class="list-group d-md-flex">
                        <a href="#" class=" list-group-item flex-column align-items-start active">
                            <p class="mb-1">{workout.details}</p>
                        </a>
                    
                    </div>
                </Col>
                <Col></Col>
                <Col></Col>
                
                

            </Row>
            
            
        </div>
    )
}

export default WorkoutInfoCard