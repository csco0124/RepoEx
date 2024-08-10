import { useEffect, useRef, useState } from "react";

const WebSocketExam = () => {
	const groupId = "group1";
	let webSocketUrl:string = import.meta.env.VITE_APP_WEBSOCKET_URL+"/api/test/socket?groupId="+groupId;
	let ws:any = useRef(null);
	const textMessage = useRef<any>("");
	const [name, setName] = useState<string>("");
	const [sendText, setSendText] = useState<string>("");
	const [connectionUser, setConnectionUser] = useState<string[]>([]);

	const openSession = () => {
		if (!ws.current || ws.current.readyState === 3) {
			const connextionUrl:string = webSocketUrl+"&name="+name;
      ws.current = new WebSocket(connextionUrl);
      ws.current.onopen = () => {
        console.log("connected to " + connextionUrl);
      };
      ws.current.onclose = (error:any) => {
        console.log("disconnect from " + connextionUrl);
        console.log(error);
      };
      ws.current.onerror = (error:any) => {
        console.log("connection error " + connextionUrl);
        console.log(error);
      };
      ws.current.onmessage = (evt:any) => {
        const data = JSON.parse(evt.data);
				if(data.connectionEvent === 'Y'){
					updateConnectionUser(data.connectionUserList);
				} else {
					textMessage.current.innerHTML += "<br/>" + `[${data.name}] ${data.message}`;
				}
      };
    } else {
			alert("이미 접속되어 있음.");
		}
	}

	const updateConnectionUser = (connectionUserList:string) => {
		setConnectionUser([...connectionUserList.split(",")]);
	}

  const sendMessage = ()  => {
		if (ws && ws.current && ws.current.readyState === 1) {
      ws.current.send(
        JSON.stringify({
          message: sendText,
        })
      );
    } else {
			textMessage.current.innerHTML = "[No Send... Connection closed...]";
		}
  };

	const closeSession = () => {
		if (ws && ws.current && ws.current.readyState === 1) {
			ws.current.close();
		}
		textMessage.current.innerHTML = "[closeSession... Connection closed...]";
	}

  return (
    <div className="content">
      <div className="title-item">
        <h2 className="h2-title">웹소켓 예제</h2>
        <ul className="location">
          <li>예제</li>
          <li>유틸리티</li>
          <li>웹소켓 예제</li>
        </ul>
      </div>
      <div className="cont-item">
        <div className="title-item">
          <h3 className="h3-title">웹소켓 예제(localhost 에서만 테스트 가능 : rc.bluetype의 경우 nginx 추가 설정 필요)</h3>
        </div>
        <div className="row">
          <div className="col-4">
						ID : <input type="text" value={name} onChange={e => setName(e.target.value)} />
						<button type="button" className="btn btn-secondary" onClick={openSession}>접속</button>
          </div>
					<div className="col-4">
						Message : <input type="text" value={sendText} onChange={e => setSendText(e.target.value)} />
						<button type="button" className="btn btn-secondary" onClick={sendMessage}>메시지 전송</button>
					</div>
					<div className="col-4">
						<button type="button" className="btn btn-secondary" onClick={closeSession}>접속 종료</button>
					</div>
					<div className="col-6 mt-3">
						받은 메시지<br/>
						<div ref={textMessage}></div>
					</div>
					<div className="col-6 mt-3">
						접속자 : {connectionUser.map(user => {
							return (<p key={user}>{user}</p>);
						})}
						
					</div>
					
        </div>
      </div>
    </div>
  );
};

export default WebSocketExam;
