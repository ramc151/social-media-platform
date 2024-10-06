import React, { useState } from 'react'
import { loginHandler } from '../api/auth';
import { loginSuccess } from '../redux/authSlice';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await loginHandler({ email, password });
        if (response && response.status !== 200) {
            toast.warn(response.data.error)
        } else {
            dispatch(loginSuccess(response.data));
            window.dispatchEvent(new Event('storage'));
            toast.success(response.data.message)
            navigate('/');
        }
    }

    return (
        <div className="container">
            <div className='alert alert-info'>
                <h3>Login Form</h3>
            </div>
            <form action="/auth/login" onSubmit={handleLogin}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleFormControlInput2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button className='btn btn-info'>Login</button>
            </form>
        </div>
    )
}

export default Login