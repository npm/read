import { spawn } from 'child_process'
import { fileURLToPath } from 'url'

const esc = (str: string) => str.replace(/([()])/g, '\\$1')

const spawnRead = async (
  url: string,
  writes: { [k: string]: string }
): Promise<{ stdout: string; stderr: string }> => {
  const filename = fileURLToPath(url)

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
