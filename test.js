var options = {
  level: 4,
  prefix: {
    funcname: false,
  },
  replaceConsole: true
}

require('./index.js')(options);

console.log("%d hello %s", 1, "log");
console.info("hello", "info");
console.warn("hello", "warn");
console.error("hello", "error");
console.trace(new Error('some error'));
