import React, { useState } from "react";
import {LoginContainer} from './LoginForm.styles.jsx'
import {login} from '../../services/api.js'

export default function LoginForm ({onLogin, currAction}) { 
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function loginHandler(event){
        event.preventDefault();
        const result = await login(username, password);
        console.log(result);
        if (result.user) {
            onLogin(result.user)
            setMessage("Login Successful");
            currAction("Dashboard");
        }  else {
            console.log(result.error);
            setMessage(result.error);
        }
        
    }
    async function signUpHandler(event){
        currAction("SignUp");
    }

    return (
        <LoginContainer className="loginContainer">
            <h1>DRice Login</h1>
            <form onSubmit={loginHandler}>
                <input type="text" name="username" placeholder="Your username" 
                    onChange={event => setUsername(event.target.value)} required/>
                <input type="password" name="password" placeholder="Your password" 
                    onChange={event => setPassword(event.target.value)} required/>
                <div className="captions">
                    <div className="message">{message}</div>
                    <div className="forgotPassword"><a href="#">Forgot Password?</a></div>
                </div>
                <button type="submit">Login</button>
                <div className="create">
                    Don't have an account? <a href="#"  onClick={signUpHandler} >Create Account</a>
                </div>
            </form>
        </LoginContainer>
    )
}