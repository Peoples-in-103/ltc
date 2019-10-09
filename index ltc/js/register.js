var way = 1;//判断用户注册方式，1为用户名，2为邮箱，3为手机号
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
function check() {

	var Form = document.getElementById("form");
	var bool = true;

	switch (way){
		case 1:
			if(!InputUsernameKeyup()) bool = false;
			break;
		case 2:
			if(!InputEmailBlur()) bool = false;
			break;
		case 3:
			if(!InputPhoneBlur()) bool = false;
			if(!InputCodeCheak()) bool = false;
	}
	if (!InputPasswordKeyup()) bool = false;
	if (!InputRepasswordKeyup()) bool = false;
	if (!CheckBox()) bool = false;
	if (bool==true) {
		getmd5();
		setlocalstorage();
		Form.submit();
	}
	return bool;
}
/*注册密码输入即时检测*/
function InputPasswordKeyup() {
	var pwd = document.getElementById("password");
	var epwd = document.getElementById("errorPassword");
	/* 密码为空/不为空 */
	if (pwd.value=="") {
		$("#tip-pwd").css("display","inline-block");
		epwd.innerHTML="密码不能为空"
		return false;
	}
	else {
		$("#tip-pwd").css("display","none");
		epwd.innerHTML="";
	}
	/* 密码长度 */
	if (pwd.value.length<4 || pwd.value.length>16) {
		$("#tip-pwd").css("display","inline-block");
		epwd.innerHTML="密码长度应为4-16个字符"
		return false;
	}
	else {
		$("#tip-pwd").css("display","none");
		epwd.innerHTML="";
	}
	return true;
}
/*确认密码输入即时检测*/
function InputRepasswordKeyup() {
	var rpwd = document.getElementById("repassword");
	var erpwd = document.getElementById("errorRepassword");
	/* 确认密码不为空 */
	if (rpwd.value=="") {
		$("#tip-repwd").css("display","inline-block");
		erpwd.innerHTML="确认密码不能为空"
		return false;
	}
	else {
		$("#tip-repwd").css("display","none");
		erpwd.innerHTML="";
	}
	/* 确认密码与密码不一致 */
	var pwd = document.getElementById("password");
	if (pwd.value != rpwd.value) {
		$("#tip-repwd").css("display","inline-block");
		erpwd.innerHTML="俩次密码不一致。"
		return false;
	}
	else {
		$("#tip-repwd").css("display","none");
		erpwd.innerHTML="";
	}
	return true;
}
/*注册协议勾选框*/
function CheckBox() {
	var checkbox = document.getElementById("checkbox");

	if ($(checkbox).is(':checked')) {
		return true;
	}
	else{
		$(ckreg).tooltip({
			tipClass: 'tooltip-danger',
			delay: { show: 500, hide: 1000 }
		})
		$(ckreg).tooltip('show','请阅读注册协议');
		return false;
	}
}
/*用户名注册检测*/
function InputUsernameKeyup() {
	var uname = document.getElementById("name");
	var ename = document.getElementById("errorName");

	/* 用户名为空/不为空 */
	if (uname.value=="") {
		$("#tip-name").css("display","inline-block");
		ename.innerHTML="用户名不能为空";
		return false;
	}
	else {
		$("#tip-name").css("display","none");
		ename.innerHTML="";
	}
	/* 用户名长度 */
	if (uname.value.length<4 || uname.value.length>12) {
		$("#tip-name").css("display","inline-block");
		ename.innerHTML="用户名长度应为4-12个字符";
		return false;
	}
	else {
		$("#tip-name").css("display","none");
		ename.innerHTML="";
	}
	/* 用户名是否已存在 */
	if(!localStorage.length){
		return true;
	}else{
		for(var i=1;i<=Number(localStorage.usernum);i++){
			var userid = "data"+i;
			var data = JSON.parse(localStorage.getItem(userid));
			if (uname.value==data.name) {
				$("#tip-name").css("display","inline-block");
				ename.innerHTML="用户名已存在";
				return false;
			}else{
				$("#tip-name").css("display","none");
				ename.innerHTML="";
			}
		}
	}
	return true;
}
/*邮箱检测*/
function InputEmailBlur() {
	var email = document.getElementById("email");
	var eemail = document.getElementById("errorEmail");
	var re=/^[0-9A-Za-z]\w*@([a-z0-9]+\.){1,2}[a-z]{2,4}$/;
	if (email.value==""){
		$("#tip-email").css("display","inline-block");
		eemail.innerHTML="邮箱不能为空";
		return false;
	}
	else{
		if(re.test(email.value))
		{
			$("#tip-email").css("display","none");
			eemail.innerHTML="";
		}else{
			$("#tip-email").css("display","inline-block");
			eemail.innerHTML="请填写正确的邮箱";
			return false;
		}
	}
	return true;
}
/*手机号检测*/
function InputPhoneBlur() {
	var phone = document.getElementById("phone");
	var ephone = document.getElementById("errorPhone")
	var re=/^1[345789]\d{9}$/;

	if (phone.value==""){
		$("#tip-phone").css("display","inline-block");
		ephone.innerHTML="手机号不能为空";
		return false;
	}
	else{
		if(re.test(phone.value))
		{
			$("#tip-phone").css("display","none");
			ephone.innerHTML="";
		}else{
			$("#tip-phone").css("display","inline-block");
			ephone.innerHTML="请填写正确的手机号码";
			return false
		}
	}
	return true;
}
// 验证码验证
function InputCodeCheak(argument) {
	var code = document.getElementById("code");
	var ecode = document.getElementById("errorCode");

	if (code.value=="") {
		$("#tip-code").css("display","inline-block");
		ecode.innerHTML="请输入验证码"
		return false;
	}
	return true;
}
/*用户名注册点击事件*/
function UsernameClick(){
	var uc = document.getElementById("uc");
	var ec = document.getElementById("ec");
	var pc = document.getElementById("pc");
	var namechose = document.getElementById("namechose");
	var emailchose = document.getElementById("emailchose");
	var phonechose = document.getElementById("phonechose");
	var error = document.getElementsByName("error");
	var phone_tips = document.getElementsByName("phone-tips");
	var form_laber = document.getElementsByName("form-laber");
	/*重设样式*/
	$(uc).addClass("active-uc");
	$(ec).removeClass("active-ec");
	$(pc).removeClass("active-pc");
	$(namechose).removeClass("form-unchose");
	$(emailchose).addClass("form-unchose");
	$(phonechose).addClass("form-unchose");
	for (var i = phone_tips.length - 1; i >=0; i--) {
		$(phone_tips[i]).removeClass("form-tips2");
	}
	for (var i = form_laber.length - 1; i >=0; i--) {
		$(form_laber[i]).removeClass("form-laber2");
	}
	/*清空表单和错误提示*/
	document.getElementById("form").reset();
	for (var i = error.length - 1; i >= 0; i--) {
		error[i].innerHTML="";
	}
	// 设置注册模式
	way = 1;
}
/*邮箱注册点击事件*/
function EmailClick(){
	var uc = document.getElementById("uc");
	var ec = document.getElementById("ec");
	var pc = document.getElementById("pc");
	var namechose = document.getElementById("namechose");
	var emailchose = document.getElementById("emailchose");
	var phonechose = document.getElementById("phonechose");
	var error = document.getElementsByName("error");
	var phone_tips = document.getElementsByName("phone-tips");
	var form_laber = document.getElementsByName("form-laber");
	/*重设样式*/
	$(ec).addClass("active-ec");
	$(uc).removeClass("active-uc");
	$(pc).removeClass("active-pc");
	$(namechose).addClass("form-unchose");
	$(emailchose).removeClass("form-unchose");
	$(phonechose).addClass("form-unchose");
	for (var i = phone_tips.length - 1; i >=0; i--) {
		$(phone_tips[i]).removeClass("form-tips2");
	}
	for (var i = form_laber.length - 1; i >=0; i--) {
		$(form_laber[i]).removeClass("form-laber2");
	}
	/*清空表单和错误提示*/
	document.getElementById("form").reset();
	for (var i = error.length - 1; i >= 0; i--) {
		error[i].innerHTML="";
	}
	// 设置注册模式
	way = 2;
}
/*手机号注册点击事件*/
function PhoneClick(){
	var uc = document.getElementById("uc");
	var ec = document.getElementById("ec");
	var pc = document.getElementById("pc");
	var namechose = document.getElementById("namechose");
	var emailchose = document.getElementById("emailchose");
	var phonechose = document.getElementById("phonechose");
	var error = document.getElementsByName("error");
	var phone_tips = document.getElementsByName("phone-tips");
	var form_laber = document.getElementsByName("form-laber");
	/*重设样式*/
	$(pc).addClass("active-pc");
	$(ec).removeClass("active-ec");
	$(uc).removeClass("active-uc");
	$(namechose).addClass("form-unchose");
	$(emailchose).addClass("form-unchose");
	$(phonechose).removeClass("form-unchose");
	for (var i = phone_tips.length - 1; i >=0; i--) {
		$(phone_tips[i]).addClass("form-tips2");
	}
	for (var i = form_laber.length - 1; i >=0; i--) {
		$(form_laber[i]).addClass("form-laber2");
	}
	/*清空表单和错误提示*/
	document.getElementById("form").reset();
	for (var i = error.length - 1; i >= 0; i--) {
		error[i].innerHTML="";
	}
	// 设置注册模式
	way = 3;
}
// 发送验证码
var time = 60;
function sendcode() {
	$("#send").css("pointer-events","none");
	$("#send").css("background-color","#85c5cd");
	//发送验证码后台相关代码
	// 
	// 
	codetime(time);
}
// 验证码计时
function codetime() {
	if(time>0){
		document.getElementById("send").value="已发送("+time+")";
		time = time-1;
		setTimeout("codetime()",1000);
	}
	else{
		time = 60;
		$("#send").removeAttr("style");
		document.getElementById("send").value="发送验证码";
	}
}
// 生成md5密码，提交表单时调用
function getmd5() {
	var a = hex_md5($("#password").val());
	$("#password").val(a);
}
//写localstorage
function setlocalstorage() {
	var usernum = localStorage.getItem("usernum");
	usernum = Number(usernum)+1;
	var name = document.getElementById("name").value;
	var password = document.getElementById("password").value;
	var data = {
		name:name,
		password:password,
		headpic:'head1.jpg',
		bgpic:'head1.jpg',
		follows:0,
		fans:0,
		articals:0
	};
	var d=JSON.stringify(data);
	var userid="data"+localStorage.getItem("usernum");
	localStorage.setItem(userid,d);
}