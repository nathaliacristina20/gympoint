import styled from 'styled-components';

export const FormHeader = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const Title = styled.h1`
    font-size: 24px;
    margin-top: 34px;
    margin-bottom: 24px;
`;

export const ContainerBody = styled.div`
    background: #ffffff;
    border-radius: 4px;
    padding: 30px;

    input {
        height: 45px;
    }
`;

export const Row = styled.div`
    display: flex;
    margin-bottom: 20px;

    label {
        font-weight: bold;
        font-size: 14px;
        color: #444444;
        text-transform: uppercase;
        margin-bottom: 8px;
        display: flex;
    }

    /* button span {
        color: #DE3B3B;
        align-self: flex-start;
    } */
`;

export const Buttons = styled.div`
    display: flex;
    align-items: center;

    /* button div {
        display: flex;
        align-items: center;
    } */

    button {
        display: flex;
        align-items: center;
        height: 36px;
        margin-left: 16px;
        text-transform: uppercase;
        font-weight: bold;
        color: #fff;
        border: 0;
        border-radius: 4px;
        font-size: 14px;
        transition: background 0.2s;
        width: 112px;

        svg {
            margin: 8px 8px 8px 16px;
        }
    }

    .btnSave {
        background: #ee4d64;
    }

    a {
        display: flex;
        align-items: center;
        width: 142px;
        text-transform: uppercase;
        height: 36px;
        text-decoration: none;
        color: #fff;
        border-radius: 4px;
        background: #ee4d64;
        font-weight: bold;

        svg {
            margin: 8px 8px 8px 16px;
        }
    }

    .back {
        background: #cccccc;
        width: 112px;
    }
`;

export const Column = styled.div`
    width: 100%;
    margin-right: 16px;
`;

export const Table = styled.div`
    margin-left: 20px;
    table {
        border-collapse: collapse;
        font-size: 16px;
        width: 100%;

        th,
        td {
            padding: 16px;
        }

        thead th {
            text-transform: uppercase;
            text-align: left;
        }

        tbody {
            padding: 20px;
        }

        tbody tr {
            border-bottom: 1px solid #eeeeee;
            span:first-child {
                margin-right: 23px;
            }
        }

        
        .editar {
            color: #4d85ee;
            font-size: 15px;
        }

        .apagar {
            color: #de3b3b;
            font-size: 15px;
        }

        .tdCenter {
            text-align: center;
        }

        .tdEnd {            
            display: flex;
            justify-content: flex-end;
        }
    }
`;
