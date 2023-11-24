import React, { useState } from "react";
import { Row, Col, Badge, Button, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


function WorkoutInfoCard({ workout, user }) {

    const history = useHistory()

    const [showModal, setShowModal] = useState(false)
    
    const handleShow = () => setShowModal(true)
    const handleClose = () => setShowModal(false)
    
    const handleDelete = () => {
        fetch(`/api/workouts/${workout.id}`, {
            method: "DELETE"
        })
        .then(r => {
            if (r.ok) {
                
                history.push('/')
            } else {
                alert("Error: delete unsuccessful")
                handleClose()
            }
        })
    }

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
                            className="btn btn-outline-info"
                            onClick={() => { history.push(`/workouts/${workout.id}/edit`) }} 
                        >
                            Edit Workout
                        </Button>
                    </Col>
                    <Col>
                        <Button className="btn btn-outline-danger" onClick={handleShow} >Delete this workout</Button>
                    </Col>
                </Row> :
                ""
            }

                <Modal centered  show={showModal} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete Workout</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-dark fs-5" >This will delete the workout along with its exercises and any reviews</Modal.Body>
                    <Modal.Footer>
                    <Button className="btn btn-outline-primary me-auto" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button className="btn btn-outline-danger" onClick={handleDelete}>
                        Delete it all
                    </Button>
                    </Modal.Footer>
                </Modal>
            
        </div>
    )
}

export default WorkoutInfoCard