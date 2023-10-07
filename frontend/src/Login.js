import React from 'react'
import './Login.css';
import { Link } from 'react-router-dom'


function Login() {
    return (
        <div>
            <div className='center-form'>
                <form>
                    <div className='form-item'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <br/>
                        <input type='email' placeholder='Enter Email'/>
                    </div>
                    
                    <div className='form-item'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <br/>
                        <input type='email' placeholder='Enter Password'/>
                    </div>
                    
                    <button className='btn btn-success w-100'>Login in</button>
                    <br/>
                    <br/>
                    <Link to="/signup"className='btn btn-default border w-100'>Sign up</Link>
                </form>
            </div>
        </div>
    )
}

export default Login;