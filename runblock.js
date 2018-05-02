var async = require('async');

var blockinfo = require("./core/lastblock");
var dbblocks = require("./db/dbblocks");


function RunTransations() {
    console.log('here');
      var raw = [];
      var log = false;
      blockinfo.getlastblock(log, function (err, block, callback) {
          var data = block;
          console.log("BLL",block.blocknumber);
          dbblocks.insertblock(data,function () {
          });
      });
};

function run() {
     setInterval(RunTransations, 1000);
};

run();


