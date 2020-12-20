const callerid = require('caller-id');
const dateformat = require('dateformat');
const util = require('util');
const colors = require('cli-color');
const stacky = require('stacky');
const extend = require('deep-extend');

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

const SpiffyConsole = function(options) {
    const self = this;
    this.options = extend(defaults, options);
    this.limit = this.options.level;
    this.colors = this.options.colors;

    const strd = function() {
        return this.defaultf.apply(this, arguments);
    }

    const stky = function() {
        return this.stackf.apply(this, arguments);
    }

    this.config = {
        "trace": {
            colorfunc: function(s) {
                return colors.xterm(self.colors.trace)(s);
            },
            formatfunc:stky,
            level:0
        },
        "error": {
            colorfunc:function(s) {
                return colors.xterm(self.colors.error)(s);
            },
            formatfunc:strd,
            level:1
        },
        "warn": {
            colorfunc: function(s) {
                return colors.xterm(self.colors.warn)(s);
            },
            formatfunc:strd,
            level:2
        },
        "info": {
            colorfunc: function(s) {
                return colors.xterm(self.colors.info)(s);
            },
            formatfunc:strd,
            level:3
        },
        "log": {
            colorfunc: function(s) {
                return colors.xterm(self.colors.log)(s);
            },
            formatfunc:strd,
            level:4
        }
    }

    Object.keys(this.config).forEach(function(f) {
        const level = self.config[f].level;
        //assign a noop func if the debug level is above the limit
        SpiffyConsole.prototype[f] = (level<=self.limit)?function() {
            const caller = callerid.getData();
            const fname = caller.functionName || "global";
            const fileinfo = util.format("(%s:%d)", caller.filePath.split("/").pop(),caller.lineNumber);
            args = Array.prototype.slice.call(arguments);
            args.unshift(fname, fileinfo, f);
            this.config[f].formatfunc.apply(this, args);
        }:Function.prototype;
    });
}

/*print pretty stack traces for stack level*/
SpiffyConsole.prototype.stackf = function() {
    const args = Array.prototype.slice.call(arguments);

    const fname = args.shift();
    const fileinfo = args.shift();
    const f = args.shift();
    const err = args.shift();

    const newargs = [err.message];
    newargs.unshift(fname, fileinfo, 'trace');
    this.defaultf.apply(this, newargs);
    process.stdout.write(stacky.pretty(err.stack, {
        'styles': {
            method:colors.magenta,
            location:colors.blue,
            line: colors.cyan,
            column: colors.cyan,
            unimportant: colors.dim
        }
    }));
    process.stdout.write('\n');
}

/*print all other levels with timestamp and color*/
SpiffyConsole.prototype.defaultf = function() {
    const args = Array.prototype.slice.call(arguments);
    const fname = args.shift();
    const fileinfo = args.shift();
    const f = args.shift();
    const now = new Date();

    const ts = dateformat(now, this.options.prefix.timestamp.format);

    const template = [], p_args=[];

    if(this.options.prefix.timestamp) {
      template.push("%s");
      p_args.push(colors.xterm(this.colors.timestamp)(ts));
    }

    if(this.options.prefix.funcname) {
      template.push("%s");
      p_args.push(colors.xterm(this.colors.funcname)(fname));
    }

    if(this.options.prefix.lineno) {
      template.push("%s");
      p_args.push(colors.xterm(this.colors.lineno)(fileinfo));
    }



    const argarr = [];
    argarr.push(template.join(" "));
    Array.prototype.push.apply(argarr, p_args);
    const prefix = util.format.apply(util, argarr);
    //("%s %s %s", colors.xterm(250)(ts), colors.xterm(254)(fname), colors.xterm(240)(fileinfo));

    const res =  util.format("[%s] %s", f.toUpperCase(), util.format.apply(util, args));

    const msg = this.config[f].colorfunc(res);
    process.stdout.write(prefix + msg);
    process.stdout.write('\n');
}

SpiffyConsole.prototype.clear = function() {
    process.stdout.write(colors.reset);
}


/**
 * @param {Object} options - console options 
 * @params {number} options.level - is a value from 0(print only traces) to 4(print all debug messages)
 * @params {Object} options.colors - an object that specifies the xterm color indices used for log, info, warn, error and trace.
 * @param {boolean} replaceConsole - if true it will replace global console functions
 *
 * xterm color indices can be found here https://jonasjacek.github.io/colors/ 
 */
const wrapper =  function(options={replaceConsole:false}, replaceConsole/*this argument is deprecated*/) {
  const __logger = new SpiffyConsole(options);
  const replace = replaceConsole !== undefined ? replaceConsole : options.replaceConsole;
  if(replace) {
    console.log = __logger.log.bind(__logger);
    console.warn = __logger.warn.bind(__logger);
    console.error = __logger.error.bind(__logger);
    console.trace = __logger.trace.bind(__logger);
    console.info = __logger.info.bind(__logger);
  }
  return __logger;
}

module.exports = wrapper;
