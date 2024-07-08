import React, { useState } from 'react';
import axios from 'axios';
import { BsEnvelope } from 'react-icons/bs'; // Example icon, replace with desired ones

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/forget', { email });
            setMessage("Password reset link sent. Please check your email.");
        } catch (error) {
            setMessage("Error sending password reset link. Please try again.");
        }
    };

    return (
        <div className="container mt-4">
            <form onSubmit={handleForgotPassword} className="forgot-password-form">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <div className="input-group">
                        <div className="input-group-prepend">
                            <span className="input-group-text-center"><BsEnvelope /></span>
                        </div>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary btn-block ms-5 text-center">Send Reset Link</button>
                {message && <p className="mt-5 text-center ">{message}</p>}
            </form>
        </div>
    );
};

export default ForgotPassword;
