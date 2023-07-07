import React, { useContext, useState } from 'react';
import { MyContext } from './MyProvider';
import { useNavigate } from 'react-router-dom';
import './authorization.css';

function LoginForm() {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { handleLogin, setUsername: setGlobalUsername } = useContext(MyContext);

  // console.log(setGlobalUsername)

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    fetch(`http://127.0.0.1:5555/users/${username}`)
      .then((res) => res.json())
      .then((user) => {
        console.log(user)
        handleLogin(user);
        navigate('/events');
      })
      .catch((error) => {
        setErrors([error.message]);
        setIsLoading(false);
      });
  }

//   function handleSubmit(e) {
//     e.preventDefault();
//     setIsLoading(true);
//     fetch("/login", {
//     method: "POST",
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ username, password }),
//     }).then((r) => {
//     setIsLoading(false);
//     if (r.ok) {
//         r.json().then((user) => onLogin(user));
//     } else {
//         r.json().then((err) => setErrors(err.errors));
//     }
//     });
// }

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
          <p key={index}>{err}</p>
        ))}
      </div>
    </form>
  );
}

export default LoginForm;
