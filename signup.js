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


//creating new user

document.getElementById("signupBtn").addEventListener("click", function(){
	//getting the data from the form
	var form = new FormData(document.getElementById("signupid"));
	var name1 = form.get("name");
	var mail1 = form.get("mail");
	var pwd1 = form.get("pwd");
	var Mobno1 = form.get("Mobno");
	var DOB1 = form.get("DOB");
	var clg1 = form.get("clg");
	var roll1 = form.get("roll");
	var stream1 = form.get("stream");

	// inserting the in the database

	MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db("mydb");
  		var myobj = { 
  			name:name1,
  			mail:mail1,
  			pwd:pwd1,
  			Mobno:Mobno1,
  			DOB:DOB1,
  			clg:clg1,
  			roll:roll1,
  			stream:stream1
  			 };
  		dbo.collection("users").insertOne(myobj, function(err, res) {
    	if (err) throw err;
    	console.log("1 document inserted");

    	dbo.collection("users").find({mail:mail1}, { projection: { _id:1 } }).toArray(function(err, result) {
    		if (err) throw err;
    		sessionStorage._id = result[0].mail;
    		alert("thank you so much for joining our free learning platform -------> please <----- || ---->'login'<----- || to proceed further");

    	db.close();
    	// alert("inserted into database")

  });
  		

  		
});

});




});