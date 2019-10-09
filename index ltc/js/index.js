//检测是否有用户登录
$(function() {
	var noLoginNav = document.getElementById("nologin-nav");
	var LoginNav = document.getElementById("login-nav");
	var LoginUsercard = document.getElementById("login-usercard");
	if (localStorage.userid=='0') {
		noLoginNav.setAttribute("style","display:");
		LoginNav.setAttribute("style","display:none");
		LoginUsercard.setAttribute("style","display:none");
	}else{
		noLoginNav.setAttribute("style","display:none");
		LoginNav.setAttribute("style","display:");
		LoginUsercard.setAttribute("style","display:");
		var name = document.getElementsByName("name");
		var headpic = document.getElementsByName("headpic");
		var bgpic = document.getElementsByName("bgpic");
		var follows = document.getElementById("follows");
		var fans = document.getElementById("fans");
		var articals = document.getElementById("articals");
		var picpath = './img/'
		var userid = localStorage.getItem("userid");
		var data = JSON.parse(localStorage.getItem(userid));

		for(var i=0; i<name.length; i++){
			name[i].innerHTML=data.name;
		}
		for(var i=0; i<headpic.length; i++){
			headpic[i].setAttribute("src",picpath+data.headpic);
		}
		for(var i=0; i<bgpic.length; i++){
			bgpic[i].setAttribute("src",picpath+data.bgpic);
		}
		follows.innerHTML=data.follows;
		fans.innerHTML=data.fans;
		articals.innerHTML=data.articals;
	}
	if (Number(localStorage.remenber)==0) {
		localStorage.userid=0;
	}
})
//轮播图初始化
$(function(){
	//排列图片
	var slide = document.getElementsByClassName("slide");
	var imgwidth =document.getElementById("loopbox").offsetWidth;
	for(var i=0;i<slide.length-1;i++){
		slide[i].style.left = i*imgwidth+"px";
	}
	slide[slide.length-1].style.left = "-"+imgwidth+"px";
	//创建圆点指示器
	var olbox = document.getElementById("olbox");
	for(var i=0;i<slide.length;i++){
		var liObjs = document.createElement("li");
		olbox.appendChild(liObjs);
		liObjs.setAttribute("looptarget",i);//标记圆点指示器
		if(i==0)$(liObjs).addClass("active");
		liObjs.onclick = function() {
			looptarget=parseFloat(this.getAttribute("looptarget"));
			MoveTo(looptarget);
		}
	}
	start();
})
// 窗口大小改变时重新排列图片
window.onresize = function(){
	stop();
	clearInterval(moveId);
	var slide = document.getElementsByClassName("slide");
	var imgwidth = document.getElementById("loopbox").offsetWidth;
	var maxleft = 0;
	var minleft = 0;
	//获取最左侧和最右侧图片的left值
	for(var i=0;i<slide.length;i++){
		if (parseFloat(slide[i].style.left)>maxleft) {
			maxleft=parseFloat(slide[i].style.left);
			f=i;
		}
		if (parseFloat(slide[i].style.left)<minleft) {
			minleft=parseFloat(slide[i].style.left);
		}
	}
	var prevwidth=(maxleft-minleft)/(slide.length-1);//计算窗口改变前图片的宽度
	//对应位置的图片设置对应的left
	for(var i=0;i<slide.length;i++){
		if (parseFloat(slide[i].style.left)<0) {
			if (parseFloat(slide[i].style.left)<=(-prevwidth)) {
				slide[i].style.left = "-"+imgwidth+"px";
			}else{
				slide[i].style.left = "0px";
			}
		}else if (parseFloat(slide[i].style.left)==0) {
		}else if (parseFloat(slide[i].style.left)<prevwidth) {
			slide[i].style.left = imgwidth+"px";
		}else if ((parseFloat(slide[i].style.left)%prevwidth)==0) {
			slide[i].style.left = (parseFloat(slide[i].style.left)/prevwidth)*imgwidth+"px";
		}else{
			slide[i].style.left = ((parseFloat(slide[i].style.left)-(parseFloat(slide[i].style.left)%prevwidth))/prevwidth+1)*imgwidth+"px";
		}
	}
	start();
}
//左移
function LeftMove(){
	var slide = document.getElementsByClassName("slide");//获取子div
	var imgwidth =document.getElementById("loopbox").offsetWidth;
	for(var i=0;i<slide.length;i++){
		var left = parseFloat(slide[i].style.left);
		left-=imgwidth/50;
		if(left<=-2*imgwidth){
			left=(slide.length-2)*imgwidth;//当图片完全走出显示框，将最左侧的图拼接到最右侧
			ChangeClass(i<slide.length-2?i+2:i+2-slide.length);
			clearInterval(moveId);
		}
		slide[i].style.left = left+"px";
	}
}
//右移
function RightMove() {
	var slide = document.getElementsByClassName("slide");//获取子div
	var imgwidth =document.getElementById("loopbox").offsetWidth;
	for(var i=0;i<slide.length;i++){
		var left = parseFloat(slide[i].style.left);
		left+=imgwidth/50;
		if(left>=(slide.length-1)*imgwidth){
			left=-imgwidth;//当图片完全走出显示框，将最右侧的图拼接到最左侧
			ChangeClass(i<slide.length-1?i+1:0);
			clearInterval(moveId);
		}
		slide[i].style.left = left+"px";
	}
}
//移动到指定图片
function MoveTo(looptarget) {
	var distance = 0;
	var slide = document.getElementsByClassName("slide");
	var imgwidth =document.getElementById("loopbox").offsetWidth;
	//设置左移到指定图片所需要的距离
	for(var i=0;i<slide.length;i++){
		if(parseFloat(slide[i].style.left)==0){
			if((looptarget-i)>0){
				distance=looptarget-i;
			}else{
				distance=looptarget+slide.length-i;
			}
		}
	}
	clearInterval(moveId);
	// 判断左移还是右移
	if ((distance-slide.length/2+1/2)>0) {//右移
		distance=slide.length-distance;
		moveId = setInterval(function() {
			if(parseFloat(slide[looptarget].style.left)==0){
				ChangeClass(looptarget);
				clearInterval(moveId);
			}else{
				for(var i=0;i<slide.length;i++){
					var left = parseFloat(slide[i].style.left);
					//根据距离调节图片移动速度
					if(distance>=2 && distance<=4){
						left+=imgwidth/20;
					}
					else if (distance>4 &&distance<=6){
						left+=imgwidth/10;
					}
					else if (distance>6){
						left+=imgwidth/5;
					}
					else{
						left+=imgwidth/50;
					}
					if(left>=(slide.length-1)*imgwidth){
						left=-imgwidth;//当图片完全走出显示框，将最右侧的图拼接到最左侧
					}
					slide[i].style.left = left+"px";
				}
			}
		},10)
	}else{//左移
		moveId = setInterval(function() {
			if(parseFloat(slide[looptarget].style.left)==0){
				ChangeClass(looptarget);
				clearInterval(moveId);
			}else{
				for(var i=0;i<slide.length;i++){
					var left = parseFloat(slide[i].style.left);
					//根据距离调节图片移动速度
					if(distance>=2 && distance<=4){
						left-=imgwidth/20;
					}
					else if (distance>4 &&distance<=6){
						left-=imgwidth/10;
					}
					else if (distance>6){
						left-=imgwidth/5;
					}
					else{
						left-=imgwidth/50;
					}
					if(left<=-2*imgwidth){
						left=(slide.length-2)*imgwidth;//当图片完全走出显示框，将最左侧的图拼接到最右侧
					}
					slide[i].style.left = left+"px";
				}
			}
		},10)
	}
}

