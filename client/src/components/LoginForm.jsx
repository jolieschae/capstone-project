import React, { useState } from 'react'
import './authorization.css'

function LoginForm({ onLogin }) { 

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        }).then((r) => {
        setIsLoading(false);
        if (r.ok) {
            r.json().then((user) => onLogin(user));
        } else {
            r.json().then((err) => setErrors(err.errors));
        }
        });
    }

    return (
        <form className="authForm"onSubmit={handleSubmit}>
            <div className="authFormContent">
            <label className="authLabel"
            htmlFor="username">Username</label>
            <input
            className="authInput"
            type="text"
            id="username"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <label className="authLabel"
            htmlFor="password">Password</label>
            <input
            className="authInput"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button className="authButton" id="loginButton" variant="fill" color="primary" type="submit">
            {isLoading ? "Loading..." : "Login"}
            </button>
            {/* {errors.map((err) => (
            <Error key={err}>{err}</Error>
            ))} */}
        </div>
        </form>
    );
}

export default LoginForm