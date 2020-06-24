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

document.getElementById("loginBtn").addEventListener("click", function(){
	var form = new FormData(document.getElementById("loginid"));
	var mail1 = form.get("id");
	var pwd1 = form.get("pwd");
	//database logic - 
	MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db("mydb");
  		dbo.collection("users").find({mail:mail1,pwd:pwd1}).toArray(function(err, result) {
    		if (result.length === 0 || err){
    			alert("Invalid Email or Password");
    		}
    		else{
    			window.location.href = 'profile.html';
    			//creating session
    			sessionStorage._id = result[0].mail;
          alert("welcome back !! hope you will learn more today then yeaterday !!");
    		}
    		
    		db.close();
  		});
	});
});



