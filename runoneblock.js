var async = require('async');

var blockinfo = require("./core/getblock");
var dbblocks = require("./db/dbblocks");


function RunTransation(blockid) {
      var raw = [];
      var log = false;
      blockinfo.getblock(log,blockid, function (err, block, callback) {
          var data = block;
          dbblocks.insertblock(data,function () {
          });
      });

};

function syncLoop(startiteration,iterations, process, exit){
    var index = startiteration,
        done = false,
        shouldExit = false;
    var loop = {
        next:function(){
            if(done){
                if(shouldExit && exit){
                    return exit(); // Exit if we're done
                }
            }
            // If we're not finished
            if(index < iterations+startiteration){
                index++; // Increment our index
                RunTransation(index);
                process(loop); // Run our process, pass in the loop
                // Otherwise we're done
            } else {
                done = true; // Make sure we say we're done
                if(exit) exit(); // Call the callback on exit
            }
        },
        iteration:function(){
            return index - 1; // Return the loop number we're on
        },
        break:function(end){
            done = true; // End the loop
            shouldExit = end; // Passing end as true means we still call the exit callback
        }
    };
    loop.next();
    return loop;
}


syncLoop(79380,1, function(loop){
    setTimeout(function(){
        var i = loop.iteration();
        console.log(i);
        loop.next();
    }, 200);
}, function(){
    console.log('done');
});


