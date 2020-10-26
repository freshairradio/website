import { writable } from "svelte/store";
import { derived } from "svelte/store";

const nowplaying = writable(null);

const currentShowInfo = derived(
  nowplaying,
  ($a, set) => {
    if (typeof fetch == "function" && $a) {
      fetch(`https://api.freshair.radio/public/shows/${$a}`)
        .then((r) => r.json())
        .then((r) => set(r));
    } else {
      set({});
    }
  },
  {}
);

export { nowplaying, currentShowInfo };
