import styled, {keyframes} from "styled-components";
import {Link} from 'react-router-dom';

// Criando animação

const animation = keyframes `
    from{
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
`

export const Loading = styled.div`

    color: #FFF;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;    
    
    svg{
        margin-left: 15px;
        animation: ${animation} 2s infinite;
    }
    

`; 

export const Container = styled.div`
    
    max-width: 700px;
    background: #FFF;
    border-radius: 19px;
    box-shadow: 0, 0, 20px rgba(0,0,0, 0.2);
    margin: 70px auto;
    padding: 30px;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px;
    
    
    img{
        height: 140px;
        margin-bottom: 10px;
    }
    
    h1{
        color: blue;
        font-size: 3em;
    }

    h1:first-letter{
        text-transform: uppercase;
    }

    p{
        margin-top: 10px;
        font-size: 14px;
        color: #000;
        text-align: center;
        max-width: 400px;
        line-height: 1.4;
    }
`;


export const BackButton = styled(Link)`
    border: none;
    margin-left: 50px;
    color: blue;
    svg{
        color: blue;
    }
`;

export const IssuesList = styled.ul`
    margin-top: 30px;
    padding-top: 30px;
    list-style: none;
    border-top: 1px solid blue;
    display: flex;
    flex-direction: column;
    justify-content: center;

    li{
        display: flex;
        flex-direction: row;
        margin-bottom: 40px;
        background: #F0F8FF;
        border-radius: 10px;
        align-items: center;
    }

    img{
        height: 50px;
        margin-left: 10px;
        margin-right: 10px;
        border-radius: 50%;
        border: 1px solid slateblue;
    }

    div{
        flex: 1;
        a{
            text-decoration: none;
            color: #222;
            transition: all 0.3s;
        }
        a:hover{
            color: slateblue;
        }

        p{
            margin-top: 10px;
            font-size: 10px;
            color: slateblue;
        }

    }
    
    span{
        background: black;
        color: white;
        padding: 4px;
        font-size: 8px;
        margin-left: 5px;
        border-radius: 10px;
    }

`;

export const PagesList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    button{
        background: steelblue;
        border: none;
        padding: 5px;
        color: #FFF;
        border-radius: 5px;
        width: 24%;

        &:disabled{
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
`;

export const FilterList = styled.div`
    margin: 15px 0;
    display: flex;
    justify-content: center;

    button{
        margin-right: 10px;
        border: none;
        padding: 5px;
        border-radius: 4px;
        background: #DCDCDC;
        color: black;

        &:nth-child(${props => props.active + 1}){
            background: steelblue;
            color: #FFF;
        }
    }
`;