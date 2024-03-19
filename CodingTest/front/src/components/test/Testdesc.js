import { useState } from "react";
import { Button, Modal, Tab, Table } from "react-bootstrap";
import JsonView from "../JsonView";


const json = `
[
    {
        "id": 1001,
        "name": "둘리",
        "age": 16,
        "addr": "서울특별시 중구 을지로 66",
        "phoneNumber": "010-1111-1111",
        "useYn": "Y"
    },
    {
        "id": 1002,
        "name": "또치",
        "age": 14,
        "addr": "서울특별시 영등포구 63로 50",
        "phoneNumber": "010-2222-2222",
        "useYn": "Y"
    },
    {
        "id": 1003,
        "name": "도우너",
        "age": 17,
        "addr": "인천 서구 에코로 181",
        "phoneNumber": "010-3333-3333",
        "useYn": "Y"
    },
    {
        "id": 1004,
        "name": "마이콜",
        "age": 31,
        "addr": "부산 동구 자성공원로 23",
        "phoneNumber": "010-4444-4444",
        "useYn": "N"
    },
    {
        "id": 1005,
        "name": "희동이",
        "age": 4,
        "addr": "서울 마포구 월드컵북로60길 17",
        "phoneNumber": "010-5555-5555",
        "useYn": "Y"
    },
    {
        "id": 1006,
        "name": "고길동",
        "age": 45,
        "addr": "경기 의왕시 성고개로 59",
        "phoneNumber": "010-6666-6666",
        "useYn": "Y"
    },
    {
        "id": 1007,
        "name": "공실이",
        "age": 15,
        "addr": "서울 송파구 올림픽로 240",
        "phoneNumber": "010-7777-7777",
        "useYn": "N"
    }
]`
const memberTable = (
    <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>age</th>
                            <th>addr</th>
                            <th>phoneNumber</th>
                            <th>useYn</th>
                        </tr>                        
                    </thead>
                    <tbody>
                        <tr>
                            <td>1001</td>
                            <td>둘리</td>
                            <td>16</td>
                            <td>서울특별시 중구 을지로 66</td>
                            <td>010-1111-1111</td>
                            <td>Y</td>
                        </tr>
                        <tr>
                            <td>1002</td>
                            <td>또치</td>
                            <td>14</td>
                            <td>서울틀별시 영등포구 63로 50</td>
                            <td>010-2222-2222</td>
                            <td>Y</td>
                        </tr>
                        <tr>
                            <td>1003</td>
                            <td>도우너</td>
                            <td>17</td>
                            <td>인천 서구 에코로 181</td>
                            <td>010-3333-3333</td>
                            <td>Y</td>
                        </tr>
                        <tr>
                            <td>1004</td>
                            <td>마이콜</td>
                            <td>31</td>
                            <td>부산 동구 자성공원로 23</td>
                            <td>010-4444-4444</td>
                            <td>N</td>
                        </tr>
                        <tr>
                            <td>1005</td>
                            <td>희동이</td>
                            <td>4</td>
                            <td>서울 마포구 월드컵북로 60길 17</td>
                            <td>010-5555-5555</td>
                            <td>Y</td>
                        </tr>
                        <tr>
                            <td>1006</td>
                            <td>고길동</td>
                            <td>45</td>
                            <td>경기 의왕시 성고개로 59</td>
                            <td>010-6666-6666</td>
                            <td>Y</td>
                        </tr>
                        <tr>
                            <td>1007</td>
                            <td>공실이</td>
                            <td>15</td>
                            <td>서울 송파구 올림픽로 240</td>
                            <td>010-7777-7777</td>
                            <td>N</td>
                        </tr>
                    </tbody>
                </Table>
)

