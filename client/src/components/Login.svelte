<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { USERNAME } from "../lib/user";

	const dispatch = createEventDispatcher();

	let username: string = "";
	let password: string = "";

	let errored: boolean = false;

	const on_click = async () => {
		if (username === null || username.trim().length === 0) return;
		if (password === null || password.trim().length === 0) return;

		await fetch(`${window.origin}/check_password`, {
			method: "POST",
			body: JSON.stringify({
				username: username,
				password: password,
			}),
		}).then((res) => {
			if (res.status === 200) {
				$USERNAME = username;
				dispatch("start_timer");
			} else {
				errored = true;
			}
		});
	};
</script>

<div class="login">
	<div class="login-title">Přihlašovací jméno</div>
	<input type="text" placeholder="Jméno..." bind:value={username} />
	<div class="login-title">Heslo</div>
	<input type="text" placeholder="Heslo..." bind:value={password} />
	<button class="login-submit" on:click={on_click}>Přihlásit se</button>
	{#if errored}
		<div class="error">Error: Špatné heslo</div>
	{/if}
</div>

<style>
	.login {
		--border: 2px solid var(--accent-3);

		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 16px;

		color: var(--accent-1);
	}

	.login-title {
		font-size: 32px;
	}

	input {
		width: 256px;

		padding: 8px;
		border: var(--border);
		border-radius: 8px;

		background-color: transparent;

		font-size: inherit;
		color: inherit;
	}

	button {
		padding: 8px 16px;
		border: var(--border);
		border-radius: 8px;

		background-color: transparent;

		color: inherit;
		font-size: inherit;

		cursor: pointer;

		&:hover {
			backdrop-filter: brightness(1.2);
		}

		&:active {
			backdrop-filter: brightness(1.4);
		}
	}

	.error {
		color: red;
	}
</style>
