/* Version 1.1: Actualización de la version 1.
		Se permite agregar nuevas tareas, y se muestran correctamente gracias a click.prevent
		Se asignan colores a las tareas según su estado "done", que tiene 3 opciones: hecho, en ejecución, pendiente
*/

Vue.component('app-header', {
	data: function () { return {version: '1.1.0'}},
	template: `<h1 class="jumbotron text-center">Tasks - version {{version}}</h1>`
});


Vue.component('task-add', {
	template: `
	<form class="form">
		<input type="text" v-model="task" class="form-input" @keyup.enter.prevent="add_new_task" />
		<button @click.prevent="add_new_task" class="btn btn-primary">Nueva tarea</button>
	</form>
	`,
	data: function() {
		return {task: null}
	},
	methods: {
			add_new_task: function() {
				if (this.task) {
					this.$emit('new', { task: this.task, done: false})
					this.task = null;
				}
			}
	},
});

Vue.component('task-list', {
	props: ['tasks'],
	template: 
	`<div class="panel-group">
		<task-item v-for="item in tasks" :task="item" :key="item.id"></task-item>
	</div>`
})


Vue.component('task-item', {
		props: ['task'],
		template: `<li class="list-group-item list-group-item-danger">{{task.task}}</li>`
})

const app = new Vue({
  el: '#app',
  template: `<div class="view" v-cloak>
	<app-header></app-header>
	<task-add @new="add_task" class="container"></task-add>
	<task-list v-bind:tasks="tasks" class="container"></task-list>
  </div>`,
  data: {
	  tasks: [ 
		{task: 'Go super', done: true},
		{task: 'Work', done: true},
		{task: 'Running', done: true},
		{task: 'Watch TV', done: true}]
  },
  methods: {
	  add_task: function(task) {
		console.log(`Agregado ${task.task}`);
		task["id"] = this.tasks.length + 1
		this.tasks.push(task);
	  }
  }
})
