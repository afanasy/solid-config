var
  _ = require('underscore'),
  os = require('os'),
  fs = require('fs'),
  path = require('path'),
  name = require('./package.json').name,
  assert = require('assert')

_.each([
  __dirname + '/config',
  os.homedir() + '/.' + name,
  os.homedir() + '/.' + name + '/config'
],
function (configPath) {
  try {fs.mkdirSync(path.dirname(configPath + '.json'))} catch (e) {}
  fs.writeFileSync(configPath + '.json', JSON.stringify(_.object([[configPath, true]])))
})

assert.equal(_.size(require('./')), 3)
