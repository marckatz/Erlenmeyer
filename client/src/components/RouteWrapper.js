import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SchemaFrame from './SchemaFrame';
import Navbar from './Navbar';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import { UserContext } from "../context/user";
import NotFound from "./NotFound";

function RouteWrapper(){
    const {user, setUser} = useContext(UserContext)

    useEffect(() => {
        fetch('/check_session').then((r) => {
            if (r.ok) {
                r.json().then((userObj) => setUser(userObj));
            }
        })
    }, [setUser])

    return (
        <Router>
            <div>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Home} />
                {user && <Route path='/schema' component={SchemaFrame} />}
                {!user && <Route path='/login' component={Login}/>}
                {!user && <Route path='/signup' component={Signup} />}
                <Route path='*' component={NotFound} />
            </Switch>
            </div>
        </Router>
    )

}

export default RouteWrapper