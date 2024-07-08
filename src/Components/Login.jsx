import React, { useState } from 'react';
import { BsFillPersonFill, BsFillLockFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5173/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token); // Store token in localStorage or sessionStorage
            navigate('/shortenurl'); // Navigate to ShortenUrl page upon successful login
        } catch (error) {
            setError('Invalid email or password');
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgotpassword');
    };

    return (
        <form onSubmit={handleLogin} className="container mt-4 login-form">
            <div className="form-group text-center">
                <label htmlFor="email" className="login-label">Email</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><BsFillPersonFill /></span>
                    </div>
                    <input
                        type="email"
                        className="form-control login-input"
                        id="email"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
            </div>
            <div className="form-group text-center">
                <label htmlFor="password" className="login-label">Password</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text"><BsFillLockFill /></span>
                    </div>
                    <input
                        type="password"
                        className="form-control login-input"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
            </div>
            {error && <p className="text-danger">{error}</p>}
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block login-btn">Login</button>
            </div>
            <div className="form-group">
                <button type="button" className="btn btn-link login-forgot" onClick={handleForgotPassword}>
                    Forgot Password?
                </button>
            </div>
        </form>
    );
};

export default Login;
