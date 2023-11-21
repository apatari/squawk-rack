import React from "react";
import { Button, Row, Col } from "react-bootstrap";

function ExerciseCard({ exercise, editMode, index, last }) {
    return (
        <div>
            <Row className="my-2" >
                <Col>
                
                    <div className="m-2 fs-4" ><strong>{exercise.name} - </strong>{exercise.sets} sets X {exercise.reps} reps</div>
                </Col>
                <Col>
                       
                    {(editMode)? 
                    <div className="d-flex" >
                        <Button className="btn btn-warning" >Delete</Button>
                        {(index === 0)? 
                            <Button className="mx-2 btn btn-secondary disabled" disabled >Up</Button> 
                            : <Button className="mx-2 btn btn-primary" >Up</Button> }

                        {(index === last)? 
                            <Button className="btn btn-secondary disabled" disabled >Down</Button> 
                            : <Button className="btn btn-primary" >Down</Button> }
                        

                    </div>
                        
                    : ""}
                </Col> 
            </Row>
            

        </div>
        

        )
}

export default ExerciseCard