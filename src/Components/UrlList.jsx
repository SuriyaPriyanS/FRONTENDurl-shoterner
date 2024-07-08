import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiLink, FiExternalLink, FiBarChart2 } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const UrlList = ({ id }) => {
  const [urls, setUrls] = useState([]);
  const { token } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/shorten/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('API response:', response.data);
        setUrls(response.data);
      } catch (error) {
        console.error('Error fetching URLs:', error.message);
      }
    };

    fetchUrls();
  }, [id, token]);

  const totalUrls = urls.length;

  return (
    <div className="container">
      <h1>Your Shortened URLs</h1>
      <p>Total URLs: {totalUrls}</p>
      {Array.isArray(urls) && urls.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th><FiLink className="icon" />Short URL</th>
              <th><FiExternalLink className="icon" />Original URL</th>
              <th><FiBarChart2 className="icon" />Clicks</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {urls.map((url) => (
              <tr key={url._id}>
                <td><a href={url.shortUrl} target="_blank" rel="noopener noreferrer">{url.shortUrl}</a></td>
                <td><a href={url.originalUrl} target="_blank" rel="noopener noreferrer">{url.originalUrl}</a></td>
                <td>{url.clicks}</td>
                <td>{url._id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No URLs found.</p>
      )}
    </div>
  );
};

export default UrlList;
