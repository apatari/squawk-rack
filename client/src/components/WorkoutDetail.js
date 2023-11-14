import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import WorkoutInfoCard from "./cards/WorkoutInfoCard";
import ExerciseList from "./cards/ExerciseList";
import { Button } from "react-bootstrap";

function WorkoutDetail() {

    const { workout_id } = useParams()
    const [workout, setWorkout] = useState(null)

    useEffect(() => {
        fetch(`/api/workouts/${workout_id}`)
        .then(
            res => {if (res.ok) 
                {res.json()
                    .then(data => setWorkout(data))
                }}
            )
    }, [])

    if (workout) {
        return (
            <div className="m-4 p-2" >
                <WorkoutInfoCard workout={workout} />
                <ExerciseList exercises = {workout.exercises} />
                <div className="w-50 d-flex m-3" >
                    <Button className="btn btn-outline-success" >Add to favorites</Button>
                    <Button className="ms-auto btn btn-outline-light" >Review workout</Button>
                </div>
                
            </div>
            
        )
    } else {
        return (
            <h1 className="m-3" >Oops, looks like there's nothing here!</h1>
        )
    }
    
}

export default WorkoutDetail