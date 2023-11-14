import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

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
            <div>
                <h1>A detail of workout {workout_id}:</h1>
                <div>{workout.name}</div>
                <div>{workout.details}</div>
                <div>{workout.created_at}</div>
            </div>
            
        )
    } else {
        return (
            <h1 className="m-3" >Oops, looks like there's nothing here!</h1>
        )
    }
    
}

export default WorkoutDetail