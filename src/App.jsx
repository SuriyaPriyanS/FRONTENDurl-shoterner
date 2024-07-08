// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Assuming you're using Redux for state management

import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Register from './Components/Register';
import ForgotPassword from './Components/ForgetPassword';
import UrlList from './Components/UrlList';
import ShortenUrl from './Components/UrlShortener';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Home from './Pages/Home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/url" element={<UrlList />} />
          <Route path="/short" element={<ShortenUrl />} />
          <Route path="/header" element={<Header />} />
          <Route path="/footer" element={<Footer/>}/>
          <Route path="/" element={<Home />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
