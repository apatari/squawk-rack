import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import WorkoutInfoCard from "./cards/WorkoutInfoCard";
import ExerciseList from "./cards/ExerciseList";
import { Button } from "react-bootstrap";
import ReviewArea from "./cards/ReviewArea";

function WorkoutDetail({ user }) {

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
            
    }, [workout_id])
    
    let isFav = null

    if (workout) {
        isFav = workout.favorites.some(favorite => {
                return favorite.user_id === user.id
            })
    }
    

    const handleFavClick = () => {
        
        fetch('/api/favorites', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({"user_id": user.id, "workout_id": workout.id})
        })
        .then(res => res.json())
        .then(data => setWorkout(data))
    }

    if (workout) {
        return (
            <div className="m-4 p-2" >
                <WorkoutInfoCard workout={workout} />
                <ExerciseList exercises = {workout.exercises} />
                <div className="w-50 d-flex m-3" >
                    
                    {isFav?
                        <Button className="btn btn-outline-warning" onClick={handleFavClick}>Remove from favorites</Button>:
                        <Button className="btn btn-outline-success" onClick={handleFavClick}>Add to favorites</Button>}
                    <Button className="ms-auto btn btn-outline-light" >Review workout</Button>
                </div>
                <div>
                    <ReviewArea workout={workout} />
                </div>
                
            </div>
            
        )
    } else {
        // optional 'missing/loading' message
        return (
            <h1 className="m-3" >Loading ... </h1>
        )
    }
    
}

export default WorkoutDetail