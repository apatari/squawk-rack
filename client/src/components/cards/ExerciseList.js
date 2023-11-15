import React from "react";
import ExerciseCard from "./ExerciseCard";

function ExerciseList({ exercises }) {
    return (
        <div>
            <h3>Exercises</h3>
            {exercises.map(exercise => {
                return <ExerciseCard  key={exercise.id} exercise={exercise} />
            })}
        </div>
    )
}

export default ExerciseList