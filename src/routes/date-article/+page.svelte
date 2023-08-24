<script lang="ts">
	import type { Article } from '~/types/Article'

	import { getRandomElementFromArray } from '~/utils'

	import { articles } from '~/data/date-article/articles'

	const article: Article = getRandomElementFromArray(articles as [])

	const yearStart = 1944
	const yearEnd = new Date().getFullYear()

	let yearSubmitted: boolean = false

	let nodesCount: number = 1
	let articleFullyDisplayed: boolean = false

	const displayNextNode = () => {
		nodesCount++
		if (nodesCount === article.nodes.length) articleFullyDisplayed = true
	}

	$: nodesToDisplay = article.nodes.slice(0, nodesCount)

	$: selectedYear = yearEnd

	const submitDate = () => {
		yearSubmitted = true
	}

	$: score = Math.abs(article.publicationYear - selectedYear)

	$: sliderClasses = ['slider', `${yearSubmitted === true ? 'slider-inactive' : ''}`]
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div>
	{#each nodesToDisplay as node}
		<p class={node.type}>
			{node.content}
		</p>
	{/each}

	{#if articleFullyDisplayed === false}
		<p on:click={displayNextNode}>Afficher le paragraphe suivant</p>
	{/if}

	<div>
		<input
			bind:value={selectedYear}
			type="range"
			min={yearStart}
			max={yearEnd}
			class={sliderClasses.join(' ')}
		/>
		<p>{selectedYear}</p>
	</div>

	<p on:click={submitDate}>Valider</p>

	{#if yearSubmitted === true}
		<div>
			<p>Cet article a été publié en {article.publicationYear}</p>
			<p>Écart : {score}</p>
		</div>
	{/if}
</div>

<style lang="scss">
	.slider.slider-inactive {
		pointer-events: none;
		filter: grayscale(1);
	}
</style>
