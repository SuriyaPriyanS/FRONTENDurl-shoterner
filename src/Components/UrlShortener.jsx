import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FiLink, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom

const ShortenUrl = ({ onUrlShortened }) => {
  const [originalUrl, setOriginalUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [message, setMessage] = useState('');
  const { token } = useSelector((state) => state.user);
  const navigate = useNavigate(); // Use navigate hook for navigation

  const handleShortenUrl = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/shorten',
        { longUrl: originalUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShortUrl(response.data.shortUrl);
      setMessage('URL shortened successfully');
      onUrlShortened(response.data); // Pass the shortened URL data to parent component
      navigate('/dashboard'); // Navigate to dashboard page after successful URL shortening
    } catch (error) {
      console.error('Error shortening URL:', error);
      setMessage('Error shortening URL. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <form onSubmit={handleShortenUrl} className="p-4 border rounded shadow-sm bg-white" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="mb-3">
          <label htmlFor="originalUrl" className="form-label">
            <FiLink className="me-2" /> Original URL
          </label>
          <input
            type="url"
            className="form-control"
            id="originalUrl"
            placeholder="Enter the original URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Shorten URL
        </button>
        {shortUrl && (
          <div className="mt-3 alert alert-success d-flex align-items-center">
            <FiCheckCircle className="me-2" />
            Short URL: <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="ms-2">{shortUrl}</a>
          </div>
        )}
        {message && !shortUrl && (
          <div className="mt-3 alert alert-danger d-flex align-items-center">
            <FiAlertCircle className="me-2" />
            {message}
          </div>
        )}
      </form>
    </div>
  );
};

export default ShortenUrl;
