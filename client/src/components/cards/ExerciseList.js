import React from "react";

function ExerciseList({ exercises }) {
    return (
        <div>
            {exercises.map(exercise => {
                return <div>{exercise.name}</div>
            })}
        </div>
    )
}

export default ExerciseList