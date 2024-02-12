<script lang="ts">
	import { fly } from "svelte/transition";
	import { onMount } from "svelte";
	import DisableDevtool from "disable-devtool";

	import title from "./assets/title.png";
	import { round, shuffle } from "./lib/lib";
	import {
		ANSWERS,
		CURRENT_QUESTION_INDEX,
		QUESTIONS,
		SELECTED_ANSWER,
	} from "./lib/question";
	import { USERNAME } from "./lib/user";
	import AnswerButton from "./components/AnswerButton.svelte";
	import Login from "./components/Login.svelte";
	import {
		CURRENT_TIME,
		DID_END,
		TIME_STARTED,
		max_time_in_seconds,
	} from "./lib/timer";
	import TestResults from "./components/TestResults.svelte";
	import { transition_settings } from "./lib/const";
	import { derived } from "svelte/store";

	const questions = shuffle(QUESTIONS);
	$: current_question = questions[$CURRENT_QUESTION_INDEX];

	const time_string = derived(
		[CURRENT_TIME, TIME_STARTED],
		([current_time, time_started]) => {
			if (current_time === undefined || time_started === undefined)
				return "00:00";

			const seconds_between = Math.floor(
				(current_time.getTime() - time_started.getTime()) / 1000,
			);

			const minutes = Math.trunc(seconds_between / 60);
			const seconds = seconds_between % 60;

			return `${minutes.toString().padStart(2, "0")}:${seconds
				.toString()
				.padStart(2, "0")}`;
		},
	);

	const deselect = () => {
		$SELECTED_ANSWER = false;
	};

	let interval_id: number;
	const update_time = () => {
		$CURRENT_TIME = new Date();

		if ($DID_END) clearInterval(interval_id);
	};

	const start_timer = () => {
		$TIME_STARTED = new Date();

		interval_id = setInterval(update_time, 1000) as unknown as number;
	};

	onMount(() => {
		DisableDevtool({
			ondevtoolopen: async (type, next) => {
				await fetch(`${window.origin}/cheater`, {
					method: "POST",
					body: JSON.stringify({
						username: $USERNAME,
					}),
				});

				next();
			},
		});
	});
</script>

<div class="app-mount">
	<div class="app">
		<img src={title} alt="Title" class="title" />
		{#if $USERNAME === null}
			<Login on:start_timer={start_timer}></Login>
		{:else if !$DID_END && $CURRENT_QUESTION_INDEX < questions.length}
			<div class="timer">
				{$time_string} / {`${Math.trunc(max_time_in_seconds / 60)
					.toString()
					.padStart(2, "0")}:${(max_time_in_seconds % 60)
					.toString()
					.padStart(2, "0")}`}
			</div>
			<div
				class="question-index"
				out:fly={{ ...transition_settings, x: -100 }}
			>
				Otázka<br />
				<span>{$CURRENT_QUESTION_INDEX + 1} / {questions.length}</span>
			</div>
			<div
				class="container"
				out:fly={{ ...transition_settings, x: -100 }}
			>
				{#key $CURRENT_QUESTION_INDEX}
					<div
						class="question"
						in:fly={{ ...transition_settings, x: 100 }}
						out:fly={{ ...transition_settings, x: -100 }}
						on:introend={deselect}
					>
						{current_question.question}
						<div class="answers">
							{#each current_question.answers as answer, i}
								<AnswerButton index={i}>{answer}</AnswerButton>
							{/each}
						</div>
					</div>
				{/key}
			</div>
		{:else}
			<TestResults {questions}></TestResults>
		{/if}
	</div>
</div>

<style>
	:root {
		--bg: #1b1b1b;
		--border: #2c2c2c;

		--accent-1: hsl(0, 0%, 85%);
		--accent-2: hsl(0, 0%, 75%);
		--accent-3: hsl(0, 0%, 50%);
	}
	.app-mount {
		width: 100%;
		height: 100%;

		background-image: url("./assets/background.png");
		background-repeat: no-repeat;
		background-size: cover;
		background-position: 50% 50%;
	}

	.app {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 25%;
		right: 25%;

		text-align: center;

		background-color: var(--bg);
		border-left: 2px solid var(--border);
		border-right: 2px solid var(--border);
		box-shadow: 0px 0px 16px black;
	}

	.title {
		margin-top: 64px;
		margin-bottom: 64px;
		filter: drop-shadow(0px 0px 8px black);
	}

	.timer {
		margin-bottom: 16px;
		font-size: 24px;
		color: var(--accent-1);
	}

	.question-index {
		margin-bottom: 16px;
		font-size: 32px;
		color: var(--accent-1);
		filter: drop-shadow(0px 0px 8px black);
	}

	.question-index span {
		font-size: 40px;
	}

	.container {
		position: relative;
		height: 320px;
	}

	.question {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%);

		background-color: transparent;
		backdrop-filter: brightness(0.75);
		border: 2px solid var(--border);

		width: 400px;
		height: var(--question-height);
		border-radius: 16px;

		padding: 16px;

		display: grid;
		place-items: center;

		font-size: 24px;
		color: var(--accent-1);
	}

	.answers {
		position: absolute;
		top: calc(100% + 16px);
		left: 50%;
		transform: translate(-50%);

		display: grid;
		grid-template-columns: max-content;
		justify-items: center;
		gap: 8px;
	}

	@media only screen and (max-width: 800px) {
		.app-mount {
			overflow: hidden;
		}

		.app {
			left: 0;
			right: 0;
			box-shadow: unset;
			border-left: unset;
			border-right: unset;
		}

		.question {
			width: 80%;
		}
	}
</style>