function MemberTableStruct() {
    return (
        <Table striped bordered hover>
        <tbody>
            <tr>
                <td>id</td>
                <td>아이디</td>
                <td>int(4)</td>
                <td>PK</td>
            </tr>
            <tr>
                <td>name</td>
                <td>이름</td>
                <td>varchar(100)</td>
                <td>not null</td>
            </tr>
            <tr>
                <td>age</td>
                <td>나이</td>
                <td>int(3)</td>
                <td></td>
            </tr>
            <tr>
                <td>addr</td>
                <td>주소</td>
                <td>varchar(255)</td>
                <td></td>
            </tr>
            <tr>
                <td>phoneNumber</td>
                <td>전화번호</td>
                <td>varchar(13)</td>
                <td></td>
            </tr>
            <tr>
                <td>useYn</td>
                <td>사용여부</td>
                <td>varchar(1)</td>
                <td></td>
            </tr>
        </tbody>
    </Table>
    )
}

/**
 * 기본 문제 설명 
 */
function Basic() {
    const [show1, setShow1] = useState(false);
    const handleShow1 = () =>  setShow1(true);
    const handlehide1 = () =>  setShow1(false);

    const [show2, setShow2] = useState(false);
    const handleShow2 = () =>  setShow2(true);
    const handlehide2 = () =>  setShow2(false);

    return (
        <div>            
        <div className="card p-2">
            <div className="card-title">
            <Button variant="secondary" className="m-1" onClick={handleShow1}>Member Table 구조</Button>
            <Button variant="secondary" className="m-1" onClick={handleShow2}>Member Table 전채</Button>
            </div>                        
        </div>
        <Modal show ={show1} onHide={handlehide1}>
                <Modal.Header closeButton>
                    <Modal.Title>Member Table 구조</Modal.Title>
                </Modal.Header>
                <Modal.Body>      
                    <MemberTableStruct />              
                </Modal.Body>
            </Modal>
            <Modal show={show2} onHide={handlehide2}>
                <Modal.Header closeButton>
                    <Modal.Title>Member Table 전체</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <JsonView json={json} table = {memberTable}/>
                </Modal.Body>
            </Modal>
            <hr />
        <p>
            API 호출 주소는 <b>http://localhost:8080/getMemberList.do</b> 입니다. (API 호출 시 파라미터 입력 값은 없습니다.) <br />
            result의 조회버튼을 click하면 다음과 같은 조회 내역이 나오게 하면 됩니다.
        </p>
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>나이</th>
                    <th>주소</th>
                    <th>전화번호</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1001</td>
                    <td>둘리</td>
                    <td>16</td>
                    <td>서울특별시 중구 을지고 66</td>
                    <td>010-1111-1111</td>
                </tr>
                <tr>
                    <td>1002</td>
                    <td>또치</td>
                    <td>14</td>
                    <td>서울특별시 영등포구 63로 50</td>
                    <td>010-2222-2222</td>
                </tr>
                <tr>
                    <td>1003</td>
                    <td>도우너</td>
                    <td>17</td>
                    <td>인천 서구 에코로 181</td>
                    <td>010-3333-3333</td>
                </tr>
                <tr>
                    <td>1005</td>
                    <td>희동이</td>
                    <td>4</td>
                    <td>서울 마포구 월드컵북로60길 17</td>
                    <td>010-5555-5555</td>
                </tr>
                <tr>
                    <td>1006</td>
                    <td>고길동</td>
                    <td>45</td>
                    <td>경기 의왕시 성고개로 59</td>
                    <td>010-6666-6666</td>
                </tr>
            </tbody>
        </Table>
        </div>
    )
}


/**
 * 시험 설명 출력 
 * @param {testId} param 
 * @returns 
 */
function TestDesc(param) {
    switch(param.testId) {
        case "1":
            return <Basic />

        case "2":
            return (
                <div>
                    <Basic />
                    <h4 >추가 과제</h4>
                    <ol>
                        <li> ID 기준으로 <strong>오름차순,내림차순 정렬 기능</strong>을 구현하시오</li>
                        <li> 이름으로 <strong>검색기능</strong>을 구현하시오. 
                            '동' 으로 검색할 경우 '희동이' 와 '고길동'이 나와야 합니다. </li>
                    </ol>                    
                </div>
            )
        default:
        return (<p>문제가 준비되지 않았습니다.</p>)
    }
}

export default TestDesc;