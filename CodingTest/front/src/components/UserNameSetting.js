import { useState } from "react";
import { SessionManager } from "../util/SessionManager";
import { Button, Form, InputGroup } from "react-bootstrap";
/**
 * 1번문제 하단에 출력되는 이름저장 및 코드저장(다운로드) 버튼 
 *  */ 
function UserNameSetting(param) {
    const [username,setUserName] = useState(SessionManager.getUserName());
    
    const onChange = (event) => {
        console.log(event)
        setUserName(event.target.value)
        SessionManager.setUserName(event.target.value);
    }

    return (
        <>
        <Form inline className="pt-2">
            <InputGroup>
            <InputGroup.Text id="username">이름</InputGroup.Text>
            <Form.Control
                onChange={onChange} 
                value={username}
                placeholder="이름 입력"
                aria-label="이름"
                aria-describedby="이름 입력" />                
            {param.append != null ? param.append : <></>}
            </InputGroup>
        </Form>
    </>
    )
}
export default UserNameSetting