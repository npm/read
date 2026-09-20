import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { Readable, PassThrough } from 'node:stream'
import { read } from '../src/read.ts'

test('reads more than one line from a non-interactive pipe with async nesting', async () => {
  // All bytes available up front — the case that used to lose lines after the
  // first readline Interface closed (https://github.com/npm/read/issues/36).
  const input = new Readable({ read () {} }) as Readable & { isTTY?: boolean }
  input.isTTY = false
  input.push('foo\nbar\nbaz\n')
  input.push(null)

  const output = new PassThrough()
  output.isTTY = false

  const lines: string[] = []
  const readNext = async (): Promise<void> => {
    const line = await read({ prompt: '>', input, output })
    lines.push(String(line))
    if (lines.length < 3) {
      await new Promise<void>(resolve => setTimeout(resolve, 0))
      await readNext()
    }
  }

  await readNext()
  assert.deepEqual(lines, ['foo', 'bar', 'baz'])
})

test('buffered empty line still applies default', async () => {
  const input = new Readable({ read () {} }) as Readable & { isTTY?: boolean }
  input.isTTY = false
  input.push('first\n\nthird\n')
  input.push(null)

  const output = new PassThrough()
  output.isTTY = false

  const a = await read({ prompt: '>', input, output })
  const b = await read({ prompt: '>', input, output, default: 'fallback' })
  const c = await read({ prompt: '>', input, output })
  assert.equal(a, 'first')
  assert.equal(b, 'fallback')
  assert.equal(c, 'third')
})
