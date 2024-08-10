package com.open.toss;

import java.io.InputStream;
import java.io.OutputStreamWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.google.gson.internal.LinkedTreeMap;

import im.toss.cert.sdk.TossCertSession;
import im.toss.cert.sdk.TossCertSessionGenerator;

@Component
public class TossAuthCommon {
	public HashMap<String, String> getToken() throws Exception {
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
		
		Gson gson = new Gson();
		HashMap<String, String> resultMap = gson.fromJson(response.toString(), HashMap.class);
		return resultMap;
	}
	
	public HashMap<String, String> certRequestData(String callUrl, Map<String, Object> formData) throws Exception{
		URL url = new URL(callUrl);
		HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
		httpConn.setRequestMethod("POST"); 
		httpConn.setRequestProperty("Authorization", "Bearer "+formData.get("access_token"));
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
		Gson gson = new Gson();
		HashMap<String, String> resultMap = gson.fromJson(response.toString(), HashMap.class);
		return resultMap;
	}
	
	public HashMap<String, String> certAppPushSignatureRequestData(String callUrl, Map<String, Object> formData) throws Exception{
		TossCertSession tossCertSession = createSessionKey();
		String sessionKey = tossCertSession.getSessionKey();
		
		URL url = new URL("https://cert.toss.im/api/v2/sign/doc/request");
		HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
		httpConn.setRequestMethod("POST"); 

		httpConn.setRequestProperty("Authorization", "Bearer "+formData.get("access_token"));
		httpConn.setRequestProperty("Content-Type", "application/json"); 

		// 세션 키는 매 요청 시 새로 생성해야 합니다.
		httpConn.setDoOutput(true);
		OutputStreamWriter writer = new OutputStreamWriter(httpConn.getOutputStream());
		writer.write("{" +
		        "\"requestType\" : \"USER_PERSONAL\",\"triggerType\" : \"PUSH\"," +
		        "\"userName\" : \""+this.getEncryptVal(tossCertSession, ""+formData.get("user_name"))+"\"," +
		        "\"userPhone\" : \""+this.getEncryptVal(tossCertSession, ""+formData.get("user_phone"))+"\"," +
		        "\"userBirthday\" : \""+this.getEncryptVal(tossCertSession, (""+formData.get("user_birthday")).replaceAll("-", ""))+"\"," +
		        "\"sessionKey\" : \""+sessionKey+"\"," +
		        "\"serviceName\" : \"토스 출금이체\"," +
		        "\"docTitle\" : \"출금이체 동의문\"," +
		        "\"doc\" : \"토스 간편송금 등의 서비스를 원활하게 이용하기 위하여 앞서 입력한 계좌에 대한 출금이체 동의가 필요합니다. 동의를 누르면 입력한 계좌에서 오픈뱅킹을 통해 출금이체가 진행됩니다.\"," +
		        "\"docType\" : \"TEXT\"," +
		        "\"docEncrypted\" : false," +
		        "\"signatureType\" : \"PKCS7\"" +
		        "}");
		writer.flush();
		writer.close(); 

		httpConn.getOutputStream().close();
		InputStream responseStream = httpConn.getResponseCode() == 200
		        ? httpConn.getInputStream()
		        : httpConn.getErrorStream();
		Scanner s = new Scanner(responseStream).useDelimiter("\\A");
		String response = s.hasNext() ? s.next() : "";
		Gson gson = new Gson();
		HashMap<String, String> resultMap = gson.fromJson(response.toString(), HashMap.class);
		return resultMap;
	}
	
	
	public Map<String, String> getUserInfo(String callUrl, String[] userKey, String txId, String accessToken) throws Exception {
		TossCertSession tossCertSession = createSessionKey();
		String sessionKey = tossCertSession.getSessionKey();
		
		URL url = new URL(callUrl);
		HttpURLConnection httpConn = (HttpURLConnection) url.openConnection();
		httpConn.setRequestMethod("POST"); 

		httpConn.setRequestProperty("Authorization", "Bearer "+accessToken);
		httpConn.setRequestProperty("Content-Type", "application/json"); 

		// 세션 키는 매 요청 시 새로 생성해야 합니다.
		httpConn.setDoOutput(true);
		OutputStreamWriter writer = new OutputStreamWriter(httpConn.getOutputStream());
		writer.write("{" +
		        "\"txId\" : \""+txId+"\"," +
		        "\"sessionKey\" : \""+sessionKey+"\"" +
		        "}");
		writer.flush();
		writer.close(); 

		httpConn.getOutputStream().close();
		InputStream responseStream = httpConn.getResponseCode() / 100 == 2
		        ? httpConn.getInputStream()
		        : httpConn.getErrorStream();
		Scanner s = new Scanner(responseStream).useDelimiter("\\A");
		String response = s.hasNext() ? s.next() : "";
		Gson gson = new Gson();
		HashMap<String, String> resultMap = gson.fromJson(response.toString(), HashMap.class);
		
		LinkedTreeMap<String, Object> userMap = getUserData(response);
		Map<String, String> userInfoMap = new HashMap<String, String>();
		if(userMap != null) {
			for(String key : userKey) {
				if(!"doc".equals(key) && !"signedDoc".equals(key)) {	// 복호화 안해도 되는 리턴 값
					userInfoMap.put(key, (userMap.get(key) == null)?"":getDecryptVal(tossCertSession, ""+userMap.get(key)));
				} else {
					userInfoMap.put(key, (userMap.get(key) == null)?"":""+userMap.get(key));
				}
			}
		}
		return userInfoMap;
	}
	
	public TossCertSession createSessionKey() {
		TossCertSessionGenerator tossCertSessionGenerator = new TossCertSessionGenerator();
		TossCertSession tossCertSession = tossCertSessionGenerator.generate();
		return tossCertSession;
	}
	
	public LinkedTreeMap<String, Object> getUserData(String response){
		Gson gson = new Gson();
		HashMap<String, Object> resultMap = gson.fromJson(response.toString(), HashMap.class);
		if("FAIL".equals(resultMap.get("resultType"))) {
			return null;
		} else {
			LinkedTreeMap<String, Object> returnMap = new LinkedTreeMap<String, Object>();
			LinkedTreeMap<String, Object> successMap = (LinkedTreeMap<String, Object>)resultMap.get("success");
			returnMap = (LinkedTreeMap<String, Object>)successMap.get("personalData");
			if(successMap.get("doc") != null) {
				returnMap.put("doc", successMap.get("doc"));
			}
			if(successMap.get("signedDoc") != null) {
				returnMap.put("signedDoc", successMap.get("signedDoc"));
			}
			
			return returnMap;
		}
		
	}
	
	public String getEncryptVal(TossCertSession tossCertSession, String encVal) {
		if(encVal == null) {
			return "";
		}
		String decryptedUserName = tossCertSession.encrypt(encVal);
		return decryptedUserName;
	}
	
	public String getDecryptVal(TossCertSession tossCertSession, String encVal) {
		if(encVal == null) {
			return "";
		}
		String decryptedUserName = tossCertSession.decrypt(encVal);
		return decryptedUserName;
	}
	
}
