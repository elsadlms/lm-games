<script lang="ts">
	import { page } from '$app/stores'

	const routes = [
		{
			id: 'redactle',
			label: 'Redactle',
		},
		// {
		// 	id: 'date-article',
		// 	label: "Dater l'article",
		// },
	]

	$: activeRoute = $page.route.id?.slice(1).split('/')[0]

	$: isActive = (id: string) => {
		if (id === activeRoute) return true
		else return false
	}
</script>

<svelte:head>
	<title>LM Redactle</title>
	<link rel="stylesheet" href="/styles/reset.css" />
	<link rel="stylesheet" href="/styles/fonts.css" />
	<link rel="stylesheet" href="/styles/variables.css" />
</svelte:head>

<div>
	<nav>
		<ul>
			{#each routes as route}
				{@const buttonClasses = [
					'button',
					'lmui-button',
					'lmui-button_secondary',
					'lmui-button_m',
					isActive(route.id) ? 'button_active' : '',
				]}
				<li>
					<a class={buttonClasses.join(' ')} href={'/' + route.id}>{route.label}</a>
				</li>
			{/each}
		</ul>
	</nav>

	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	:global(body) {
		background-color: var(--c-body-background);
	}

	:global(.lm-app) {
		--main-column-width: calc(100% - 48px * 2);
		--main-column-max-width: 1200px;
		font-family: var(--ff-marr-sans);
		color: var(--c-text);

		@media (max-width: 800px) {
			--main-column-width: calc(100% - 12px * 2);
		}
	}

	nav {
		background-color: var(--c-body-background);
		top: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		z-index: 2;
	}

	ul {
		width: var(--main-column-width);
		max-width: var(--main-column-max-width);
		padding: 24px 0;
		list-style: none;
		display: flex;
		border-bottom: 1px solid #ddd;

		li + li {
			padding-left: 1em;
		}
	}

	.button {
		text-decoration: none;

		&_active {
			color: var(--lmui-c-main-tab-label-enabled);
			background: var(--lmui-c-main-tab-bg-enabled);
			border: 1px solid var(--lmui-c-main-tab-bg-enabled);
			transition: 0.12s ease-in;
		}
	}
</style>
