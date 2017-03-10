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