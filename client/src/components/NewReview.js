import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import UserViewWorkoutCard from "./cards/UserViewWorkoutCard";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";



function NewReview({ user }) {

    const { workout_id} = useParams()
    const [workout, setWorkout] = useState(null)
    
    
    useEffect(() => {
        fetch(`/api/workouts/${workout_id}`)
        .then(
            res => {if (res.ok) 
                {res.json()
                    .then(data => setWorkout(data))
                    
                }}
            )
            
    }, [workout_id])


    if (workout) {
        return (
            <div>
                <h3>Reviewing: {workout_id}, {workout.name} </h3>
            </div>

        )
    } else {
        return (<h1>Loading...</h1>)
    }

}

export default NewReview