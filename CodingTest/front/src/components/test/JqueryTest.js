import { useCallback, useEffect, useState } from 'react';
import SyntaxHighlightTextField from '../SyntaxHighlightTextField.js';
import ReactGridLayout from 'react-grid-layout';
import fileLoad from '../../util/FileLoad.js';
import stringDownload from '../../util/stringDwonload.js';
import UserNameSetting from '../UserNameSetting.js';
import { useParams } from 'react-router-dom';
import Testdesc from './Testdesc.js';
import TestTimer from '../TestTimer.js';
import { TimeManager } from '../../util/TimeManager.js';
import { SessionManager } from '../../util/SessionManager.js';
import { KeyMaker } from '../../util/KeyMaker.js';
import { Button } from 'react-bootstrap';


/**
 * jQuery Test 문제 화면 
 * @returns 
 */

function JqueryTest() {
  /** 문제번호 */
  const { level } = useParams();

  const [isStart,setIsStart] = useState(false);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const [html, setHtml] = useState('');
  const [js, setJS] = useState('')
  const [title, setTitle] = useState('');

  /** 스토리지에 저장,로드에 사용할 키  */
  const key = useCallback((type) => {
    return KeyMaker.makeKey("jQuery",type,level);
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

  // iFrame 에 랜더링 위한 HTML 코드 만들기 시작 ------------------------------------------------------------------------------
  const jquery = '<script src="/webjars/jquery-3.7.1.min.js"></script>\n';
  var bootstrap = '<link href="/webjars/bootstrap.min.css" rel="stylesheet"></link>\n';
  bootstrap += '<script src="/webjars/axios.min.js"></script>\n';

  const header = '<!DOCTYPE html><html><head><title>CodingTest</title>'+ jquery + bootstrap + '</head><body>';
  const footer = '</body></html>'

  function getJS() {
    return '<script>'+js+'</script>'
  }

  /** iFrame 에 랜더링할 최종 HTML 코드 리턴 */
  function getCode() {
    return header + html + getJS() + footer
  }
  // iFrame 에 랜더링 위한 HTML 코드 만들기 종료  ------------------------------------------------------------------------------

  /** public 에서 문제 데이터 읽어오기 */
  const loadQustion = useCallback((event) => {
    async function set() {
      setHtml(await fileLoad('/qustions/jquery/'+level+'.html'));
      setJS(await fileLoad('/qustions/jquery/'+level+'.js'));
      
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
    setTitle("Front 화면 데이터 mapping");
  }, [setHtml,setJS,key,setTitle,level])

  /** 답안 저장 */
  const save = (event)=> {
    const time = TimeManager.getTestTimeString("time");    
    stringDownload(html,js,'jQuery_'+title+":"+level, time);
  }
 
  /** 최초1회 로드 */
  useEffect(() => {
    const isStart = sessionStorage.getItem("time") !== null;
    setIsStart(isStart);
    setIsTimeUp(TimeManager.getIsTimeUp(key("time")));
    if(html==="" && js ==="") {
      loadQustion();
    }
  },[loadQustion,key,html,js])

  const onTimerStart = () => {
    setIsTimeUp(false);
    setIsStart(true);
  }

  const onTimerTimeOver = () => {
    setIsTimeUp(true);
  }

  return (    
    <div className='App'>
      <h2>jQuery <sup>level{level}</sup></h2>
      <p>
        <strong>jQuery</strong> 를 사용하여 코딩을 합니다.<br />
      </p>      
      <h3>{title}</h3>
      {isStart 
      ?       
      <div>
        <Testdesc testId={level} />
        {isTimeUp ? 
        <p>시험시간이 종료되었습니다.<br />
        하단의 <a href='#save'>저장</a> 버튼을 눌러서 내용을 바탕화면에 저장해주세요</p>
        : 
        <p>작성후 하단의 <a href='#save'>저장</a> 버튼을 눌러서 내용을 바탕화면에 저장해주세요</p>
        }      
      
      <TestTimer id={"time"} onStart={onTimerStart} onTimeOver={onTimerTimeOver} />
      <ReactGridLayout
      className='layout'
      cols={2}
      rowHeight={400}
      width={1879}
      isDraggable ={false}
      isResizable = {false}
      >
        <div key = 'jquery' data-grid={{x:0,y:0,w:1,h:2}}>
        <SyntaxHighlightTextField
        height = {785}
        code = {js} 
        title = 'jquery'
        language = 'javascript'
        onChange={handleJSChange} 
        readOnly = {isTimeUp}
        />
        </div>

        <div key='html' data-grid={{x:1,y:0,w:1,h:1}}>
        <SyntaxHighlightTextField 
        height = {375}
        code = {html} 
        title = 'html'
        language = 'html'
        onChange={handleHTMLChange} 
        readOnly = {isTimeUp}
        />
        </div>


        <div key='result' data-grid={{x:1,y:1,w:1,h:1}}>
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
      : <TestTimer id={"time"} onStart={onTimerStart} onTimeOver = {onTimerTimeOver} />
      }
    </div>
    
  );
}

export default JqueryTest;
