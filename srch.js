const { remote } = require('electron')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var mini =function(){
	remote.getCurrentWindow().minimize();
}


var winclose = function () {
    window.close();
}

var winmaximize = function () {
    window.moveTo(0, 0);
    window.resizeTo(screen.width, screen.height);
}
document.getElementById("close").addEventListener("click", winclose);
document.getElementById("maxi").addEventListener("click", winmaximize);
document.getElementById("mini").addEventListener("click", mini);


function myfunc(){
	if (1==1) {
		veer = document.getElementById("srch").value;
		sessionStorage.srchvalue = veer;
		window.location.href = 'srchrslt.html';
	};
	
};
document.getElementById("srchBtn").addEventListener("click", function(){
	myfunc();
});