var pty = require('pty.js');
var read = require('../lib/read.js')

var CLOSE = 'close'

if (process.argv[2] === 'child')
  return child()

var tap = require('tap')


function completer (line) {
  var completions = ['.help', '.error', '.exit', '.quit', '.q']
  var hits = completions.filter(function(c) { return c.indexOf(line) == 0 })
  return [hits.length ? hits : completions, line]
}


function child () {
  read({prompt:'1', completer : completer }, function (er, r1) {
    if (er) throw er
    console.log(r1)
  })
}

tap.test('binding completer', function (t) {
  var child = pty.spawn(process.execPath, [__filename, 'child'])
  child.on('data', function (c) { output += c })

  var n = 0
  var output = ''
  var expect = '1 .help'

  child.write(".he")
  child.write('\t')
  setTimeout(function(){
    child.write('\n')
  }, 500)

  child.on(CLOSE, function (c) {
    t.match(output, expect)
    t.end()
  })
})
