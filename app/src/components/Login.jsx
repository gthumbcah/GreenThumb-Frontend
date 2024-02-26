import React, { useState } from 'react';
import { API_BASE_URL } from '../components/api/endpoints.js'; // Import API_BASE_URL

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    setIsLoading(true); // Set loading state to true

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate'); // Throw error if response is not ok
      }

      console.log('Login successful');

    } catch (error) {
      console.error('Login failed:', error);
      setError('Invalid username or password');
    }

    setIsLoading(false); // Set loading state back to false
  };

  return (
    <div className="login-page">
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      {error && <div className="error-message">{error}</div>} {/* Display error message if there is an error */}
      <button className={`button is-link is-outlined ${isLoading ? 'is-loading' : ''}`} onClick={handleLogin}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </div>
  );
};

export default Login;
