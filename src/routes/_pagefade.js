import { writable, derived } from "svelte/store";

const { subscribe, set, update } = writable(false);

export const navigating = {
  subscribe,
  start: () => set(true),
  end: () => set(false)
};
