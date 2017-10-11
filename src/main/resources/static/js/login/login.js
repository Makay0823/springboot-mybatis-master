

function go(){
	alert(1);
	var username = $("#username").val();
	var password = $("#password").val();
	alert(baseTools.baseUrl);
	alert(username);
	$.ajax({
		url : baseTools.baseUrl+"/goLogin",
		data : {"username":username,
				"password" :password},
		type : "POST",
		async : false, 
		success : function(data) {
			alert(data.code);
		}
	});
}