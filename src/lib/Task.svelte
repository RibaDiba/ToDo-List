<script>
	// @ts-nocheck

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let task;

	function updateTask(updated) {
		task = { ...task, ...updated };
		dispatch('update', task);
	}

	function toggle() {
		updateTask({ isDone: task.isDone });
		console.log(task);
	}

	function remove() {
		dispatch('remove', task);
	}

	function changeName() {
		updateTask({ name: task.name });
	}
</script>

<div class="input-container">
	<input type="checkbox" class="done" bind:checked={task.isDone} on:change={toggle} />
	<input
		type="text"
		placeholder="Enter Task"
		class="name-task"
		bind:value={task.name}
		on:change={changeName}
	/>
	<div class="button-container">
		<button class="close" on:click={remove}>x</button>
	</div>
</div>

<style>
	.name-task {
		width: 10rem;
		margin: 10px;
		padding: 10px;
		border-style: none;
		outline: none;
		position: relative;
		font-family: 'Inter';
	}

	.done {
		width: 20px;
		height: auto;
	}

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

	.button-container {
		display: flex;
		justify-content: center;
	}

	.input-container {
		display: flex;
		justify-items: center;
	}
</style>
