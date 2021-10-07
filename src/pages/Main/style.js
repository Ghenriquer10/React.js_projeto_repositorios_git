import styled, {keyframes, css} from 'styled-components'

export const Container = styled.div`
    max-width: 900px;
    background: #FFF;
    border-radius: 10px;
    margin: 60px auto;
    padding: 30px;
    box-shadow: 0 0 20px rgba(0,0,0, 0.5);

    h1{
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 20px;
        justify-content: center;

        svg{
            margin-right: 10px;
        }
    }
`;
export const Form = styled.form`
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    input{
        flex: 1;
        border: 1px solid ${props => (props.error ? '#FF0000' : 'blue')};
        padding: 10px 15px;
        border-radius: 10px;
        font-size: 17px;
    }
`;

//Criando animação do botão

const animate = keyframes`
    from{
        transform: rotate(0deg);
    }

    to{
        transform: rotate(360deg);
    }
`;


export const SubmitButton = styled.button.attrs(props => ({
    type: 'submit',
    disabled: props.loading,
}))`
    background: #0D2636;
    width: 50px;
    border-radius: 10px;
    margin-left: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    &[disabled]{
        cursor: not-allowed;
        opacity: 0.2;
    }
    
    ${props => props.loading &&
        css`
            svg{
                animation: ${animate} 2s infinite;
            }
            `
    }

`;

export const List = styled.ul`
    list-style: none;
    margin-top: 20px;

    li{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
    }

    & + li{
        border-top: 1px solid red;
    }

    a{
        text-decoration: none;
        color: black;
    }

    span{
        font-size: 1.5em;
        color: #0D2636;
    }

`;

export const DeleteButton = styled.button.attrs({
    type: 'button'
})`
    margin-right: 10px;
    color: red;
    padding: 5px;
    border-radius: 5px ;
    border: none;

    svg{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;


