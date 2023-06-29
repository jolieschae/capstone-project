import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import './authorization.css'

function SignUpForm() {

  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);



  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleSignUp = (e) => {
    // onSignUp({ username, email, first_name, last_name, password, birthday, gender });

      e.preventDefault();
      setErrors([]);
      setIsLoading(true);
      fetch("http://127.0.0.1:5555/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          password_confirmation: passwordConfirmation,
          email,
          first_name,
          last_name,
          birthday,
          gender
        }),
      }).then((r) => {
        setIsLoading(false);
        // if (r.ok) {
        //   r.json().then((user) => onLogin(user));
        // } else {
        //   r.json().then((err) => setErrors(err.errors));
        // }
      });
      navigate("/events")
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
              value={first_name}
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
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        );
      case 5:
        return (
          <>
            <p className="authLabel">Enter a secure password, and confirm:</p>
            <input
              className="authInput"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className="authInput"
              type="password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
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