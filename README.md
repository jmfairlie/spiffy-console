# spiffy-console
color coded console output and nice stack traces(uses [stacky](https://github.com/PolymerLabs/stacky)) for nodejs. 

![Example Spiffy Console](printscreen.png?raw=true)

## How To Use

```js
const spiffyConsole = require('spiffy-console');
const spiffy = spiffyConsole();

spiffy.log("hello", "log");
spiffy.info("hello", "info");
spiffy.warn("hello", "warn");
spiffy.error("hello", "error");
spiffy.trace(new Error('some error'));
```

### Replacing global console
```js
const spiffyConsole = require('spiffy-console');

const options = {
  replaceConsole: true
}

spiffyConsole(options);

console.log("hello", "log");
console.info("hello", "info");
console.warn("hello", "warn");
console.error("hello", "error");
console.trace(new Error('some error'));
```

## Option Defaults
```js
const defaults = {
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
  level:4,
  /*
   * Xterm color indices
   * https://jonasjacek.github.io/colors/
   */
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
  },
  /*
   * if set to true it will replace the global console functions with
   * spiffy functions so that any call to console.* will call the
   * spiffy equivalent$
   */
  replaceConsole: false
}

```
## Xterm Color indices
https://jonasjacek.github.io/colors/

## Donations
Would you like to support the developer of this package?

|Method| Address|
| --- | ---------------- |
| PayPal | paypal.me/jmfairlie |
| BTC | 32TCMZZBUH3Qx3fQ3Uns7G4tBHDRAhJFWW |
| ETH | 0xf47b076e468daeffc6c71e0e502374aa3f7bea98 |
| XRP | rDsbeomae4FXwgQTJp9Rs64Qg9vDiTCdBv   (destination tag: 90912933)|
| LTC | MCpuv4QLxDmrEGRRGnfQypFqSQo53VFTXP |

## Author
jmfairlie@gmail.com

## License
[MIT](license)
