var options = {
  level: 4,
  prefix: {
    funcname: false,
  }
}

var spiffy = require('./index.js')(options, false);


spiffy.log("%d hello %s", 1, "log");
spiffy.info("hello", "info");
spiffy.warn("hello", "warn");
spiffy.error("hello", "error");
spiffy.trace(new Error('some error'));
