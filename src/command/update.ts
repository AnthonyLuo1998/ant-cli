import { exec } from 'child_process'
import { log } from '../utils/log'
export async function update(version = 'latest') {
  exec(`npm install 98-cli@${version}`, (error, stdout, stderr) => {
    if (error) {
      log.error(`执行出错: ${error}`)
      return
    }
    log.info(`stdout: ${stdout}`)
    if (stderr) {
      log.error(`stderr: ${stderr}`)
    }
  })
}
