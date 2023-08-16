import React, { useContext, useState } from 'react';
import { useFormik } from "formik";
import * as yup from "yup";
import { UserContext } from '../context/user';
import { useHistory } from 'react-router-dom';

function Signup() {
    const {user, setUser} = useContext(UserContext)
    const history = useHistory()
    const [usernameError, setUsernameError] = useState('')

    const formSchema = yup.object().shape({
        username: yup.string().required("Must enter a name").min(2).max(25),
        password: yup.string().required("Must enter a password").min(6).max(15),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch('/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values, null, 2),
            })
            .then(r => {
                if(r.ok){
                    r.json().then(data => {
                        setUser(data)
                        history.push('/')
                    })
                }
                else{
                    setUsernameError('Username already exists')
                }
            })
        }
    });



    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <h2 className="text-center">Sign Up</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="mb-1">
                            <label className='form-label' htmlFor='username'>Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                value={formik.values.username}
                                onChange={e=>{
                                    formik.handleChange(e)
                                    setUsernameError('')
                                }}
                                name='username'
                                id='username'
                                required
                            />
                            <p className='text-danger'>{formik.errors.username}</p>
                            {usernameError && <p className='text-danger'>{usernameError}</p>}
                        </div>
                        <div className="mb-1">
                            <label className='form-label' htmlFor='password'>Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                value={formik.values.password}
                                name='password'
                                id='password'
                                onChange={formik.handleChange}
                                required
                            />
                            <p className='text-danger'>{formik.errors.password}</p>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-warning" type="submit">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
