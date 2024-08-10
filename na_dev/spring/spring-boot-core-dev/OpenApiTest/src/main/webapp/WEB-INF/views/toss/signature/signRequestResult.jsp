<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.Arrays"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="com.open.toss.SignatureController"%>
<!doctype html>
<%
String txId = ""+request.getAttribute("txId");
String accessToken = ""+request.getAttribute("accessToken");
%>
<html>
<head>
<meta>
<title>토스 본인확인 테스트 결과</title>
<script src="/js/jquery_3.7.0.min.js"></script>
<script type="text/javascript">
const userKey = "<%=Arrays.toString(SignatureController.user_key).replace("[", "").replace("]", "").replace(" ", "")%>";
$(document).ready(function(){
	checkSignComp();
});

function checkSignComp(){
	let interval = null;
	interval = setInterval(function() {
		$("#infoText").text("어플 응답 대기중");
		if(getUserInfo()){
			$("#infoText").text("Return 정보");
			clearInterval(interval);	
		}
		
	}, 1500);
}

function getUserInfo(){
	let isCheck = false;
	$.ajax({
		url: "/toss/signRequestResultCheck",
		data :  JSON.stringify({
			'tx_id' : $("#txId").val(),
			'access_token' : $("#access_token").val()
	    }),
		type: "POST", //전송 타입
		async: false, //비동기 여부
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(data, status) {
			if(Object.keys(data).length > 0){
				isCheck = true;
				let userInfo = "";
				let userKeyArr = userKey.split(",");
				for(const userKey in userKeyArr){
					userInfo += userKeyArr[userKey] + " : " + data[userKeyArr[userKey]] + "<br />"; 
				}
				$("#userInfo").html(userInfo);
			}
			
			
        },
	});
	return isCheck;
}
</script>
</head>
<body>
<h3>전자서명 정보(테스트 데이터 리턴됨)</h3>
<input type="hidden" id="txId" 	name="txId"	value=<%=txId%> />
<input type="hidden" id="access_token" 	name="access_token"	value=<%=accessToken%> />
<br />
<h4 id="infoText"></h4>
<span id="userInfo"></span>
<br />
<a href="/">홈으로</a>
</body>
</html>