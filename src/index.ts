import { Command } from 'commander'
import { version } from '../package.json'
import { create } from './command/create'

const program = new Command('98-cli')
program.version(version, '-v, --version')

program
  .command('create')
  .description('创建一个新项目')
  .argument('[name]', '项目名称')
  .action(async (dirName) => {
    await create(dirName)
  })

program.parse()
