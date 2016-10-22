var subscribtionModule = require('./src/app/backend/test').subscriptionModule;

var express = require('express');
var app = express();

app.get('/test', function (req, res){
  subscribtionModule.getAll(function(err, results) {
    if (err)
      throw err;
    else
      res.send(results);
  });
});

app.listen(3000);
console.log("server running on port 3001");
