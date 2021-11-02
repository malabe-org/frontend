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

function App() {

  const {token, setToken} = useToken();

  if(!token) return <SignIn setToken={setToken}/>;
  return (
    <div className="App">
      <Switch>
        <Route path="/sign-up" exact component={SignUp} />
        <Route path="/sign-in" exact component={SignIn} />
        <Main>
          <Route exact path="/dashboard" component={Home} />
          <Route exact path="/listings" component={Listings} />
          <Route exact path="/signatures" component={Signatures} />
          <Route exact path="/profile" component={Profile} />

          {/* For Admin only */}
          <Route exact path="/users" component={UsersList} />


          <Redirect from="*" to="/dashboard" />
        </Main>
      </Switch>
    </div>
  );
}

export default App;
