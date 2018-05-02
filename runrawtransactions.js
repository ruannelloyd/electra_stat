var async = require('async');

var rawtransaction = require("./core/rawpool");
var dbtransactions = require("./db/dbtransactions");


function RunTransations() {
    console.log('here');
      var raw = [];
      rawtransaction.getrawtransactions(false,function (err, raw) {
          var data = raw;
          console.log(raw);
          dbtransactions.insertransaction(data,function () {
          });
    });
};

function run() {
     setInterval(RunTransations, 1000);
};

run();