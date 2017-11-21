#!/usr/bin/env node
'use strict'
const program = require('commander')
const fsReplaceHost = require('../index').fsReplaceHost

program
  .usage('[options] <hostname> [hostnames...]')
  .option('-a, --allow', 'block host')
  .option('-b, --block', 'allow host')
  .parse(process.argv)

const hosts = program.args
const op = program.allow ? 'allow' : program.block ? 'block' : 'toggle'

if(!hosts[0]) {
  console.log('argument <hostname> is mandatory')
  process.exit(1)
}

for(let h in hosts) {
  let host = hosts[h]
  fsReplaceHost(host, op)
}