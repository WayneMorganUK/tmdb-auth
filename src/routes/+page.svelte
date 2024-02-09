<script lang="ts">
	import { PUBLIC_TMDB_BEARER_TOKEN } from '$env/static/public';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	const request_token = $page.url.searchParams.get('request_token');
	const approved = $page.url.searchParams.get('approved');
	export let data;
	async function getClientSessionID() {
		if (request_token && approved) {
			const options = {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${PUBLIC_TMDB_BEARER_TOKEN}`
				},
				body: JSON.stringify({ request_token: request_token })
			};
			const response = await fetch(
				'https://api.themoviedb.org/3/authentication/session/new',
				options
			);
			const res = await response.json();
			return res.session_id;
		}
	}

	async function getServerSessionID() {
		const apiserverresponse = await fetch('/api/session', {
			method: 'POST',
			body: JSON.stringify(request_token),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
</script>

<!--
	Only the 'get session on client' returns 
	{"success":true,"session_id":"a2c7ec746c4a3d48b05197d7e5e77b150446ebc6"}
	 the others return 
	{
    success: false,
    status_code: 34, 														<----- this is a 404 error
    status_message: 'The resource you requested could not be found.'
  }
-->

<p>request token = {request_token}</p>
<button on:click={() => goto('/login')}>Login</button><br />
<button on:click={getClientSessionID}>Get Session on Client</button>
<form method="POST">
	<button type="submit">Get Session on form method</button>
	<input type="hidden" name="id" value={request_token} />
</form>

<button on:click={getServerSessionID}>Get Session on api/server</button>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
<pre>{JSON.stringify(data, null, 2)}</pre>
