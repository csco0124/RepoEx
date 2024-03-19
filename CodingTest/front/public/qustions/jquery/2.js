/**
 * jQuery 고급 
 * 성명 : 
 */
$(document).ready(function() {
	$("#fetch").on("click",function() {
		// TODO : data load 
		// api주소  : http://localhost:8080/getMemberList.do
		// 호출 메소드 : get
		// axios 사용가능합니다.
		console.log("load data");
	})

	$("#search").on("click", function() {
		// TODO: 이름 기준으로 검색기능 구현 
		const text = $("input[name=searchText]").val();
		console.log("검색 : "+ text);
	})	

	$("#toggleSort").on("click", function() {
		// TODO : Sort ID 기준으로 오름차순, 내림차순 정렬 토글 구현 
		const sortclass = $("#toggleSort").attr("class");
		console.log(sortclass);
		const newSort = sortclass == "asc" ? "desc" : "asc";
		$("#toggleSort").attr("class",newSort);

	})
});