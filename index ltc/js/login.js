//创建一个初始用户
$(function() {
	if (!localStorage.length) {
		localStorage.setItem("usernum",1);
		localStorage.setItem("userid",0);
		localStorage.setItem("remenber",0);
		var data = {
			name:'muko',
			password:'e10adc3949ba59abbe56e057f20f883e',
			headpic:'head.jpg',
			bgpic:'head.jpg',
			follows:12,
			fans:45,
			articals:4
		};
		var d=JSON.stringify(data);
		var userid="data"+localStorage.getItem("usernum");
		localStorage.setItem(userid,d);
	}
})
function check(){
	var bool = true;
	if (!InputUsernameBlur()) bool = false;
	if (!InputPasswordBlur()) bool = false;
	if (!namepwdCheak()) bool = false
	if (bool){
		RemenberClick();
		form.submit();
	}
	return bool;
}
/*用户名输入框失去焦点*/
function InputUsernameBlur() {
	var uname = document.getElementById("name");
	var ename = document.getElementById("errorName");
	/* 用户名为空/不为空 */
	if (uname.value=="") {
		$("#tip-name").css("display","inline-block");
		ename.innerHTML="请输入账号";
		return false;
	}
	else {
		$("#tip-name").css("display","none");
		ename.innerHTML="";
	}
	return true;
}
/*密码输入框失去焦点*/
function InputPasswordBlur() {
	var pwd = document.getElementById("password");
	var epwd = document.getElementById("errorPassword");
	/* 密码为空/不为空 */
	if (pwd.value=="") {
		$("#tip-pwd").css("display","inline-block");
		epwd.innerHTML="请输入密码"
		return false;
	}
	else {
		$("#tip-pwd").css("display","none");
		epwd.innerHTML="";
	}
	return true;
}
//设置localstorage标记记录登录名和密码
function RemenberClick() {
	if ($('#remenber').is(':checked')) {
		localStorage.remenber=1;
	}
	else{
		localStorage.remenber=0;
	}
}
// 生成md5密码，提交表单时调用
function getmd5() {
	var a = hex_md5($("#password").val());
	$("#password").val(a);
}
//验证用户名和密码
function namepwdCheak() {
	getmd5();
	var result = checkLocalStorage();
	var ename = document.getElementById("errorName");
	if (result==0) {
		$("#tip-name").css("display","inline-block");
		ename.innerHTML="用户名或密码错误";
		return false;
	}else{
		$("#tip-name").css("display","none");
		ename.innerHTML="";
		var userid = "data"+result;
		localStorage.userid = userid;
	}
	return true;
}

function checkLocalStorage() {
	var usernum = Number(localStorage.getItem("usernum"));
	var name = document.getElementById("name").value;
	var password = document.getElementById("password").value;

	for(var i=1; i<=usernum;i++){
		var userid = "data"+i;
		var data = JSON.parse(localStorage.getItem(userid));
		if (name==data.name && password==data.password) {
			return i;
		}
	}
	return 0;
}