import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleResetPassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        try {
            await axios.post(``, { newPassword });
            setMessage("Password reset successful. You can now log in with your new password.");
        } catch (error) {
            setMessage("Error resetting password. Please try again.");
        }
    };

    return (
        <form onSubmit={handleResetPassword}>
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            <button type="submit">Reset Password</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default ResetPassword;
