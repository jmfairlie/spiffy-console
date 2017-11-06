# spiffy-console
color coded console output and nice stack traces(uses [stacky](https://github.com/PolymerLabs/stacky)) for nodejs. 

![Example Spiffy Console](printscreen.png?raw=true)

## How To Use

```js
var options = {
  level: 4,
  //optional
  /**
  colors: {
    trace:208,
    error: 196,
    warn: 193,
    info: 177,
    log: 118
  }
  */
}

/*
 * if set to true it will replace the global console functions with
 * spiffy functions so that any call to console.* will call the
 * spiffy equivalent
 */
var replaceConsole = false;

var spiffy = require('spiffy-console')(options, replaceConsole);

spiffy.log("hello", "log");
spiffy.info("hello", "info");
spiffy.warn("hello", "warn");
spiffy.error("hello", "error");
spiffy.trace(new Error('some error'));
```

## Options

### Defaults
```
const defaults = {
  level:4,
  colors: {
    trace:13,
    error:9,
    warn:11,
    info:27,
    log:40,
    timestamp: 109,
    lineno: 108,
    funcname:7
   },
   prefix: {
    timestamp: {
      visible: true,
      /**
       * more about format strings here
       * https://www.npmjs.com/package/dateformat#mask-options
       */
      format: "isoUtcDateTime"
    },
    lineno: true,
    funcname: true
   }
}

```

### Example
```js
/**
 * example
 */
var options = {
  /*
   * print up to level 4
   *
   * levels:
   * - trace: 0
   * - error: 1
   * - warn: 2
   * - info: 3
   * - log: 4
   */
  level: 4,
  /*
   * Xterm color indices
   * https://jonasjacek.github.io/colors/
   */
  colors: {
    trace:208, //default 13
    error: 196, //default 9
    warn: 193, //default 11
    info: 177, //default 27
    log: 118 //default 40
  }
}
```
## Xterm Color indices
https://jonasjacek.github.io/colors/
  
## Author
jmfairlie@gmail.com

## License
[MIT](license)
