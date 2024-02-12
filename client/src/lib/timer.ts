import { derived, writable, type Writable } from "svelte/store";

export const max_time_in_seconds = 20 * 60;

export const TIME_STARTED: Writable<Date> = writable();
export const CURRENT_TIME: Writable<Date> = writable();
export const DID_END = derived(
	[TIME_STARTED, CURRENT_TIME],
	([time_started, current_time]) => {
		if (!time_started || !current_time) return null;

		return (
			time_started.getTime() + max_time_in_seconds * 1000 <=
			new Date().getTime()
		);
	}
);
