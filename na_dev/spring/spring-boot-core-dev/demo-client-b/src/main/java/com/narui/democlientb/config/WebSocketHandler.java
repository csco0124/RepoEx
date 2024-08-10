package com.narui.democlientb.config;

import java.io.IOException;
import java.net.URI;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URIBuilder;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class WebSocketHandler extends TextWebSocketHandler {
	private static ConcurrentHashMap<String, ConcurrentHashMap<String, WebSocketSession>> CLIENT_SOCKET_LIST = new ConcurrentHashMap<String, ConcurrentHashMap<String, WebSocketSession>>();
	
	public void addClientListSession(String groupId, String name, WebSocketSession session) {
		if(CLIENT_SOCKET_LIST.containsKey(groupId)) {
			ConcurrentHashMap<String, WebSocketSession> clients = CLIENT_SOCKET_LIST.get(groupId);
			clients.put(session.getId()+"|"+name, session);
		} else {
			ConcurrentHashMap<String, WebSocketSession> clients = new ConcurrentHashMap<String, WebSocketSession>();
			clients.put(session.getId()+"|"+name, session);
			CLIENT_SOCKET_LIST.put(groupId, clients);
		}
	}
	public void removeClientListSession(String groupId, String name, WebSocketSession session) {
		if(CLIENT_SOCKET_LIST.containsKey(groupId)) {
			ConcurrentHashMap<String, WebSocketSession> clients = CLIENT_SOCKET_LIST.get(groupId);
			clients.remove(session.getId()+"|"+name);
		}
	}
	
	public String getParamValue(String name, WebSocketSession session) throws Exception {
		String value = "";
		
		List<NameValuePair> params = new URIBuilder(session.getUri(), Charset.forName("UTF-8")).getQueryParams();
//		List<NameValuePair> params = URLEncodedUtils.parse(session.getUri(), Charset.forName("UTF-8"));
		for (NameValuePair param : params) {
			if(name.equals(param.getName())) {
				value = param.getValue();
			}
		}
		return value;
	}
	
	public void callConnectionEvent(String groupId) {
		ConcurrentHashMap<String, WebSocketSession> clients = CLIENT_SOCKET_LIST.get(groupId);
		
		String connectionUserList = "";
		
		for(String strKey : clients.keySet() ){
			connectionUserList += strKey.split("\\|")[1] + ",";
		}
		try {
			for(String strKey : clients.keySet() ){
				ObjectMapper mapper = new ObjectMapper();
				Map<String, String> map = new HashMap<String, String>();
				map.put("connectionEvent", "Y");
				map.put("connectionUserList", connectionUserList);
				TextMessage sendMessage = new TextMessage(mapper.writeValueAsString(map));
				clients.get(strKey).sendMessage(sendMessage);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		/*clients.entrySet().forEach(arg -> {
			try {
				ObjectMapper mapper = new ObjectMapper();
				Map<String, String> map = new HashMap<String, String>();
				map.put("connectionEvent", "Y");
				map.put("connectionUserList", connectionUserList);				
				TextMessage sendMessage = new TextMessage(mapper.writeValueAsString(map));
				arg.getValue().sendMessage(sendMessage);
			} catch (IOException e) {
				e.printStackTrace();
			}
		})*/;
	}
	
	/**
	 * 웹소켓 연결시 호출
	 */
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		log.info(".........afterConnectionEstablished");
		String groupId = this.getParamValue("groupId", session);
		String name = this.getParamValue("name", session);
		addClientListSession(groupId, name, session);
		callConnectionEvent(groupId);
	}
	
	/**
	 * 웹소켓 연결 종료시 호출
	 */
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		log.info(".........afterConnectionClosed");
		String groupId = this.getParamValue("groupId", session);
		String name = this.getParamValue("name", session);
		removeClientListSession(groupId, name, session);
		callConnectionEvent(groupId);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		log.info(".........handleTextMessage");
		String groupId = this.getParamValue("groupId", session);
		String name = this.getParamValue("name", session);
		
		ConcurrentHashMap<String, WebSocketSession> clients = CLIENT_SOCKET_LIST.get(groupId);
		
		String id = session.getId(); // 메시지를 보낸 아이디
		log.info("id(메시지를 보낸 id) : " + id);
		clients.entrySet().forEach(arg -> {
			log.info("key : value > " + arg.getKey() + " : " + arg.getValue());
			//if (!arg.getKey().equals(id)) { // 같은 아이디가 아니면 메시지를 전달합니다.
				try {
					ObjectMapper mapper = new ObjectMapper();
					Map<String, String> map = mapper.readValue(message.getPayload(), Map.class);
					map.put("connectionEvent", "N");
					map.put("name", name);
					TextMessage sendMessage = new TextMessage(mapper.writeValueAsString(map));
					arg.getValue().sendMessage(sendMessage);
				} catch (IOException e) {
					e.printStackTrace();
				}
			//}
		});
	}
		
}
