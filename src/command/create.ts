import { input, select } from '@inquirer/prompts'
import { clone } from '../utils/clone'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
// github远程模版
interface TemplateInfo {
  name: string // 模版名称
  description: string // 模版描述
  downloadUrl: string // 模版地址
  branch: string // 模版分支
}

const templateMap: Map<string, TemplateInfo> = new Map([
  [
    'vue3',
    {
      name: 'vue3',
      description: 'vue3模版',
      downloadUrl: 'https://gitee.com/yudaocode/yudao-ui-admin-vue3',
      branch: 'master'
    }
  ],
  [
    'react',
    {
      name: 'react',
      description: 'react模版',
      downloadUrl: 'https://gitee.com/yudaocode/yudao-ui-admin-vue3',
      branch: 'master'
    }
  ]
])

export function isOverwriteSelection(projectName: string) {
  return select({
    message: `是否覆盖当前路径下的${projectName}文件夹?`,
    choices: [
      {
        name: '覆盖',
        value: true,
        description: `此行为会覆盖当前路径下的${projectName}文件夹`
      },
      {
        name: '取消',
        value: false
      }
    ]
  })
}

export async function create(projectName?: string) {
  const templateList = Array.from(templateMap).map(
    (item: [string, TemplateInfo]) => {
      const [name, info] = item
      return {
        name,
        value: name,
        description: info.description
      }
    }
  )
  // 项目名称
  if (!projectName) {
    projectName = await input({ message: '请输入项目名称:' })
  }
  // 当前路径是否存在相同项目
  const projectPath = path.resolve(process.cwd(), projectName)
  if (fs.existsSync(projectPath)) {
    const isOverwrite = await isOverwriteSelection(projectName)
    if (!isOverwrite) return
    fs.removeSync(projectPath)
  }
  // 模版选择
  const templateName = await select({
    message: '请选择该项目模板:',
    choices: templateList
  })
  const info = templateMap.get(templateName)
  if (!info) {
    console.error(chalk.red('无对应模板'))
    return
  }
  clone(info.downloadUrl, projectName, ['-b', info.branch])
}
