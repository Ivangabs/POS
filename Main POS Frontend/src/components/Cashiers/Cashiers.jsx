import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {getUsers} from "./../../services/api.js"


export default function Cashiers(){
    const [allUsers, setAllUsers] = useState([{}]);
    const [colCount, setColCount] = useState(1);
    const [colHeads, setColHead] = useState([]);
    const CashierContainer = styled.div`
        > form {
            display : grid;
            grid-template : 1fr / repeat(${colCount}, 1fr);
            border-left : 1px solid rgba(185, 185, 202, 0.25);
            border-right : 1px solid rgba(185, 185, 202, 0.25);

            > div {
                padding : 1rem;
                border-top : 0.5px solid rgba(185, 185, 202, 0.25);
                border-bottom : 0.5px solid rgba(185, 185, 202, 0.25);
            }
        }

    `
    useEffect(()=>{
        const fetchUsers = async () => {
            const res = await getUsers();
            setAllUsers(res.data);
        }
        fetchUsers();
    }, []);

    useEffect(()=>{
        setColHead([<input type="checkbox" name="all" value="all" />].concat(Object.keys(allUsers[0]).map((keys) => <div>{keys}</div>)));
        setColCount(colHeads.length);
    },[allUsers]);

    return (
        <CashierContainer className="table">
            <form action="">
                {colHeads.map((head)=>head)}
                {allUsers.map((cashier, i) => {
                    const line = [<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />];
                    Object.entries(cashier).map(([key, value])=> {
                        line.push(<div className="Hi">{value}</div>)
                    });
                    return line.map((e)=>e);
                }
                    
                )}
            </form>
            
        </CashierContainer>
    )
}