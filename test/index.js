'use strict'
const assert = require('assert')
const etchost = require('../index')
const EOL = etchost.EOL
const replaceHost = etchost.replaceHost

let fileData = `127.0.0.1 test.com${EOL}#127.0.0.1 test1.com`

describe('replaceHost', () => {

  it('toggle should append host', (done) => {
    replaceHost(fileData, 'test2.com')
      .then(function(data) {
        assert.equal(data, `127.0.0.1 test.com${EOL}#127.0.0.1 test1.com${EOL}127.0.0.1 test2.com`)
        done()
      })
      .catch((err) => {done(err)})
  })

  it('toggle should comment host', (done) => {
    replaceHost(fileData, 'test.com')
      .then(function(data) {
        assert.equal(data, `#127.0.0.1 test.com${EOL}#127.0.0.1 test1.com`)
        done()
      })
      .catch((err) => {done(err)})
  })

  it('toggle should uncomment host', (done) => {
    replaceHost(fileData, 'test1.com')
      .then(function(data) {
        assert.equal(data, `127.0.0.1 test.com${EOL}127.0.0.1 test1.com`)
        done()
      })
      .catch((err) => {done(err)})
  })

  it('block should append host', (done) => {
    replaceHost(fileData, 'test2.com', 'block')
      .then(function(data) {
        assert.equal(data, `127.0.0.1 test.com${EOL}#127.0.0.1 test1.com${EOL}127.0.0.1 test2.com`)
        done()
      })
      .catch((err) => {done(err)})
  })

  it('block should uncomment host', (done) => {
    replaceHost(fileData, 'test1.com', 'block')
      .then(function(data) {
        assert.equal(data, `127.0.0.1 test.com${EOL}127.0.0.1 test1.com`)
        done()
      })
      .catch((err) => {done(err)})
  })

  it('allow should not append new host', (done) => {
    replaceHost(fileData, 'test2.com', 'allow')
      .then(function(data) {
        assert.equal(data, `127.0.0.1 test.com${EOL}#127.0.0.1 test1.com`)
        done()
      })
      .catch((err) => {done(err)})
  })

  it('allow should comment host', (done) => {
    replaceHost(fileData, 'test1.com', 'allow')
      .then(function(data) {
        assert.equal(data, `127.0.0.1 test.com${EOL}#127.0.0.1 test1.com`)
        done()
      })
      .catch((err) => {done(err)})
  })

  it('block should not add existing host', (done) => {
    replaceHost(fileData, 'test.com', 'block')
      .then(function(data) {
        assert.equal(data, `127.0.0.1 test.com${EOL}#127.0.0.1 test1.com`)
        done()
      })
      .catch((err) => {done(err)})
  })

  it('allow should not add existing host', (done) => {
    replaceHost(fileData, 'test1.com', 'allow')
      .then(function(data) {
        assert.equal(data, `127.0.0.1 test.com${EOL}#127.0.0.1 test1.com`)
        done()
      })
      .catch((err) => {done(err)})
  })
})