import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";

function Login() {
    const {user, setUser} = useContext(UserContext)
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory()

    function handleLogin() {
        try {
            fetch('/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username, password: password })
            })
                .then(r => {
                    if (r.status === 200) {
                        return r.json()
                    }
                })
                .then(logged_in_user => {
                    setUser(logged_in_user)
                    history.push('/')
                })
        }
        catch (error) {
            console.log(`Error: ${error}`)
        }
    }

    return (
        <form onSubmit={(e) => e.preventDefault()}>
            <div>
                <label className='form-label'>Username:</label>
                <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div>
                <label className='form-label'>Password:</label>
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="text-center">
                <button className="btn" onClick={handleLogin}>
                    Log In
                </button>
            </div>
        </form>
    )
}

export default Login