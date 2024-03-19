import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import TestTimer from "./TestTimer";
import { TimeManager } from "../util/TimeManager";

/**
 * 홈페이지 
 */
function Home() {
    const [showMemberTable, setShowMemberTable] = useState(false);
    const handleShow = ()=> setShowMemberTable(true);
    const handleClose = ()=> setShowMemberTable(false);

    const [isStart, setIsStart] = useState(false);
    const [isTimeUp, setIsTimeUp] = useState(false);

    const onTimerStart = () => {
        setIsStart(true);
    }
    const onTimerTimeOver = () => {
        setIsTimeUp(true);
    }
    useEffect(() => {
        const isStart = sessionStorage.getItem("time") !== null;
        setIsStart(isStart);
        setIsTimeUp(TimeManager.getIsTimeUp("time"));
    },[isStart, isTimeUp])

    return (
        <div className="App">
            <h2>CodingTest</h2>
            <p>코딩테스트 안내입니다.</p>

            <p>테스트는 총 2가지 문제(Front 화면 데이터 mapping, Backend method)에 대한 해결능력을 판단하며 테스트별로 정해둔 방법을 준수하시면 됩니다.<br/>                        
            이외 특별한 프로그래밍 제약규칙은 없습니다. 본인의 스타일대로 자유롭게 코딩하세요.</p>
            <p>Front 화면 데이터 mapping 은 jquery, react, vue.js 중에 자신있는 하나를 골라서 진행하면 됩니다.</p>
            <p>코딩테스트 프로젝트는 <b>H2 DB</b>를 사용합니다.<br/>
            기본적인 테이블 생성 query는 <b>schema.sql</b>에, 데이터 insert문은 <b>data.sql</b>에 있습니다.
            </p>

            <p>제한시간은 <strong>{TimeManager.getLimitMinute()}</strong> 분 입니다.</p>

            <TestTimer id={"time"} onStart={onTimerStart} onTimeOver={onTimerTimeOver} />
            <Button variant="primary" onClick={handleShow}>Member 테이블</Button>
            <ol>
                <li>Front 화면 데이터 mapping
                    <ul>
                        <li> 신입
                            <ul>
                                <li><a href="/jquery/1">jquery</a></li>
                                <li><a href="/react/1">react</a></li>
                                <li><a href="/vue/1">vue.js</a></li>                        
                            </ul>
                        </li>
                        <li> 경력
                            <ul>
                                <li><a href="/jquery/2">jquery</a></li>
                                <li><a href="/react/2">react</a></li>
                                <li><a href="/vue/2">vue.js</a></li>                        
                            </ul>
                        </li>
                    </ul>
                </li>

                <li>Backend method
                    <ul>
                        <li><a href="/backend/1">member 정보 저장하기</a></li>
                    </ul>
                </li>
            </ol>
            
            <Modal show={showMemberTable} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Member 테이블구조</Modal.Title>                    
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th colspan="3">Member</th>
                            </tr>
                        </thead>			
                        <tbody>
                            <tr>
                                <td>id</td>
                                <td>int(4)</td>
                                <td>PK</td>
                            </tr>
                            <tr>
                                <td>name</td>
                                <td>varchar(100)</td>
                                <td>not null</td>
                            </tr>
                            <tr>
                                <td>age</td>
                                <td>int(3)</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>addr</td>
                                <td>varchar(255)</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>phone_number</td>
                                <td>varchar(13)</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>use_yn</td>
                                <td>varchar(1)</td>
                                <td></td>
                            </tr>
                        </tbody>
            
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>닫기</Button>
                </Modal.Footer>                
            </Modal>
            <p>* 모든 화면에서 상단의 나루아이 아이콘 클릭 시 현재 page로 이동합니다.</p>
            
        </div>
        
    )
}
export default Home;