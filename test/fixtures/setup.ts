import { spawn } from 'child_process'

const esc = (str: string) =>
  str.replace(/\(/g, '\\(').replace(/\)/g, '\\)')

const spawnRead = async (
  filename: string,
  writes: { [k: string]: string }
): Promise<{ stdout: string; stderr: string }> => {
  const proc = spawn(process.execPath, [
    ...process.execArgv,
    filename,
    'child',
  ])

  return new Promise((resolve, reject) => {
    let stdout = ''
    let stderr = ''

    proc.stdout.on('data', c => {
      stdout += c
      for (const [prompt, write] of Object.entries(writes)) {
        if (stdout.match(new RegExp(`${esc(prompt)} $`))) {
          return process.nextTick(() => proc.stdin.write(`${write}\n`))
        }
      }
      reject(
        new Error(`unknown prompt:\n${stdout}\n${JSON.stringify(writes)}`)
      )
    })

    proc.stderr.on('data', c => {
      stderr += c
    })

    proc.on('close', () =>
      resolve({
        stdout,
        stderr,
      })
    )
  })
}

export default spawnRead
