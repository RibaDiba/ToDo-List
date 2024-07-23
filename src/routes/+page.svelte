<script lang="ts">

     let tasks: any[] = []

     let remaining = 0

     $: remaining = tasks.length

     function handleTask() {
          tasks = [
               {
                    name: "",
                    isDone: false
               }, ...tasks
          ]
     }

     function handleDelete(task) {
          tasks = tasks.filter(item => item.name !== task.name)
     }

     function handleChecked() {
          tasks.forEach((task) => {
               if (task.isDone) {
                    remaining--
               }
           })
     }

</script>

<main>
     <div class="todo-list-container">
          <h1 class="title">Todo List</h1>

          <ul class="task-list">
               {#each tasks as task}
                    <div class="input-container">
                         <input type="checkbox" class="done" bind:checked={task.isDone} on:change={handleChecked}>
                         <input type="text" placeholder="Enter Task" class="name-task" bind:value={task.name}>
                         <button class="close" on:click={() => {
                              handleDelete(task)
                         }}>x</button>
                    </div>
               {/each}
          </ul>

          <div class="divider"></div>

          <p class="remaining">Tasks Remaining: {remaining}</p>
          <button class="add-tasks" on:click={handleTask}>Add Tasks</button>
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

     .add-tasks {
          outline-style: none;
          border-style: solid;
          border-radius: 4px;
          background-color: black;
          color: white;
          padding: 10px;
          border-color: black;
          border-width: 3px;
          transition: .4s;
     }

     .add-tasks:hover {
          background-color: white;
          color: black;
          cursor: pointer;
     }

     .add-tasks:active {
          padding: 5px;
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

     .task-list {
          display: flex;
          flex-direction: column;
          padding: 0px;
     }

     .done {
          width: 20px;
          height: auto;
     }

     .input-container {
          display: flex;
          justify-items: center;
     }

     .close {
          background-color: inherit;
          border-style: none;
          outline-style: none;
          font-family: "Inter";
          font-size: 20px;
          cursor: pointer;
          transition: .4s;
     }

     .close:active {
          font-size: 15px;
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