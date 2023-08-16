import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SchemaFrame from './SchemaFrame';
import Navbar from './Navbar';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import { UserContext } from "../context/user";

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
                <Route path='/login' component={Login}/>
                <Route path='/signup' component={Signup} />
            </Switch>
            </div>
        </Router>
    )

}

export default RouteWrapper