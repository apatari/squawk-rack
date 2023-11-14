import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function WorkoutDetail() {

    const { workout_id } = useParams()

    return (
        <h1>A detail of workout {workout_id}</h1>
    )
}

export default WorkoutDetail