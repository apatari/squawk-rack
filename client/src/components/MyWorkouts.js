import React from "react";
import MyWorkoutList from "./cards/MyWorkoutList";

function MyWorkouts({ user }){
    return (
        <div>
            <h2 className="m-4" >
                Welcome, {user.username}
            </h2>

            <MyWorkoutList user={user} />
        </div>
        

    )
}

export default MyWorkouts

