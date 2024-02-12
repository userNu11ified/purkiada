<script lang="ts">
	import {
		ANSWERS,
		CURRENT_QUESTION_INDEX,
		SELECTED_ANSWER,
	} from "../lib/question";

	export let index: number;
	let selected = false;

	const sleep = (ms: number) => {
		return new Promise((res) => setTimeout(res, ms));
	};

	const select = () => {
		if ($SELECTED_ANSWER) return;

		selected = true;
		$SELECTED_ANSWER = true;
		$CURRENT_QUESTION_INDEX++;
		$ANSWERS.push(index);
	};
</script>

<button class="answer" class:answer-selected={selected} on:click={select}>
	<slot />
</button>

<style>
	.answer {
		min-width: min-content;
		max-width: 90%;
		min-height: 48px;

		padding: 4px 16px;

		background-color: transparent;
		backdrop-filter: brightness(0.75);
		border: 2px solid var(--border);
		border-radius: 16px;

		font-size: 20px;
		color: var(--accent-1);

		cursor: pointer;
	}

	.answer-selected {
		outline: 4px solid cornflowerblue;
		outline-offset: -2px;
	}
</style>
