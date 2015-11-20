var
  _ = require('underscore'),
  os = require('os'),
  path = require('path'),
  fs = require('fs'),
  packageJson = require('find-package-json')(module.parent.filename).next(),
  config = module.exports = {}

if (!packageJson.value)
  return

_.extend(config, packageJson.value[packageJson.value.name])

_.each([
  path.dirname(packageJson.value.__path) + '/config',
  os.homedir() + '/.' + packageJson.value.name,
  os.homedir() + '/.' + packageJson.value.name + '/config'
],
function (path) {
  try {_.extend(config, require(path + '.json'))}
  catch (e) {}
})
