var ACCESS_TOKEN = "";

$(document).ready(function() {
	
	$("#loginBtn").on("click", function() {
		var userId = $("#userId");
		var password = $("#password");
		
		var userIdVal = userId.val();
		var passwordVal = password.val();
		 
		var userObject = {
			username : userIdVal,
			password : passwordVal
		};
		
		$.ajax({
			type : "POST",
			url : "api/authenticate?username=" + $("#userId").val() + "&password=" + $("#password").val(),
			success: function(data, textStatus, request){
				var responseHeader = request.getResponseHeader('Authorization');
		        alert(responseHeader);
		        
		        ACCESS_TOKEN = responseHeader.substr(7);
		        
		        console.log(ACCESS_TOKEN);
		   }
		});
		
	});
	
	$("#myInfoBtn").on("click", function() {
		$.ajax({
			type : "GET",
			url : "/myinfo",
			contentType : "application/json; charset=UTF-8",
			headers : {
				"Authorization" : "Bearer " + ACCESS_TOKEN
			},
			success : function(data) {
				console.log("data: " + data);
				
				alert(JSON.stringify(data));
			},
			error : function(xhr, status, error) {
				alert("code:" + xhr.status + "\n"
					+ "message:" + xhr.responseText + "\n"
					+ "error:" + error);
			}
		});
	});
	
});
