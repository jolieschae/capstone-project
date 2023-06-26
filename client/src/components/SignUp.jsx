import React, { useState } from 'react'
import './authorization.css'

function SignUpForm({ onLogin }) {
    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [passwordConfirmation, setPasswordConfirmation] = useState("");
    // const [first_name, setFirstName] = useState("")
    // const [last_name, setLastName] = useState("")
    // const [email, setEmail] = useState("")
    // const [birthday, setBirthday] = useState("")
    // const [gender, setGender] = useState("")

    // const [errors, setErrors] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
  
    // function handleSubmit(e) {
    //   e.preventDefault();
    //   setErrors([]);
    //   setIsLoading(true);
    //   fetch("/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username,
    //       password,
    //       password_confirmation: passwordConfirmation,
    //       first_name,
    //       last_name,
    //       email,
    //       birthday,
    //       gender, 
            
    //     }),
    //   }).then((r) => {
    //     setIsLoading(false);
    //     if (r.ok) {
    //       r.json().then((user) => onLogin(user));
    //     } else {
    //       r.json().then((err) => setErrors(err.errors));
    //     }
    //   });
    // }
  
    return (
      <div className="authContainer">
      <form className="authForm" /* onSubmit={handleSubmit}*/>
        <div className="authFormContent">
        <label className="authLabel"
        htmlFor="username">Username</label>
        <input
            className="authInput"
            type="text"
            id="username"
            autoComplete="off"
            // value={username}
            // onChange={(e) => setUsername(e.target.value)}
        />
        <label className="authLabel"
        htmlFor="password">Password</label>
        <input
            className="authInput"
            type="password"
            id="password"
            // value={password}
            // onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
        />
        <label className="authLabel"
        htmlFor="password">Confirm Password</label>
        <input
            className="authInput"
            type="password"
            id="password_confirmation"
            // value={passwordConfirmation}
            // onChange={(e) => setPasswordConfirmation(e.target.value)}
            autoComplete="current-password"
        />
        <label className="authLabel"
        htmlFor="first_name">First Name</label>
        <input
            className="authInput"
            type="text"
            id="first_name"
            autoComplete="off"
            // value={first_name}
            // onChange={(e) => setFirstName(e.target.value)}
        />
        <label className="authLabel"
        htmlFor="last_name">Last Name</label>
        <input
            className="authInput"
            type="text"
            id="last_name"
            autoComplete="off"
            // value={last_name}
            // onChange={(e) => setLastName(e.target.value)}
        />
        <label className="authLabel"
        htmlFor="eMail">E-mail</label>
        <input
            className="authInput"
            type="text"
            id="email"
            autoComplete="off"
            // value={email}
            // onChange={(e) => setEmail(e.target.value)}
        />
                <label className="authLabel"
        htmlFor="birthday">Birthday</label>
        <input
            className="authInput"
            type="text"
            id="birthday"
            autoComplete="off"
            // value={birthday}
            // onChange={(e) => setBirthday(e.target.value)}
        />
        <label className="authLabel"
        htmlFor="gender">Gender</label>
        <input
        
            className="authInput"
            type="text"
            id="gender"
            autoComplete="off"
            // value={gender}
            // onChange={(e) => setGender(e.target.value)}
        />
        <button className="authButton" type="submit">Sign Up</button>
        {/* when database is up and running, change back to "{isLoading ? "Loading..." : "Sign Up"}" */}
          {/* {errors.map((err) => (
        // <Error key={err}>{err}</Error>
          ))} */}
          </div>
      </form>
      </div>
    );
}

export default SignUpForm