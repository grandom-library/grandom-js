import { normalize } from 'node:path'
import { isDirExists } from '@utils'
import { getProject } from '@utils/project'

export const isDirIndividualPackage = async (path: string): Promise<boolean> => {
  path = normalize(path)

  if (!await isDirExists(path)) {
    throw new Error(`Dir "${path}" doesn't exist.`)
  }

  const project = await getProject()

  console.log(project)

  return false
}
