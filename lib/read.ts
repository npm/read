import Mute from 'mute-stream'
import { createInterface, ReadLineOptions } from 'readline'

export namespace Read {
  export interface Options<T extends string | number = string> {
    default?: T
    input?: ReadLineOptions['input'] & {
      isTTY?: boolean
    }
    output?: ReadLineOptions['output'] & {
      isTTY?: boolean
    }
    prompt?: string
    silent?: boolean
    timeout?: number
    edit?: boolean
    terminal?: boolean
    replace?: string
  }
}

export default async function read<T extends string | number = string>({
  default: def,
  input = process.stdin,
  output = process.stdout,
  prompt = '',
  silent,
  timeout,
  edit,
  terminal,
  replace,
}: Read.Options<T>): Promise<T | string> {
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

  return new Promise<string | T>((resolve, reject) => {
    const rl = createInterface({ input, output, terminal })
    /* c8 ignore start */
    const timer =
      timeout && setTimeout(() => onError(new Error('timed out')), timeout)
    /* c8 ignore stop */

    m.unmute()
    rl.setPrompt(prompt)
    rl.prompt()

    if (silent) {
      m.mute()
      /* c8 ignore start */
    } else if (editDef) {
      //@ts-ignore
      rl.line = def
      //@ts-ignore
      rl.cursor = def.length
      //@ts-ignore
      rl._refreshLine()
    }
    /* c8 ignore stop */

    const done = () => {
      rl.close()
      clearTimeout(timer)
      m.mute()
      m.end()
    }

    /* c8 ignore start */
    const onError = (er: Error) => {
      done()
      reject(er)
    }
    /* c8 ignore stop */

    rl.on('error', onError)
    rl.on('line', line => {
      /* c8 ignore start */
      if (silent && terminal) {
        m.unmute()
        m.write('\r\n')
      }
      /* c8 ignore stop */
      done()
      // truncate the \n at the end.
      /* c8 ignore start */
      return resolve(line.replace(/\r?\n$/, '') || def || '')
      /* c8 ignore stop */
    })

    /* c8 ignore start */
    rl.on('SIGINT', () => {
      rl.close()
      onError(new Error('canceled'))
    })
    /* c8 ignore stop */
  })
}
