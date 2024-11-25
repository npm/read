import Mute from 'mute-stream'
import { Completer, AsyncCompleter, createInterface, ReadLineOptions } from 'readline'

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
    replace?: string,
    completer?: Completer | AsyncCompleter,
    history?: string[],
  }

export async function read<T extends string | number = string> ({
  default: def,
  input = process.stdin,
  output = process.stdout,
  completer,
  prompt = '',
  silent,
  timeout,
  edit,
  terminal,
  replace,
  history,
}: Options<T>): Promise<T | string> {
  if (
    typeof def !== 'undefined' &&
    typeof def !== 'string' &&
    typeof def !== 'number'
  ) {
    throw new Error('default value must be string or number')
  }

  let editDef = false
  const defString = def?.toString()
  prompt = prompt.trim() + ' '
  terminal = !!(terminal || output.isTTY)

  if (defString) {
    if (silent) {
      prompt += '(<default hidden>) '
      // TODO: add tests for edit
      /* c8 ignore start */
    } else if (edit) {
      editDef = true
      /* c8 ignore stop */
    } else {
      prompt += '(' + defString + ') '
    }
  }

  const m = new Mute({ replace, prompt })
  m.pipe(output, { end: false })
  output = m

  return new Promise<string | T>((resolve, reject) => {
    const rl = createInterface({ input, output, terminal, completer, history })
    // TODO: add tests for timeout
    /* c8 ignore start */
    const timer = timeout && setTimeout(() => onError(new Error('timed out')), timeout)
    /* c8 ignore stop */

    m.unmute()
    rl.setPrompt(prompt)
    rl.prompt()

    if (silent) {
      m.mute()
      // TODO: add tests for edit + default
      /* c8 ignore start */
    } else if (editDef && defString) {
      const rlEdit = rl as typeof rl & {
        line: string,
        cursor: number,
        _refreshLine: () => void,
      }
      rlEdit.line = defString
      rlEdit.cursor = defString.length
      rlEdit._refreshLine()
    }
    /* c8 ignore stop */

    const done = () => {
      rl.close()
      clearTimeout(timer)
      m.mute()
      m.end()
    }

    // TODO: add tests for rejecting
    /* c8 ignore start */
    const onError = (er: Error) => {
      done()
      reject(er)
    }
    /* c8 ignore stop */

    rl.on('error', onError)
    rl.on('line', line => {
      // TODO: add tests for silent
      /* c8 ignore start */
      if (silent && terminal) {
        m.unmute()
      }
      /* c8 ignore stop */
      done()
      // TODO: add tests for default
      /* c8 ignore start */
      // truncate the \n at the end.
      return resolve(line.replace(/\r?\n?$/, '') || defString || '')
      /* c8 ignore stop */
    })

    // TODO: add tests for sigint
    /* c8 ignore start */
    rl.on('SIGINT', () => {
      rl.close()
      onError(new Error('canceled'))
    })
    /* c8 ignore stop */
  })
}
