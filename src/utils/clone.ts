import simpleGit, { SimpleGitOptions } from 'simple-git'
import chalk from 'chalk'
import createLogger from 'progress-estimator'
import logSymbols from 'log-symbols'
import { log } from './log'
const gitOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(),
  binary: 'git',
  maxConcurrentProcesses: 6
}

const logger = createLogger({
  spinner: {
    interval: 100,
    frames: ['⠇', '⠋', '⠙', '⠸', '⠴', '⠦'].map((item) => chalk.green(item))
  }
})

export async function clone(
  url: string,
  projectName: string,
  options: string[]
) {
  const git = simpleGit(gitOptions)
  try {
    await logger(git.clone(url, projectName, options), '模板下载中...', {
      estimate: 7000
    })
    log.success('下载模板成功')
    log.info('安装依赖: pnpm install')
    log.info('运行项目: pnpm run dev')
    log.info('打包项目: pnpm run build')
  } catch (error) {
    console.error(logSymbols.error, chalk.red('下载模板失败'))
  }
}
