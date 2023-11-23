import React from "react";
import { Button, Row, Col } from "react-bootstrap";

function ExerciseCard({ exercise, editMode, index, last, setExercises, exercises }) {

    const handleUpClick = () => {
        [exercises[index], exercises[index - 1]] = [exercises[index - 1], exercises[index]]
        [exercises[index], exercises[index - 1]] = [exercises[index - 1], exercises[index]]
        setExercises([...exercises])
    }

    const handleDownClick = () => {
        [exercises[index], exercises[index + 1]] = [exercises[index + 1], exercises[index]]
        setExercises([...exercises])
    }

    const handleDeleteClick = () => {
        setExercises(exercises.filter(item => {if (item.name === exercise.name && item.sets === exercise.sets && item.reps === exercise.reps) {return false} else {return true}}))
    }

    return (
        <div>
            <Row className="my-2" >
                <Col>
                
                    <div className="m-2 fs-4" ><strong>{exercise.name} - </strong>{exercise.sets} sets X {exercise.reps} reps</div>
                </Col>
                <Col>
                       
                    {(editMode)? 
                    <div className="d-flex" >
                        <Button className="btn btn-warning" onClick={handleDeleteClick} >Delete</Button>
                        {(index === 0)? 
                            <Button className="mx-2 btn btn-secondary disabled" disabled >&#x2191;</Button> 
                            : <Button className="mx-2 btn btn-primary" onClick={handleUpClick} >&#x2191;</Button> }

                        {(index === last)? 
                            <Button className="btn btn-secondary disabled" disabled >&#x2193;</Button> 
                            : <Button className="btn btn-primary" onClick={handleDownClick} >&#x2193;</Button> }
                        

                    </div>
                        
                    : ""}
                </Col> 
            </Row>
            

        </div>
        

        )
}

export default ExerciseCard