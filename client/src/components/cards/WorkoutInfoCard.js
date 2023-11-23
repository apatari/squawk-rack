import React from "react";
import { Row, Col, Badge, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function WorkoutInfoCard({ workout, user }) {

    const history = useHistory()

    return (
        <div>
            <Row>
                <Col>
                    <h1><strong>{workout.name}</strong></h1>
                </Col>
                <Col>
                    {(workout.favorite_count)? 
                        <Badge pill bg='primary'>{workout.favorite_count} favorite
                            {(workout.favorite_count > 1)?"s"
                        :''}</Badge> : ""}
                </Col>
            </Row>
            
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
            
            {(workout.user_id === user.id)?
                <Row className="my-3" lg={4} >
                    <Col>
                        <h3 className="text-primary" >This is your workout</h3>
                    </Col>
                    <Col>
                        <Button 
                            className="btn btn-outline-warning"
                            onClick={() => { history.push(`/workouts/${workout.id}/edit`) }} 
                        >
                            Edit Workout
                        </Button>
                    </Col>
                    <Col>
                        <Button className="btn btn-outline-danger" >Delete this workout</Button>
                    </Col>
                </Row> :
                ""
            }

            
            
        </div>
    )
}

export default WorkoutInfoCard