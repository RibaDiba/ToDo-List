<script lang="ts">
	import Task from '$lib/components/Task.svelte';
	import { remaining } from '$lib/stores/remaining';
	import { tasks } from '$lib/stores/tasks';

	// this subscribes the store to a local vairbale for use 
	let tasks_array: any[] = [];
	tasks.subscribe((value) => {
		tasks_array = value;
	});

	// this subscribes the store to a local variable for use 
	let count: any;
	$: tasks_array,
		remaining.subscribe((value) => {
			count = value;
		});
	// updates value based on change (reactive state)
	$: tasks_array, remaining.set(tasks.getIsDone());

	// add a new task
	function handleTask() {
		tasks.createTask('');
		// console log for err handling 
		console.log(tasks_array);
	}
</script>

<main>
	<div class="todo-list-container">
		<h1 class="title">Todo List</h1>

		<ul class="task-list">
			{#each tasks_array as task}
				<div class="input-container">
					<!-- pass through task object here (components)-->
					<Task  {task} />
				</div>
			{/each}
		</ul>

		<div class="divider"></div>

		<p class="remaining">Tasks Remaining: {count}</p>
		<button class="add-tasks_array" on:click={handleTask}>Add Task</button>
	</div>
</main>

<style>
	.title {
		font-family: 'Inter';
	}

	.todo-list-container {
		margin-left: 10rem;
		margin-right: 10rem;
		margin-top: 5rem;
	}

	.add-tasks_array {
		outline-style: none;
		border-style: solid;
		border-radius: 4px;
		background-color: black;
		color: white;
		padding: 10px;
		border-color: black;
		border-width: 3px;
		transition: 0.4s;
	}

	.add-tasks_array:hover {
		background-color: white;
		color: black;
		cursor: pointer;
	}

	.add-tasks_array:active {
		padding: 5px;
	}

	.task-list {
		display: flex;
		flex-direction: column;
		padding: 0px;
	}

	.divider {
		background-color: whitesmoke;
		width: auto;
		height: 5px;
		margin-bottom: 30px;
		margin-top: 30px;
	}

	.remaining {
		font-family: 'Inter';
	}
</style>
