import styled from 'styled-components';

export const Container = styled.div`
    z-index: 1;
    height: 50px;
    background: linear-gradient(-90deg, #fff, #4C0E95);
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    margin-rigth: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    color: #4C0E95;

    a, svg {
        opacity: 0.7;
        margin: 0 6px;
        cursor: pointer;

        :hover {
            opacity: 1;
        }
    }
`;

export const Actions = styled.div`
    margin: 0 30px;
    display: flex;
    align-items: center;
    flex-direction: column;

    span {
        display: block;
    }
`;
