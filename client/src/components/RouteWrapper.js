import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SchemaFrame from './SchemaFrame';
import Navbar from './Navbar';
import Home from './Home';
import BlankSchema from './BlankSchema';
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
                <Navbar />
                <Switch>
                    <Route exact path='/' component={Home} />
                    {user && <Route path='/schema' component={SchemaFrame} />}
                    {!user && <Route path='/schema' component={BlankSchema} />}
                    <Route path='*' component={NotFound} />
                </Switch>
        </Router>
    )

}

export default RouteWrapper