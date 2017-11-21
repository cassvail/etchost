'use strict'
const fs = require('fs')
const promisify = require('pify')

const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const WINDOWS = process.platform === 'win32'
const EOL = WINDOWS ? '\r\n' : '\n'

const HOSTS_FILE = WINDOWS
  ? 'C:/Windows/System32/drivers/etc/hosts'
  : '/etc/hosts'

function fsReplaceHost(host, op) {
  return readFile(HOSTS_FILE)
    .then((content) => {
      return replaceHost(content.toString(), host, op)
    })
    .then((content) => {
      return writeFile(HOSTS_FILE, content)
    })
    .catch((err) => {
      console.log(err)
    })
}

function replaceHost(content, host, op) {
  return new Promise((resolve, reject) => {
    op = op || 'toggle'

    if (['block', 'allow', 'toggle'].indexOf(op) < 0) {
      reject(`Unknown operation ${op}`)
    }

    let lineReg = new RegExp(`^[#]?[0-9\\.\\s]*${host}$`, 'm');
    let match = content.match(lineReg)

    if (match) {

      if (op === 'toggle') {
        if(match[0][0] === '#') {
          op = 'block'
        } else {
          op = 'allow'
        }
      }

      if (op === 'block') {
        let reg = new RegExp(`^#[0-9\\.\\s]*${host}$`, 'm')
        if(reg) content = content.replace(reg, `127.0.0.1 ${host}`)

        console.log(`Block ${host}`)
      }
      else if (op === 'allow'){
        let reg = new RegExp(`^[0-9\\.\\s]*${host}$`, 'm')
        if(reg) content = content.replace(reg, `#127.0.0.1 ${host}`)

        console.log(`Allow ${host}`)
      }
    } else {
      if (op === 'block' || op === 'toggle') {
        content += `${EOL}127.0.0.1 ${host}`
        console.log(`Block new ${host}`)
      }
    }

    resolve(content)
  })


}

module.exports = {
  WINDOWS,
  EOL,
  HOSTS_FILE,
  replaceHost,
  fsReplaceHost,
}