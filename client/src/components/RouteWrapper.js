import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from "../context/user";
import SchemaFrame from './SchemaFrame';
import Navbar from './Navbar';
import Home from './Home';
import UserlessSchemaFrame from './UserlessSchemaFrame';
import NotFound from "./NotFound";
import Profile from './Profile'

function RouteWrapper() {
    const { user, setUser } = useContext(UserContext)

    useEffect(() => {
        fetch('/check_session')
            .then((r) => {
                if (r.ok) {
                    r.json().then((userObj) => setUser(userObj));
                }
            })
    }, [setUser])

    return (
        <Router>
            <Navbar />
            <Switch>
                <Route exact path='/' component={Home} />
                {user && <Route path='/schema' component={SchemaFrame} />}
                {!user && <Route path='/schema' component={UserlessSchemaFrame} />}
                <Route path='/profile' component={Profile} />
                <Route path='*' component={NotFound} />
            </Switch>
        </Router>
    )

}

export default RouteWrapper