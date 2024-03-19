import { useCallback, useEffect, useState } from "react"
import { Button, ProgressBar } from "react-bootstrap";
import { TimeManager } from "../util/TimeManager";

/**
 * 테스트 타이머 뷰 
 * @param {id, onStart, onTimeOver} props 
 * @returns 
 */
function TestTimer(props) {
    /** 경과시간  */
    const [sec,setSec] = useState(0);
    /** 남은 시간  */
    const [secRemaing, setSecRemaing] = useState(0);
    /** 남은시간 proftess */
    const [progress,setProgress] = useState(0);
    /** 타이머 시작했나? */
    const [isStart,setIsStart] = useState(false);
    /** 제한시간 초과했나? */
    const [isTimeOver, setIsTimeOver] = useState(false);
    /** 1초에 한번씩 갱신해주는 Timer */
    const [timer,setTimer] = useState(null);
    
    /** 시작시간 읽어오기 */
    const getStartTime = () => {
        return sessionStorage.getItem(props.id,null);
    }

    const run = useCallback(() => {        
        const time = TimeManager.getTestTime(props.id);
        const max = TimeManager.getLimitMinute() * 60;
        setSecRemaing(max - time);
        setSec(time);
        setIsStart(time !== null);

        if(max - time >= 0) {
            const p = (time / max) * 100 ;
            setProgress(100 - p);
        } else {
            setProgress(0);
        }

        // setTimeout(getInterval,1000);
        if(isTimeOver === false) {
            const limit = TimeManager.getLimitMinute() * 60;
            if(limit < time) {
                props.onTimeOver();
                setIsTimeOver(true);
            }
        }   
    },[isTimeOver,props])

    const start = () => {
        if(props.key === null) {
            return;
        }
        
        TimeManager.setStartTime(props.id);
        props.onStart();           
        setIsStart(true);
        
    }

    const formatedTimeRemaingString = () => {
        if(secRemaing <= 0) {
            return "00시 00분 00초";
        }
        return TimeManager.makeTimeFormat(secRemaing);
    }
    
    const formatedTimeString = () => {
        return TimeManager.makeTimeFormat(sec);
    }

    useEffect(()=> {          
        if(timer !== null) {
            return;
        }
        run();
        const newTimer = setInterval(run,1000)
        setTimer(newTimer);
    }, [timer,run])

    const timeRemaining = () => {
        const time = formatedTimeRemaingString();
        const time2 = formatedTimeString();
        return (
            <>
            <span className={secRemaing < 300 ? "text-danger fw-bold" : "text-primary fw-bold"}>{time}</span>
            <span className="text-secondary p-1">{time2}</span> 
        </>
        )
    }



    return (
        <div id="TestTimer" className="card mb-3">
            <div className="card-body">                                        
            { isStart === false 
            ? <Button onClick={start}>시작</Button>
            : <>
            <h5 className="card-title"> Timer </h5>
            {timeRemaining()} 
            <ProgressBar
            now={progress} 
            label={""} 
            animated={true} 
            variant={secRemaing < 300 ? 'danger' : 'sucess'}/>
            </>             
            } 
            </div>
        </div>
        
    )
}

export default TestTimer;
