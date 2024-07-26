<script>
	/**
	 * @type {any[]}
	 */

	export let task;

	import { remaining } from '$lib/stores/remaining';
	import { tasks } from '$lib/stores/tasks';

	function handleDelete(task) {
		tasks.deleteTask(task.name, task.id);
	}

	function handleChecked(task) {
		let count = 0;

		tasks.subscribe((value) => {
			value.forEach((task) => {
				if (!task.isDone) {
					count++;
				}
			});
		});

		remaining.set(count);
	}
</script>

<main class="input-container">
	<input
		type="checkbox"
		class="done"
		bind:checked={task.isDone}
		on:change={() => {
			handleChecked(task);
		}}
	/>
	<input type="text" placeholder="Enter Task" class="name-task" bind:value={task.name} />
	<div class="button-container">
		<button
			class="close"
			on:click={() => {
				handleDelete(task);
			}}>x</button
		>
	</div>
</main>

<style>
	.close {
		background-color: inherit;
		border-style: none;
		outline-style: none;
		font-family: 'Inter';
		font-size: 20px;
		cursor: pointer;
		transition: 0.4s;
	}

	.close:active {
		font-size: 15px;
	}

	.done {
		width: 20px;
		height: auto;
	}

	.button-container {
		display: flex;
		justify-content: center;
	}

	.name-task {
		width: 10rem;
		margin: 10px;
		padding: 10px;
		border-style: none;
		outline: none;
		position: relative;
		font-family: 'Inter';
	}

	.input-container {
		display: flex;
		justify-items: center;
	}
</style>
