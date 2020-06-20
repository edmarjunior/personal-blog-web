import styled from 'styled-components';

export const Container = styled.div`
    margin-top: 50px;
    height: 50px;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
    color: #fff;

    a, svg {
        opacity: 0.7;
        margin: 0 6px;
        cursor: pointer;

        :hover {
            opacity: 1; 
        }
    }

    div.content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #333333;
        padding: 20px;

        span.info {
            font-size: 14px;
            opacity:  0.7;
        }
    }
`;
