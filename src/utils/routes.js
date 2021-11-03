import { Redirect, Route } from "react-router-dom"
import DHList from "../pages/admin/DHList"
import UsersList from "../pages/admin/UsersList"
import RequestsList from "../pages/dhUser/RequestsList"
import Home from "../pages/Home"
import Listings from "../pages/Listings"


export const phUser_routes = () => {
    return (
        <>
            <Route exact path="/dashboard" component={Home} />
            <Route exact path="/listings" component={Listings} />
            <Redirect from="*" to="/dashboard" />
        </>)
}

export const admin_routes = () => {
    return (
        <>
            <Route exact path="/users" component={UsersList} />
            <Route exact path="/dhs" component={DHList} />
            <Redirect from="*" to="/users" />
        </>
    );
}

export const dhUser_routes = () => {
    return (<>
        <Route exact path="/requests" component={RequestsList} />
        <Redirect from="*" to="/profile" />
    </>);
}

export const getRoutes = (role) => {
    console.log(role);
    switch (role) {
        case "admin":
            return admin_routes();
        case "phUser":
            return phUser_routes();
        case "dhUser":
            return dhUser_routes();
        default:
            return "";
    }
}