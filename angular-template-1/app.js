const express = require('express');
const app = express();

// var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://dheeraj:dheeraj123@ds123584.mlab.com:23584/";
// var url = "mongodb://localhost:27017/";

// mongoose.connect('mongodb://localhost:27017/cricket/balls', function (err, db){
//   if(err){
//     throw err;
//   }
//   console.log("connected");
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,authorization,access-control-allow-origin");


  res.header("Access-Control-Allow-authorization", "*");
  next();
});

app.get('/balls', function (req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("cricket");
    var query = [
    {$match: {"Match_Id": 981024}},
    {$group:{
        _id:{
          Match_Id:"$Match_Id",
          Innings_Id:"$Innings_Id",
          Over_Id:"$Over_Id"
          },
        runs:{$sum:"$Batsman_Scored"},
        extras:{$sum:"$Extra_Runs"}
      }
    },
      {$sort: {"_id.Innings_id":1,"_id.Over_Id":1}}
    ];
    dbo.collection("balls").aggregate(query).toArray(function(err, result) {
      if (err) throw err;
      console.log((result));
      db.close();
      // let data = JSON.parse(result);
      res.send(result);
    });
  });
});

app.listen(3000, function () {
  console.log('App service listening on port 3000!');
});
