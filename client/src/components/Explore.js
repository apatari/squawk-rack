import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import WorkoutMiniCard from './cards/WorkoutMiniCard'

function Explore({ user }){

    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        fetch('/api/workouts')
        .then(res => res.json())
        .then(data => setWorkouts(data))
    }, [])

    function handleUpdateWorkout(data) {
        setWorkouts(workouts.map(item => {
            if (item.id === data.id) {
                return data
            } else {
                return item
            }
        }))
    }

    return (
        <div>
            <h2 className="m-4" >All workouts</h2>
            <Col className="d-flex flex-wrap p-3" >
                {workouts.map(workout => {
                    return <WorkoutMiniCard 
                        key={workout.id} 
                        workout={workout} 
                        workouts={workouts} 
                        user={user} 
                        setWorkouts={setWorkouts} 
                        onUpdateWorkout={handleUpdateWorkout} 
                    />
                })}
            </Col>
        </div>
    )
}

export default Explore