import React, { useState } from 'react'
import './authorization.css'

function SignUpForm({ onSignUp }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSignUp = () => {
    onSignUp({ username, email, firstName, lastName, password, birthday, gender });
  };

  const renderPrompt = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <p className="authLabel">Choose a unique username...</p>
            <input
              className="authInput"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </>
        );
      case 2:
        return (
          <>
            <p className="authLabel">Enter your e-mail...</p>
            <input
              className="authInput"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </>
        );
        case 3:
        return (
          <>
            <p className="authLabel">What is your first name?</p>
            <input
              className="authInput"
              type="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </>
        );
        case 4:
        return (
          <>
            <p className="authLabel">What is your last name?</p>
            <input
              className="authInput"
              type="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        );
      case 5:
        return (
          <>
            <p className="authLabel">Enter a secure password:</p>
            <input
              className="authInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </>
        );
        case 6:
          const minDate = '1900-01-01';
          const currentDate = new Date().toISOString().split('T')[0];
        return (
        <>
        <p className="authLabel">When is your birthday?</p>
        <input
          className="authInput"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          min={minDate}
          max={currentDate}
        />
        </>
        );
        case 7:
        return (
          <>
            <p className="authLabel">What are your preferred gender pronouns?</p>
            <select className="authInput"
            value={gender} 
            onChange={(e) => setGender(e.target.value)}>
              <option value="">...</option>
              <option value="he">He/Him</option>
              <option value="she">She/Her</option>
              <option value="they">They/Them</option>
              <option value="non-conforming">Other</option>
            </select>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="authContainer">
    <div className="authForm">
      <div className="authFormContent">
        {renderPrompt()}
        {currentStep < 7 ? (
          <button className="authButton" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="authButton" onClick={handleSignUp}>
            Sign Up
          </button>
        )}
      </div>
    </div>
    </div>
  );
}

export default SignUpForm;