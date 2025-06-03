import { input, select } from '@inquirer/prompts'
import { clone } from '../utils/clone'
import { gt } from 'lodash'
import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import { getNpmLatestVersion } from '../utils/version'
import { version, name } from '../../package.json'
import { log } from '../utils/log'
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

// 是否覆盖
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

  // 版本检测
  const npmLatestVersion = await getNpmLatestVersion(name)
  if (gt(npmLatestVersion, version)) {
    log.warn(
      `检测到98-cli最新版本:${chalk.bgGreenBright(npmLatestVersion)},当前版本:${chalk.bgBlueBright(version)}`
    )
    log.info(
      `可尝试使用命令:${chalk.green('npm install 98-cli@latest')},或使用命令${chalk.yellow('98 update')}更新`
    )
  }

  // 项目名称
  !projectName && (projectName = await input({ message: '请输入项目名称:' }))

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
    log.error('无对应模板')
    return
  }
  clone(info.downloadUrl, projectName, ['-b', info.branch])
}
