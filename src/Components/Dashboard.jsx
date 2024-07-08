import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import 'chart.js/auto'; // Import Chart.js to avoid issues with missing chart types
 // Import custom styles

// Register the necessary components
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [urlsCount, setUrlsCount] = useState({ urlsToday: 0, urlsThisMonth: 0 });
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countResponse = await axios.get('http://localhost:5000/api/hihjI8');
        setUrlsCount(countResponse.data);

        const urlsResponse = await axios.get('http://localhost:5000/api/hihjI8');
        setUrls(Array.isArray(urlsResponse.data) ? urlsResponse.data : []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setUrls([]);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: urls.map(url => new Date(url.createdAt).toLocaleDateString()),
    datasets: [
      {
        label: 'URLs Created',
        data: urls.map(url => url.clicks), // Assuming 'clicks' is a field in the URL model
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false
      }
    ]
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <div className="stats">
        <h2>URLs Created Today: {urlsCount.urlsToday}</h2>
        <h2>URLs Created This Month: {urlsCount.urlsThisMonth}</h2>
      </div>
      <div className="chart-container">
        <Line data={chartData} />
      </div>
      <table>
        <thead>
          <tr>
            <th>Short URL</th>
            <th>Original URL</th>
            <th>Clicks</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {urls.map(url => (
            <tr key={url._id}>
              <td>{url.shortUrl}</td>
              <td>{url.originalUrl}</td>
              <td>{url.clicks}</td>
              <td>{new Date(url.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
