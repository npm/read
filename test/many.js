const t = require('tap')
const spawnRead = require('./fixtures/setup')

const times = new Array(18).fill(null).map((_, i) => (i + 1).toString())

if (process.argv[2] === 'child') {
  return child()
}

async function child () {
  const read = require('../')

  const res = []
  for (const t of times) {
    const r = await read({ prompt: `num ${t}` })
    res.push(r)
  }

  console.error(...res)

  if (process.stdin.unref) {
    process.stdin.unref()
  }
}

t.test('many reads', async (t) => {
  const writes = times.reduce((acc, k) => {
    acc[`num ${k}`] = k
    return acc
  }, {})
  const { stdout, stderr } = await spawnRead(__filename, writes)

  t.equal(stdout, Object.keys(writes).join(' ') + ' ')
  t.equal(stderr, times.join(' ') + '\n')
})
