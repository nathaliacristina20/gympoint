import styled from 'styled-components';

export const Container = styled.div`

    .btAnswer {
        background: none;
        border: none;
        font-size: 15px;
        color: #4D85EE;
    }
`;

export const ModalStyle = styled.div`
    width: 390px;
    strong {
        color: #444444;
        font-size: 14px;
        text-transform: uppercase;
        margin-bottom: 8px;
    }

    div {
        font-size: 16px;
        color: #666666;
        margin-top: 8px;
        margin-bottom: 20px;
        text-align: justify;
        display: flex;
        flex-direction: column;
    }

    div input {
        background: lime;
        width: 390px;
        height: 127px;
        resize: none;
    }

    button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 45px;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 16px;
        transition: background 0.2s;
        background: #ee4d64;
        margin-top: 20px;

        svg {
            margin: 8px 8px 8px 16px;
        }
    }

    textarea {
        height: 120px;
        resize: none;
    }

`;
