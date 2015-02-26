var Cylon = require('cylon');

Cylon.api({
  host: '0.0.0.0',
  port: '3000'
});

Cylon.start;

var SSE = require('sse')
  , http = require('http');

var server = http.createServer(function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
});

Cylon.robot({
  name: "drinkbot",

  alcoholLevel: function(value) {
    return value;
  },

  connections: {
    arduino: { adaptor: 'firmata', port: '/dev/tty.usbserial-A600aeYe' }
  },

  devices: {
    sensor: { driver: 'analogSensor', pin: 0, lowerLimit: 100, upperLimit: 400 }
  },

  work: function(my) {
    var analogValue = 0;

    // every((1).second(), function() {
    //   analogValue = my.sensor.analogRead();
    //   console.log('Analog value => ', analogValue);
    // });
    server.listen(8080, '127.0.0.1', function() {
    });

    var sse = new SSE(server);

    sse.on('connection', function(client) {
      every((1).seconds(), function() {
        console.log(my.sensor.analogRead());

          client.send(""+my.sensor.analogRead());

      });
    });
    // my.sensor.on('lowerLimit', function(val) {
    //   console.log("Lower limit reached!");
    //   console.log('Analog value => ', val);
    // });
    //
    // my.sensor.on('upperLimit', function(val) {
    //   console.log("Upper limit reached!");
    //   console.log('Analog value => ', val);
    // });
  },

  commands: function(value) {
    return {
      alcohol_level: this.alcoholLevel(value)
    };
  }
}).start();
