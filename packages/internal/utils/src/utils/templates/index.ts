import { join } from 'node:path'
import { isPathExists } from '@utils'

const TEMPLATES_DIR = join(__dirname, '../../../../../shared/templates')

export const getTemplate = async (path: string): Promise<string> => {
  if (!await isPathExists(TEMPLATES_DIR)) {
    throw new Error(`Templates dir "${TEMPLATES_DIR}" doesn't exist.`)
  }

  const templatePath = join(TEMPLATES_DIR, path)

  if (! await isPathExists(templatePath)) {
    throw new Error(`Template file "${templatePath}" doesn't exist.`)
  }

  let content: any = {}

  try {
    content = require(templatePath)
  } catch (error) {
    throw error
  }

  return content
}
