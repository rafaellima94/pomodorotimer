import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 6px;
    padding: 30px;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    align-items: center;
    flex: 1;
    margin: 20px;
`;

export default function CardContainer(props) {
    return (
        <Container>
            {props.children}
        </Container>
    )
}