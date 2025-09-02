import React from "react"
import styled from "styled-components"
import {TopNavContainer, Contact, RightSideTopNav} from './TopNav.styles.jsx'

export default function TopNav(){
    return (
        <TopNavContainer className="topNav">
            <Contact className="gcash">
                <img src="https://logoeps.com/wp-content/uploads/2025/02/GCash-logo-1-1.png" alt="GCASH LOGO"/>
                <div className="details">
                    <span className="contact">09602453450</span>
                    <span className="caption">GCash</span>
                </div>
            </Contact>
            <RightSideTopNav>
                <div className="userLogged">
                    Ivan Gabriel Etorma
                </div>
                <div className="userImage">
                    <img src="https://i.pinimg.com/474x/07/c4/72/07c4720d19a9e9edad9d0e939eca304a.jpg" alt="Profile Picture"/>
                </div>
            </RightSideTopNav>
        </TopNavContainer>
    )
}