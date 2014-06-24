var argv = require("optimist")
  .default({
    subConn: "tcp://localhost:5555",
    memcached: 'localhost:11211'
  }).argv;
  
var Memcached = require('memcached');
var memcached = new Memcached(argv.memcached);
console.log("Running at " + argv.memcached);

var zmq = require("zmq");
var subscriber = zmq.socket("sub");
subscriber.connect(argv.subConn);
subscriber.subscribe("");
console.log("Connecting to the " + argv.subConn);

subscriber.on("message", function(data) {
  console.log("Data from the publisher: " + data);
  var message = JSON.parse(data.toString());
  
  var key = "session/" + message.session + "/id/";
  var value = message.id; 
  var delay = 3600;
  
  memcached.set(key, value, delay, function(error) {
    if(error) { 
      console.log("Error from memcached: " + error)
    }
    else {
      console.log("success!");
    }
  }); 
});
