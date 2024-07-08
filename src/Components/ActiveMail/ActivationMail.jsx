import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { activationMail } from '../../Services/APIservices'; // Adjust the import path as necessary

const ActivationMail = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const [msg, setMessage] = useState(false);

    const activationMailDb = async (email) => {
        const response = await activationMail({ email: email });
        return response;
    };

    const handleSignup = (e) => {
        navigate('signup');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage(true);
        activationMailDb(email)
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    navigate('/sent');
                }
            })
            .catch((error) => {
                console.log(error);
                window.alert(error.response.data.message);
            });
    };

    return (
        <div className='container-fluid my-3'>
            <div className='d-flex justify-content-center align-items-center flex-lg-row'>
                <div className='border border-dark rounded bg-dark p-5'>
                    <h5 className='p-2 text-white'>Resend Activation Mail</h5>
                    <form onSubmit={handleSubmit}>
                        <div className='form-outline m-4'>
                            <label className='form-label mx-2 p-2 fw-bold text-white'>Enter Email Address</label>
                            <input
                                type="email"
                                className='form-control m-2 border border-secondary-subtle'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <button type='submit' className='btn btn-primary m-3'>Send Activation Link</button>
                    </form>
                    {msg && <p>Processing request.. please wait..</p>}
                </div>
            </div>
        </div>
    );
};

export default ActivationMail;
