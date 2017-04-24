
function getClass(className){
	return document.getElementsByClassName(className);
}
function getId(id){
	return document.getElementById(id);
}
function getTag(tagName){
	return document.getElementsByTagName(tagName);
}

/********************鼠标拖拽*********************/
(function(){
	function Drag(dragTarget,movetarget){
		this.dragTarget=document.getElementById(dragTarget);
		this.moveTarget=document.getElementById(movetarget);
		this.setDrag();
	}
	Drag.prototype={
		constructor: Drag,
		
		setDrag:function(){
			var self=this;
			this.dragTarget.addEventListener("mousedown",start);

			// console.log(this);//两个this指向不一致
							//这里的this是实例共享，包括dragDarget和moveTarget
			function start(event){
				dragTargetstartX=event.clientX;
				dragTargetstartY=event.clientY;
				// console.log(this);//两个this指向不一致
									//而这里的this仅仅指向dragTarget
				moveTargetstartX=self.moveTarget.offsetLeft;
				moveTargetstartY=self.moveTarget.offsetTop;
				self.moveTarget.addEventListener("mousemove",move);
				self.moveTarget.addEventListener("mouseup",end);
			}
			function move(event){
				var left=event.clientX-dragTargetstartX+moveTargetstartX;
				var top=event.clientY-dragTargetstartY+moveTargetstartY;
				if(left<0){
					self.moveTarget.style.left=0;
				}else{
					self.moveTarget.style.left=left+"px";
				}
				if(top<0){
					self.moveTarget.style.top=0;
				}else{
					self.moveTarget.style.top=top+"px";
				}
			}
			function end(event){
				self.moveTarget.removeEventListener("mousemove",move);
				self.moveTarget.removeEventListener("mouseup",end);
			}
		}
	};
	window.Drag=Drag;
})();
new Drag("drag","move");

// dragTarget.onmousedown=function(e){
// 	var event=e||window.event;
// 	 dragTargetstartX=event.clientX;
// 	 dragTargetstartY=event.clientY;
// 	 moveTargetstartX=moveTarget.offsetLeft;
// 	 moveTargetstartY=moveTarget.offsetTop;
// 	moveTarget.onmousemove=dragMove;
// 	moveTarget.onmouseup=dragEnd;
// }
// function dragMove(e){
// 	var event=e||window.event;
// 	var left=event.clientX-dragTargetstartX+moveTargetstartX+"px";
// 	var top=event.clientY-dragTargetstartY+moveTargetstartY+"px";
// 	moveTarget.style.left=left;
// 	moveTarget.style.top=top;
// }
// function dragEnd(){
// 	moveTarget.onmousemove=null;
// 	moveTarget.onmouseup=null;
// }

