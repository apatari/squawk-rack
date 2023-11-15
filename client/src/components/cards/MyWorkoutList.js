
import React, { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import WorkoutMiniCard from "./WorkoutMiniCard";

function MyWorkoutList({ user }) {

    const [workouts, setWorkouts] = useState([])

    useEffect(() => {
        fetch('/api/workouts')
        .then(res => res.json())
        .then(data => setWorkouts(data))
    }, [])

    const my_workouts = workouts.filter(workout => workout.user_id == user.id )
    const fav_workouts = workouts.filter(workout => {
        return workout.favorites.some(favorite => {
            return favorite.user_id == user.id
        })
         })

    return (
        <div className="m-4" >
            <h3 className="text-primary" >Your Workouts</h3>
            <Col className="d-flex flex-wrap p-3" >
                {my_workouts.map(workout => {
                        return <WorkoutMiniCard key={workout.id} workout={workout} user={user} />
                    })}
            </Col>
            <h3 className="text-primary" >Favorite Workouts</h3>
            <Col className="d-flex flex-wrap p-3" >
                {fav_workouts.map(workout => {
                        return <WorkoutMiniCard key={workout.id} workout={workout} user={user} />
                    })}
            </Col>
        </div>
    )
}

export default MyWorkoutList