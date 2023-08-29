import { normalize } from 'node:path'

import {
  stat,
  exists
} from 'fs-extra'

export const isPathExists = async (path: string): Promise<boolean> => {
  return exists(normalize(path))
}

export const isDirExists = async (path: string): Promise<boolean> => {
  const _stat = await stat(normalize(path))

  if (_stat.isDirectory()) {
    return true
  }

  return false
}

export const isFileExists = async (path: string): Promise<boolean> => {
  const _stat = await stat(normalize(path))

  if (_stat.isFile()) {
    return true
  }

  return false
}

export const getCWD = (): string => {
  if (!process.env.INIT_CWD) {
    throw new Error('INIT_CWD cannot be found.')
  }

  return process.env.INIT_CWD
}
