<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ page import="java.util.HashMap"%>
<%@ page import="com.open.toss.CertificationController"%>
<!doctype html>
<%
String[] userKey = CertificationController.user_key;

HashMap<String, Object> userInfoMap = (HashMap<String, Object>)request.getAttribute("userInfoMap");
%>
<html>
<head>
<meta>
<title>토스 간편인증 테스트 결과</title>
<script src="/js/jquery_3.7.0.min.js"></script>
<script type="text/javascript">

</script>
</head>
<body>
<h3>간편인증 정보(테스트 데이터 리턴됨)</h3>
<%
for(String key : userKey){
%>
<%=key + " : " + userInfoMap.get(key)%><br/>
<%
}
%>
<br />
<a href="/">홈으로</a>
</body>
</html>