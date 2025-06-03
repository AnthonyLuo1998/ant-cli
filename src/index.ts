import { Command } from 'commander'
import { version } from '../package.json'
import { create } from './command/create'
import { update } from './command/update'

const program = new Command('98')
program.version(version, '-v, --version')

program
  .command('create')
  .description('创建一个新项目')
  .argument('[name]', '项目名称')
  .action(async (dirName) => {
    await create(dirName)
  })

program
  .command('update')
  .description('更新98-cli脚手架')
  .argument('[version]', '版本号')
  .action(async (version) => {
    await update(version)
  })

program.parse()
