import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import "bootswatch/dist/morph/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import MyWorkouts from "./MyWorkouts";
import Explore from "./Explore";
import Create from "./Create";
import Login from "./Login";
import WorkoutDetail from "./WorkoutDetail";
import NewReview from "./NewReview";
import EditWorkout from "./forms/EditWorkout";

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/api/check_session")
    .then(r => {
      if (r.ok) {
        r.json().then(user => setUser(user))

      }
    });
  }, [])

  if (!user) return (
    <div>
      <Header user={user} setUser={setUser} />
      <Login onLogin={setUser}/>
    </div>
  )

  return (
    <div>
      <Header user={user} setUser={setUser}/>
      <Switch>

        <Route exact path="/">
          <MyWorkouts user={user} />
        </Route>

        <Route exact path="/explore">
          <Explore user={user} />
        </Route>

        <Route exact path="/create">
          <Create user={user} />
        </Route>

        <Route exact path ='/workouts/:workout_id' >
          <WorkoutDetail user={user} />
        </Route>

        <Route exact path ='/workouts/:workout_id/edit' >
          <EditWorkout user={user} />
        </Route>

        <Route exact path ='/reviewfor/:workout_id' >
          <NewReview user={user} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
