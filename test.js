var options = {
  level: 4,
  //custom colors
  /*colors: {
    trace: 208,
    error: 196,
    warn: 193,
    info: 177,
    log: 118
   }*/
  }

var spiffy = require('./index.js')(options, false);


spiffy.log("hello", "log");
spiffy.info("hello", "info");
spiffy.warn("hello", "warn");
spiffy.error("hello", "error");

try {
  a[0] = 0;
} catch(e) {
  spiffy.trace(e);
}
