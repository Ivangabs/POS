import React, { useState, useEffect } from "react"
import styled from "styled-components"
import {upTelegramBot} from '../../services/api.js';
const sampleProduct = {
    imageURL : "images/products/4800010961447.png"
}
const HomeContainer = styled.div`
    display : grid;
    grid-template : 20rem auto / 1fr;
    height : 100%;
    width : 100%;
    >.telegram{
        padding : 1rem;
        display : grid;
        grid-template : 1fr 1fr / 2fr 1fr;
        background-image : url(https://images.pexels.com/photos/158827/field-corn-air-frisch-158827.jpeg);
        background-size : cover;
        background-repeat : no-repeat;
        background-position-y : -280px;
        background-color : #eeeeee;
        border-radius : 1rem;
        > h1 {
            color : black;
        }
        > form {
            height : 3rem;
            width : 90%;
            border : 1px solid black;   
            border-radius : 1rem;
            display : flex;
            > * {
                flex : 1;
                height : 100%;
                padding : 1rem;
                border : 0;
                object-fit : cover;
            }
            > input {
                border-radius : 1rem 0 0 1rem;
            }
            > button {
                cursor : pointer;
                flex : 0 1 10rem;
                flex-shrink : 1;
                border-radius : 0 1rem 1rem 0;
                height : 100%;
                display : flex;
                gap : 1rem;
                justify-content : space-evenly;
                img {
                    height : 1rem;
                }
            }
             > button.START {
                background : #9ddfad;
                /* background : #dadaf0; */
             }
             button.LOADING {
                background : #dadaf0;
             }
             button.STOP {
                background : #e6c2aa;
             }
        }
        > div.recentAdd{
            position : relative;
            height : 125%;
            width : 100%;
            grid-row : span 2;
            background-color : white;
            box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
            
            padding : 1rem;
            > div.imgContainer {
                display : flex;
                justify-content : center;
                align-items : center;
                flex-direction : column;

                width : 100%;
                height : 100%;
                padding : 1rem;
                aspect-ratio : 1 / 1;
                object-fit : cover;
                /* border : 0.5rem solid white; */
                
                > img {
                    flex : 0 0 10rem;
                    height : 100%;
                    width : 100%;
                    object-fit : cover;
                }
                > div {
                    flex : 1 0;
                    padding : 0.5rem;
                    text-align : center;
                    text-transform : uppercase;
                }
            }
        }
    }
`

function TelegramCard (){
    const defaultKey = "8202234248:AAF8rcRIp3IjOS_3WeWrm19BjeqXKv3hBSA";
    const [botStatus, changeBotStatus] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [buttonStatus, setButtonStatus] = useState("START"); //START, LOADING, STOP
    const [botKey, setBotKey] = useState(defaultKey);

    function botHandler(event){
        changeBotStatus(!botStatus);
        setButtonStatus("LOADING");
    }

    useEffect(()=>{
        const callBot = async () => {
            const res =  await upTelegramBot(botStatus, botKey);
            console.log(res);
            botStatus ? setButtonStatus("STOP") : setButtonStatus("START");
        } 
        callBot();
    },[botStatus])
    return (
        <div className="card telegram">
            <h1>Telegram Bot Product Scanner</h1>
            <div className="recentAdd">
                <div className="imgContainer">
                    <img src={sampleProduct.imageURL} />
                    <div>Recently Added</div>
                </div>
            </div>
            <form onSubmit={botHandler}>
                <input type="text" name="" id="" placeholder="Enter Telegram Bot Key" onChange={(e)=>setBotKey(e.target.value)} defaultValue={defaultKey}/>
                <button type="submit" className={buttonStatus}>
                    <img src="https://cdn-icons-png.flaticon.com/128/2111/2111644.png"/>
                    <span> {buttonStatus} BOT</span>
                </button>
            </form>
        </div>
    );
};




export default function Home(){
    return (
        <HomeContainer>
            <TelegramCard>

            </TelegramCard>
        </HomeContainer>
    )
}