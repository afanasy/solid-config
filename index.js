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

var homedir = os.homedir()
if (process.env.UPSTART_JOB) {
  var m = packageJson.value.__path.match(/^(\/home\/[^\/]+?)\//)
  if (m)
    homedir = m[1]
}

_.each([
  path.dirname(packageJson.value.__path) + '/config',
  homedir + '/.' + packageJson.value.name,
  homedir + '/.' + packageJson.value.name + '/config'
],
function (path) {
  try {_.extend(config, require(path + '.json'))}
  catch (e) {}
})
