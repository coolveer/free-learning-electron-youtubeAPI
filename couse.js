const { remote } = require('electron')
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const fs = require('fs');
const youtubedl = require('youtube-dl');
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
document.getElementById("moreVid").addEventListener("click", myVid);
document.getElementById("savedata").addEventListener("click", savedata);
document.getElementById("fav").addEventListener("click", fav);
document.getElementById("watch").addEventListener("click", watch);


let params = new URLSearchParams(location.search);
var vurl = params.get('url');
var embed = vurl.replace("watch?v=", "embed/");
var yurl = `<div class="embed-responsive embed-responsive-16by9">
         <iframe class="embed-responsive-item" src="${embed}" frameborder="0" allowfullscreen></iframe>
      </div>`;

 document.getElementById(`player`).innerHTML = yurl;

 //search results starts from here 

a=-1;
b=-1;
var name = " ";

// working code 
const YouTube = require('simple-youtube-api');
const youtube = new YouTube('AIzaSyAFfkie3M_idULLRupE-0eRdmeX3_vIc1s');

function myVid(){

	youtube.searchVideos(sessionStorage.srchvalue, 100)
	    .then(results => {
	        var value = " " ;
	        b+=1;
	        if (b>7) {
	        	document.getElementById("moreVid").style.display = "none";	
	        } 
	        else {	
			        for(const i of [1,2,3,4,5,6,7,8,9,10]){
			        //console.log(i.title);
			        a+=1
			        value = value+`
					<a href="./couse.html?url=${results[a].url}&name=${results[a].title}">
						<div class="card sdo" style="width: 14rem;">
				          <img src="${results[a].thumbnails.default.url}" class="card-img-top" alt="...">
				          	<div class="card-body">
				            	<p class="card-text">${results[a].title}</p>
				          	</div>
				        </div>
			        </a>
			        <br>
			        `;
			        }
			        document.getElementById(`replace${b}`).innerHTML = value;
	    		}
	    })
	    .catch(console.log);
}
 myVid();


 document.getElementById("dwnld").addEventListener("click",async function(){
 	const video = youtubedl(params.get('url'),['--format=18'],{ cwd: __dirname })
		video.on('info', function(info) {
	  	alert('Download started');
	  	hide();
	  	console.log('filename: ' + info._filename);
	  	console.log('size: ' + info.size);
	});
	var xyz = `./video/${params.get('name')}.mp4`;
	//video.pipe(fs.createWriteStream(`${params.get('name')}.mp4`));
	
	var vdo = video.pipe(fs.createWriteStream(xyz));
	vdo.on('finish', function () { clback() });

 });

 //toggle function
 function hide() {
  var x = document.getElementById("loading");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
//call back for the video write system
function clback(){
	
	alert("your download has been completed!");
	hide();

}

//save notes function starts from here 
function savedata(){
	data = document.getElementById("ndata").value;
	let date_ob = new Date();
	let seconds = date_ob.getSeconds();
	name = `./notes/${params.get('name')}${seconds}.txt`;
	fs.writeFile(name,data,(err) => {
		if (err) {
			alert("file has not been saved ");
		}else{
			alert("notes had been saved ")
		}
	}) ; 
	
}

// add to favourates 
function fav(){
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { mail: sessionStorage._id };
  var newvalues = { $push: {faname: params.get('name') , faurl: params.get('url') } };
  dbo.collection("users").update(myquery, newvalues, function(err, res) {
    if (err) throw err;
    alert("added to your favourates");
    db.close();
  });
});

}

// add to watch later 
function watch(){
	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myquery = { mail: sessionStorage._id };
  var newvalues = { $push: {waname: params.get('name') , waurl: params.get('url') } };
  dbo.collection("users").update(myquery, newvalues, function(err, res) {
    if (err) throw err;
    alert("added to your watch later");
    db.close();
  });
});

}


