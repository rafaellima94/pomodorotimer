import React from 'react'
import styled from 'styled-components'
import icon from '../assets/icons/pomodoro_icon.png'

const Navbar = styled.div`
    height: 90px;
    background-color: #fff;
    flex: 1 1 auto;
    width: calc(100% - 80px);
    display: block;
    box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
    padding: 0 40px;
    margin: 0;
    display: flex;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    align-items: center;
`;

const Logo = styled.img`
    height: 80px;
    width: 80px;
`;

const Row = styled.div`
    display: flex;
    align-items: flex-end;
`;

const HeaderText = styled.div`
    font-weight: bold;
    margin-left: 5px;
`;

const Title = styled(HeaderText)`
    font-size: 28px;
    color: #ea3712;
`;

const Subtitle = styled(HeaderText)`
    font-size: 18px;
    color: #4ec127;
`;

export default function HeaderTop() {
    return (
        <Navbar>
            <Logo src={icon} alt='Pomodoro Timer icon' />
            <Row>
                <Title>Pomodoro</Title>
                <Subtitle>Timer</Subtitle>
            </Row>
        </Navbar>
    )
}