import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';


const Home = () => {

    
  return (
    <div className="container form-container text-white fw-bold m-5">
      <div className="text-center">
        <h1>Welcome to URL Shortener Application</h1>
        <p className="lead">Lost your password? Reset it securely here.</p>
      </div>
      <div className="d-flex justify-content-center mt-5">
        <div className="row">
          <div className="col-sm-6 text-center">
            <h3>Already have an account?</h3>
            <Link to="/login" className="btn btn-primary btn-submit btn-lg mt-3">
              <FaSignInAlt className="me-2" /> Login
            </Link>
          </div>
          <div className="col-sm-6 text-center">
            <h3>New to us?</h3>
            <Link to="/register" className="btn btn-success btn-submit btn-lg mt-5">
              <FaUserPlus className="me-2" /> Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
