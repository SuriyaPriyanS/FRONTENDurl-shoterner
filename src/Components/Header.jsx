import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSignOutAlt, FaUserCircle, FaUserPlus, FaSignInAlt, FaTachometerAlt } from 'react-icons/fa';

const Header = () => {
    const userName = localStorage.getItem('userName');
    const avatar = localStorage.getItem('avatar');
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('avatar');
        localStorage.removeItem('userName');
        window.location.href = '/login';
    };

    // Determine when to show Signup, Login, Dashboard links based on current path
    const shouldShowSignup = !['/signup', '/dashboard'].includes(location.pathname);
    const shouldShowLogin = !['/login', '/dashboard'].includes(location.pathname);
    const shouldShowDashboard = !['/signup', '/login', '/forgot-password', '/verify-token/:token', '/reset-password/:token', '/'].includes(location.pathname);

    return (
        <nav className="navbar py-1 sticky-top navbar-expand-lg text-white header-container">
            <Link to="/dashboard">
                <img src="/images/logo.png" width="120" height="80" className="navbar-brand" alt="Brand Logo" />
            </Link>
            <button
                className="navbar-toggler bg-light"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse ml-2 navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    {shouldShowSignup && (
                        <li className="nav-item active">
                            <h4><Link className="nav-link text-white" to="/signup">
                                <FaUserPlus /> Signup
                            </Link></h4>
                        </li>
                    )}
                    {shouldShowLogin && (
                        <li className="nav-item active">
                            <h4><Link className="nav-link text-white" to="/login">
                                <FaSignInAlt /> Login
                            </Link></h4>
                        </li>
                    )}
                    {shouldShowDashboard && (
                        <>
                            <li className="nav-item">
                                <h4><Link className="nav-link text-white" to="/dashboard">
                                    <FaTachometerAlt /> Dashboard
                                </Link></h4>
                            </li>
                            <li className="nav-item text-white">
                                <h4><Link className="nav-link" to="#">
                                    <img src={avatar} width="40" height="40" alt="Avatar" className="avatar" />
                                    <span className='text-white'>{userName}</span>
                                </Link></h4>
                            </li>
                            <li className="nav-item">
                                <h4><Link className="nav-link text-white" type='button' onClick={handleLogout}>
                                    <FaSignOutAlt /> Logout
                                </Link></h4>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Header;
