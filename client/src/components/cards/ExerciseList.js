import React from "react";
import ExerciseCard from "./ExerciseCard";

function ExerciseList({ exercises }) {
    return (
        <div className="my-4" >
            <h3>Exercises</h3>
            {exercises.map(exercise => {
                return <ExerciseCard  key={exercise.order_number} exercise={exercise} />
            })}
        </div>
    )
}

export default ExerciseList