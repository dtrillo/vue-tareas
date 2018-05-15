import camelCase from 'lodash/camelCase';
const requireModule = require.context('.', false, /\.js$/);
const modules = {}

requireModule.keys().forEach(fileName => {
	// Do not registes this file as Vuex modules
	if (fileName === '.index.js') { return }
	const moduleName = camelCase(fileName.replace(/(\.\/|\.js)/g, ''))
	modules[moduleName] = requireModule(fileName)
})

export default modules;