function ChangeClass(looptarget) {
	var olbox = document.getElementById("olbox");
	for (var i = 0; i < olbox.children.length; i++) {
		olbox.children[i].removeAttribute("class");
	}
	olbox.children[looptarget].classList.add("active");
}

var moveNum = 10;
moveId=setInterval(void(0),moveNum);//为图片移动设置一个定时器，与图片移动速度成反比
function RightClick() {
	clearInterval(moveId);
	moveId=setInterval(LeftMove,moveNum);
}
function LeftClick(){
	clearInterval(moveId);
	moveId=setInterval(RightMove,moveNum);
}

var timeNum = 3000;
timeId=setInterval(void(0),timeNum);//设置一个定时器，表示图片多久移动一次
function stop(){
	clearInterval(timeId);
}
function start(){
	clearInterval(timeId);
	timeId=setInterval(RightClick,timeNum);
}
//页面失去焦点定时器停止
onblur = function(){
	stop();
}
//页面获取焦点时重启定时器
onfocus = function(){
	start();
}
//导航条随页面移动
$(function() {
	var nav=$("#nav");
	var win=$(window);
	var sc=$(document);
	win.scroll(function () {
		if(sc.scrollTop()>0){
			nav.addClass("navbar-scroll");
		}else{
			nav.removeClass("navbar-scroll");
		}
	})
})
//创建分页器
$(function(){
	var maxlist = 16;//一页显示的项目数
	var list = document.getElementsByClassName("maincard")
	var listlengh = list.length;
	var ulbox = document.getElementById("ulbox");
	var pagenum = 1;//页数
	if(maxlist>listlengh){
		ulbox.parentNode.setAttribute("style","display:none");//项目数小于一页，隐藏分页器
	}

	for(var i=maxlist;i<listlengh;i++){
		list[i].setAttribute("style","display:none");//隐藏其他项目
	}

	while(listlengh>0){
		var liObjs = document.createElement("li");
		var aObjs = document.createElement("a");
		ulbox.appendChild(liObjs);
		if(pagenum==1)$(liObjs).addClass("active");
		liObjs.appendChild(aObjs);
		aObjs.setAttribute("pagenum",pagenum);
		//设置锚属性
		aObjs.className ="toAnchor";
		aObjs.setAttribute("href","#navAnchor")
		aObjs.innerHTML = pagenum;
		aObjs.onclick = function() {
			//改变分页器样式
			for(var i=0;i<ulbox.children.length;i++){
				ulbox.children[i].removeAttribute("class");
			}
			ulbox.children[parseFloat(this.getAttribute("pagenum"))-1].classList.add("active");
			//显示对应页内容
			for(var i=0;i<list.length;i++){
				list[i].setAttribute("style","display:none");
			}
			for(var i=(this.getAttribute("pagenum")-1)*maxlist;( (i<(this.getAttribute("pagenum")*maxlist)) && (i<list.length) );i++){
				list[i].setAttribute("style","display:");
			}
		}
		pagenum++;
		listlengh-=maxlist;
	}
})
//平滑回到锚点
$(function() {
	$(".toAnchor").click(function() {
		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top + "px"
		}, {
			duration: 500,
			easing: "swing"
		});
		return false;
	});
});
//登出
function logout() {
	localStorage.userid=0;
	window.location.href="login.html";
}