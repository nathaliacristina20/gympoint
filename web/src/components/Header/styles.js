import styled from 'styled-components';

export const Content = styled.div`
    background: #ffffff;
    border: 1px solid #dddddd;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const HeaderLogo = styled.div`
    display: flex;
    margin: 20px 0 20px 30px;
    border-right: 1px solid #dddddd;
    margin-right: 30px;
    padding-right: 30px;

    img:first-child {
        margin-right: 15px;
    }
`;

export const Navigation = styled.div`
    nav {
        display: flex;
        a {
            display: flex;
            font-weight: bold;
            font-size: 15px;
            text-transform: uppercase;
            color: #999999;
            margin-right: 20px;
        }

        .active {
            color: #000;
        }
    }
`;

export const HeaderStyle = styled.div`
    display: flex;
    align-items: center;
`;

export const HeaderProfile = styled.div`
    margin-right: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    h3 {
        color: #666666;
        font-size: 14px;
        font-weight: bold;
    }
    span {
        font-size: 14px;
        color: #de3b3b;
    }
    button {
        background: none;
        border: none;
    }
`;
