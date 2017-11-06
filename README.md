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
 * if set to true it will replace the global console functions for spiffy functions
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
