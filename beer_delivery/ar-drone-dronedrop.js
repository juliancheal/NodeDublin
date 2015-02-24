var dropper = require('dronedrop');
var arDrone = require('ar-drone');

dropper.commander(false, function() {
  var client  = arDrone.createClient();
  client.takeoff();

  client
    .after(1000, function() {
      dropper.version(function(err, data) {
        console.log("dronedrop firmware version:", data);
      });
      dropper.grab();
    })
    .after(1000, function() {
      dropper.drop();
    })
    .after(1000, function() {
      this.stop();
      this.land();
    });
});
