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
<title>토스 본인확인 테스트 시작</title>
<script src="https://cdn.toss.im/cert/v1"></script>
<script src="/js/jquery_3.7.0.min.js"></script>
<script type="text/javascript">
function certRequest(){
	console.log($("#access_token").val());
	$.ajax({
		url: "/toss/certRequest",
		data :  JSON.stringify({
			'access_token' : $("#access_token").val(),
			'scope' : $("#scope").val(),
			'token_type' : $("#token_type").val(),
			'expires_in' : $("#expires_in").val()
	    }),
		type: "POST", //전송 타입
		async: true, //비동기 여부
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(data, status) {
			console.log(data);
			$("#txId").val(data.success.txId);
			$("#authUrl").val(data.success.authUrl);
			newCertPop();
        },
	});		
}

function newCertPop(){
	var tossCert = TossCert();
	tossCert.preparePopup();
	tossCert.start({
		authUrl: $("#authUrl").val(),
	    txId: $("#txId").val(),
	    onSuccess: function () {
	    	$("#certForm").submit();
	    },
	    onFail: function (error) {
	    	console.error('에러가 발생했습니다', error); // 인증 실패시 행동을 정의해주세요.
	    },
	  });
}
</script>
</head>
<body>
	<form method="post" action="/toss/certRequestResult" id="certForm">
		<input type="hidden" id="access_token" 	name="access_token"	value=<%=tokenObj.get("access_token")%> />
		<input type="hidden" id="scope" 		name="scope"		value=<%=tokenObj.get("scope")%>/>
		<input type="hidden" id="token_type" 	name="token_type"	value=<%=tokenObj.get("token_type")%> />
		<input type="hidden" id="expires_in" 	name="expires_in"	value=<%=tokenObj.get("expires_in")%> />
		
		<input type="hidden" id="txId" 			name="txId"			value="" />
		<input type="hidden" id="authUrl" 		name="authUrl"		value="" />
	</form>	
	<button onclick="javascript:certRequest();">인증요청</button>
</body>
</html>