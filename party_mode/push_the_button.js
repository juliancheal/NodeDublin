var Cylon = require('cylon');
var spotify = require('spotify-node-applescript');

Cylon.robot({
  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbmodem1a1241' }
  },

  devices: {
    button: { driver: 'button', pin: 7 },
    relay: { driver: 'direct-pin', pin: 'D7' }
  },

  work: function(my) {
    my.button.on('release', function() {
      console.log("PARTY!!!");
      spotify.playPause(function() {
        console.log('Play Spotify');
      });
    });
  }
}).start();
