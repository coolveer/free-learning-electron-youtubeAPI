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
document.getElementById("moreVid").addEventListener("click", myVid);
document.getElementById("btnvalue").addEventListener("click",clicked);
function clicked(){
	var abba = document.forms["srch"]["srchvlue"].value;
	if (abba == null || abba == "") {
		alert("please fill up the field");
		window.location.href = 'srchrslt.html';
	} else {
		sessionStorage.srchvalue = abba;
		window.location.href = 'srchrslt.html';
	}
}

a=-1;
b=-1;

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
					<br> 
					<a href="./couse.html?url=${results[a].url}&name=${results[a].title}">
						<div class="card sdo" style="width: 23rem;">
				          <img src="${results[a].thumbnails.default.url}" class="card-img-top" alt="...">
				          	<div class="card-body">
				            	<p class="card-text">${results[a].title}</p>
				          	</div>
				        </div>
			        </a>
			        `;
			        }
			        document.getElementById(`replace${b}`).innerHTML = value;
	    		}
	    })
	    .catch(console.log);
}
 myVid();


