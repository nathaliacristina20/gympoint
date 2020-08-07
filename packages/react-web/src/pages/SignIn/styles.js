import styled from 'styled-components';

export const Container = styled.div`
    border-radius: 4px;
    flex: 1;
    margin-bottom: 20px;
    padding-left: 30px;
    width: 90%;

    form {
        label {
            font-weight: bold;
            font-size: 14px;
            color: #444444;
            text-transform: uppercase;
            margin-bottom: 8px;
            display: flex;
        }

        input {
            padding: 5px;
            height: 45px;
        }

        button {
            height: 45px;
            background: #ee4d64;
        }

        button {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: #fff;
            border: 0;
            border-radius: 4px;
            font-size: 14px;
            transition: background 0.2s;
            width: 100%;
            margin-top: 15px;
        }
    }
`;

export const LogoGympointImage = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 12px;
`;

export const LogoGympoint = styled.div`
    display: flex;
    align-content: center;
    justify-content: center;
    margin-bottom: 30px;
`;
