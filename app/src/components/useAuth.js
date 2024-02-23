import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../components/api/endpoints.js';

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const response = await fetch(`${API_BASE_URL}/login`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setIsAuthenticated(response.ok);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          setIsAuthenticated(true);
          console.log('User authenticated successfully');
        } else {
          setIsAuthenticated(false);
          console.log('User authentication failed: No token received');
        }
      } else {
        setIsAuthenticated(false);
        console.log('User authentication failed: Server response not OK');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setIsAuthenticated(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return { isAuthenticated, isLoading, login, logout };
};

export default useAuth;