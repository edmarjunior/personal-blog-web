import styled, { css } from 'styled-components';

export const Aside = styled.aside`
    position: fixed;
    z-index: 3;
    display: flex;
    align-items: center;

    @media(min-width: 730px) {
        top: 50%;
        left: 10%;
    }

    @media(max-width: 730px) {
        top: 90%;
        left: 80%;
    }

    span {
        display: block;
        opacity: 0.6;
        font-size: 13px;
    }
`

export const LikeButton = styled.button.attrs(props => ({
    title:  props.curtido ? 'Obrigado por curtir esse post' : 'Curtir',
}))`
    background: transparent;
    opacity: ${(props => props.curtido ? '1' : '0.5')};
    border: 0;
    transition: all 0.5s ease-in-out;
    
    :hover {
        transform: scale(1.5);
        opacity: 1;
        margin-right: 10px;
    }

    ${(props => props.curtido && css`
        transform: scale(1.5);
        opacity: 1;
        margin-right: 10px;
        cursor: default !important;
    `)}

    ${(props => !props.curtido && css`
        animation: up 2s linear infinite;
        @keyframes up {
            from {
                transform: scale(1);
                margin-right: 0px;
            }

            to {
                transform: scale(1.5);
                margin-right: 10px;
            }
        }
    `)}
`;

export const Article = styled.article`
    p {
        margin-top: 26px;
    }

    > header {
        span {
            display: block;
            opacity: 0.5;
            font-size: 12px;
        }
    }

    section {
        margin-top: 40px;
    }

    img {
        border: 1px solid #ccc;
        box-shadow: 2px 2px 5px rgba(0,0,0,.5);
        padding: 3px;
        border-radius: 3px;
    }

    ul {
        margin-top: 20px;
        margin-left: 20px;
    }
`;