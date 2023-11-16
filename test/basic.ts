import t from 'tap'
import { read } from '../src/read.js'
import spawnRead from './fixtures/setup.js'

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
  t.test('basic', async t => {
    const { stdout, stderr } = await spawnRead(import.meta.url, {
      'Username: (test-user)': 'a user',
      'Password: (<default hidden>)': 'a password',
      'Password again: (<default hidden>)': 'a password',
    })

    t.same(JSON.parse(stderr), {
      user: 'a user',
      pass: 'a password',
      verify: 'a password',
      passMatch: true,
    })
    t.equal(
      stdout,
      'Username: (test-user) Password: (<default hidden>) Password again: (<default hidden>) '
    )
  })

  t.test('defaults', async t => {
    const { stdout, stderr } = await spawnRead(import.meta.url, {
      'Username: (test-user)': '',
      'Password: (<default hidden>)': '',
      'Password again: (<default hidden>)': '',
    })

    t.same(JSON.parse(stderr), {
      user: 'test-user',
      pass: 'test-pass',
      verify: 'test-pass',
      passMatch: true,
    })
    t.equal(
      stdout,
      'Username: (test-user) Password: (<default hidden>) Password again: (<default hidden>) '
    )
  })

  t.test('errors', async t => {
    // @ts-expect-error
    t.rejects(() => read({ default: {} }))
  })
}

if (process.argv[2] === 'child') {
  child()
} else {
  main()
}
