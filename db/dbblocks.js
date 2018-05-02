/**
 * Created by ruannelloyd on 2018/04/22.
 */

var db=require('../db/dbengine.js');
var transactiondetail=require('../core/transaction.js')
var async = require("async");
var moment = require("moment");

exports.insertblock = function(data, done) {
    var transactions = [];
    var blocknumber = data.blocknumber;
    var unix_time = moment().unix();
    console.log("BLOCK!!!!!!!",data.blocknumber);
    async.waterfall([
        function insertBlock(next) {
            transactions = data.tx;
            blockid = data.blocknumber;
            var trcount= transactions.length;

            var parameters ='';
                parameters = parameters+data.blocknumber+',';
                parameters = parameters+'"'+data.hash+'",';
                parameters = parameters+data.size+',';
                parameters = parameters+data.height+',';
                parameters = parameters+'"'+data.version+'",';
                parameters = parameters+'"'+data.merkleroot+'",';
                parameters = parameters+'"'+data.bits+'",';
                parameters = parameters+data.difficulty+',';
                parameters = parameters+data.time+',';
                parameters = parameters+'"'+data.previousblockhash+'",';
                parameters = parameters+'"'+data.flags+'",';
                parameters = parameters+'"'+data.proofhash+'",';
                parameters = parameters+'"'+data.modifier+'",';
                parameters = parameters+'"'+data.modifierchecksum+'",';
                parameters = parameters+trcount+',';
                parameters = parameters+unix_time+',';
                parameters = parameters+data.mint;


            db.connection.query('CALL ins_block (' + parameters + ');', function (err, rows, fields) {
                if (err) {
                    console.log(err);
                }
                next();
            });

        },
        function updateTransactions(next) {
            var log=false;
            async.forEachOf(transactions, function (trid, i, cb) {
                transactiondetail.gettransaction(log,trid, function (err, tran) {
                    var data = tran;
                    var parameters ='';
                    parameters = parameters+blocknumber+',';
                    parameters = parameters+'"'+trid+'",';
                    parameters = parameters+data.version+',';
                    parameters = parameters+data.locktime+',';
                    parameters = parameters+data.time+',';
                    parameters = parameters+'"'+data.blockhash+'"';
                    db.connection.query('CALL block_ins_transaction ('  + parameters + ');', function (err, rows, fields) {
                        if (err) {
                            console.log(err);
                        }

                    });
                    trvin=data.vin;
                    async.forEachOf(trvin, function (vin, i, sb) {
                        if (vin.coinbase) {
                            var parameters = '';
                            parameters = parameters+blocknumber+',';
                            parameters = parameters + '"' + trid + '",';
                            parameters = parameters + '"",';
                            parameters = parameters + '-1' + ',';
                            parameters = parameters + vin.sequence + ',';
                            parameters = parameters + '"' + vin.coinbase+ '"';

                        }
                        else {
                            var parameters = '';
                            parameters = parameters+blocknumber+',';
                            parameters = parameters + '"' + trid + '",';
                            parameters = parameters + '"' + vin.txid + '",';
                            parameters = parameters + vin.vout + ',';
                            parameters = parameters + vin.sequence+ ',';
                            parameters = parameters + '""';
                        }
                        db.connection.query('CALL block_ins_transaction_in ('  + parameters + ');', function (err, rows, fields) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        sb();

                    });
                    trvout=data.vout;
                    async.forEachOf(trvout, function (vout, i, sb) {
                        var scriptPubKey = vout.scriptPubKey;
                        if (scriptPubKey.addresses) {

                            var amount = vout.value;
                            var parameters = '';
                            var addresses = scriptPubKey.addresses[0];
                            parameters = parameters + blocknumber + ',';
                            parameters = parameters + '"' + trid + '",';
                            parameters = parameters + vout.n + ',';
                            parameters = parameters + '"' + scriptPubKey.type + '",';
                            parameters = parameters + '"' + addresses + '",';
                            parameters = parameters + amount;
                        }
                        else
                        {
                            var addresses = '';
                            var amount = vout.value;
                            var parameters = '';
                            parameters = parameters + blocknumber + ',';
                            parameters = parameters + '"' + trid + '",';
                            parameters = parameters + vout.n + ',';
                            parameters = parameters + '"' + scriptPubKey.type + '",';
                            parameters = parameters + '"' + addresses + '",';
                            parameters = parameters + amount;

                        }
                        console.log(parameters);
                        db.connection.query('CALL block_ins_transaction_out ('  + parameters + ');', function (err, rows, fields) {
                            if (err) {
                                console.log(err);
                            }
                        });
                        sb();

                    });

                    cb();
                });
            }, next)
           }]

        , done());

}

