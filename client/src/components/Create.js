import React from "react";
import WorkoutForm from "./forms/WorkoutForm";


function Create( { user }){
    return (
        <div>
            <h2 className="m-4" >
                Create your new workout
            </h2>
            <WorkoutForm />
            
        </div>
        
    )
}

export default Create