/*********缩放****************/
(function(){
	function Scale(point,target){
		this.point=document.getElementById(point);
		this.target=document.getElementById(target);
		this.box=document.getElementById("move");
		this.query=point;
		this.startScale();
	}
	Scale.prototype={
		constructor:Scale,

		startScale: function(){
			var self=this;
			this.point.addEventListener("mousedown",start);
			function start(event){
				startX=event.clientX;
			 	startY=event.clientY;
			 	targetWidth=self.target.clientWidth;
			 	targetHeight=self.target.clientHeight;
			 	targetTop=self.box.offsetTop;
			 	targetLeft=self.target.offsetLeft;
			 	if(self.point.setCapture){
			 		self.point.addEventListener("mousemove",scaleProgess);
			 		self.point.addEventListener("mouseup",end);
			 		self.point.setCapture();
			 	}else{
			 		document.addEventListener("mousemove",scaleProgress);
			 		document.addEventListener("mouseup",end);
			 	}
			}
			function scaleProgress(event){
				
				switch(self.query){
					case "top":
						if(event.clientY>(targetTop+targetHeight-240)){
							self.target.style.height=self.target.offsetHeight+"px";
							self.box.style.top=targetTop-8+"px";
						}else{
							self.target.style.height=targetHeight+(startY-event.clientY)+"px";
							self.box.style.top=event.clientY-8+"px";
						}
						break;
					case "right":  //右拉和下拉还有右下体验最好，其余方向的操作由于是合成，如果过快会出现很差劲的情况
						self.target.style.width=event.clientX-startX+targetWidth+"px";
						break;
					case "bottom":
						self.target.style.height=event.clientY-startY+targetHeight+"px";
						break;
					case "left":
						if(event.clientX>(targetLeft+targetWidth-300)){
							self.target.style.width=self.target.offsetWidth+"px";
							self.box.style.left=targetLeft+targetWidth-300-10+"px";
						}else{
							if(targetWidth-(event.clientX-startX)<=800){
								self.target.style.width=targetWidth-(event.clientX-startX)+"px";
								self.box.style.left=event.clientX-5+"px";
							}
						}	
						break;
				}
				showTool();		//缩放时改变功能图标的排列
			}
			function end(event){
				if(self.point.releaseCapture){
					self.point.removeEventListener("mousemove",scaleProgress);
					self.point.removeEventListener("mouseup",end);
					self.point.releaseCapture();
				}else{
					document.removeEventListener("mousemove",scaleProgress);
					document.removeEventListener("mouseup",end);
				}
			}
		}
	};
	window.Scale=Scale;
})();
new Scale("right","move");
new Scale("bottom","scale-area")
//缩放
// var right=getId("right");
// var bottom=getId("bottom");
// right.onmousedown=function(e){
// 	var event=e||window.event;
// 	startX=event.clientX;
// 	startY=event.clientY;
// 	posX=wraper.clientWidth;
// 	if(right.setCapture){
// 		right.onmousemove=rightDrag;
// 		right.onmouseup=stopDrag;
// 		right.setCapture();
// 	}else{
// 		document.addEventListener("mousemove",rightDrag,true);
// 		document.addEventListener("mouseup",stopDrag,true);
// 	}

// }
// function rightDrag(e){
// 	var event=e||window.event;
// 	var width=event.clientX-startX+posX;
// 	wraper.style.width=width+"px";

// 	showTool();
// }
// function stopDrag(){
// 	if(right.releaseCapture){
// 		right.onmousemove=null;
// 		right.onmouseup=null;
// 		right.releaseCapture();
// 	}else{
// 		document.removeEventListener("mousemove",rightDrag,true);
// 		document.removeEventListener("mouseup",stopDrag,true);
// 	}
	
// }
// var sec=getClass("search-area")[0];
// bottom.onmousedown=function(e){
// 	var event=e||window.event;
// 	startX2=event.clientX;
// 	startY2=event.clientY;
// 	console.log(sec);
// 	posY2=sec.clientHeight;//这里只能取中间部分的高度，因为其与部分高度是固定的，无法变化
// 	if(bottom.setCapture){
// 		bottom.onmousemove=bottomDrag;
// 		bottom.onmouseup=stopDrag2;
// 		bottom.setCapture();
// 	}else{
// 		document.addEventListener("mousemove",bottomDrag,true);
// 		document.addEventListener("mouseup",stopDrag2,true);
// 	}	
// }

// function bottomDrag(e){
// 	var event=e||window.event;
// 	var height=event.clientY-startY2+posY2;
// 	sec.style.height=height+"px";
// }
// function stopDrag2(){
// 	if(bottom.releaseCapture){
// 		bottom.onmousemove=null;
// 		bottom.onmouseup=null;
// 		bottom.releaseCapture();
// 	}else{
// 		document.removeEventListener("mousemove",bottomDrag,true);
// 		document.removeEventListener("mouseup",stopDrag2,true);
// 	}
	
// }
//顶部

var headBg=getTag("header")[0];
var honor=getId("honor");
var close=getId("close");
var wraper=getClass("wraper")[0];

