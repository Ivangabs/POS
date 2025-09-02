import styled from "styled-components";

export const NavContainer = styled.div`
    padding : 2rem;
    display : flex;
    flex-direction : column;
    h2 {
        font-weight : 500;
        font-size : 1rem;
    }
    nav {
        padding-bottom : 2rem;
        height : 100%;
        display : flex;
        flex-direction : column;
        font-size : 0.9rem;
        font-weight : 500;
        div {
            flex-grow : 1;
            align-content : end;
        }
        a, div > a {
            padding : 1.3rem 1rem;
            border-radius : 0.5rem;

            color : #424242;

            display : flex;
            align-items : center;
            gap : 1rem;
            height : 1.3rem;

            img {   
                opacity : 0.7;
                flex-basis : 1rem;
                width : 1.3rem;
            }
            span {
            }
        }
        a:hover{
            background-color : #ebebeb;
        }
        a.logout {
            background-color : #f53f6d;
            font-weight : 550;
            color : white;
        }
        a.active {
            filter : hue-rotate(30deg);
            background-color : #f0ccd5;
            font-weight : 700;
        }
    }
`