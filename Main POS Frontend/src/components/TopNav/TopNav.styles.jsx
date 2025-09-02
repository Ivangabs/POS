import styled from "styled-components"
export const TopNavContainer = styled.div`
    display : flex;
    width : 100%;
    padding : 1rem;
    gap : 1rem;
`
export const Contact = styled.div`
    display : flex;
    align-items : center;  
    gap : 1rem;
    img {
        height : 2rem;
    }
    div {
        display : flex;
        flex-direction : column;
        > .caption {
            color : grey;
        }
    }
`
export const RightSideTopNav = styled.div`
    flex-grow : 1;
    flex-basis : 5fr;

    display : flex;
    gap : 1rem;
    justify-content : right;
    align-items : center;
    > .userImage {
        width : 4rem;
        img {
            width : 100%;
            border-radius : 50%;
            object-fit : cover;
        }
    }
`