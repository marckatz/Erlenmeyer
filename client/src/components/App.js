import logo from '../logo.svg';
import '../App.css';
import { UserContext } from '../context/user';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SchemaFrame from './SchemaFrame';
import Navbar from './Navbar';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';

function App() {
  const [user, setUser] = useState(null)

  useEffect(()=>{
    fetch('/check_session').then((r) => {
      if (r.ok) {
        r.json().then((userObj) => setUser(userObj));
      }
    })
  }, [setUser])

  return (
    <Router>
      <UserContext.Provider value={{user, setUser}}>
        <div>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Home} />
            {user && <Route path='/schema' component={SchemaFrame} />}
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup} />
          </Switch>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;
