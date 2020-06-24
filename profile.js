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

//getting the users data 
sid=sessionStorage._id
MongoClient.connect(url, function(err, db) {
  		if (err) throw err;
  		var dbo = db.db("mydb");
  		dbo.collection("users").find({mail:sessionStorage._id}).toArray(function(err, result) {
    		if (result.length === 0 || err){
    			alert("user not found");
    		}
    		else{
    			document.getElementById("name").innerHTML = result[0].name;
    			document.getElementById("mob").innerHTML = result[0].Mobno;
    			document.getElementById("dob").innerHTML = result[0].DOB;
    			document.getElementById("clg").innerHTML = result[0].clg;
    			document.getElementById("roll").innerHTML = result[0].roll;
    			document.getElementById("stream").innerHTML = result[0].stream;
    			
    		}
    		
    		db.close();
  		});
});

// taking out he data of the favourates 
MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("users").find({mail:sessionStorage._id}).toArray(function(err, result) {
                var data = " ";
                for (const [index, value] of result[0].faname.entries()) {
                    data = data + `<a href="./fawa.html?url=${result[0].faurl[index]}&name=${result[0].faname[index]}"><h5>${result[0].faname[index]}</h5> </a> <hr>`;

                }
                document.getElementById("favbar").innerHTML = data;
            
            db.close();
        });
});

// taking out he data of the watch later 
MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("users").find({mail:sessionStorage._id}).toArray(function(err, result) {
                var data = " ";
                for (const [index, value] of result[0].waname.entries()) {
                    data = data + `<a href="./fawa.html?url=${result[0].waurl[index]}&name=${result[0].waname[index]}"><h5>${result[0].waname[index]}</h5> </a> <hr>`;

                }
                document.getElementById("wabar").innerHTML = data;
            
            db.close();
        });
});






