<script lang="ts">
	//@ts-nocheck

	import Task from '$lib/Task.svelte';
	let tasks: any[] = [];

	let remaining = 0;
	let newTaskID;

	
	$: remaining = tasks.filter((task) => !task.isDone).length;

	function handleTask() {
		tasks = [
			{
				name: '',
				isDone: false,
				id: Math.random()
			},
			...tasks
		];

		console.log(tasks);
	}

	function handleDelete(task) {
		tasks = tasks.filter((item) => item.id !== task.id);
	}

	function updateTask(task) {
		const i = tasks.findIndex((t) => t.id === task.id);
		tasks[i] = { ...tasks[i], ...task };
	}

	function removeCompleted() {
		tasks = tasks.filter((item) => !item.isDone);
	}
</script>

<main>
	<div class="todo-list-container">
		<h1 class="title">Todo List</h1>

		<ul class="task-list">
			{#each tasks as task}
				<Task
					{task}
					on:remove={(e) => handleDelete(e.detail)}
					on:update={(e) => updateTask(e.detail)}
				/>
			{/each}
		</ul>

		<div class="divider"></div>

		<p class="remaining">Tasks Remaining: {remaining}</p>
		<button class="action-button" on:click={handleTask}>Add Task</button>
		<button class="action-button" on:click={removeCompleted}>Remove Completed</button>
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

	.action-button {
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

	.action-button:hover {
		background-color: white;
		color: black;
		cursor: pointer;
	}

	.action-button:active {
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
