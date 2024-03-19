import axios from "axios";
import { useEffect, useState } from "react"
import { Button, Col, Form, Row, Tab, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TestTimer from "../TestTimer";
import { TimeManager } from "../../util/TimeManager";

/**
 * 백엔드 테스트 초급 문제 화면 
 * @returns 
 */
function Level1(props) {
    const [data, setData] = useState(Array());

    const load = ()=> {
        axios.get('http://localhost:8080/getMemberList.do')
        .then(function(response){
            console.log(response);
            const data = response.data;
            setData(data);
            for(const idx in data) {
                console.log(data[idx].title);
            }
        }) 
        .catch(function(error){

        })
    }

    useEffect(() => {
        if(data.length === 0) {
            load();
        }
    })

    return (
        <div>
            <h1>Member 정보 저장</h1>

            <p>Backend method 만들기 test 입니다.</p>
            <p>하단의 sample data를 input 박스에 직접 입력(또는 복사/붙여넣기) 하여
            member 정보 저장 버튼을 누를 경우 member table에 화면에서 입력한 data insert가 되도록 진행하면 됩니다.<br/>
            member 정보 저장 버튼은 <b>TestTwoController.java</b>의 saveMember method를 호출하게 되어있으며
            MemberRepository.java에 필요한 CRUD method를 만드시면 됩니다.<br/>
            src/main/java/com/narui/test/controller/<b>TestTwoController.java</b> 파일과
            src/main/java/com/narui/test/repository/<b>MemberRepository.java</b> 파일을 변경하면 됩니다.</p>
            <p>필요한 파일이나 경로를 생성하거나 class나 bean객체를 직접 선언해도 되며 특별히 코딩 방식에는 제한을 두지 않습니다.</p>
            
            <h2>sample data</h2>
            <Table striped bordered hover >
                <tbody>
                <tr>
                    <th>id</th>
                    <td>1008</td>
                </tr>
                <tr>
                    <th>이름</th>
                    <td>아기공룡</td>
                </tr>
                <tr>
                    <th>나이</th>
                    <td>999</td>
                </tr>
                <tr>
                    <th>주소</th>
                    <td>서울 구로구 디지털로33길 11</td>
                </tr>
                <tr>
                    <th>전화번호</th>
                    <td>010-8888-8888</td>
                </tr>
                <tr>
                    <th>사용여부</th>
                    <td>Y</td>
                </tr>
                </tbody>
            </Table>     
            <h2>member list</h2>
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
                    {
                        data.map(data=>{
                            return (<tr key={data.id}>
                                <td>{data.id}</td>
                                <td>{data.name}</td>
                                <td>{data.age}</td>
                                <td>{data.addr}</td>
                                <td>{data.phoneNumber}</td>
                            </tr>)
                        })
                    }
                </tbody>
            </Table>
            <h2>member input</h2>

            <MemberInputTable />
        </div>
    )
}

function MemberInputTable(props) {
    return (
        <>
        <Form action = "http://localhost:8080/saveMember.do" method="post">
            <Row className="mb-3">
                <Form.Group as={Col} className="mb-3" controlId="id">
                    <Form.Label>ID</Form.Label>
                    <Form.Control type="text" placeholder="숫자만입력" />
                </Form.Group>
            </Row>
        </Form>

        <Table striped bordered hover >            
            <tbody>
                <tr>
                    <th><label htmlFor="id">ID</label></th>
                    <td>
                        <input 
                            type="text" 
                            id="id" 
                            name="id"
                            className="form-control" 
                            maxLength="4" 
                            pattern="[0-9]+" 
                            placeholder="숫자만입력" 
                            value={props.data?.id}
                            />
                        </td>                         
                </tr>
                <tr>
                    <th><label htmlFor="name">이름</label></th>
                    <td><input 
                        type="text" 
                        id="name" 
                        name="name" 
                        className="form-control" 
                        maxLength="100" 
                        value={props.data?.name}
                        /></td>
                </tr>
                <tr>
                    <th><label htmlFor="age">나이</label></th>
                    <td><input 
                        type="text" 
                        id="age" 
                        name="age" 
                        className="form-control" 
                        maxLength="3" 
                        pattern="[0-9]+" 
                        placeholder="숫자만입력"
                        value={props.data?.age}
                            /></td>
                </tr>
                <tr>
                    <th><label htmlFor="addr">주소</label></th>
                    <td><input 
                        type="text" 
                        id="addr" 
                        name="addr" 
                        className="form-control" 
                        maxLength="255"
                        value={props.data?.addr}
                            /></td>
                </tr>
                <tr>
                    <th><label htmlFor="phoneNumber">전화번호</label></th>
                    <td><input 
                        type="text" 
                        id="phoneNumber" 
                        name="phoneNumber" 
                        className="form-control" 
                        maxLength="13" 
                        pattern="[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}" 
                        value={props.data?.phoneNumber}                            
                        /></td>
                </tr>
                <tr>
                    <th><label htmlFor="useYn">사용여부</label></th>
                    <td><input 
                        type="text" 
                        id="useYn"
                        name="useYn" 
                        className="form-control" 
                        maxLength="1" 
                        placeholder=" Y 또는 N 입력" 
                        value={props.data?.useYn}
                        /></td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="2"><Button type="submit" variant="primary w-100" id="saveInfo">member 정보 저장</Button></td>
                </tr>  
                {
                    //TODO : 삭제 구현 
                    props.data == null 
                    ? <></> 
                    : <tr>
                        <td colSpan={2}>
                        <Button variant="secondary w-100" id="delete">삭제</Button>
                        </td>
                    </tr>
                }                  
            </tfoot>
	    </Table>
        </>
    )
}

function Loading() {
    return (
        <p>Loading</p>
    )
}

function TestHeader() {
    return (
        <>
        <h2>Backend method</h2>
        <p>Backend method 를 만드는 Test 입니다.</p>
        </>
    )
}

function TestBody() {
    const { level } = useParams();

    switch(level) {
        case "1": 
            return <Level1 />
        default:
            return (
                <p>
                    level {level} 문제가 준비되지 않았습니다.
                </p>
            )
    }
}



/**
 * 백엔드 테스트 문제풀이 화면 
 * 
 */
function BackendTest() {
    const [isStart, setIsStart] = useState(false)
    const [isTimeOver, setIsTimeOver] = useState(false)
    const onTimerStart = () => {
        setIsStart(true);
    }
    const onTimerTimeOver = () => {
        setIsTimeOver(true);
    }

    useEffect(()=> {
        const isStart = sessionStorage.getItem("time") !== null;
        setIsStart(isStart);
        setIsTimeOver(TimeManager.getIsTimeUp("time"));
    },[isStart, isTimeOver])
    return <>
    <TestHeader />
    <TestTimer id={"time"} onStart={onTimerStart} onTimeOver={onTimerTimeOver} />    
    {    
    isStart && !isTimeOver? <TestBody /> :
    isTimeOver ? <p>시험시간이 종료되었습니다.</p> : 
    <></>
    }
    </>
}
export default BackendTest;