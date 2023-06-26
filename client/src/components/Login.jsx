import React, { useState } from 'react'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import './authorization.css'

function Login({ onLogin }) {

  const [showLogin, setShowLogin] = useState(true)

  return (
    <div className="authContainer">
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <p className="registrationPrompt">
            Don't have an account? &nbsp;
          </p>
          <button className="authButton" onClick={() => setShowLogin(false)}>
              Register
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