// a.js
function demo (msg) {
    //alert('--------\r\n' + msg + '\r\n--------')
}

demo('Hi')

function MyDemo(name,sex)
{
	this.name=name;
	this.sex=sex;
}

MyDemo.prototype = demo.prototype;
function al(){
	var m = document.getElementById("main");
    m.style.width="500px";
	m.style.height="300px";
	m.background="green";
}
window.onload=function(){
	al();
}
/**
 * @author miaov
 */
function getStyle(obj, attr)
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[attr];
	}
	else
	{
		return getComputedStyle(obj, false)[attr];
	}
}

function startMove(obj, attr, iTarget, fn)
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		//1.ȡ��ǰ��ֵ
		var iCur=0;
		
		if(attr=='opacity')
		{
			iCur=parseInt(parseFloat(getStyle(obj, attr))*100);
		}
		else
		{
			iCur=parseInt(getStyle(obj, attr));
		}
		
		//2.���ٶ�
		var iSpeed=(iTarget-iCur)/8;
		iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
		
		//3.���ֹͣ
		if(iCur==iTarget)
		{
			clearInterval(obj.timer);
			
			if(fn)
			{
				fn();
			}
		}
		else
		{
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(iCur+iSpeed)+')';
				obj.style.opacity=(iCur+iSpeed)/100;
			}
			else
			{
				obj.style[attr]=iCur+iSpeed+'px';
			}
		}
	}, 30)
}