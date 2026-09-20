import Mute from 'mute-stream'
import { createInterface } from 'readline'
import type { Completer, AsyncCompleter, ReadLineOptions } from 'readline'

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

// When readline closes after the first line on a non-interactive stream, any
// remaining lines already parsed from the same chunk are discarded by Node and
// never restored onto the input. Buffer them so a later read() on the same
// input can still return them (npm/read#36).
const pendingLines = new WeakMap<object, string[]>()

const takePendingLine = (input: object): string | undefined => {
  const buf = pendingLines.get(input)
  if (!buf || buf.length === 0) {
    return undefined
  }
  return buf.shift()
}

const pushPendingLine = (input: object, line: string): void => {
  let buf = pendingLines.get(input)
  if (!buf) {
    buf = []
    pendingLines.set(input, buf)
  }
  buf.push(line)
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

  const pending = takePendingLine(input)
  if (pending !== undefined) {
    const m = new Mute({ replace, prompt })
    m.pipe(output, { end: false })
    m.unmute()
    m.write(prompt)
    m.mute()
    m.end()
    return pending || defString || ''
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

    let settled = false

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
      // truncate the \n at the end.
      const cleaned = line.replace(/\r?\n?$/, '')
      // Surplus lines may still fire after close() when the whole pipe chunk
      // was already parsed; stash them for the next read() on this input.
      if (settled) {
        pushPendingLine(input, cleaned)
        return
      }
      settled = true
      // TODO: add tests for silent
      /* c8 ignore start */
      if (silent && terminal) {
        m.unmute()
      }
      /* c8 ignore stop */
      done()
      // TODO: add tests for default
      /* c8 ignore start */
      return resolve(cleaned || defString || '')
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
