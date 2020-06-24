// creating  database
var MongoClient = require('mongodb').MongoClient;
var url1 = "mongodb://localhost:27017/mydb";

MongoClient.connect(url1, function(err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});

//creating collections
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  dbo.createCollection("users", function(err, res) {
    if (err) throw err;
    console.log("Collection created!");
    db.close();
  });
});



db.users.insert({
  "name":"veer",
  "email":"coolveer.singh906@gmail.com",
  "pwd":"something",
  "mno":"9415290324",
  "dob":"02/16/2020",
  "clg":"vbspu",
  "rno":"216202",
  "dep":"cse",
  "course":[{0}]
});