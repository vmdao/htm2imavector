var spawn = require('child_process').spawn;
var slang = require('slang');
var isStream = require('is-stream');

function quote(val) {
  // escape and quote the value if it is a string and this isn't windows
  if (typeof val === 'string' && process.platform !== 'win32') {
    val = '"' + val.replace(/(["\\$`])/g, '\\$1') + '"';
  }

  return val;
}

function mupdf(input, options, callback) {
  if (!options) {
    options = {};
  } else if (typeof options == 'function') {
    callback = options;
    options = {};
  }

  var output = options.output;
  delete options.output;

  // make sure the special keys are last
  var extraKeys = [];
  var keys = Object.keys(options).filter(function (key) {
    if (key === 'c' || key === 'r') {
      extraKeys.push(key);
      return false;
    }

    return true;
  }).concat(extraKeys);


  var args = [mupdf.command];

  keys.forEach(function (key) {
    var val = options[key];


    key = key.length === 1 ? '-' + key : '--' + slang.dasherize(key);

    if (Array.isArray(val)) { // add repeatable args
      val.forEach(function (valueStr) {
        args.push(key);
        if (Array.isArray(valueStr)) { // if repeatable args has key/value pair
          valueStr.forEach(function (keyOrValueStr) {
            args.push(quote(keyOrValueStr));
          });
        } else {
          args.push(quote(valueStr));
        }
      });
    } else { // add normal args
      if (val !== false) {
        args.push(key);
      }

      if (typeof val !== 'boolean') {
        args.push(quote(val));
      }
    }
  });



  args.push(output ? '-o ' + quote(output) : '');  // stdout if no output file
  args.push(quote(input));

  if (process.platform === 'win32') {
    var child = spawn(args[0], args.slice(1));
  } else if (process.platform === 'darwin') {
    var child = spawn('/bin/sh', ['-c', args.join(' ') + ' | cat ; exit ${PIPESTATUS[0]}']);
  } else {
    // this nasty business prevents piping problems on linux
    // The return code should be that of mupdf and not of cat
    // http://stackoverflow.com/a/18295541/1705056
    var child = spawn(mupdf.shell, ['-c', args.join(' ') + ' | cat ; exit ${PIPESTATUS[0]}']);
  }

  var stream = child.stdout;

  // call the callback with null error when the process exits successfully
  child.on('exit', function (code) {
    if (code !== 0) {
      stderrMessages.push('mupdf exited with code ' + code);
      handleError(stderrMessages);
    } else if (callback) {
      callback(null, stream); // stream is child.stdout
    }
  });

  // setup error handling
  var stderrMessages = [];
  function handleError(err) {
    var errObj = null;
    if (Array.isArray(err)) {
      // check ignore warnings array before killing child
      if (options.ignore && options.ignore instanceof Array) {
        var ignoreError = false;
        options.ignore.forEach(function (opt) {
          err.forEach(function (error) {
            if (typeof opt === 'string' && opt === error) {
              ignoreError = true;
            }
            if (opt instanceof RegExp && error.match(opt)) {
              ignoreError = true;
            }
          });
        });
        if (ignoreError) {
          return true;
        }
      }
      errObj = new Error(err.join('\n'));
    } else if (err) {
      errObj = new Error(err);
    }
    child.removeAllListeners('exit');
    child.kill();
    // call the callback if there is one

    if (callback) {
      callback(errObj);
    }

    // if not, or there are listeners for errors, emit the error event
    if (!callback || stream.listeners('error').length > 0) {
      stream.emit('error', errObj);
    }
  }

  child.once('error', function (err) {
    throw new Error(err); // critical error
  });

  child.stderr.on('data', function (data) {
    console.log('file')
    stderrMessages.push((data || '').toString());
    if (options.debug instanceof Function) {
      options.debug(data);
    } else if (options.debug) {
      console.log('[node-mupdf] [debug] ' + data.toString());
    }
  });

  if (output) {
    child.stdout.on('data', function (data) {
      console.log('file12')
      if (options.debug instanceof Function) {
        options.debug(data);
      } else if (options.debug) {
        console.log('[node-mupdf] [debugStdOut] ' + data.toString());
      }
    });
  }

  // write input to stdin if it isn't a url

  if (isStream(input)) {
    input.pipe(child.stdin);
  } else {
    child.stdin.end(input);
  }
  // return stdout stream so we can pipe
  return stream;
}

mupdf.command = 'mudraw';
mupdf.shell = '/bin/bash';
module.exports = mupdf;
