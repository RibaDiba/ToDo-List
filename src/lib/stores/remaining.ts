import { writable } from 'svelte/store';

function createRemaining(initialValue) {
    const { subscribe, set, update } = writable(initialValue);

    return {
        subscribe,
        increment: () => update(count => count + 1),
        decrement: () => update(count => count - 1),
        reset: () => set(initialValue),
        set
    };
}

export const remaining = createRemaining(0);
