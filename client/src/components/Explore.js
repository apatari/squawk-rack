import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import WorkoutCard from './WorkoutCard'

function Explore(){

    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        fetch('/workouts')
        .then(res => res.json())
        .then(data => setWorkouts(data))
    }, [])

    return (
        <div>
            <h2 className="m-4" >All workouts</h2>
            <Col className="d-flex flex-wrap p-3" >
                {workouts.map(workout => {
                    return <WorkoutCard key={workout.id} workout={workout} />
                })}
            </Col>
        </div>
    )
}

export default Explore