import React from "react";
import {useRef, useState,useEffect} from "react";
import {faCheck,faTimes,faInfoCircle}  from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios, {Axios} from "axios";
import "./Login.js";
import './Registers.css'
import {Link} from "react-router-dom";

const Register = () => {

    const EMAIL_REGEX = /^[a-zA-Z0-9]{10,50}@./;
const PASSWORD_REGEX = /^[a-zA-Z0-9]{6,20}$/;
const REGISTER_URL = "http://localhost:3004/user";

    const errorRef = useRef()
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    const [password, setPassword] = useState("");
    const [validPassword, setValidPassword] = useState(false);
    const [passFocus, setPassFocus] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [validConfirmPassword, setValidConfirmPassword] = useState(false);
    const [confirmFocus, setConfirmFocus] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {

    }, []);

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        console.log(result);
        console.log(password);

        setValidPassword(result);
        const confirmResult = password === confirmPassword;
        setValidConfirmPassword(confirmResult);
    },
    [password, confirmPassword]);
    useEffect(() => {
      setError("");
    }, [email, password, confirmPassword]);
    // const signUp = () => {
    //     Axios.post("http://localhost:3004/user", {
    //         email: email,
    //         password: password,
    //     }).then((response) => {
    //         console.log(response);
    //
    //     });
    //     }
    // }

const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PASSWORD_REGEX.test(password);

    if (!v1 || !v2) {
        setError("Please enter a valid email and password");
        return;
    }
    try {
        const response = await axios.post(REGISTER_URL, {
            email: email,
            password: password,
        });
        console.log(response);
        setSuccess(true);
    }
    catch (error) {
        console.log(error);
        setError("Email already exists");
    }
    if (validEmail && validPassword && validConfirmPassword) {
        setError("");
        setSuccess(true);
    } else {
        setError("Please enter a valid email and password");
    }
    axios
    .post(REGISTER_URL, {
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
};




    return (
        <div className= 'Form'>
            {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    You have successfully registered.
                    <Link to={"Login"}>Sign in</Link>
                </p>
            </section>
            ) : (

       <section>
           <p ref={errorRef} className={error ? "error" : "offscreen"} aria-live= "assertive">
               {error}
           </p>
           <h1>Register</h1>
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

                <label htmlFor="confirmPassword">
                    Confirm Password
                    <span className={validConfirmPassword && confirmPassword ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validConfirmPassword || ! confirmPassword ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input
                    type = {"password"}
                    id = {"confirmPassword"}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required={true}
                    aria-invalid={!validConfirmPassword ? 'false' : 'true'}
                    aria-describedby= "confirmpwdnote"
                    onFocus={() => setConfirmFocus(true)}
                    onBlur={() => setConfirmFocus(false)}
                />
                <p id = "confirmpwdnote" className={confirmFocus && confirmPassword && validConfirmPassword ? "instructions" : "offscreen" }>
                    <fontAwesomeIcon icon={faInfoCircle}/>

                </p>

                <button disabled={!validEmail || !validPassword || !validConfirmPassword}>
                    Sign Up
                </button>
           </form>
           <p>
                Already have an account?<br/>
               <span className="line">
                   <Link to={"/Login"}>Sign in</Link>
               </span>
           </p>

       </section>
            )}
        </div>
    );
}
export default  Register;


