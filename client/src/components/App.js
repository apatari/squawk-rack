import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import "bootswatch/dist/morph/bootstrap.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import MyWorkouts from "./MyWorkouts";
import Explore from "./Explore";
import Create from "./Create";
import Login from "./Login";

function App() {

  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/check_session")
    .then(r => {
      if (r.ok) {
        r.json().then(user => setUser(user))
  // Remove once login and user problems are fixed
        console.log("User is: ", user)
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
          <MyWorkouts/>
        </Route>

        <Route exact path="/explore">
          <Explore/>
        </Route>

        <Route exact path="/create">
          <Create/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
