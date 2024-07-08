import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        try {
            await axios.post('http://localhost:5000/api/register', { firstName, lastName, email, password });
            setMessage("Registration successful. Please check your email for the activation link.");
            setTimeout(() => {
                navigate('/login'); // Navigate to login page after successful registration
            }, 2000); 
        } catch (error) {
            setMessage("Error registering user. Please try again.");
        }
    };

   

    return (
        <div className="register-container">
            <Form onSubmit={handleRegister}>
                <Form.Group>
                    <BsFillPersonFill className="icon" />
                    <Form.Control
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="form-input"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="form-input"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="form-input"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="form-input"
                        required
                    />
                </Form.Group>
                <Button type="submit" className="form-button">
                    Register
                </Button>
                <p>
                    Already have an account? <span onClick={() => navigate('/login')}>Login</span>
                </p>
                
                {message && <Alert variant="info" className="message">{message}</Alert>}
            </Form>
        </div>
    );
};

export default Register;
