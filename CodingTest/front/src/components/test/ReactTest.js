import ReactGridLayout from "react-grid-layout";
import SyntaxHighlightTextField from "../SyntaxHighlightTextField";
import React, { useCallback, useEffect, useState } from 'react';
import fileLoad from "../../util/FileLoad";
import stringDownload from "../../util/stringDwonload";
import UserNameSetting from "../UserNameSetting";
import Testdesc from "./Testdesc";
import { useParams } from "react-router-dom";
import { TimeManager } from "../../util/TimeManager.js";
import TestTimer from '../TestTimer.js';
import { SessionManager } from "../../util/SessionManager.js";
import { KeyMaker } from "../../util/KeyMaker.js";
import { Button } from "react-bootstrap";

/**
 * React 테스트 
 * @returns 
 */
function ReactTest() {
     /** 문제번호 */
    const { level } = useParams();

    const [isStart,setIsStart] = useState(false);
    const [isTimeUp, setIsTimeUp] = useState(false);

    const [html, setHtml] = useState('');
    const [js, setJS] = useState('');
    const [title,setTitle] = useState('');

    /** 스토리지에 저장,로드에 사용할 키  */
    const key = useCallback((type) => {
        return KeyMaker.makeKey("react",type,level);
    },[level])

    /** HTML 에디터 편집 핸들러 */
    const handleHTMLChange = (event) => {
        setHtml(event);
        SessionManager.setCode(key("html"),event);
    }    

    /** JS 에디터 편집 핸들러  */
    const handleJSChange = (event) => {
        setJS(event);
        SessionManager.setCode(key("js"),event);
    }

    /** 문제 읽어오기 */
    const loadQustion = useCallback((event)=> {
        async function set() {
            setHtml(await fileLoad('/qustions/react/'+level+'.html'));
            setJS(await fileLoad('/qustions/react/'+level+'.js'));

            const html = SessionManager.getCode(key("html"));
            if(html != null) {
                setHtml(html);
            }
            const js = SessionManager.getCode(key("js"));
            if(js!=null) {
                setJS(js);
            }    
          }
          set();  
          setTitle('Front 화면 데이터 mapping');
    },[level,setHtml,setJS,setTitle,key])

    /** 답안 저장 */
    const save = (event)=> {
        const time = TimeManager.getTestTimeString(key("time"));
        stringDownload(html,js,'react_'+title+":"+level,time);
    }
    
    // iFrame 에 랜더링 위한 HTML 코드 만들기 시작 ------------------------------------------------------------------------------
    var react = '<script src="/webjars/react.production.min.js" crossorigin></script>\n';
    react += '<script src="/webjars/react-dom.production.min.js" crossorigin></script>\n';
    react += '<script src="/webjars/babel.min.js"></script>\n';
    react += '<script src="/webjars/axios.min.js"></script>\n';
    react += '<script src="/webjars/jszip.min.js"></script>\n';
    react += '<script src="/webjars/FileSaver.min.js"></script>\n';

    var bootstrap = '<link href="/webjars/bootstrap.min.css" rel="stylesheet"></link>\n';
    
    const header = '<!DOCTYPE html><html><head><title>CodingTest</title>'+ react + bootstrap +'</head><body>';


    var reactBody = '';
    reactBody += '<script type="text/babel">'+js+'</script>'
    const footer = '</body></html>'
    
    /** iFrame 에 랜더링할 최종 HTML 코드 리턴 */
    const getCode = (event) => {
        return header + '\n<div id="react">\n'+  html + '</div>\n' + footer + '\n' + reactBody;
    }
    // iFrame 에 랜더링 위한 HTML 코드 만들기 종료  ------------------------------------------------------------------------------

    /** 최초1회 로드 */
    useEffect(() => {
        const isStart = sessionStorage.getItem("time") !== null;
        setIsStart(isStart);
        setIsTimeUp(TimeManager.getIsTimeUp("time"));
        if(html==="" && js === "") {
            loadQustion();
        }
    },[loadQustion,key,html,js])

    const onTimerStart = () => {
        setIsTimeUp(false);
        setIsStart(true);
    }
        
    const onTimerTimeOver =() => {
        setIsTimeUp(true);
    }

    return (
        <div>
            <h2>react <sup>level{level}</sup></h2>
            <p>
                react 를 사용하여 코딩을 합니다.<br />
            </p>                        
            <h3>{title}</h3>
            {isStart 
            ?       
            <div>
                <Testdesc testId={level} />
                
                { isTimeUp ? 
                    <p>시험시간이 종료되었습니다.<br />
                    하단의 <a href='#save'>저장</a> 버튼을 눌러서 내용을 바탕화면에 저장해주세요</p>                
                : 
                    <p>작성후 하단의 <a href='#save'>저장</a> 버튼을 눌러서 내용을 바탕화면에 저장해주세요</p>
                }
            <TestTimer id={"time"} onStart={onTimerStart} onTimeOver = {onTimerTimeOver} />
            <ReactGridLayout
                 className='layout'
                 cols={2}
                 rowHeight={400}
                 width={1879}
                 isDraggable ={false}
                 isResizable = {false}           
                 >
                    <div key='html' data-grid={{x:0,y:0,w:1,h:2}}>
                    <SyntaxHighlightTextField 
                            height={785}
                            code = {js} 
                            title = 'react'
                            language = 'javascript'
                            onChange={handleJSChange}
                            readOnly = {isTimeUp}
                            />
                    </div>
                    <div key='react' data-grid={{x:1,y:0,w:1,h:1}}>

                    <SyntaxHighlightTextField
                            height = {375}
                            code={html}
                            title='html'
                            language='html'
                            onChange={handleHTMLChange} 
                            readOnly = {isTimeUp}
                            />
                    </div>
                    <div key='result' data-grid={{x:1,y:0,w:1,h:1}}>
                    <article id ='result'>        
                    <header><h2>result</h2></header>
                    <iframe          
                    title = '랜더링 결과'
                    srcDoc={getCode()}
                    />

                    </article>
                    </div>
            </ReactGridLayout>
            <UserNameSetting append = {<Button onClick={save} id='save' className='btn btn-primary'>저장</Button>} />
            </div>
                  : <TestTimer id={"time"} onStart={onTimerStart} onTimeOver={onTimerTimeOver} />
            }
        </div>

    );
}

export default ReactTest;