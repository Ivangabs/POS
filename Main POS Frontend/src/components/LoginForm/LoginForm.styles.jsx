import styled from "styled-components";

export const LoginContainer = styled.div`
    margin : auto;
    background : white;
    border-radius : 1rem;

    width : 30rem;
    padding : 3rem;

    display : inline-flex;
    flex-direction : column;
    gap : 10px;
    h1 {
        font-size : 1.8rem;
        font-weight : 600;
    }
    form {
        display : flex;
        gap : 1rem;
        flex-direction : column;

        input, button, select {
            padding : 0.8rem 1rem;
            border-radius : 0.5rem;
            border : 1px solid grey;
        }
        .captions, .create {
            font-size : 0.8rem;
        }
        .captions {
            display : flex;
            flex-direction : row;
            justify-content : space-between;
            .message {

            }
            .forgotPassword > span{
                text-decoration : none;
                color : red;
                font-weight : 500;
            }
        }
        button {
            color : white;
            background-color : #d43030;
        }
    }
    
`
