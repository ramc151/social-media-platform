import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../redux/authSlice';

const Logout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const isLogout = localStorage.getItem('token') === null;
        if (!isLogout) {
            dispatch(logout());
            window.dispatchEvent(new Event('storage'));
            toast.warning('Logout Successfully');
            navigate('/login')
        }
    }, [dispatch, navigate])

    return <></>
}

export default Logout