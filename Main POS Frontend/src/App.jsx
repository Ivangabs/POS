import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import './styles/App.css'
import styled from 'styled-components';
import { checkSession, logout } from './services/api.js'
import Dashboard from './features/Dashboard.jsx'
import LoginPage from './features/LoginPage.jsx'
import SignUpPage from './features/SignUpPage.jsx'


const StyledBody = styled.div`
  width : 100%;
  height : 100vh;
  display : flex;
  justify-content : center;
  align-items: center;
`
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("Login");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const {data} = await checkSession();
        setUser(data.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    fetchSession();
  }, []);
  if (loading) return <p>Loading...</p>
  return (
    <StyledBody>
      {user && 
        <Dashboard  
          onLogout={(u)=>{setUser(u)}} 
          currPage={(u)=>{setPage(u)}}/>}
      {page === "Login" && !user && 
        <LoginPage 
          onLogin={(u)=>{setUser(u)}} 
          currAction={(u)=>{setPage(u)}}/>}
      {page === "SignUp" && !user && 
        <SignUpPage
          currAction={(u)=>{setPage(u)}} />}
    </StyledBody>
  );

}