import React, { useState } from 'react'
import { registerHandler } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState({ username: '', email: '', password: '' });

    const inputHandler = (e) => {
        setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        const response = await registerHandler(inputValue);
        if (response && response.status === 200) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.dispatchEvent(new Event('storage'));
            toast.success(response.data.message)
            navigate('/login')
        } else {
            toast.warn(response.data.error)
        }
    }

    return (
        <div className="container">
            <div className='alert alert-info'>
                <h3>Registration Form</h3>
            </div>
            <form action="/auth/register" onSubmit={handleRegister}>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleFormControlInput" name='username' placeholder="Name" value={inputValue.username} onChange={inputHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleFormControlInput1" name='email' placeholder="name@example.com" value={inputValue.email} onChange={inputHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
                    <input type="password" className="form-control" id="exampleFormControlInput2" name='password' placeholder="Password" value={inputValue.password} onChange={inputHandler} />
                </div>
                <button className='btn btn-info'>Register</button>
            </form>
        </div>
    )
}

export default Register