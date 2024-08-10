package com.open.main;

import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Scanner;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import im.toss.cert.sdk.TossCertSession;
import im.toss.cert.sdk.TossCertSessionGenerator;

@Controller
public class MainController {
	
	@GetMapping("/")
	public String main() {
		return "index";
	}
	
	public static void getToken() throws Exception {
		URL url = new URL("https://oauth2.cert.toss.im/token");
		HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
		httpConn.setRequestMethod("POST"); 

		httpConn.setRequestProperty("Content-Type", "application/x-www-form-urlencoded");
		httpConn.setDoOutput(true);
		OutputStreamWriter writer = new OutputStreamWriter(httpConn.getOutputStream());
		writer.write("grant_type=client_credentials&" +
		        "client_id=test_a8e23336d673ca70922b485fe806eb2d&" +
		        "client_secret=test_418087247d66da09fda1964dc4734e453c7cf66a7a9e3&" +
		        "scope=ca");
		writer.flush();
		writer.close(); 

		httpConn.getOutputStream().close();
		InputStream responseStream = httpConn.getResponseCode() == 200
		        ? httpConn.getInputStream()
		        : httpConn.getErrorStream();
		Scanner s = new Scanner(responseStream).useDelimiter("\\A");
		String response = s.hasNext() ? s.next() : "";
		System.out.println(response);
		
		Gson gson = new Gson();
		HashMap<String, String> resultMap = gson.fromJson(response.toString(), HashMap.class);
		
		System.out.println(resultMap);
		System.out.println(resultMap.get("access_token"));
	}
	
	public static void authRequestWindow() throws Exception {
		URL url = new URL("https://cert.toss.im/api/v2/sign/user/auth/id/request");
		HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
		httpConn.setRequestMethod("POST"); 

		httpConn.setRequestProperty("Authorization", "Bearer eyJraWQiOiJjZXJ0IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0ZXN0X2E4ZTIzMzM2ZDY3M2NhNzA5MjJiNDg1ZmU4MDZlYjJkIiwiYXVkIjoidGVzdF9hOGUyMzMzNmQ2NzNjYTcwOTIyYjQ4NWZlODA2ZWIyZCIsIm5iZiI6MTY5MTA0ODEyMCwic2NvcGUiOlsiY2EiXSwiaXNzIjoiaHR0cHM6XC9cL2NlcnQudG9zcy5pbSIsImV4cCI6MTcyMjU4NDEyMCwiaWF0IjoxNjkxMDQ4MTIwLCJqdGkiOiJiZjU1NTQ0Yy00ZTJlLTRiNTgtOGUxNC04M2IwMjBmOGQ2OWIifQ.DvPQV3xkRvDZM5GD9PkYzNJmLdzknKOzWJapFZjEgWwbUvq08U16_QQsuERmmzPH-e-ERJC7ErsfH20SQYSZQjJb_hxQATBUaIWxMj2_i0x2larZXsnQnaJ3faTIYSFteXeMmjWarUBn6PSAzeGHNhcAmZjYp2bM41-s8Ooy52pnwLt7mKUWBS2Uf2nR8QHuXnCPdsjzkJBHccDpYGfHtqvDIKQ6wW_9YXGJuirGmxRL07RDbUXkvhV4Nr7HClDSBUYIkQ-SHkHfekNCznXGFeObkyCoeDGyTrqIIw2_wFYjqJtR1epoahBZm8jP8q7BBYhZIO0QBNdYM6_jtdhefg");
		httpConn.setRequestProperty("Content-Type", "application/json");
		httpConn.setDoOutput(true);
		OutputStreamWriter writer = new OutputStreamWriter(httpConn.getOutputStream());
		writer.write("{\"requestType\" : \"USER_NONE\"}");
		writer.flush();
		writer.close(); 

		httpConn.getOutputStream().close();
		InputStream responseStream = httpConn.getResponseCode() == 200
		        ? httpConn.getInputStream()
		        : httpConn.getErrorStream();
		Scanner s = new Scanner(responseStream).useDelimiter("\\A");
		String response = s.hasNext() ? s.next() : "";
		System.out.println(response);
	}
	
	public static void main(String[] args) throws Exception{
		getToken();
		//authRequestWindow();
		//getEncryption();
	}
	
	public static void getEncryption() throws Exception{
		// 1. 세션 생성기를 사전에 1회만 생성해 주세요.
        TossCertSessionGenerator tossCertSessionGenerator = new TossCertSessionGenerator();

        // 2. 개인정보가 포함되어 있는 인증요청 API 호출 전에 세션을 생성해 주세요.
        TossCertSession tossCertSession = tossCertSessionGenerator.generate();

        // 3. 개인정보를 암호화 해주세요.
        System.out.println("userName: " + tossCertSession.encrypt("김동건"));
        System.out.println("userPhone: " + tossCertSession.encrypt("01093522131"));
        System.out.println("userBirthday: " + tossCertSession.encrypt("19850124"));
        System.out.println("sessionKey: " + tossCertSession.getSessionKey());
        

        // 4. 인증요청 API를 호출해 주세요.
        // 인증요청 API의 바디 파라미터에 생성된 sessionKey를 추가해 주세요.
        /*String sessionKey = tossCertSession.getSessionKey();
        String userName = encryptedUserName;

        // 5. 사용자의 인증이 끝나면 결과조회 API 호출 전에 새로운 세션을 생성해 주세요.
        TossCertSession tossCertSession = tossCertSessionGenerator.generate();

        // 6. 결과조회 API를 호출해주세요.
        // 결과조회 API의 바디 파라미터에 생성된 sessionKey를 추가해 주세요.
        String sessionKey = tossCertSession.getSessionKey();
        String txId = "a39c84d9-458d-47e4-acf7-c481e851f79b";

        // 7. 복호화를 위해 결과조회 요청에서 생성했던 tossCertSession를 가지고 있어야 합니다.
        // response.userName 을 응답받은 암호화된 userName 이라고 가정합니다.
        // decryptedUserName 은 무결성 검증까지 완료되어 있습니다.
        String decryptedUserName = tossCertSession.decrypt(response.userName);*/
	}
}
