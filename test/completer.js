var read = require('../lib/read.js')

var CLOSE = 'close'

if (process.argv[2] === 'child') {
  return child()
}

var tap = require('tap')
var spawn = require('child_process').spawn


function completer (line) {
  var completions = ['.help', '.error', '.exit', '.quit', '.q']
  var hits = completions.filter(function(c) { return c.indexOf(line) == 0 })
  return [hits.length ? hits : completions, line]
}


function child () {
  read({prompt:'1', completer : completer }, function (er, r1) {if (er) throw er
    console.log(r1 )

    if (process.stdin.unref)
      process.stdin.unref()
  })
}

tap.test('binding completer', function (t) {
  var child = spawn(process.execPath, [__filename, 'child'], {terminal: true })
  var n = 0
  var output = ''
  var expect = '1 .help\n'
  var write = child.stdin.write.bind(child.stdin)

  write(".he");

    // this is NOT sending TAB key to underlying child
  write('\t'); 
    //nor this
  write('\x1b[I');

  write(new Buffer([0x0A]));

  child.stdout.on('data', function (c) {
    output += c
  })
  child.stderr.on('data', function (c) {
    output += c
  })

  child.on(CLOSE, function (c) {
    t.equal(output, expect)
    t.end()
  })
})
