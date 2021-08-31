import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import HeaderTop from '../components/HeaderTop'
import CardContainer from '../components/CardContainer'
import ButtonRounded from '../components/ButtonRounded'
import clockBackground from '../assets/icons/clock_background_icon.png'
import clockPointer from '../assets/icons/clock_pointer_icon.png'

const Container = styled.div`
    flex: 1;
    background: #ededed;
    height: 100vh;
`;

const ContainerWidth = styled.div`
    width: 100%;
    overflow-y: auto;
    max-height: calc(100vh - 300px)
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`;

const RowContainer = styled(Row)`
    padding: 110px 50px 50px;
`;

const ClockContainer = styled.div`
    display: flex;
    position: relative;
`;

const ClockBackground = styled.img`
    height: 400px;
    width: 400px;
    margin-bottom: 20px;
`;

const ClockPointer = styled.img`
    position: absolute;
    top: 156px;
    left: 170px;
    height: 148px;
    width: 70px;
`;

const RecordsContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
`;

const RecordsTitle = styled.div`
    font-size: 22px;
    color: #ea3712;
    font-weight: bold;
    margin-bottom: 40px;
`;

const RecordsSubtitle = styled.div`
    font-size: 18px;
    color: #ea3712;
    font-weight: bold;
`;

const RecordsEmptyText = styled.div`
    font-size: 18px;
    color: #b3b3b3;
    margin-top: 50px;
`;

const TimerText = styled.div`
    font-size: 26px;
    margin: 10px 0;
`;

const TimerRestText = styled(TimerText)`
    color: #ea3712;
`;

export default function MainScreen() {
    const [recordsList, setRecordsList] = useState([]);
    const [counter, setCounter] = useState(0);
    const [counterRest, setCounterRest] = useState(0);
    const [counterRestPeriods, setCounterRestPeriods] = useState(0);
    const [start, setStart] = useState(false);
    const [startRest, setStartRest] = useState(false);
    const [speed, setSpeed] = useState(0);
    const numberOfPeriods = 4;
    const intervalTime = 1500;
    const intervalTimeRest = 300;
    const intervalTimePause = 900;

    useEffect(() => {
        if (!start) return;

        const interval = setInterval(() => {
            setSpeed(intervalTime);
            setCounter(value => value + 1);

            if (counter > 0 && !(counter % intervalTime)) {
                registerTime(recordsList.length, parseInt(counter / intervalTime) % numberOfPeriods, false);
                handleTimer();
                handleTimerRest();
            }
        }, 1000);

        return _ => clearInterval(interval);
    }, [start, counter]);

    useEffect(() => {
        if (!startRest) return;

        const interval = setInterval(() => {
            let intervalTime = (counterRestPeriods % 4 === 3) ? intervalTimePause : intervalTimeRest;
            setSpeed(intervalTime);
            setCounterRest(value => value + 1);

            if (counterRest > 0 && !(counterRest % intervalTime)) {
                registerTime(recordsList.length, parseInt(counter / intervalTime) % numberOfPeriods, true);
                setCounterRestPeriods(value => value + 1);
                clearTimerRest();
                handleTimer();
            }

        }, 1000);

        return _ => clearInterval(interval);
    }, [startRest, counterRest]);

    const handleTimer = () => {
        setStart(value => !value);
    }

    const handleTimerRest = () => {
        setStartRest(value => !value);
    }

    const clearTimerRest = () => {
        setStartRest(false);
        setCounterRest(0);
    }

    const stopTimers = () => {
        setStart(false);
        setStartRest(false);
    }

    const clearTimers = () => {
        setStart(false);
        setStartRest(false);
        setCounter(0);
        setCounterRest(0);
        setRecordsList([]);
    }

    const registerTime = (id, period, rest) => {
        setRecordsList([...recordsList, {
            id: id,
            period: period === 0 ? 4 : period,
            date: new Date().toISOString(),
            isRest: rest,
        }]);
    }

    const dateFormatter = (date) => {
        let format = new Date(date);
        return format.toLocaleDateString();
    }

    const timeFormatter = (date) => {
        let format = new Date(date);
        return format.toLocaleTimeString();
    }

    const durationFormatter = (seconds) => {
        return new Date(seconds * 1000).toISOString().substr(11, 8);
    }

    const currentTimeFormatter = (date) => {
        return `${dateFormatter(date)} - ${timeFormatter(date)}`;
    }

    return (
        <Container>
            <HeaderTop />
            <RowContainer>
                <CardContainer>
                    <ClockContainer>
                        <ClockBackground src={clockBackground} />
                        <ClockPointer style={{ animationName: 'spin', animationDuration: `${speed}s`, animationIterationCount: 'infinite', animationTimingFunction: 'linear', animationPlayState: start || startRest ? 'running' : 'paused' }} src={clockPointer} />
                    </ClockContainer>
                    <TimerText>Tempo: {durationFormatter(counter)}</TimerText>
                    <TimerRestText>Descanço: {durationFormatter(counterRest)}</TimerRestText>
                    <Row>
                        <ButtonRounded click={clearTimers} outlined={'#ea3712'} color={'#ea3712'} title={'Limpar'} width={'200px'} />
                        <ButtonRounded click={stopTimers} outlined={'#000'} color={'#000'} title={'Parar'} width={'200px'} />
                        <ButtonRounded click={() => { registerTime(0, 'Início', false); handleTimer(); }} outlined={'#4ec127'} color={'#4ec127'} title={'Iniciar'} width={'200px'} disabled={start || startRest} />
                    </Row>
                </CardContainer>
                <CardContainer>
                    <RecordsTitle>Histórico</RecordsTitle>
                    {
                        recordsList.length > 0 ?
                            <ContainerWidth>
                                <RecordsContainer>
                                    <RecordsSubtitle>Período</RecordsSubtitle>
                                    <RecordsSubtitle>Horário</RecordsSubtitle>
                                </RecordsContainer>
                                {recordsList.map(item => <RecordsContainer key={item.id}>
                                    <span style={{ color: item.isRest ? '#ea3712' : '#000' }}>{item.isRest ? 'Descanso' : item.period}</span>
                                    <span style={{ color: item.isRest ? '#ea3712' : '#000' }}>{currentTimeFormatter(item.date)}</span>
                                </RecordsContainer>)
                                }
                            </ContainerWidth>
                            :
                            <RecordsEmptyText>Sem registros.</RecordsEmptyText>
                    }
                </CardContainer>
            </RowContainer>
        </Container>
    )
}