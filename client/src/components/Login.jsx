import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import './authorization.css'

function Login({ onLogin }) {

  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="authContainer">
      <div className="logoContainer">
        <img src="https://i.imgur.com/iIyzChS.gif" alt="Logo" className="logo" />
      </div>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <p className="registrationPrompt">
            Don't have an account? &nbsp;
          </p>
          <button className="authButton" onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <p className="signInPrompt">
            Already have an account? &nbsp;
            </p>
            <button className="authButton" onClick={() => setShowLogin(true)}>
              Log In
            </button>
          
        </>
      )}
    </div>
  )
}

export default Login