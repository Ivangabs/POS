import React, {useState} from "react"
import styled from "styled-components";
import Cashiers from "./../components/Cashiers/Cashiers.jsx"
import Home from "./../components/Home/Home.jsx"
import Products from "./../components/Products/Products.jsx"
const DataContainer = styled.div`
    box-shadow : rgba(185, 185, 202, 0.25) 0px 1px 100px 1px inset;
    border : 1px solid rgba(185, 185, 202, 0.25);
    padding : 2rem;
        overflow-y : auto;
    > .table {
        font-size : 0.8rem;
    }
    
`
export default function Data({showData}){
    return (
        <DataContainer>
            {showData === "Home" && <Home /> }
            {showData === "Products" && <Products /> }
            {showData === "Cashiers" && <Cashiers className="table"/>}
        </DataContainer>
    )
}