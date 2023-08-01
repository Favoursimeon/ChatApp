import React from "react";
import {useRef, useState,useEffect} from "react";
import {faCheck,faTimes,faInfoCircle}  from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios, {Axios} from "axios";
import "./Register.js";
import './Login.css'
import {Link} from "react-router-dom";

const Login = () => {
    const EMAIL_REGEX = /^[a-zA-Z0-9]{10,50}@./;
    const PASSWORD_REGEX = /^[a-zA-Z0-9]{6,20}$/;
    const REGISTER_URL = "http://localhost:3004/user";

    const errorRef = useRef()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [validPassword, setValidPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [passFocus, setPassFocus] = useState(false);






    const handleSubmit = (e) => {
e.preventDefault();
        if (!validEmail || !validPassword) {
            setError("Please enter a valid email and password");
            return;
        }
        axios
            .get(REGISTER_URL, {
                email: email,
                password: password,
            })
            .then((response) => {
                console.log(response);
                setSuccess(true);
            })
            .catch((error) => {
                console.log(error);
                setError("Email already exists");
            });

    }
    return (
        <div className= 'Form'>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        You have successfully registered.
                        <Link to={"Home"}/>
                    </p>
                </section>
            ) : (

                <section>
                    <p ref={errorRef} className={error ? "error" : "offscreen"} aria-live= "assertive">
                        {error}
                    </p>
                    <h1>LogIn</h1>
                    <form onSubmit={ handleSubmit}>
                        <label htmlFor="email">
                            Email

                            <span className={validEmail ? "valid" : "invalid"}>
                     <FontAwesomeIcon icon={faCheck}/>
                </span>
                            <span className={validEmail || ! email ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                </span>
                        </label>
                        <input
                            type={"text"}
                            id={"email"}
                            // ref={useRef}
                            autoComplete={"off"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            aria-invalid={!validEmail ? 'false' : 'true'}
                            aria-describedby= "uidnote"
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id = "uidnote" className={userFocus && email && validEmail ? "instructions" : "offscreen" }>
                            <fontAwesomeIcon icon={faInfoCircle}/>

                        </p>
                        <label htmlFor="password">
                            Password
                            <span className={validPassword ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                            <span className={validPassword || ! password ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                        </label>
                        <input
                            type = {"password"}
                            id = {"password"}
                            onChange={(e) => setPassword(e.target.value)}
                            required={true}
                            aria-invalid={!validPassword ? 'false' : 'true'}
                            aria-describedby= "pwdnote"
                            onFocus={() => setPassFocus(true)}
                            onBlur={() => setPassFocus(false)}
                        />
                        <p id = "pwdnote" className={passFocus && password && validPassword ? "instructions" : "offscreen" }>
                            <fontAwesomeIcon icon={faInfoCircle}/>
                            Password must be 6-20 characters
                            must contain only letters and numbers.<br/>
                            must begin with a letter.

                        </p>

                        <button disabled={!validEmail || !validPassword }>
                            Login
                        </button>
                    </form>
                    <p>
                        Already have an account?<br/>
                        <span className="line">
                   <Link to={"/Register"}>Sign up</Link>
               </span>
                    </p>

                </section>
            )}
        </div>
);
};

export default Login;
