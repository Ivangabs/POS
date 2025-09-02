import React, {useEffect, useState} from "react"
import {NavContainer} from "./LeftNav.styles.jsx"

export default function LeftNav({logoutClick, currData, setData}){
    function clickNavItemHandler(event){
        setData(event.target.dataset.value);
    }
    function NavItem({icon, page, curr}){
        return (
            <a href="#" className={curr === page ? "active" : undefined} onClick={clickNavItemHandler} data-value={page}>
                <img src={icon} alt={page} />
                <span>{page}</span>
            </a>
        )
    }
    const [currNav, setNav] = useState(currData);
    const NavItems = [
        {   icon : "https://cdn-icons-png.flaticon.com/512/1946/1946488.png",
            page : "Home"},
        {   icon : "https://cdn-icons-png.flaticon.com/512/3126/3126649.png",
            page : "Customers"},
        {   icon : "https://cdn-icons-png.flaticon.com/512/679/679720.png",
            page : "Products"},
        {   icon : "https://cdn-icons-png.flaticon.com/512/10457/10457925.png",
            page : "Transactions"},
        {   icon : "https://cdn-icons-png.flaticon.com/512/1389/1389079.png",
            page : "Sales"},
        {   icon : "https://cdn-icons-png.flaticon.com/512/9721/9721919.png",
            page : "Credit"},
        {   icon : "https://cdn-icons-png.flaticon.com/512/2916/2916179.png",
            page : "Cashiers"},
        {   icon : "https://cdn-icons-png.flaticon.com/128/2669/2669764.png",
            page : "Timesheet"},

    ];

    return (
        <NavContainer>
            <h2>NAVIGATION</h2>
            <nav>
                {NavItems.map(({icon, page}, i) => {
                    return (<NavItem
                        key={i}
                        icon={icon}
                        page={page}
                        curr={currData}/>)
                })}
                
                <div className="logout">
                    <a href="#" className = "logout" onClick={logoutClick}>
                    <img src="https://cdn-icons-png.flaticon.com/512/1828/1828427.png" />
                    <span>Logout</span></a></div>
            </nav>
            
        </NavContainer> 
    )
}