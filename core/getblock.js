/**
 * Created by ruannelloyd on 2018/04/18.
 */
/**
 * Created by ruannelloyd on 2018/04/18.
 */
// dual-module.js
var Q = require('q');
var request = require('request');
var moment = require('moment');
var winston = require('winston');
var async=   require('async');
var options = {
    uri: 'http://127.0.0.1:5788',
    'auth': {
        'user': 'user',
        'pass': 'pass'
    },
    method: 'POST',
    json: {"jsonrpc":"1.0","id":"1","method":"getrawmempool","params":[]}
};

var woptions = {
    file: {
        level: 'info',
        filename: './logs/blocks.log',
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
var logger = new winston.Logger({
    transports: [
        new winston.transports.File(woptions.file),
        new winston.transports.Console(woptions.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});

var trfinal = [];
var tr = [];

module.exports = {
    getblock: function (log, blocknumber, callback) {
        var deferred = Q.defer();

        trfinal = [];
        options = {
            uri: 'http://127.0.0.1:5788',
            'auth': {
                'user': 'user',
                'pass': 'pass'
            },
            method: 'POST',
            json: {"jsonrpc": "1.0", "id": "1", "method": "getinfo", "params": []}
        }

        var now = moment();
        var body = {};
        async.waterfall([
            function getblockhash(next) {
                console.log('BLOCK',blocknumber);
                var params = [];
                params.push(blocknumber);
                options.json= {"jsonrpc": "1.0", "id": "1", "method": "getblockhash", "params": params}

                    request(options, function (error, response, bodyr) {
                        if (!error && response.statusCode == 200) {
                            body = bodyr;
                           if (body.result) {

                                next(null,body.result);
                            }
                            else
                                next('empty');
                        }
                        else
                            next('empty')
                    });
            },
            function getblockinfo(blockhash,next) {
                var params = [];
                params.push(blockhash);
                options.json= {"jsonrpc": "1.0", "id": "1", "method": "getblock", "params": params}

                request(options, function (error, response, bodyr) {
                    if (!error && response.statusCode == 200) {
                        body = bodyr;
                        if (body.result) {

                            next(null);
                        }
                        else
                            next('empty');
                    }
                    else
                        next('empty')
                });
            },
        ], function done(err) {
            if (log) {
                logger.info(now + '-' + JSON.stringify(body.result));
            }
            trfinal = body.result;
            trfinal.blocknumber = blocknumber;

            if (trfinal) {
                deferred.resolve(trfinal);
            }
            else {
                deferred.reject("Failed");
            }
            deferred.promise.nodeify(callback);
            return deferred.promise;
        });

    }
}

function inArray(search,list)
{
    var count=list.length;
    //console.log(list);
    for(var i=0;i<count;i++)
    {
        //  console.log(list[i],search);
        if(list[i]===search){return true;}
    }
    return false;
}


