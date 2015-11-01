var
  _ = require('underscore'),
  os = require('os'),
  path = require('path'),
  fs = require('fs'),
  packageJson = require('find-package-json')(module.parent.filename).next(),
  config = module.exports = {}

if (!packageJson.value)
  return

_.each([
  __dirname + '/config',
  os.homedir() + '/.' + packageJson.value.name,
  os.homedir() + '/.' + packageJson.value.name + '/config'
],
function (path) {
  try {_.extend(config, require(path + '.json'))}
  catch (e) {}
})