honor.onclick=function(){
	var div=document.createElement("div");
	div.style.width=400+"px";
	div.style.height=300+"px";
	div.style.backgroundColor="#80FFFF";
	div.setAttribute("id","honor-wall");
	console.log(div.getAttribute("id"));
	div.style.position="absolute";
	var left=(document.body.clientWidth-400)/2;
	var top=(document.body.clientHeight-300)/2;
	div.style.left=left+"px";
	div.style.top=top+"px";
	document.body.appendChild(div);

	test();
}
function test(){
	var honorWall=getId("honor-wall");
	honorWall.onclick=function(){
		document.body.removeChild(honorWall);
	}	
}

//改变头部背景颜色
function color(){
	var random1=Math.floor(Math.random()*255);
	var random2=Math.floor(Math.random()*255);
	var random3=Math.floor(Math.random()*255);
	return "rgb("+random1+","+random2+","+random3+")";
}
function setSkin(fn){
	headBg.style.backgroundColor=fn();
}
getId("skin").onclick=function(){
	setSkin(color);
}
//关闭页面
close.onclick=function(){
	wraper.style.display="none";
}
/**************改变状态*************/
changeStatus();

function changeStatus(){
	var currentStatus=getClass("station")[0];
	var stationList=getClass("station-list")[0];
	var lists=stationList.getElementsByTagName("li");
	currentStatus.onclick=function(e){
		var event=e||window.event;
		event.stopPropagation();
		stationList.style.display="block";
		
	}
	for(var i=0;i<lists.length;i++){
		lists[i].onclick=function(){
			var url=window.getComputedStyle(this,null).backgroundImage;
			currentStatus.style.backgroundImage=url;
			stationList.style.display="none";
		}	
	}

	document.body.addEventListener("click",function(){
		stationList.style.display="none";
	},true);
}



/*************QQ签名*****************************/
var text=getClass("text2")[0];
var input=text.getElementsByTagName("input")[0];
text.onclick=function(e){
	var event=e||window.event;
	event.stopPropagation();
	text.style.backgroundColor="#fff";
	text.style.cursor="text";
}
document.body.addEventListener("click",function(){
	text.style.backgroundColor="";
});


/*************功能列表模块**(*************/
function showTool(){
	var tool=getClass("tool")[0];
	var toolList=getClass("tool-list")[0];
	var lists=toolList.getElementsByTagName("li");
	var toolWidth=parseInt(window.getComputedStyle(tool,null).width)-20;
	var count=Math.floor(toolWidth/20);

	/****当功能块长度超过可显示长度时，隐藏超过的长度，并出现“更多”标签***/

	if(lists.length>=count){
		var more=toolList.getElementsByClassName("more");
		if(more.length>0){
			for(var i=0;i<lists.length;i++){
				if(lists[i].index=="index"){
					toolList.removeChild(lists[i]);
				}
			}	
		}
		var li=document.createElement("li");
		var a=document.createElement("a");
		a.style.backgroundImage="url(images/tool/more.png)";
		a.setAttribute("class","more");
		li.index="index";
		li.appendChild(a);
		toolList.insertBefore(li,lists[count-1]);
		for(var i=count;i<lists.length;i++){
			lists[i].style.display="none";
		}
	}else {
		var more=toolList.getElementsByClassName("more");
		if(more.length>0){
			for(var i=0;i<lists.length;i++){
				if(lists[i].index=="index"){
					toolList.removeChild(lists[i]);
				}
			}			
		}
	}
	if(count<lists.length){
		lists[count].style.display="block";
	}
	
	// 更多标签 more  的点击事件
	var more=toolList.getElementsByClassName("more")[0];

	if(more){
		more.addEventListener("click",toolModule,true);
	}

	function toolModule(e){
		var event=e||window.event;
		event.stopPropagation();
		//将超出显示内容的标签的基本信息用数组收集起来
		
		var links=toolList.getElementsByTagName("a");
		var href=[];
		var url=[];
		var target=[];
		for(var i=count;i<lists.length;i++){
			url.push(window.getComputedStyle(links[i]).backgroundImage);
			href.push(links[i].getAttribute("href"));
			target.push(links[i].getAttribute("target"));
		}
		var ul=more.parentNode.getElementsByTagName("ul")[0];

		if(!ul){
			create();
			
		}else{
			if(ul.style.display=="none"){
				ul.style.display="block";
			}else{
				ul.style.display="none";
			}
			
		}
		//当主页面上不能完整显示功能列表时，将列表收录在more标签里面
		function create(){
			var ul=document.createElement("ul");
			ul.style.position="absolute";
			ul.style.zIndex=999;
			ul.style.backgroundColor="rgba(200,200,200,0.8)";
			ul.style.width="30px";
			ul.style.padding=5+"px";
			ul.style.top=60+"px";
			
			for(var i=0;i<url.length;i++){
				var li=document.createElement("li");
				var a=document.createElement("a");
				a.style.backgroundImage=url[i];
				a.setAttribute("href",href[i]);
				a.setAttribute("target",target[i]);
				a.style.cssFloat="none";
				li.appendChild(a);
				li.style.marginRight=0;
				ul.appendChild(li);
			}
			lists[count-1].appendChild(ul);
						
		}	
	}
}
document.body.addEventListener("click",function(){
	var toolList=getClass("tool-list")[0];
	var more=toolList.getElementsByClassName("more")[0];

	if(more){
		var ul=more.parentNode.getElementsByTagName("ul")[0];
		if(ul){
			more.parentNode.removeChild(ul);
		}
	}
});


