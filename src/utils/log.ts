import chalk from 'chalk'
import logSymbols from 'log-symbols'
export const log = {
  success: (str: string) => {
    console.log(logSymbols.success, chalk.green(str))
  },
  error: (str: string) => {
    console.error(logSymbols.error, chalk.red(str))
  },
  warn: (str: string) => {
    console.warn(logSymbols.error, chalk.yellow(str))
  },
  info: (str: string) => {
    console.info(logSymbols.info, chalk.gray(str))
  }
}
