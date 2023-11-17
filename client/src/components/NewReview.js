import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import UserViewWorkoutCard from "./cards/UserViewWorkoutCard";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import ReviewForm from "./forms/ReviewForm";



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
                <ReviewForm workout={workout} user={user} />
            </div>

        )
    } else {
        return (<h1>Loading...</h1>)
    }

}

export default NewReview