import { join, normalize } from 'node:path'
import { isDirExists, isFileExists } from '@utils'

const PROJECT_CONFIG_FILE = join(__dirname, '../../../../../project.config.js')

const _getProjectConfigFile = async (): Promise<any> => {
  if (!await isFileExists(PROJECT_CONFIG_FILE)) {
    throw new Error(`Project config file "${PROJECT_CONFIG_FILE}" doesn't exist.`)
  }

  let content: any = {}

  try {
    content = require(PROJECT_CONFIG_FILE)
  } catch (error) {
    throw error
  }

  return content
}

/*
internalPackages: [
  {
    name: 'utils',
  }
],
commonPackages: [
  {
    name: 'core',
    pkgName: '@grandom/core'
  },
  {
    name: 'engines',
    pkgName: '@grandom/engines'
  }
],
individualPackages: [
  {
    name: 'bigint',
    pkgName: '@grandom/bigint'
  },
  {
    name: 'boolean',
    pkgName: '@grandom/boolean'
  },
  {
    name: 'number',
    pkgName: '@grandom/number'
  },
  {
    name: 'pick',
    pkgName: '@grandom/pick'
  },
  {
    name: 'shuffle',
    pkgName: '@grandom/shuffle'
  },
  {
    name: 'string',
    pkgName: '@grandom/string'
  },
  {
    name: 'weighted',
    pkgName: '@grandom/weighted'
  },
],
libraryPackage: {
  name: 'grandom'
}
*/

type PackageType = 'internal' | 'core' | 'individual' | 'library'

class Package {
  private _type: PackageType
  private _name: string
  private _packageName: string

  constructor (type: PackageType, name: string, packageName?: string) {
    this._type = type
    this._name = name
    this._packageName = typeof packageName === 'string'
      ? packageName
      : name
  }

  get type (): PackageType {
    return this._type
  }

  get name (): string {
    return this._name
  }

  get packageName (): string {
    return this._packageName
  }
}

class Project {
  public static async create (data: any) {
    const project = new Project()
    return project._init(data)
  }

  private _projectRoot: string = ''
  private _internalPackages: Package[] = []
  private _corePackages: Package[] = []
  private _individualPackages: Package[] = []
  private _libraryPackage!: Package

  private constructor () {}

  public async isDirIndividualPackage (path: string): Promise<boolean> {
    path = normalize(path)

    if (!await isDirExists(path)) {
      throw new Error(`Dir "${path}" doesn't exist.`)
    }

    console.log(this)

    return false
  }

  private async _init (data: any): Promise<Project> {
    if (typeof data === 'object' && data !== null) {
      if (typeof data.projectRoot === 'string') {
        this._projectRoot = data.projectRoot
      }

      if (Array.isArray(data.packages)) {
        for (const pkg of data.packages) {
          console.log(pkg)
        }
      }
    }

    return this
  }
}

export const getProject = async (): Promise<Project> => {
  const configFile = await _getProjectConfigFile()
  return Project.create(configFile)
}
