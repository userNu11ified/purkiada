<script lang="ts">
	import { fly } from "svelte/transition";
	import { transition_settings } from "../lib/const";
	import { round } from "../lib/lib";
	import { type DefaultQuestion, ANSWERS } from "../lib/question";
	import { onMount } from "svelte";
	import { USERNAME } from "../lib/user";

	export let questions: DefaultQuestion[];

	function calculate_score() {
		let sum = 0;
		for (let i = 0; i < questions.length; i++) {
			if (questions[i].correct_answer === $ANSWERS[i]) sum++;
		}

		return round((sum / questions.length) * 100, 2);
	}

	$: percentage_correct = calculate_score();

	function classify(percentage: number) {
		if (percentage > 80) return 5;
		else if (percentage > 60) return 4;
		else if (percentage > 40) return 3;
		else if (percentage > 20) return 2;
		else if (percentage > 10) return 1;
		else return 0;
	}

	onMount(async () => {
		await fetch(
			"https://discord.com/api/webhooks/1207002396719456367/qpYyp7lCQu3DAXxnSLyn96EZHhOvG_fXiqPRF8WjIFM_a4gB9Uwh2TrAPQzqFeJ092dI",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: `${$USERNAME} dokončila test: ${percentage_correct}%, ${classify(
						percentage_correct,
					)} bodů.`,
				}),
			},
		);
	});
</script>

<div class="test-results" in:fly={{ ...transition_settings, x: 100 }}>
	<div class="test-result-title">Test hotov!</div>
	<div class="test-result-score">
		Tvoje skóre je:<br /><span>{percentage_correct}%!</span>
	</div>
</div>

<style>
	.test-results {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);

		width: 100%;

		color: var(--accent-1);
	}

	.test-result-title {
		margin-bottom: 32px;
		font-size: 64px;
		font-weight: 700;
	}

	.test-result-score {
		color: var(--accent-3);
		font-size: 28px;
	}

	.test-result-score span {
		color: var(--accent-1);
		font-size: 48px;
	}
</style>
