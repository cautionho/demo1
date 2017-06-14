//JS监听浏览器文字大小代码
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if(!clientWidth) return;
			docEl.style.fontSize = 12 * (clientWidth / 320) + 'px';
		};

	if(!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

var timer = null;

function goTarget(targetId){
	
	clearInterval(timer);

	var target = document.getElementById(targetId);
	
	var step = 30;

	function go(){
		
		if(document.body.scrollTop >= target.offsetTop){
			document.body.scrollTop = target.offsetTop;
			clearInterval(timer);
		}else if(document.body.scrollTop >= document.body.scrollHeight - document.documentElement.clientHeight - step){
			//超出整个document的高度 - 视窗高度
			clearInterval(timer);
		}
		else{
			document.body.scrollTop = document.body.scrollTop + step;
		}
		
	}
	
	timer = setInterval(go,10);

}
