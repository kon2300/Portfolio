import camelCase from 'lodash/camelCase'

const requireModule = import.meta.globEager('./*.js')
const modules = {}

for (const key in requireModule) {
  if (key === './index.js') {
    continue
  }
  const moduleName = camelCase(key.replace(/(\.\/|\.js)/g, ''))
  modules[moduleName] = requireModule[key].default
}

export default modules
