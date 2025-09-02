import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {logout} from '../services/api.js'
import TopNav from '../components/TopNav/TopNav.jsx'
import LeftNav from '../components/LeftNav/LeftNav.jsx'
import Data from './Data.jsx';


const StyledDasbhoard = styled.div`
        background-color : white;
        display : grid;
        width : 100%;
        height : 100vh;
        grid-template : 7rem auto / 20rem auto;
        > img {
            width : 100%;
            height : 100%;
            object-fit : cover;
            object-position  : 80% 68%;
        }
    `

export default function Dashboard({onLogout, currPage}){
    const [showData, setShowData] = useState();
    const [isLoading, setLoading] = useState(true);
    async function logoutHandler() {
        const result = await logout();
        onLogout(null);
        currPage("Login");
    }
    useEffect(()=>{
        setShowData("Home");    
        setLoading(false);
    },[]);

    if (isLoading) {
        return <h1>Loading</h1>
    } else {
        return (
            <StyledDasbhoard>
                <img src="../assets/Drice Logo.png"/>
                <TopNav />
                <LeftNav 
                    logoutClick={()=>logoutHandler()}
                    currData={showData}
                    setData={(d)=>setShowData(d)}/>
                
                <Data 
                    showData={showData}/>
            </StyledDasbhoard>
        )
    }
}
