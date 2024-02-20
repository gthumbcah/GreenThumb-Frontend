import { useState } from 'react';
import greenthumblogo from './greenthumblogo.png';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // You can implement login logic here, such as sending a request to your backend server
    console.log('Email:', email);
    console.log('Password:', password);
    // For now, let's just log the email and password to the console
  };

  return (
    <div className="app">
      <img src={greenthumblogo} alt="Green Thumb Logo" className="logo" />
      <h1 className='title'>Green Thumb Landscaping</h1>
      <div className="card">
        <input
          type="email"
          className="input-field"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='login' onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default App;
