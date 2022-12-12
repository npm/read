const spawn = require('child_process').spawn

const esc = (str) => str
  .replace(/\(/g, '\\(')
  .replace(/\)/g, '\\)')

const spawnRead = async (filename, writes) => {
  const proc = spawn(process.execPath, [filename, 'child'])

  return new Promise((resolve, reject) => {
    let stdout = ''
    let stderr = ''

    proc.stdout.on('data', (c) => {
      stdout += c
      for (const [prompt, write] of Object.entries(writes)) {
        if (stdout.match(new RegExp(`${esc(prompt)} $`))) {
          return process.nextTick(() => proc.stdin.write(`${write}\n`))
        }
      }
      reject(new Error(`unknown prompt:\n${stdout}\n${JSON.stringify(writes)}`))
    })

    proc.stderr.on('data', (c) => {
      stderr += c
    })

    proc.on('close', () => resolve({
      stdout,
      stderr,
    }))
  })
}

module.exports = spawnRead
