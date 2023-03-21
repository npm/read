const readline = require('readline')
const Mute = require('mute-stream')

module.exports = async function read({
  default: def = '',
  input = process.stdin,
  output = process.stdout,
  prompt = '',
  silent,
  timeout,
  edit,
  terminal,
  replace,
}) {
  if (
    typeof def !== 'undefined' &&
    typeof def !== 'string' &&
    typeof def !== 'number'
  ) {
    throw new Error('default value must be string or number')
  }

  let editDef = false
  prompt = prompt.trim() + ' '
  terminal = !!(terminal || output.isTTY)

  if (def) {
    if (silent) {
      prompt += '(<default hidden>) '
      /* c8 ignore start */
    } else if (edit) {
      editDef = true
      /* c8 ignore stop */
    } else {
      prompt += '(' + def + ') '
    }
  }

  const m = new Mute({ replace, prompt })
  m.pipe(output, { end: false })
  output = m

  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({ input, output, terminal })
    /* c8 ignore start */
    const timer =
      timeout && setTimeout(() => onError(new Error('timed out')), timeout)
    /* c8 ignore stop */

    output.unmute()
    rl.setPrompt(prompt)
    rl.prompt()

    if (silent) {
      output.mute()
      /* c8 ignore start */
    } else if (editDef) {
      rl.line = def
      rl.cursor = def.length
      rl._refreshLine()
    }
    /* c8 ignore stop */

    const done = () => {
      rl.close()
      clearTimeout(timer)
      output.mute()
      output.end()
    }

    /* c8 ignore start */
    const onError = er => {
      done()
      reject(er)
    }
    /* c8 ignore stop */

    rl.on('error', onError)
    rl.on('line', line => {
      /* c8 ignore start */
      if (silent && terminal) {
        output.unmute()
        output.write('\r\n')
      }
      /* c8 ignore stop */
      done()
      // truncate the \n at the end.
      /* c8 ignore start */
      const res = line.replace(/\r?\n$/, '') || def || ''
      /* c8 ignore stop */
      return resolve(res)
    })

    /* c8 ignore start */
    rl.on('SIGINT', () => {
      rl.close()
      onError(new Error('canceled'))
    })
    /* c8 ignore stop */
  })
}
