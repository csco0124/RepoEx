<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.HashMap"%>
<!doctype html>
<%
HashMap<String, Object> tokenObj = (HashMap<String, Object>)request.getAttribute("tokenInfo");
System.out.println(tokenObj.get("access_token"));
%>
<html>
<head>
<meta>
<title>토스 전자서명 테스트 시작</title>
<script src="https://cdn.toss.im/cert/v1"></script>
<script src="/js/jquery_3.7.0.min.js"></script>
<script type="text/javascript">
function certRequest(){
	console.log($("#access_token").val());
	$.ajax({
		url: "/toss/signRequest",
		data :  JSON.stringify({
			'access_token' : $("#access_token").val(),
			'scope' : $("#scope").val(),
			'token_type' : $("#token_type").val(),
			'expires_in' : $("#expires_in").val(),
			'user_name' : $("#user_name").val(),
			'user_phone' : $("#user_phone").val(),
			'user_birthday' : $("#user_birthday").val(),
	    }),
		type: "POST", //전송 타입
		async: true, //비동기 여부
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(data, status) {
			console.log(data);
			$("#txId").val(data.success.txId);
			$("#certForm").submit();
        },
	});		
}

</script>
</head>
<body>
	<form method="post" action="/toss/signRequestResult" id="certForm">
		<input type="hidden" id="access_token" 	name="access_token"	value=<%=tokenObj.get("access_token")%> />
		<input type="hidden" id="scope" 		name="scope"		value=<%=tokenObj.get("scope")%>/>
		<input type="hidden" id="token_type" 	name="token_type"	value=<%=tokenObj.get("token_type")%> />
		<input type="hidden" id="expires_in" 	name="expires_in"	value=<%=tokenObj.get("expires_in")%> />
		
		<input type="hidden" id="txId" 			name="txId"			value="" />
	</form>	
	이름 : <input type="text" id="user_name" name="user_name" value=""><br />
	전화번호 : <input type="text" id="user_phone" name="user_phone" value=""><br />
	생년월일 : <input type="date" id="user_birthday" name="user_birthday" value=""><br />
	<button onclick="javascript:certRequest();">인증요청</button>
</body>
</html>