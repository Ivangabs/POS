import React, { useState } from 'react';
import style from "styled-components";
import LoginForm from '../components/LoginForm/LoginForm.jsx'


export default function LoginPage({onLogin, currAction}) {
    return (
        <LoginForm
            onLogin={onLogin} 
            currAction={currAction}
            style="
  display : flex;
  justify-content : center;
  align-items: center;"/>
    )
}