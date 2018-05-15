import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from  'lodash/camelCase';

const requireComponent = require.context('.', false, /base-[\w-]+\.vue$/);

requireComponent.keys().forEach(fileName => {
	// Get component config
	const componentConfig = requireComponent(fileName);
	const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
	Vue.component(componentName, componentConfig.default || componentConfig);
})