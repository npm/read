/// <reference types="node" />
import { ReadLineOptions } from 'readline'
export declare namespace Read {
  interface Options<T extends string | number = string> {
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
export default function read<T extends string | number = string>({
  default: def,
  input,
  output,
  prompt,
  silent,
  timeout,
  edit,
  terminal,
  replace,
}: Read.Options<T>): Promise<T | string>
