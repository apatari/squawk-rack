import React from "react";
import ExerciseCard from "./ExerciseCard";

function ExerciseList({ exercises }) {
    return (
        <div className="my-4" >
            {(exercises.length > 0)? <h3>Exercises</h3> : <h3>Add exercises to your workout</h3>}
            {exercises.map((exercise, index) => {
                return <ExerciseCard  key={index} exercise={exercise} />
            })}
        </div>
    )
}

export default ExerciseList