import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../Store.jsx';

// Use createRoot from react-dom/client to render the app
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
   
      <App />
    
  </Provider>
);
