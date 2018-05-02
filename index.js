//HTTP objects
var http = require('http');
var rawtransaction = require("./core/rawpool");
var blockinfo = require("./core/lastblock");

var httpServer = http.createServer(function (req, res) {
    res.statusCode = 200;
    var raw = [];
    console.log('checking');
    rawtransaction.getrawtransactions(true,function (err, raw) {
        console.log('final',raw);
        blockinfo.getlastblock(true,function (err, block) {
            console.log('final',block);
            res.end("RAW:"+raw.toString()+" BLOCK:"+JSON.stringify(block));
        });
    });

}).listen("8888", "127.0.0.1", 511, function (err) {
    if(err) {
        console.log("HTTP ERROR:-", err);
    }
});

