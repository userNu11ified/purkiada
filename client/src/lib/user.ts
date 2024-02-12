import { writable, type Writable } from "svelte/store";

export const USERNAME: Writable<string | null> = writable(null);
