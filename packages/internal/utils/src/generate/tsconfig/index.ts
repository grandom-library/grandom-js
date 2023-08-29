import { getCWD } from '@utils'
import { getProject } from '@utils/project'
import { getTemplate } from '@utils/templates'

;(async () => {
  console.log('generate:tsconfig')

  const cwd = getCWD()

  console.log(`in: ${cwd}`)

  const project = await getProject()

  if (!await project.isDirIndividualPackage(cwd)) {
    throw new Error(`Current dir "${cwd}" is not an individual package.`)
  }
})()
