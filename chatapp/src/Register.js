import React from "react";
import {useRef, useState,useEffect} from "react";
import {faCheck,faTimes,faInfoCircle}  from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios, {Axios} from "axios";


const Register = () => {

const USERNAME_REGEX = /^[a-zA-Z0-9]{3,20}$/;
const PASSWORD_REGEX = /^[a-zA-Z0-9]{6,20}$/;
const REGISTER_URL = "http://localhost:3004/user";

    const errorRef = useRef()
    const [username, setUsername] = useState("");
    const [validUsername, setValidUsername] = useState(false);
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
        // useRef.current.focus();
    }, []);

    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        console.log(result);
        console.log(username);
        setValidUsername(result);
    }, [username]);

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
    }, [username, password, confirmPassword]);
    // const signUp = () => {
    //     Axios.post("http://localhost:3004/user", {
    //         username: username,
    //         password: password,
    //     }).then((response) => {
    //         console.log(response);
    //
    //     });
    //     }
    // }

const handleSubmit = async (e) => {
    e.preventDefault();
    const v1 = USERNAME_REGEX.test(username);
    const v2 = PASSWORD_REGEX.test(password);
    if (!v1 || !v2) {
        setError("Invalid username or password");
        return;
    }
    try{
        const response = await axios.post(REGISTER_URL,
            JSON.stringify({    username, password}),
            {
                headers: {  "Content-Type": "application/json"  },
                // withCredentials: false
            }
        );
        console.log(response?.data);
        console.log(response?.status);
        console.log(JSON.stringify(response));
        setSuccess(true);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
    }catch (e) {
        if (e.response) {
            setError('No response from server');
        } else if (e.request) {
            setError('Username already exists');
        } else {
            setError("Error registering user");
        }
        errorRef.current.focus();
    }
};

    //     const data = await response.json();
    //     console.log(data);
    //     if (data.error) {
    //         setError(data.error);
    //     }
    // }
        // console.log(data);
        // if(data.error){
        //     setError(data.error);
        // }else{
        //     setSuccess(true);

        //



    return (
        <>
            {success ? (
            <section>
                <h1>Success!</h1>
                <p>
                    <a href = {"#"}>Sign In</a>
                </p>
            </section>
            ) : (

       <section>
           <p ref={errorRef} className={error ? "error" : "offscreen"} aria-live= "assertive">
               {error}
           </p>
           <h1>Register</h1>
           <form onSubmit={ handleSubmit}>
               <label htmlFor="username">
                   Username

               <span className={validUsername ? "valid" : "invalid"}>
                     <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validUsername || ! username ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                </span>
                </label>
                <input
                    type={"text"}
                    id={"username"}
                    // ref={useRef}
                    autoComplete={"off"}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    aria-invalid={!validUsername ? 'false' : 'true'}
                    aria-describedby= "uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
               <p id = "uidnote" className={userFocus && username && validUsername ? "instructions" : "offscreen" }>
                   <fontAwesomeIcon icon={faInfoCircle}/>
                     Username must be 3-20 characters <br />
                   must contain only letters and numbers.<br/>
                   must begin with a letter.
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
                    Password must be 6-20 characters <br />
                    must contain only letters and numbers.<br/>
                    must begin with a letter.
                    <span aria-label= "exclamation mark">!</span>
                    <span aria-label= "at sign">@</span>
                    <span aria-label= "hash sign">#</span>
                    <span aria-label= "dollar sign">$</span>
                    <span aria-label= "percent sign">%</span>
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
                    Password must be 6-20 characters <br />
                    must contain only letters and numbers.<br/>
                    must begin with a letter.
                </p>

                <button disabled={!validUsername || !validPassword || !validConfirmPassword}>
                    Sign Up
                </button>
           </form>
           <p>
                Already have an account?<br/>
               <span className="line">
                   <a href={"#"}>Sign In</a>
               </span>
           </p>
       </section>
            )}
        </>
    );
}
export default  Register;