/***************搜索框**************/
var search=getClass("search")[0];
var section=getTag("section")[0];
var searchArea=getClass("search-area")[0];
search.addEventListener("click",function(){
	var height=section.clientHeight;
	section.style.display="none";
	search.style.backgroundColor="#fff";
	searchArea.style.backgroundColor="#fff";
	searchArea.style.height=height+"px";
});

document.body.addEventListener("click",function(){
	section.style.display="block";
	search.style.backgroundColor="rgba(100,100,100,0.3)";
},true);


/************切换中间部分的内容*************/
var ul=getClass("top-list")[0];
var items=ul.getElementsByClassName("item");
var area=getClass("area")[0];
var lists=area.getElementsByClassName("list");
for(var i=0;i<items.length;i++){
	var last1=items[0];
	var last2=lists[0];
	items[i].index=i;
	items[i].onclick=function(e){
		var event=e||window.event;
		event.stopPropagation();
		last1.onmouseover=null;
		last1.onmouseout=null;
		var className1=this.getAttribute("class");
		var reg=/active/gi;
		if(!(reg.test(className1))){
			var className1=this.getAttribute("class");
			var className2=last1.getAttribute("class");
			last1.className=className2.replace("active","");
			this.className=className1+" active";
			last2.style.display="none";
			lists[this.index].style.display="block";
			last1=items[this.index];
			last2=lists[this.index];
		}
		showCircle(this.index);
	}
	
}
showCircle(0);
/*********分类标签的右侧图标点击可以显示详细信息************/

function showCircle(i){
	
	var className1=items[i].getAttribute("class");
	var details=items[i].getElementsByClassName("details")[0];
	var reg=/active/gi;
	/*****分类标签的右侧图标只有当前标签被选中并且鼠标经过时才会出现****/

	if(reg.test(className1)){
		var circle=items[i].getElementsByClassName("circle")[0];
		
		if(circle){
			items[i].onmouseover=function(){
				circle.style.display="block";
			}
			items[i].onmouseout=function(){
				circle.style.display="none";
			}
			var j=i;
			circle.addEventListener("click",function(e){
				var event=e||window.event;
				event.stopPropagation();
				var details=items[j].getElementsByClassName("details")[0];
				console.log(details);
				if(details){
					if(details.style.display=="none"){
						details.style.display="block";
					}
				}
			},true);
		}
	}
}
document.body.addEventListener("click",function(e){
	
	var details=ul.getElementsByClassName("details");
	for(var i=0;i<details.length;i++){
		details[i].style.display="none";
	}
},true);





