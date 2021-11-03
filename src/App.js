import { Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import Signatures from "./pages/Signatures";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Main from "./components/layout/Main";
import useToken from "./hooks/useToken";
import "antd/dist/antd.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import UsersList from "./pages/admin/UsersList";
import { useState } from "react";
import { getRoutes } from "./utils/routes";

function App() {

  const {token, setToken, getUserToJson} = useToken();
  const [user, setUser] = useState();

  if(!token) return <SignIn setToken={setToken}/>;

  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
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
