import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    const user = JSON.parse(localStorage.getItem('user'));

    const handleStorageChange = () => {
        setToken(localStorage.getItem('token'))
    }

    useEffect(() => {
        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        }
    }, []);

    const capitalize = (val) => {
        return val[0].toUpperCase() + val.slice(1);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand">{!token ? 'User' : `Hello ${capitalize(user?.username)}`}</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {token ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Feed</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/createpost">Create Post</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/logout">Logout</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to="/">Feed</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar