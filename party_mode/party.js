var Cylon = require('cylon');

// Initialize the robot
Cylon.robot({
  connections: {
    voodoospark: {
      adaptor: 'voodoospark',
      accessToken: '4d535923612d69f5b2d9b7f30bbae1a80ec27ac2',
      deviceId: '54ff6a066672524808220167',
      module: 'cylon-spark'
    }
  },

  devices: {
    pin: { driver: 'direct-pin', pin: 'D7' },
    button: { driver: 'button', pin: 'D1' }
  },

  work: function(my) {
    var value = 0;
    every((1).second(), function() {
      my.pin.digitalWrite(value);
      value = (value == 0) ? 1 : 0;
    });
  }
}).start();

// curl https://api.spark.io/v1/devices/54ff6a066672524808220167/power \
//   -d access_token=4d535923612d69f5b2d9b7f30bbae1a80ec27ac2 \
//   -d params=p7,LOW
