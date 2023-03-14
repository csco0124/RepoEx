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
			url : "/login",
			data: JSON.stringify(userObject),
			contentType : "application/json; charset=UTF-8",
			success : function(data) {
				console.log("data: " + data);
				
				alert(data);
			}
		});
	});		
	
});
