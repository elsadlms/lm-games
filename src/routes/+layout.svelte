<script>
</script>

<svelte:head>
	<link rel="stylesheet" href="./styles/fonts.css" />
	<link rel="stylesheet" href="./styles/variables.css" />
</svelte:head>

<div>
	<nav>
		<ul>
			{#each ['redactle', 'date-article'] as page}
				<li>
					<a href={'/' + page}>{page}</a>
				</li>
			{/each}
		</ul>
	</nav>
	<slot />
</div>

<style lang="scss">
	:root {
		font-family: sans-serif;
	}

	ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: flex;
		padding-bottom: 1em;
		border-bottom: 1px solid #ddd;

		li + li {
			padding-left: 1em;
		}
	}
</style>
