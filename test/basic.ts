import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { read } from '../src/read.ts'
import spawnRead from './fixtures/setup.ts'

async function child () {
  const user = await read({ prompt: 'Username: ', default: 'test-user' })
  const pass = await read({
    prompt: 'Password: ',
    default: 'test-pass',
    silent: true,
  })
  const verify = await read({
    prompt: 'Password again: ',
    default: 'test-pass',
    silent: true,
  })

  console.error(
    JSON.stringify({
      user,
      pass,
      verify,
      passMatch: pass === verify,
    })
  )

  if (process.stdin.unref) {
    process.stdin.unref()
  }
}

const main = () => {
  test('basic', async () => {
    const { stdout, stderr } = await spawnRead(import.meta.url, {
      'Username: (test-user)': 'a user',
      'Password: (<default hidden>)': 'a password',
      'Password again: (<default hidden>)': 'a password',
    })

    assert.deepEqual(JSON.parse(stderr), {
      user: 'a user',
      pass: 'a password',
      verify: 'a password',
      passMatch: true,
    })
    assert.equal(
      stdout,
      'Username: (test-user) Password: (<default hidden>) Password again: (<default hidden>) '
    )
  })

  test('defaults', async () => {
    const { stdout, stderr } = await spawnRead(import.meta.url, {
      'Username: (test-user)': '',
      'Password: (<default hidden>)': '',
      'Password again: (<default hidden>)': '',
    })

    assert.deepEqual(JSON.parse(stderr), {
      user: 'test-user',
      pass: 'test-pass',
      verify: 'test-pass',
      passMatch: true,
    })
    assert.equal(
      stdout,
      'Username: (test-user) Password: (<default hidden>) Password again: (<default hidden>) '
    )
  })

  test('errors', async () => {
    // @ts-expect-error
    await assert.rejects(() => read({ default: {} }))
  })
}

if (process.argv[2] === 'child') {
  child()
} else {
  main()
}
