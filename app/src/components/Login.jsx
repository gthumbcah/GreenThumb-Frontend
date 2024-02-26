import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try{
      const response = await fetch(
        "https://greenthumb-backend.onrender.com/login",
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          password: password,
        })
      }
      )
    // Here you can add your logic to handle login authentication
    // console.log('Logging in with username:', username, 'and password:', password);
    // For example, you can send a request to the server to authenticate the user
      const result = await response.json();
      if (result.token){
        localStorage.setItem("token", result.token)
        localStorage.setItem("admin", result.admin);
        localStorage.setItem("name", result.name);
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("email", result.email);
        if (result.admin){
          navigate("/admin")
        }
      }

    }
    catch(err){
      console.err({err: err.message})
    }
    // Here you can add your logic to handle login authentication
    // console.log('Logging in with username:', username, 'and password:', password);
    // For example, you can send a request to the server to authenticate the user
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="username">Log-In Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;