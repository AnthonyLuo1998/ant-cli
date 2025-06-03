import simpleGit, { SimpleGitOptions } from 'simple-git'
import chalk from 'chalk'
import createLogger from 'progress-estimator'

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
    console.log(chalk.green('下载模板成功'))
    console.log(chalk.blackBright('安装依赖: pnpm install'))
    console.log(chalk.blackBright('运行项目: pnpm run dev'))
    console.log(chalk.blackBright('打包项目: pnpm run build'))
  } catch (error) {
    console.error(chalk.red('下载模板失败'))
  }
}
