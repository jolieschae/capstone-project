import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './authorization.css';

function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          response.json().then((user) => {
            onLogin(user);
            navigate('/events');
          });
        } else {
          response.json().then((err) => setErrors(err.errors));
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setErrors(['An error occurred. Please try again.']);
        console.log(error);
      });
  };

  return (
    <form className="authForm" onSubmit={handleSubmit}>
      <div className="authFormContent">
        <label className="authLabel" htmlFor="username">
          Username
        </label>
        <input
          className="authInput"
          type="text"
          id="username"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className="authLabel" htmlFor="password">
          Password
        </label>
        <input
          className="authInput"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="authButton"
          id="loginButton"
          variant="fill"
          color="primary"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Login'}
        </button>
        {errors.map((err, index) => (
          <p className="errorMessage" key={index}>
            {err}
          </p>
        ))}
      </div>
    </form>
  );
}

export default LoginForm;
