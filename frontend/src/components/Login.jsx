import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Importing custom CSS

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();  // Hook to navigate programmatically

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevents page reload on form submit
    try {
      // Send POST request to login API
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });

      // If login is successful, store the token in localStorage
      localStorage.setItem('token', response.data.token);
      
      // Redirect to /food-list
      navigate('/FoodList');
    } catch (error) {
      // If login fails, log the error (can add more error handling here)
      console.error("Login failed", error);
    }
  };

  // const handleSignupRedirect = () => {
  //   navigate('/signup'); // Redirect to signup page
  // };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="login-btn">Login</button>
        </form>
        
        {/* Add a link to the signup page */}
        {/* <p className="signup-redirect">
          Don't have an account? <span className="signup-link" onClick={handleSignupRedirect}>Sign up</span>
        </p> */}
      </div>
    </div>
  );
};

export default Login;
