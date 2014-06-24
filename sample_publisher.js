var zmq = require("zmq");
var publisher = zmq.socket("pub");
publisher.bind("tcp://*:5555", function(err) {
  if(err)
    console.log(err)
  else
    console.log("Ok!")
    setInterval(function() {
      publisher.send(JSON.stringify({tokens: "fdfnrk9vdfmvk", session: "fjkhereu5449eff_dsfsd", id: "hjfhdjfh56dfgg54545d_fdf___df45"}));
      console.log("Sending data to the subscribers...");
    }, 3000);
});




process.on('SIGINT', function() {
  publisher.close();
  console.log('\nClosed')
});

