import React, { useState } from "react";
import {SignUpContainer} from './SignUpForm.styles.jsx'
import {register} from '../../services/api.js'

export default function SignUpForm ({currAction}) { 
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    async function signUpHandler(event){
        event.preventDefault();
        if (username && password && role) {
            console.log(`${username} ${password} ${role}`)
            const result = await register(username, password, role);
            setMessage(result.success ? result.message : result.error);
        } else {
            setMessage("Incomplete Credentials")
        }
    }
    async function loginHandler(event){
        event.preventDefault();
        currAction("Login");
    }
    async function chooseRole(event){
        setRole(event.target.value);
    }
    return (
        <SignUpContainer className="signUpContainer">
            <a href="#" className="Login" onClick={loginHandler}>←</a>
            <h1>DRice Signup</h1>
            <form onSubmit={signUpHandler}>
                <input type="text" name="username" placeholder="Your username" 
                    onChange={event => setUsername(event.target.value)} required/>
                <input type="password" name="password" placeholder="Your password" 
                    onChange={event => setPassword(event.target.value)} required/>
                <div className="captions">
                    <div className="message">{message}</div>
                </div>
                <select id="browsers" name="role" value={role} onChange={chooseRole} required> 
                    <option value="" disabled>Select Role:</option>
                    <option value="SUPERADMIN" disabled>Superadmin</option>
                    <option value="ADMIN" disabled>Admin</option>
                    <option value="MEMBER">Member</option>
                </select>
                <button type="submit">SignUp</button>
            </form>
        </SignUpContainer>
    )
}