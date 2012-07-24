
module.exports = read

var readline = require('readline')
var Mute = require('mute-stream')

function read (opts, cb) {
  if (opts.num) {
    throw new Error('read() no longer accepts a char number limit')
  }

  var input = opts.input || process.stdin
  var output = opts.output || process.stdout
  var m = new Mute()
  m.pipe(output)
  output = m
  var def = opts.default || ''
  var rl = readline.createInterface({ input: input, output: output })
  var prompt = (opts.prompt || '').trim() + ' '
  var silent = opts.silent
  var editDef = def && opts.edit
  if (def && !editDef) {
    prompt += '(' + def + ') '
  }

  read_(rl, input, output, prompt, def, silent, editDef, cb)
}

function read_ (rl, input, output, prompt, def, silent, editDef, cb) {
  if (silent) {
    output.unmute()
    rl.setPrompt(prompt)
    rl.prompt()
    output.mute()
  } else {
    rl.setPrompt(prompt)
    rl.prompt()
    if (editDef) {
      rl.line = def
      rl.cursor = def.length
      rl._refreshLine()
    }
  }

  var called = false
  rl.once('line', onLine)
  rl.once('error', onError)

  function onError (er) {
    if (called) return
    called = true
    rl.close()
    output.mute()
    return cb(er)
  }

  function onLine (line) {
    if (called) return
    called = true
    rl.close()
    output.mute()
    var isDefault = !!(editDef && line === def)
    if (def && !line) {
      isDefault = true
      line = def
    }
    cb(null, line, isDefault)
  }
}
