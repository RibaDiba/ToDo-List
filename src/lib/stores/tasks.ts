import { writable, get } from 'svelte/store';

function createTasks(initialValue: any) {
     const { subscribe, set, update } = writable(initialValue);

     return {
          subscribe,
          createTask: (name: any) => {
               update(tasks => [
                    {
                         name: name,
                         isDone: false,
                         id: tasks.length // TODO: find a better ID generation
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
