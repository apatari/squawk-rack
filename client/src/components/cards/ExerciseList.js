import React from "react";
import ExerciseCard from "./ExerciseCard";

function ExerciseList({ exercises, editMode }) {
    return (
        <div className="my-4" >
            {(exercises.length > 0)? <h3>Exercises</h3> : <h3>Add exercises to your workout</h3>}
            {exercises.map((exercise, index) => {
                return <ExerciseCard  
                            key={exercise.order_number} 
                            exercise={exercise} 
                            editMode={editMode} 
                            index={index} 
                            last={exercises.length - 1}
                        />
            })}
        </div>
    )
}

export default ExerciseList