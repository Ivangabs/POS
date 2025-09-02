import React, { useState } from 'react';
import style from "styled-components";
import SignUpForm from '../components/SignUpForm/SignUpForm.jsx'

export default function SignUpPage({currAction}) {
    return (
        <SignUpForm
        currAction={currAction}/>
    )
}