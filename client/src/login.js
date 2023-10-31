import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaUser, FaLock } from 'react-icons/fa';
import './login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await fetch('http://localhost:3008/log/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        
        const responseData = await response.json();
        const { name } = responseData;
       
        window.location.href = '/'; 
      } else {
        
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <Form onSubmit={handleSubmit}>
          <div className="input-group">
            <div className="icon-wrapper">
              <FaUser className="input-icon" />
            </div>
            <Form.Control
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <div className="icon-wrapper">
              <FaLock className="input-icon" />
            </div>
            <Form.Control
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button variant="info" type="submit" className="login-button">
            Login
          </Button>

          {error && <p className="error-message">{error}</p>}
        </Form>
      </div>
    </div>
  );
};

export default Login;
