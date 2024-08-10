<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!doctype html>
<html>
<head>
<meta>
<title>토스 간편인증 테스트</title>
<script src="/js/jquery_3.7.0.min.js"></script>
<script type="text/javascript">
function certStart(){
	location.href="/toss/certStart"
}
</script>
</head>
<body>
	<button onclick="javascript:certStart();">테스트 시작</button>
</body>
</html>