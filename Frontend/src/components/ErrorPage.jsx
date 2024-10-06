import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    const errorPageStyles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: '#f7f7f7',
            color: '#333',
            textAlign: 'center',
            padding: '20px',
        },
        heading: {
            fontSize: '72px',
            margin: '0',
            color: '#ff6b6b',
        },
        subHeading: {
            fontSize: '24px',
            margin: '20px 0',
        },
        description: {
            fontSize: '18px',
            marginBottom: '20px',
        },
        button: {
            padding: '10px 20px',
            fontSize: '18px',
            color: '#fff',
            backgroundColor: '#007BFF',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            textDecoration: 'none',
        },
    };

    return (
        <div style={errorPageStyles.container}>
            <h1 style={errorPageStyles.heading}>404</h1>
            <h2 style={errorPageStyles.subHeading}>Page Not Found</h2>
            <p style={errorPageStyles.description}>
                Oops! The page you are looking for doesn't exist or has been moved.
            </p>
            <Link to="/" style={errorPageStyles.button}>
                Go Back Home
            </Link>
        </div>
    );
};

export default ErrorPage;
