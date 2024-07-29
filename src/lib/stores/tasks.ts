import { writable, get } from 'svelte/store';

function createTasks(initialValue: any) {
     const { subscribe, set, update } = writable(initialValue);

     return {
          subscribe,
          createTask: (name: any) => {
               // here is the structure of the task object
               update(tasks => [
                    {
                         name: name,
                         isDone: false,
                         id: Math.random() // generates a radnom id 
                    },
                    ...tasks
               ]);
          },
          updateIsDone: (id: any) => {
               update(tasks => {
                    return tasks.map((task: { id: any; isDone: any; }) =>
                         task.id === id
                              ? { ...task, isDone: !task.isDone }
                              : task
                    );
               });
          },
          deleteTask: (name: any, id: any) => {
               update(tasks => {
                    return tasks.filter((task: { id: any; name: any; }) => task.id !== id && task.name !== name);
               });
          },
          getIsDone: () => {
               const tasks = get({ subscribe });
               return tasks.filter((task: { isDone: any; }) => !task.isDone).length;
          },
          reset: () => set(initialValue)
     };
}

export const tasks = createTasks([]);
