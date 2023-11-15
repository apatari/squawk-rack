import React from "react";

function ExerciseCard({ exercise }) {
    return (
        <div className="m-2 fs-4" ><strong>{exercise.name} - </strong>{exercise.sets} sets X {exercise.reps} reps</div>
    )
}

export default ExerciseCard