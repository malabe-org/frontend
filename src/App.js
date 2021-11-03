import { Switch, Route, Redirect } from "react-router-dom";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import useToken from "./hooks/useToken";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import { useState } from "react";
import { getRoutes } from "./utils/routes";

function App() {

  const {token, setToken, getUserToJson} = useToken();
  const [user, setUser] = useState();

  if(!token) return <SignIn setToken={setToken}/>;

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/profile" component={Profile} />
          {getRoutes(getUserToJson().role)}
        </Main>
      </Switch>
    </div>
  );
}

export default App;
